import { writable } from 'svelte/store'

function createTheme() {
  const { subscribe, update, set } = writable<'dark' | 'light'>('dark')

  const toggle = () => update((theme) => (theme !== 'dark' ? 'dark' : 'light'))

  return { subscribe, toggle, set }
}

export const theme = createTheme()
