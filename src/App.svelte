<script lang="ts">
  export let name: string
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
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
