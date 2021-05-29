import axios from 'axios'

const openEmojiApiEndpoint = 'https://emoji-api.com'

function EmojiApi() {
    this.accessKey = '54cfe8cb88b822271cdc7ebc739ac5ce6c876985'
}

EmojiApi.prototype.fetchAllEmojis = async function () {
    const emojiUrl = new URL('emojis', openEmojiApiEndpoint)
    const params = {
        access_key: this.accessKey
    }
    await axios.get(emojiUrl.href, { params });
}

export default new EmojiApi()