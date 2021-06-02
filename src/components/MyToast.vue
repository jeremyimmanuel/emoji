<template>
  <div
    class="my-toast fixed top-4 left-4 bg-yellow-200 text-xl text-gray-700 font-bold rounded-md p-2 shadow"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "MyToast",
};
</script>

<style lang="scss" scoped>
</style>