<template>
  <div class="flex flex-col justify-center items-center">
    <my-header :o-title="copiedEmoji">
      <emoji-search
        class="mt-auto"
        :value="emojiQuery"
        @input="emojiQuery = $event.target.value"
        type="text"
        placeholder="Search emoji"
        @keyup.enter="searchEmoji"
      />
    </my-header>
    <div class="my-6">
      <template v-if="!isLoading">
        <div
          v-if="this.emojiShownFiltered.length"
          class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-8 grid-flow-row auto-cols-fr w-xl"
        >
          <div v-for="emoji in emojiShownFiltered" :key="emoji.slug">
            <emoji-grid-item
              class="emoji"
              :data-clipboard-text="emoji.character"
              :tooltip-text="emoji.unicodeName"
              :emoji="emoji.character"
            />
          </div>
        </div>
        <div v-else>No emoji found for {{ emojiQuery }}</div>
      </template>
      <div v-else>
        <span>Loading</span>
        <span class="AnimatedEllipsis"></span>
      </div>
    </div>
    <my-footer />
    <my-toast v-show="copied" class="my-toast" />
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
import EmojiSearch from "@/components/EmojiSearch.vue";
import EmojiApi from "@/services/emojiApi";
import EmojiGridItem from "@/components/EmojiGridItem.vue";
import MyFooter from "@/components/MyFooter.vue";
import MyToast from "@/components/MyToast.vue";

import Bounce from "bounce.js";
import ClipboardJS from "clipboard";

export default {
  name: "App",

  data() {
    return {
      copiedEmoji: "",
      emojiQuery: "",
      emojiShown: [],
      copied: false,
      isLoading: false,
      toastArray: [],
    };
  },

  beforeCreate() {
    let scale15 = new Bounce();
    scale15.scale({
      from: { x: 1, y: 1 },
      to: { x: 1.5, y: 1.5 },
    });
    scale15.define("scale15");

    let roadRunner = new Bounce();
    roadRunner.translate({
      from: { x: -500, y: 0 },
      to: { x: 0, y: 0 },
      duration: 2000,
    });

    roadRunner.define("road-runner");
  },

  async created() {
    var clipboard = new ClipboardJS(".emoji");

    clipboard.on("success", (e) => {
      if (!this.copied) this.copied = true;
      this.copiedEmoji = e.text;
      setTimeout(() => (this.copied = false), 4000);
    });

    await this.fetchAllEmojis();
  },

  computed: {
    /** The open emoji api returns duplicates emojis with a e[number]-[number] prefix */
    emojiShownFiltered() {
      if (!this.emojiShown) return [];
      const r = new RegExp(/e\d+-\d+/);
      return this.emojiShown.filter((emoji) => !r.test(emoji.slug));
    },
  },

  methods: {
    async fetchAllEmojis() {
      this.isLoading = true;
      try {
        const { allEmojis, error } = await EmojiApi.fetchAllEmojis();
        if (!error) this.emojiShown = allEmojis;
      } catch (error) {
        console.log("error", error);
      }
      this.isLoading = false;
    },

    async searchEmoji() {
      this.isLoading = true;
      const { searchResults, error } = await EmojiApi.searchEmoji(
        this.emojiQuery
      );
      if (!error) this.emojiShown = searchResults;
      this.isLoading = false;
    },
  },

  components: {
    EmojiSearch,
    MyHeader,
    EmojiGridItem,
    MyFooter,
    MyToast,
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Ubuntu", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.my-toast {
  animation: road-runner 1s linear both;
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
