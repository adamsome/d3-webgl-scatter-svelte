<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let name: string
  export let value: number
  export let min = 0.01
  export let max = 1
  export let step = 0.05
  export let classes = ''

  const dispatch = createEventDispatcher()

  function handleChange(
    e: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) {
    dispatch('change', {
      value: Number(e.currentTarget.value),
    })
  }
</script>

<input
  name={name}
  class={'bg-gray-300 dark:bg-gray-800 appearance-none h-0.5 rounded focus:outline-none ' +
    classes}
  type="range"
  {min}
  {max}
  {step}
  {value}
  on:change={handleChange}
/>
