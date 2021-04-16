/// <reference lib="webworker" />

function TsvParser() {
  const decoder = new TextDecoder('utf-8')
  let columns
  let lastBuffer = ''

  function _parse(lines) {
    const rows = lines.map((line) => {
      const values = line.split('\t')
      if (values.length !== columns.length) return null

      return columns.reduce((acc, col, i) => {
        acc[col] = values[i]
        return acc
      }, {})
    })

    return rows.filter((r) => r != null)
  }

  return {
    parse(buffer) {
      const text = lastBuffer + decoder.decode(buffer)
      const lines = text.split('\n')

      // Set the columns from the 1st line if not set
      if (!columns) {
        columns = lines[0].split('\t')
        lines.shift()
      }

      lastBuffer = lines.pop() || ''

      return _parse(lines)
    },

    parseLast() {
      return _parse([lastBuffer])
    },
  }
}

function handleError(message) {
  const msg = message || 'Unknown error in TSV worker.'
  console.error('Error in TSV worker:', msg)
  postMessage({ error: msg })
  return null
}

async function fetchResponse(url) {
  let res
  try {
    res = await fetch(url)
  } catch (err) {
    return handleError(err && err.message)
  }

  if (!res.ok) {
    if (!res.body) {
      return handleError(res.statusText)
    }

    try {
      const data = await res.body.getReader().read()
      const message = new TextDecoder('utf-8').decode(data.value)
      const error = 'Error fetching data in TSV worker.'
      return handleError(
        `${error} ${res.status} (${res.statusText}): ${message}`
      )
    } catch (err) {
      return handleError(err && err.message)
    }
  }

  return res
}

onmessage = async (event) => {
  const url = event.data
  const res = await fetchResponse(url)

  const parser = TsvParser()
  let bytes = 0

  const stream = new Response(
    new ReadableStream({
      start(ctrl) {
        if (!res || !res.body)
          return handleError('TSV worker response has no content.')

        const reader = res.body.getReader()

        const read = async () => {
          const result = await reader.read()
          if (result.done) {
            ctrl.close()
            return
          }

          const data = parser.parse(result.value)

          bytes += result.value ? result.value.byteLength : 0

          postMessage({ data, bytes })

          ctrl.enqueue(result.value)
          read()
        }

        read()
      },
    })
  )

  const text = await stream.text()

  // Return any remaining data in the buffer
  const data = parser.parseLast()

  postMessage({ data, bytes: text.length, done: true })
}
