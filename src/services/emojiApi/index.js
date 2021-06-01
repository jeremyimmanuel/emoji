import axios from 'axios'

const openEmojiApiEndpoint = 'https://emoji-api.com'
const accessKey = { access_key: '54cfe8cb88b822271cdc7ebc739ac5ce6c876985' }

function EmojiApi() { }

EmojiApi.prototype.fetchAllEmojis = async function () {
    const emojiUrl = new URL('emojis', openEmojiApiEndpoint)
    const params = accessKey
    try {
        const { data: allEmojis } = await axios.get(emojiUrl.href, { params });
        return { allEmojis, error: null }
    } catch (error) {
        return { allEmojis: null, error }
    }
}

EmojiApi.prototype.searchEmoji = async function (query) {
    const emojiUrl = new URL('emojis', openEmojiApiEndpoint)
    const params = {
        search: query,
        ...accessKey
    }
    try {
        const { data: searchResults } = await axios.get(emojiUrl.href, { params })
        return { searchResults, error: null }
    } catch (error) {
        return { searchResult: null, error }
    }
}

export default new EmojiApi()