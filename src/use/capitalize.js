export default function useCapitalize() {
    function capitalize(text) {
        return text.replace(/^\w/, (s) => s.toUpperCase());
    }
    return { capitalize }
}
