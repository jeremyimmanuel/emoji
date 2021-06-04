<template>
  <span class="tooltipped tooltipped-n" :aria-label="tooltipText">
    <button class="text-5xl cursor-pointer emojiItem">
      {{ emoji }}
    </button>
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
    animation: scale15 0.5s linear both;
  }
}

.tooltipped {
  &::after {
    margin-bottom: 40px;
    font-size: 1rem;
  }

  &::before {
    top: -40px;
  }
}
</style>