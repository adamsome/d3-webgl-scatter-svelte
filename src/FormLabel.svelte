<script lang="ts">
  export let id = 'label'
</script>

<label for={id} class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
  <slot />
</label>
