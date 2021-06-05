<template>
  <span class="tooltipped tooltipped-n" :aria-label="tooltipTextCapitalized">
    <button class="text-5xl cursor-pointer emojiItem">
      {{ emoji }}
    </button>
  </span>
</template>

<script>
import useCapitalize from "@/use/capitalize";
import { computed } from "vue";

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

  /**
   * Not really necessary to use composition api here,
   * but a good exercise
   */
  setup(props) {
    const { capitalize } = useCapitalize();
    const tooltipTextCapitalized = computed(() => {
      return capitalize(props.tooltipText);
    });

    return { tooltipTextCapitalized };
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