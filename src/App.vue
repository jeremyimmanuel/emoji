<template>
  <div
    class="flex flex-col justify-items-center items-center bg-red-200 h-screen"
  >
    <emoji-search
      :value="emojiQuery"
      @input="emojiQuery = $event.target.value"
      type="text"
      placeholder="emoji-search"
      @keyup.enter="print"
    />
    <button @click="print">Print!</button>
    {{ emojiQuery }}
    <button @click="fetchAllEmojis">All</button>
  </div>
</template>

<script>
import EmojiSearch from "@/components/EmojiSearch.vue";
import EmojiApi from "@/services/emojiApi";
export default {
  name: "App",

  data() {
    return {
      emojiQuery: "",
    };
  },

  methods: {
    print() {
      console.log(this.emojiQuery);
    },

    async fetchAllEmojis() {
      try {
        await EmojiApi.fetchAllEmojis();
      } catch (error) {
        console.log("error", error);
      }
    },
  },

  watch: {
    emojiQuery(emojiQuery) {
      console.log(emojiQuery);
    },
  },

  components: {
    EmojiSearch,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
