<template>
  <div class="flex flex-col justify-center items-center">
    <my-header :o-title="copiedEmoji">
      <emoji-search
        class="mt-auto emoji-search md:w-6/12 w-full"
        :class="{
          'cursor-not-allowed': isLoading,
        }"
        :value="emojiQuery"
        @input="emojiQuery = $event.target.value"
        type="text"
        placeholder="Search emoji or press enter to get all emojis"
        :disabled="isLoading"
        @keyup.enter="searchEmoji"
      />
    </my-header>
    <!-- Body -->
    <div
      class="grid grid-cols-3 gap-4 sm:flex sm:flex-row sm:justify-between my-4 sm:mx-4"
    >
      <j-button
        v-for="cat in emojiCategories"
        :key="cat.key"
        :disabled="isLoading"
        :active="selectedCategory === cat.key"
        @click="
          () => {
            if (selectedCategory !== cat.key) fetchByCategory(cat.key);
          }
        "
      >
        {{ cat.icon }} {{ cat.label }}
      </j-button>
    </div>
    <div class="my-6">
      <div v-if="error" class="text-4xl">
        😥 Woops, looks like something went wrong. Please try again later
      </div>
      <template v-else>
        <empty-state v-if="empty" />
        <template v-else>
          <template v-if="!isLoading">
            <div
              v-if="this.emojiListFiltered.length"
              class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-8 grid-flow-row auto-cols-fr w-xl"
            >
              <div v-for="emoji in emojiListFiltered" :key="emoji.slug">
                <emoji-grid-item
                  class="emoji"
                  :data-clipboard-text="emoji.character"
                  :tooltip-text="emoji.unicodeName"
                  :emoji="emoji.character"
                />
              </div>
            </div>
            <div v-else class="text-gray-700 font-bold text-4xl">
              No emoji found for {{ badQuery }} 😞
            </div>
          </template>
          <div v-else>
            <div class="mb-6">
              <span class="text-4xl">Loading</span>
              <span class="AnimatedEllipsis text-4xl" />
            </div>
            <loader class="my-4">{{ copiedEmoji }}</loader>
          </div>
        </template>
      </template>
    </div>
    <my-footer />
    <my-toast v-for="toastData in toastArray" :key="toastData.id">
      {{ toastData.emoji }} copied!
    </my-toast>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
import MyFooter from "@/components/MyFooter.vue";
import MyToast from "@/components/MyToast.vue";
import EmojiSearch from "@/components/EmojiSearch.vue";
import EmojiGridItem from "@/components/EmojiGridItem.vue";
import Loader from "@/components/Loader.vue";
import JButton from "@/components/JButton.vue";
import EmptyState from "@/components/EmptyState.vue";

import EmojiApi from "@/services/emojiApi";

import { EmojiCategories } from "@/constants";

import ClipboardJS from "clipboard";
import { v4 as uuidv4 } from "uuid";

const emojiCategories = [
  {
    key: EmojiCategories.SMILEYS,
    label: "Smileys",
    icon: "😀",
  },
  {
    key: EmojiCategories.BODY,
    label: "Body",
    icon: "👁️",
  },
  {
    key: EmojiCategories.ANIMALS,
    label: "Nature",
    icon: "🐻",
  },
  {
    key: EmojiCategories.FOOD,
    label: "Food",
    icon: "🍔",
  },
  {
    key: EmojiCategories.ACTIVITIES,
    label: "Activites",
    icon: "⚽",
  },
  {
    key: EmojiCategories.TRAVEL,
    label: "Travel",
    icon: "✈️",
  },
  {
    key: EmojiCategories.OBJECTS,
    label: "Objects",
    icon: "💡",
  },
  {
    key: EmojiCategories.SYMBOLS,
    label: "Symbols",
    icon: "🔣",
  },
  {
    key: EmojiCategories.FLAGS,
    label: "Flags",
    icon: "🏁",
  },
];

export default {
  name: "App",

  data() {
    return {
      copiedEmoji: "😂",
      emojiQuery: "",
      badQuery: "",

      emojiList: [],
      toastArray: [],

      selectedCategory: null,

      isLoading: false,
      empty: false,
      error: false,
    };
  },

  async created() {
    this.emojiCategories = emojiCategories;
    var clipboard = new ClipboardJS(".emoji");

    clipboard.on("success", (e) => {
      this.copiedEmoji = e.text;
      this.addToast();
      setTimeout(() => this.removeOldestToast(), 2000);
    });

    // fetch all emojis
    await this.searchEmoji();
  },

  computed: {
    /**
     * The open emoji api returns duplicates emojis with a e[number]-[number] prefix
     *
     * @returns {array}
     */
    emojiListFiltered() {
      if (!this.emojiList || this.emojiList.length === 0) return [];
      const r = new RegExp(/e\d+-\d+/);
      return this.emojiList.filter((emoji) => !r.test(emoji.slug));
    },
  },

  methods: {
    /**
     * Fetch all emojis in a category
     *
     * @param {string} category
     */
    async fetchByCategory(category) {
      this.selectedCategory = null;
      this.empty = false;
      this.emojiQuery = "";

      this.isLoading = true;
      const { searchResults, error } = await EmojiApi.fetchEmojiByCategory(
        category
      );
      if (!error) {
        this.emojiList = searchResults;
        this.selectedCategory = category;
      } else {
        this.error = true;
      }
      this.isLoading = false;
    },

    // good place to use a decorator, but had an parse error
    async searchEmoji() {
      this.empty = false;
      this.selectedCategory = null;
      this.isLoading = true;

      const { searchResults, error } = await EmojiApi.searchEmoji(
        this.emojiQuery.trim()
      );

      if (!error) {
        this.emojiList = searchResults;
        if (!searchResults) this.emojiList = [];
        else this.emojiList = searchResults;

        if (this.emojiListFiltered.length === 0)
          this.badQuery = this.emojiQuery;
      } else {
        this.error = true;
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
      if (emojiQuery.length === 0 && this.emojiList.length === 0) {
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

<style lang="scss">
#app {
  font-family: "Ubuntu", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
