<template>
  <span class="tooltipped tooltipped-n" :aria-label="tooltipText">
    <div class="text-5xl cursor-pointer">
      {{ emoji }}
    </div>
  </span>
</template>

<script>
export default {
  name: "EmojiGridItem",

  props: {
    tooltipText: {
      type: String,
    },
    emoji: {
      type: String,
    },
  },
};
</script>

<style lang="scss" module>
</style>