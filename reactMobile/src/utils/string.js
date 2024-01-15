import normalize from 'react-native-normalize'

export function shortenText(text, maxLength = 20) {
    if (text.length > maxLength) {
        return `${text.substring(0, maxLength)}...`
    }
    return text
}

export function determineFontSize(name, fontSize) {
    if (name) {
        return name.length < 15 ? normalize(fontSize) : normalize(23)
    }
    return normalize(18)
}
