<template>
  <span class="tooltipped tooltipped-n" :aria-label="tooltipTextCapitalized">
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

  computed: {
    /** @returns {string} */
    tooltipTextCapitalized() {
      let retVal = this.tooltipText;
      return retVal.replace(/^\w/, (s) => s.toUpperCase());
    },
  },
};
</script>

<style lang="scss" scoped>
.emojiItem {
  &:hover {
    // scale15 animation defined in `initAnimation`
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