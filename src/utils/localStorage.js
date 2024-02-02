function getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

function setToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}

export { getFromLocalStorage, setToLocalStorage, removeFromLocalStorage };