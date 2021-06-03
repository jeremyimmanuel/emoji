<template>
  <footer
    class="bg-yellow-200 w-screen h-24 flex flex-row flex-wrap justify-between px-16 items-center"
  >
    <span class="text-xl">
      Developed by
      <a href="mailto:jeremytandjung@icloud.com" target="_blank" class="mailto">
        Jeremy Tandjung
      </a>
    </span>
    <div class="flex flex-row">
      <a href="http://www.linkedin.com/in/jeremytandjung" target="_blank">
        <img
          class="cursor-pointer mx-4"
          :src="require('@/assets/linkedin-black.png')"
          alt="linkedin"
          height="32"
          width="32"
        />
      </a>
      <a href="http://www.github.com/jeremyimmanuel" target="_blank">
        <img
          class="cursor-pointer"
          :src="require('@/assets/github-black.png')"
          alt="github"
          height="32"
          width="32"
        />
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  name: "MyFooter",
};
</script>

<style lang="scss" scoped>
.mailto {
  &:hover {
    color: rgb(95, 170, 255);
    font-weight: bold;
  }
}
</style>