export const setItemInStorage = (key, value) => {
    localStorage.setItem(key, value);
}
export const getItemFromStorage = (key) => {
    localStorage.getItem(key);
}
export const removeItemFromStorage = (key) => {
    localStorage.removeItem(key);
}