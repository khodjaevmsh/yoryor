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

export function formatPhoneNumber(phoneNumber) {
    // Check if the input is a valid phone number with 12 or 13 digits
    // eslint-disable-next-line no-restricted-globals
    if ((phoneNumber.length !== 12 && phoneNumber.length !== 13) || isNaN(phoneNumber)) {
        return 'Invalid phone number'
    }

    // Extract parts of the phone number
    const countryCode = phoneNumber.slice(0, 3)
    let part1; let part2; let part3; let
        part4

    if (phoneNumber.length === 12) {
        part1 = phoneNumber.slice(3, 5)
        part2 = phoneNumber.slice(5, 8)
        part3 = phoneNumber.slice(8, 10)
        part4 = phoneNumber.slice(10, 12)
    } else {
        part1 = phoneNumber.slice(3, 6)
        part2 = phoneNumber.slice(6, 9)
        part3 = phoneNumber.slice(9, 11)
        part4 = phoneNumber.slice(11, 13)
    }

    // Format the phone number
    return `${countryCode} (${part1}) ${part2} ${part3} ${part4}`
}
