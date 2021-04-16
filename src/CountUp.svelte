<script lang="ts">
  import { CountUp } from 'countup.js'
  import { onDestroy, onMount } from 'svelte'
  import { count } from './store/count'

  let countUp: CountUp | undefined
  let target: HTMLSpanElement

  onMount(() => {
    countUp = new CountUp(target, 0)
    countUp.start()
  })

  const unsubscribe = count.subscribe((value) => {
    countUp?.update(value)
  })

  onDestroy(unsubscribe)
</script>

<span bind:this={target} class="font-semibold">0</span>
