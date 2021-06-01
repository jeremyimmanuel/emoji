<template>
  <div
    class="flex flex-col justify-items-center items-center bg-red-200 h-full"
  >
    <emoji-search
      :value="emojiQuery"
      @input="emojiQuery = $event.target.value"
      type="text"
      placeholder="emoji-search"
      @keyup.enter="searchEmoji"
    />
    <button @click="fetchAllEmojis">All</button>
    <div class="grid grid-cols-10 gap-4 grid-flow-row auto-cols-fr max-w-xl">
      <div v-for="emoji in emojiShown" :key="emoji.codePoint" class="text-5xl">
        {{ emoji.character }}
      </div>
    </div>
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
      emojiShown: [],
    };
  },

  methods: {
    print() {
      console.log(this.emojiQuery);
    },

    async fetchAllEmojis() {
      try {
        const { allEmojis, error } = await EmojiApi.fetchAllEmojis();
        if (!error) this.emojiShown = allEmojis;
      } catch (error) {
        console.log("error", error);
      }
    },

    async searchEmoji() {
      const { searchResults, error } = await EmojiApi.searchEmoji(
        this.emojiQuery
      );
      if (!error) {
        this.emojiShown = searchResults;
        console.log("emojiShown", this.emojiShown);
      }
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
