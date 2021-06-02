<template>
  <div class="flex flex-col justify-center items-center">
    <my-header>
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
    <footer
      class="bg-red-300 w-screen h-24 flex flex-row flex-wrap justify-between px-16 items-center"
    >
      <span class="text-xl">
        Developed by
        <a href="mailto:jeremytandjung@icloud.com" target="_blank">
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
    <transition name="fade">
      <div v-show="copied" class="Toast fixed top-2 left-2">
        <span class="p-2 font-bold bg-white rounded-md">Copied!</span>
      </div>
    </transition>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
import EmojiSearch from "@/components/EmojiSearch.vue";
import EmojiApi from "@/services/emojiApi";
import ClipboardJS from "clipboard";
import EmojiGridItem from "@/components/EmojiGridItem.vue";

export default {
  name: "App",

  data() {
    return {
      emojiQuery: "",
      emojiShown: [],
      copied: false,
      isLoading: false,
    };
  },

  async created() {
    var clipboard = new ClipboardJS(".emoji");

    clipboard.on("success", () => {
      this.copied = true;
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
      if (!error) {
        this.emojiShown = searchResults;
        console.log("emojiShown", this.emojiShown);
      }
      this.isLoading = false;
    },
  },

  components: {
    EmojiSearch,
    MyHeader,
    EmojiGridItem,
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

.emoji {
  &:hover {
    transform: scale(1.5);
  }

  @keyframes magnify {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }

    100% {
      transform: scale(2);
    }
  }

  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }
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
