<script lang="ts">
  import { afterUpdate, onMount } from 'svelte'
  import FormLabel from './FormLabel.svelte'
  import { theme } from './store/theme'
  import Switch from './Switch.svelte'

  export let classes: string | undefined

  const STORE_KEY = 'theme'

  $: selected = $theme === 'light' ? 'left' : 'right'

  const handlePreferredChange = (ev: MediaQueryListEvent) => {
    theme.set(ev.matches ? 'dark' : 'light')
  }

  onMount(() => {
    const preferred = matchMedia('(prefers-color-scheme: dark)')
    const stored = localStorage[STORE_KEY]

    theme.set(stored || (preferred.matches ? 'dark' : 'light'))

    preferred.addEventListener('change', handlePreferredChange)

    return () => {
      preferred.removeEventListener('change', handlePreferredChange)
    }
  })

  afterUpdate(() => {
    localStorage[STORE_KEY] = $theme
    if (typeof window !== 'undefined') {
      if ($theme === 'light') {
        document.documentElement.classList.remove('dark')
      } else {
        document.documentElement.classList.add('dark')
      }
    }
  })
</script>

<div class={classes}>
  <FormLabel name="theme-switch">Theme</FormLabel>

  <div class="h-7 flex-center flex-col">
    <Switch
      name="theme-switch"
      {selected}
      iconSize="w-6 h-6"
      lhsDimBG="bg-gray-800 border-gray-800 focus-visible:ring-gray-800"
      lhsDimFG="text-gray-500 group-hover:text-yellow-500"
      lhsLitBG="bg-white border-white focus-visible:ring-white"
      lhsLitFG="text-yellow-500"
      rhsDimBG="bg-gray-300 border-gray-300 focus-visible:ring-gray-300"
      rhsDimFG="text-gray-400 group-hover:text-blue-600"
      rhsLitBG="bg-black border-black focus-visible:ring-black"
      rhsLitFG="text-blue-600"
      on:toggle={() => theme.toggle()}
    >
      <svg
        slot="lhs"
        class={`stroke-current stroke-2 ${
          $theme !== 'light' ? 'fill-current' : ''
        }`}
        fill="transparent"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        height="80%"
        width="80%"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>

      <svg
        slot="rhs"
        class={`stroke-current stroke-2 ${
          $theme === 'dark' ? 'fill-current' : ''
        }`}
        fill="transparent"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        height="80%"
        width="80%"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </Switch>
  </div>
</div>
