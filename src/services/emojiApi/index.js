import axios from 'axios'

const openEmojiApiEndpoint = 'https://emoji-api.com'
const accessKey = { access_key: '54cfe8cb88b822271cdc7ebc739ac5ce6c876985' }

const emojisEndpoint = new URL('emojis', openEmojiApiEndpoint).href
const categoriesEndpoint = new URL('categories', openEmojiApiEndpoint).href

function EmojiApi() { }

/**
 * @typedef {object} fetchAllEmojisResponse
 * @property {array} allEmojis
 * @property {error} error
 *
 * @returns {fetchAllEmojisResponse}
 */
EmojiApi.prototype.fetchAllEmojis = async function () {
    const params = accessKey
    try {
        const { data: allEmojis } = await axios.get(emojisEndpoint, { params });
        return { allEmojis, error: null }
    } catch (error) {
        return { allEmojis: null, error }
    }
}

/**
 * @typedef {object} searchEmojiResponse
 * @property {array} searchResults
 * @property {error} error
 *
 * @returns {searchEmojiResponse}
 */
EmojiApi.prototype.searchEmoji = async function (query) {
    const params = {
        search: query,
        ...accessKey
    }
    try {
        const { data: searchResults } = await axios.get(emojisEndpoint, { params })
        return { searchResults, error: null }
    } catch (error) {
        return { searchResult: null, error }
    }
}

/**
 * @typedef {object} fetchEmojiByCategoryResponse
 * @property {array} searchResults
 * @property {error} error
 *
 * @returns {fetchEmojiByCategoryResponse}
 */
EmojiApi.prototype.fetchEmojiByCategory = async function (category) {
    const params = {
        ...accessKey
    }

    const singleCategory = categoriesEndpoint + '/' + category
    try {
        const { data: searchResults } = await axios.get(singleCategory, { params })
        return { searchResults, error: null }
    } catch (error) {
        return { searchResults: null, error }
    }
}

export default new EmojiApi()