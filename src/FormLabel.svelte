<script lang="ts">
  export let name: string
</script>

<label for={name} class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
  <slot />
</label>
