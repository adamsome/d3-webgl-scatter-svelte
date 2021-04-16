<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import FormLabel from './FormLabel.svelte'
  import { CHROMA_GROUPS } from './lib/chroma'
  import {
    CHROMA_DARK_DEFAULT,
    CHROMA_DARK_KEY,
    CHROMA_LIGHT_DEFAULT,
    CHROMA_LIGHT_KEY,
  } from './lib/consts'
  import { chroma } from './store/chroma'
  import { theme } from './store/theme'

  export let classes = ''

  function restoreChroma() {
    const key = $theme === 'light' ? CHROMA_LIGHT_KEY : CHROMA_DARK_KEY
    const storedChroma = localStorage[key]
    if (storedChroma) {
      // Restore from local storage
      chroma.set(storedChroma)
    } else {
      // Nothing in local storage, set theme's default
      const defaultChroma =
        $theme === 'light' ? CHROMA_LIGHT_DEFAULT : CHROMA_DARK_DEFAULT
      chroma.set(defaultChroma)
    }
  }

  const unsubscribe = theme.subscribe((value) => {
    restoreChroma()
  })

  onMount(() => {
    restoreChroma()
  })

  function handleChange(
    e: Event & { currentTarget: EventTarget & HTMLSelectElement }
  ) {
    const value = e.currentTarget.value
    chroma.set(value)

    const key = $theme === 'light' ? CHROMA_LIGHT_KEY : CHROMA_DARK_KEY
    localStorage[key] = value
  }

  onDestroy(unsubscribe)
</script>

<div class={classes}>
  <FormLabel name="chroma-select">Chromatic Scale</FormLabel>
  <!-- svelte-ignore a11y-no-onchange -->
  <select
    name="chroma-select"
    class="w-36 sm:w-48 h-7 border-0 border-transparent bg-gray-300 dark:bg-gray-800 rounded-lg focus:outline-none"
    value={$chroma}
    on:change={handleChange}
  >
    {#each CHROMA_GROUPS as group (group.name)}
      <optgroup label={group.name}>
        {#each group.items as it (it.id)}
          <option value={it.id}>{it.name}</option>
        {/each}
      </optgroup>
    {/each}
  </select>
</div>
