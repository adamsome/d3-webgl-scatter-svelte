<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { throttle } from 'throttle-debounce'
  import {
    annotateBookDatum,
    BOOK_DATA_URL,
    parseBookDatum,
  } from './lib/book-data'
  import type { Scatterplot } from './lib/scatterplot'
  import { createScatterplot } from './lib/scatterplot'
  import Loading from './Loading.svelte'
  import { chroma } from './store/chroma'
  import { count } from './store/count'
  import { hexRadius } from './store/hex-radius'

  let loading = true
  let chart: Scatterplot | undefined
  let target: HTMLDivElement | undefined
  let tsv: Worker | undefined

  const setCount = throttle(1000, (value: number) => {
    count.set(value)
  })

  onMount(async () => {
    chart = createScatterplot(target).annotate(annotateBookDatum)

    await chart.hexRadius($hexRadius)
    await chart.chroma($chroma)

    tsv = new Worker('/tsv-stream.worker.js')

    tsv.onmessage = async (event) => {
      const { data: rawData, done } = event.data
      const data = rawData.map(parseBookDatum).filter((d: any) => d.date)

      if (done) loading = false

      const newCount = await chart(data, { done })
      setCount(newCount)
    }

    loading = true
    tsv.postMessage(BOOK_DATA_URL)

    return () => {
      tsv.terminate()
    }
  })

  const unsubscribeHexRadius = hexRadius.subscribe(async (value) => {
    if (chart) {
      loading = true
      setTimeout(async () => {
        await chart?.hexRadius(value)
        loading = false
      })
    }
  })

  const unsubscribeChroma = chroma.subscribe(async (value) => {
    if (chart) {
      loading = true
      setTimeout(async () => {
        await chart?.chroma(value)
        loading = false
      }, 100)
    }
  })

  onDestroy(() => {
    unsubscribeHexRadius()
    unsubscribeChroma()
  })
</script>

<div class="relative w-full h-full">
  <div bind:this={target} class="chart relative w-full h-full pb-32 sm:pb-4" />

  {#if loading}
    <div
      class="absolute top-0 left-0 w-full h-full bg-white dark:bg-black bg-opacity-75 dark:bg-opacity-50"
    >
      <Loading />
    </div>
  {/if}
</div>
