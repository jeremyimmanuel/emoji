<template>
  <header class="bg-blue-300 h-96 w-full flex flex-col p-4 items-center">
    <h1 class="text-5xl md:text-8xl font-black mb-4 mt-auto">
      em{{ oTitle }}jiclip.dev
    </h1>
    <h3 class="text-xl md:text-4xl font-bold">Click emoji to copy</h3>
    <slot />
  </header>
</template>

<script>
export default {
  name: "MyHeader",

  props: {
    oTitle: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>