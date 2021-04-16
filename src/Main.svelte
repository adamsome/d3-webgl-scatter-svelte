<script lang="ts">
  import { onMount } from 'svelte'
  import Chart from './Chart.svelte'
  import Loading from './Loading.svelte'

  let loading = true

  onMount(async () => {
    loading = false
  })
</script>

<main class="w-screen h-screen">
  {#if loading}
    <Loading />
  {:else}
    <Chart />
  {/if}
</main>
