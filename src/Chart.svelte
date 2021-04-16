<script lang="ts">
  import { count } from './store/count'

  let value = 0

  function handleSubmit() {
    count.set(value)
  }
</script>

<form class="py-36 px-8" on:submit|preventDefault={handleSubmit}>
  <input
    class="w-36 px-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-transparent text-black dark:text-white rounded"
    type="number"
    bind:value
    min="0"
  />
  <button type="submit">Update</button>
</form>
