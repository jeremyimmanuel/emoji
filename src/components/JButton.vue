<template>
  <button
    v-bind="$attrs"
    class="j-button bg-red-200 rounded-md p-2"
    :class="{
      'button-effect': !disabled,
      'cursor-not-allowed': disabled,
      disabled,
    }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "JButton",

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.j-button {
  outline: 0;
  position: relative;
  box-shadow: 0 4px red;
}
.button-effect {
  &:hover {
    top: 2px;
    box-shadow: 0 2px red;
  }

  &:active {
    top: 4px;
    box-shadow: 0 0 red;
  }
}

.disabled {
  opacity: 0.5;
}
</style>