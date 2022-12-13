import {uiAPI} from "./uiAPI";

const disableVisualsCurrentPage = document.getElementById('disableVisualsCurrentPage');
const disableVisualsCurrentDomain = document.getElementById('disableVisualsCurrentDomain');
const disableVisualsGlobal = document.getElementById('disableVisualsGlobal');
const openOptions = document.getElementById('openOptions');
const addHotkey = document.getElementById('addHotkey');
console.log(addHotkey)
disableVisualsCurrentPage?.addEventListener('click', () => {
    // Handle the click event here
});

disableVisualsCurrentDomain?.addEventListener('click', () => {
    // Handle the click event here
});

disableVisualsGlobal?.addEventListener('click', () => {
    // Handle the click event here
});

openOptions?.addEventListener('click', () => {
    // Handle the click event here
});

addHotkey?.addEventListener('click', async () => {
    await uiAPI.elemetPicker.pickElement();
});