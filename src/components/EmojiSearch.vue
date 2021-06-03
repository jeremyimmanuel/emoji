<template>
  <input
    v-bind="$attrs"
    class="h-12 p-4 rounded-md shadow-md border-gray-300"
  />
</template>

<script>
export default {
  name: "EmojiSearch",
};
</script>

<style lang="scss" scoped>
input {
  outline: 0;
}
</style>