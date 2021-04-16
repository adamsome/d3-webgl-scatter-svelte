<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let id = 'switch'
  export let selected: 'left' | 'right' | string
  export let classes = ''
  export let iconSize = 'w-7 h-7'
  export let lhsDimBG = 'bg-white border-white focus:visible:ring-white'
  export let lhsDimFG = 'text-gray-400'
  export let lhsLitBG =
    'bg-yellow-300 border-yellow-300 focus:visible:ring-yellow-300'
  export let lhsLitFG = 'text-yellow-800'
  export let rhsDimBG = 'bg-black border-black focus:visible:ring-black'
  export let rhsDimFG = 'text-gray-600'
  export let rhsLitBG =
    'bg-blue-700 border-blue-700 focus:visible:ring-blue-700'
  export let rhsLitFG = 'text-blue-200'
  export let borderWidth = 'border-2'
  export let invertBorder = false
  export let round = true

  $: isLeft = selected === 'left'

  $: lhsBG = !isLeft ? lhsDimBG : lhsLitBG
  $: lhsFG = !isLeft ? lhsDimFG : lhsLitFG
  $: rhsBG = isLeft ? rhsDimBG : rhsLitBG
  $: rhsFG = isLeft ? rhsDimFG : rhsLitFG

  $: bg = !isLeft
    ? !invertBorder
      ? lhsBG
      : rhsBG
    : !invertBorder
    ? rhsBG
    : lhsBG

  $: buttonClasses = [
    'flex',
    'relative',
    'group',
    bg,
    borderWidth,
    round ? 'rounded-lg' : '',
    'focus:outline-none',
    'focus:ring-0',
    'focus-visible:ring-4',
    'focus-visible:ring-opacity-30',
    'transition-colors',
    classes,
  ]

  $: rounded = round ? 'rounded-md' : ''
  $: outerClass = `flex justify-center items-center ${rounded} border-0 transition-colors`
  $: innerClass = `${iconSize} border-0 transform -skew-x-12 transition-colors`
  $: iconClass =
    'absolute flex justify-center items-center transition-colors w-2/4 h-full'

  const dispatch = createEventDispatcher()

  function toggle() {
    dispatch('toggle')
  }
</script>

<button
  {id}
  aria-label={id}
  class={buttonClasses.join(' ')}
  on:click={toggle}
>
  <div class={`${lhsBG} ${outerClass} pl-3`}>
    <div class={`${lhsBG} ${innerClass}`} />
    <div class={`${lhsFG} ${iconClass} left-0`}>
      <slot name="lhs" />
    </div>
  </div>

  <div class={`${rhsBG} ${outerClass} pr-3`}>
    <div class={`${rhsBG} ${innerClass}`} />
    <div class={`${rhsFG} ${iconClass} right-0`}>
      <slot name="rhs" />
    </div>
  </div>
</button>
