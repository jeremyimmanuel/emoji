<template>
  <div class="text-4xl my-loader"><slot /></div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style lang="scss" scoped>
.my-loader {
  // slinky defined in `initAnimation`
  animation: slinky 2.5s linear infinite;
}
</style>