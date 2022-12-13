import {browser, Runtime} from "webextension-polyfill-ts";
import MessageSender = Runtime.MessageSender;

browser.runtime.onMessage.addListener((message, sender) => {
handleMessage(message, sender);
});

function handleMessage(message:any, sender:MessageSender){
    console.log("Message from the content script:");
    console.log(message);
    if(message.type == "newHotkey") {
        browser.runtime.sendMessage("Open item picker please");
    }
}