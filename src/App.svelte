<script lang="ts">
  import Chart from './Chart.svelte'
  import Header from './Header.svelte'
</script>

<Header />

<main class="w-screen h-screen">
  <Chart />
</main>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @layer base {
    html {
      @apply bg-white;
    }

    html.dark {
      @apply bg-black;
    }
  }

  @layer utilities {
    .flex-start {
      @apply flex justify-start items-start;
    }

    .flex-center {
      @apply flex justify-center items-center;
    }
  }
</style>
