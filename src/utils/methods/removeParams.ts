export const removeParams = (url: string): string => {
    const index = url.indexOf('?')

    if (index !== -1) return url.substring(0, url.indexOf('?'))
    return url
}