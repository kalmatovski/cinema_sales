export const setItem = (data) => {
    localStorage.setItem('USERNAME', data.username)
    localStorage.setItem('PASSWORD', data.password)
}

export const setKeyword = (key) => {
    localStorage.setItem("ADMINKEY", key)
}

export const userCheck = () => {
    const username = localStorage.getItem("USERNAME")
    const password = localStorage.getItem("PASSWORD")
    if (username && password) {
        return true
    }
    return false
}


export const adminCheck = () => {
    const keyWord = localStorage.getItem("ADMINKEY")
    return keyWord
}