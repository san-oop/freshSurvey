// GET FROM LOCAL STORAGE
const getCurrentPage = () => Number(localStorage.getItem('page'));
const getAnswers = () => JSON.parse(localStorage.getItem('answers'));

// SET LOCAL STORAGE
const setCurrentPage = (page) => localStorage.setItem('page', page);
const setAnswers = (data) => localStorage.setItem('answers',
    JSON.stringify(data));

// Clear All Data
const clearAppData = () => {
    removeItemFromStorage('page');
    removeItemFromStorage('answers');
};

// Remove items from local storage
const removeItemFromStorage = (key) => localStorage.removeItem(key);

export {
    getCurrentPage,
    getAnswers,
    setCurrentPage,
    setAnswers,
    clearAppData,
    removeItemFromStorage
}