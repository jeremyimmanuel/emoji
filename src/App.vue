<template>
  <div class="flex flex-col justify-items-center items-center">
    <header class="bg-blue-300 h-64 w-full flex flex-col p-4 items-center">
      <h1 class="text-4xl font-black mb-4 mt-auto">Emoji Clipboard</h1>
      <emoji-search
        class="mt-auto"
        :value="emojiQuery"
        @input="emojiQuery = $event.target.value"
        type="text"
        placeholder="Search emoji"
        @keyup.enter="searchEmoji"
      />
    </header>
    <div
      v-if="emojiShown.length"
      class="grid grid-cols-10 gap-4 grid-flow-row auto-cols-fr max-w-xl my-4"
    >
      <div
        v-for="emoji in emojiShownFiltered"
        :key="emoji.slug"
        class="text-5xl cursor-pointer emoji"
        :data-clipboard-text="emoji.character"
      >
        <span
          class="tooltipped tooltipped-s tooltipped-no-delay"
          :aria-label="emoji.unicodeName"
        >
          {{ emoji.character }}
        </span>
      </div>
    </div>
    <div v-else>Hello there</div>
    <footer class="bg-red-300 w-screen h-16">
      Made with ❤️ by Jeremy Tandjung
    </footer>
    <transition name="fade">
      <div v-show="copied" class="Toast fixed top-2 left-2">
        <span class="p-2 font-bold bg-white rounded-md">Copied!</span>
      </div>
    </transition>
  </div>
</template>

<script>
import EmojiSearch from "@/components/EmojiSearch.vue";
import EmojiApi from "@/services/emojiApi";
import ClipboardJS from "clipboard";

export default {
  name: "App",

  data() {
    return {
      emojiQuery: "",
      emojiShown: [],
      copied: false,
    };
  },

  async created() {
    var clipboard = new ClipboardJS(".emoji");

    clipboard.on("success", () => {
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    });

    await this.fetchAllEmojis();
  },

  computed: {
    emojiShownFiltered() {
      const r = new RegExp(/e\d+-\d+/);
      return this.emojiShown.filter((emoji) => !r.test(emoji.slug));
    },
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
