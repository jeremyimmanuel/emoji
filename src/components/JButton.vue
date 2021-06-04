<template>
  <button
    v-bind="$attrs"
    class="j-button bg-red-200 rounded-md p-2"
    :class="{
      'button-effect': !disabled,
      'cursor-not-allowed': disabled,
      'opacity-50': disabled,
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
$shadow-color: rgb(255, 120, 120);

.j-button {
  outline: 0;
  position: relative;
  box-shadow: 0 4px $shadow-color;

  border: 2px solid transparent;
}
.button-effect {
  &:hover,
  &:focus {
    top: 2px;
    box-shadow: 0 2px $shadow-color;
  }

  &:focus {
    border: 2px solid black;
  }

  &:active {
    top: 4px;
    box-shadow: 0 0 $shadow-color;
  }
}
</style>