<template>
  <span class="tooltipped tooltipped-n" :aria-label="tooltipText">
    <div class="text-5xl cursor-pointer emojiItem">
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

<style lang="scss" scoped>
.emojiItem {
  &:hover {
    // bounce animation defined in `App.vue`
    animation: bounce 0.5s linear both;
  }
}

.tooltipped {
  &::after {
    margin-bottom: 12px;
  }

  &::before {
    top: -12px;
  }
}
</style>