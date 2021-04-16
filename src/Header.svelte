<script lang="ts">
  import ChromaSelect from './ChromaSelect.svelte'
  import CountUp from './CountUp.svelte'
  import HexRadiusSlider from './HexRadiusSlider.svelte'
  import Logo from './Logo.svelte'
  import ThemeSwitch from './ThemeSwitch.svelte'
</script>

<nav
  class="fixed z-20 flex-start flex-col w-full px-3 lg:px-6 bg-white bg-opacity-80 dark:bg-black dark:bg-opacity-80 lg:dark:bg-opacity-60 border-b dark:border-gray-900 transition-colors"
>
  <div class="flex-center w-full h-12 lg:h-24 pt-2 lg:pb-2">
    <div class="hidden lg:block mr-2 lg:mr-4 cursor-pointer group">
      <Logo
        body="text-black dark:text-white group-hover:text-blue-950 dark:group-hover:text-blue-200 transition-colors"
        line="text-black dark:text-white group-hover:text-blue-400 transition-colors"
        inner="text-white dark:text-black group-hover:text-red-600 transition-colors"
        big
      />
    </div>

    <div class="block lg:hidden mr-2 lg:mr-4 cursor-pointer group">
      <Logo
        body="text-black dark:text-white group-hover:text-blue-950 dark:group-hover:text-blue-200 transition-colors"
        line="text-black dark:text-white group-hover:text-blue-400 transition-colors"
        inner="text-white dark:text-black group-hover:text-red-600 transition-colors"
      />
    </div>

    <div
      class="relative -top-1 text-4xl lg:text-5xl text-gray-300 dark:text-gray-700 font-extralight italic ml-1 mr-1"
    >
      /
    </div>

    <div
      class="flex-1 text-2xl lg:text-4xl font-extralight ml-4 lg:ml-6 overflow-hidden overflow-ellipsis whitespace-nowrap"
    >
      <CountUp /> data points
    </div>

    <HexRadiusSlider classes="hidden lg:flex flex-col ml-6" />
    <ChromaSelect classes="hidden lg:flex flex-col ml-6" />
    <ThemeSwitch classes="hidden sm:flex flex-col ml-6" />
  </div>

  <div class="flex-start w-full lg:hidden pb-3 overflow-y-auto">
    <ThemeSwitch id="hex-radius-sm" classes="sm:hidden flex flex-col ml-1" />
    <ChromaSelect id="chroma-select-sm" classes="flex flex-col ml-3 sm:ml-1" />
    <HexRadiusSlider id="theme-switch-sm" classes="flex flex-col ml-3" />
  </div>
</nav>
