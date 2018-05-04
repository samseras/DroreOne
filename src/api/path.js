const baseUrlContentRoot = 'v1'
function getUrl (url) {
    return `/${baseUrlContentRoot}${url}`
}

export { getUrl }
