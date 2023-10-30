const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");

let sets = [];

function initialize() {
    return new Promise((resolve) => {
        sets = setData.map(set => {

            const theme = themeData.find(theme => theme.id === set.theme_id);
            return {
                ...set,
                theme: theme ? theme.name : 'Unknown', 
            };
        });
        resolve(); 
    });
}

function getAllSets() {
    return new Promise((resolve) => {
        resolve(sets); 
    });
}

function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        const foundSet = sets.find(set => set.set_num === setNum);
        if (foundSet) {
            resolve(foundSet);
        } else {
            reject(`Unable to find set with set number: ${setNum}`); 
        }
    });
}

function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        const lowercaseTheme = theme.toLowerCase();
        const filteredSets = sets.filter(set => set.theme.toLowerCase().includes(lowercaseTheme));
        if (filteredSets.length > 0) {
            resolve(filteredSets); 
        } else {
            reject(`Unable to find sets with theme: ${theme}`); 
        }
    });
}


module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
