export function shortenText(text, maxLength = 20) {
    if (text.length > maxLength) {
        return `${text.substring(0, maxLength)}...`
    }
    return text
}
