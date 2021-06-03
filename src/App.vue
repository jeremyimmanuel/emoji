<template>
  <div class="flex flex-col justify-center items-center">
    <my-header :o-title="copiedEmoji">
      <emoji-search
        class="mt-auto emoji-search md:w-6/12 w-full"
        :value="emojiQuery"
        @input="emojiQuery = $event.target.value"
        type="text"
        placeholder="Search emoji"
        @keyup.enter="searchEmoji"
      />
    </my-header>
    <!-- Body -->
    <div
      class="grid grid-cols-3 gap-4 sm:flex sm:flex-row sm:justify-between my-4 sm:mx-4"
    >
      <j-button>😀 Smiley</j-button>
      <j-button>👁️ Body</j-button>
      <j-button>🐻 Animals</j-button>
      <j-button>🍔 Food</j-button>
      <j-button>⚽ Activites</j-button>
      <j-button>🚘 Travel</j-button>
      <j-button>💡 Objects</j-button>
      <j-button>🔣 Symbols</j-button>
      <j-button>🏁 Flags</j-button>
    </div>
    <div class="my-6">
      <empty-state v-if="empty" />
      <template v-else>
        <template v-if="!isLoading">
          <div
            v-if="this.emojiShown.length"
            class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-8 grid-flow-row auto-cols-fr w-xl"
          >
            <div v-for="emoji in emojiShown" :key="emoji.slug">
              <emoji-grid-item
                class="emoji"
                :data-clipboard-text="emoji.character"
                :tooltip-text="emoji.unicodeName"
                :emoji="emoji.character"
              />
            </div>
          </div>
          <div v-else>No emoji found for {{ badQuery }}</div>
        </template>
        <div v-else>
          <loader class="my-4">{{ copiedEmoji }}</loader>
        </div>
      </template>
    </div>
    <my-footer />
    <my-toast
      v-for="toastData in toastArray"
      :key="toastData.id"
      emojiclass="my-toast"
    >
      {{ toastData.emoji }} copied!
    </my-toast>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
import EmojiSearch from "@/components/EmojiSearch.vue";
import EmojiGridItem from "@/components/EmojiGridItem.vue";
import MyFooter from "@/components/MyFooter.vue";
import MyToast from "@/components/MyToast.vue";
import Loader from "@/components/Loader.vue";
import JButton from "@/components/JButton.vue";

import EmojiApi from "@/services/emojiApi";

import ClipboardJS from "clipboard";
import { v4 as uuidv4 } from "uuid";
import EmptyState from "@/components/EmptyState.vue";

export default {
  name: "App",

  data() {
    return {
      copiedEmoji: "😂",
      emojiQuery: "",
      badQuery: "",
      emojiShown: [],
      copied: false,
      isLoading: false,
      toastArray: [],
      empty: false,
    };
  },

  async created() {
    var clipboard = new ClipboardJS(".emoji");

    clipboard.on("success", (e) => {
      // if (!this.copied) this.copied = true;
      this.copiedEmoji = e.text;
      this.addToast();
      setTimeout(() => this.removeOldestToast(), 2000);
    });

    await this.searchEmoji();
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
    /** Not used */
    async fetchAllEmojis() {
      this.emojiQuery = "";
      this.searchEmoji();
    },

    async searchEmoji() {
      this.empty = false;
      this.isLoading = true;
      const { searchResults, error } = await EmojiApi.searchEmoji(
        this.emojiQuery
      );
      if (!error) {
        this.emojiShown = searchResults;
        if (!searchResults) this.emojiShown = [];
        else {
          // filter out duplicates with e[number] prefixes
          const r = new RegExp(/e\d+-\d+/);
          this.emojiShown = searchResults.filter(
            (emoji) => !r.test(emoji.slug)
          );
        }
        if (this.emojiShown.length === 0) this.badQuery = this.emojiQuery;
      }
      this.isLoading = false;
    },

    addToast() {
      const id = uuidv4();
      const data = {
        id,
        emoji: this.copiedEmoji,
      };
      this.toastArray.push(data);
    },

    removeOldestToast() {
      this.toastArray.splice(0, 1);
    },
  },

  watch: {
    emojiQuery(emojiQuery) {
      if (emojiQuery.length === 0) {
        this.empty = true;
      }
    },
  },

  components: {
    EmojiSearch,
    MyHeader,
    EmojiGridItem,
    MyFooter,
    MyToast,
    Loader,
    EmptyState,
    JButton,
  },
};
</script>
    EmptyState

<style lang="scss">
#app {
  font-family: "Ubuntu", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.emoji-search {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

.my-toast {
  animation: road-runner 1s ease-in-out both;
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
