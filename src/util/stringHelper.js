export const firstLetterUppercase = (str) => {
    let tempStr = ''
    if (str) {
        tempStr += str[0].toUpperCase()
        tempStr += str.substring(1, str.length)
    }
    return tempStr
}
