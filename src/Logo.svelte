<script lang="ts">
  export let big = false
  export let color: string = undefined
  export let body = 'text-black dark:text-white'
  export let line = 'text-black dark:text-white'
  export let inner = 'text-white dark:text-black'
  export let invert = false

  $: _body = color ?? (invert ? inner : body)
  $: _line = color ?? (invert ? inner : line)
  $: _inner = color ? inner : invert ? body : inner
  $: size = !big ? 40 : 64
</script>

<svg width={size} height={size} viewBox="0 0 210 297">
  <path
    class={`fill-current stroke-current ${_body}`}
    stroke-width="20"
    stroke-miterlimit="4"
    stroke-dasharray="none"
    d="M 182.71107,203.76249 33.486632,203.05479 108.71174,74.176483 Z"
  />
  <path
    class={`stroke-current ${_line}`}
    stroke-width="28"
    stroke-linecap="butt"
    stroke-linejoin="miter"
    stroke-miterlimit="4"
    stroke-dasharray="none"
    d="m 11.550336,148.28197 c 192.968534,0 192.968534,0 192.968534,0"
  />
  <path
    class={`fill-current ${_inner}`}
    stroke-width="0"
    stroke="transparent"
    d="m 92.191598,135.93724 65.524152,-0.3619 15.15418,25.69509 H 76.914526 Z"
  />
</svg>
