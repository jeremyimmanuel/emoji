<template>
  <header class="bg-blue-300 h-96 w-full flex flex-col p-4 items-center">
    <h1 class="text-8xl font-black mb-4 mt-auto">em{{ oTitle }}jiclip.dev</h1>
    <h3 class="text-4xl font-bold">Click emoji to copy</h3>
    <slot />
  </header>
</template>

<script>
export default {
  name: "MyHeader",

  data() {
    return {
      oTitle: "😂",
      oTitleSelection: [
        "😂",
        "🤩",
        "👽",
        "❤️",
        "🤪",
        "🤯",
        "🥳",
        "🍑",
        "🧐",
        "🤓",
      ],
    };
  },

  created() {
    this.oTitle = this.oTitleSelection[Math.floor(Math.random() * 10)];
  },
};
</script>

<style lang="scss" scoped>
</style>