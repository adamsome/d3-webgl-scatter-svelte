<script lang="ts">
  import FormLabel from './FormLabel.svelte';
  import Slider from './Slider.svelte';
  import { hexRadius } from './store/hex-radius';


  export let id = 'hex-radius'
  export let classes = ''
</script>

<div class={classes}>
  <FormLabel {id}>Hex Radius</FormLabel>

  <div
    class="h-7 rounded flex-center flex-col px-2 bg-white bg-opacity-75 dark:bg-black dark:bg-opacity-75"
  >
    <Slider
      {id}
      classes="w-20 sm:w-24"
      value={$hexRadius}
      on:change={(e) => hexRadius.set(e.detail.value)}
    />
  </div>
</div>
