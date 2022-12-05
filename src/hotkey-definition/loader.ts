import {browser} from "webextension-polyfill-ts";
import {ShortcutDefinition, PageShortcut} from "./hotkeys-definition";
import {resolveHotkeys} from "./hotkey-resolver";
import {OnPageHotkey} from "./on-page-hotkeys";

export async function getHotkeysForPage(url):Promise<OnPageHotkey[]>{
    var hks = await loadShortcutForPage(url);
    return resolveHotkeys(hks);
}

async function loadShortcut(){
    let response = await fetch(browser.runtime.getURL("hotkey-definition/hotkeys.json"));
    return await response.json();
}

async function loadShortcutForPage(pageUrl):Promise<PageShortcut>{
    var hotkeys= await loadShortcut();
    for(var i=0;i<hotkeys.length;i++){
        if(new RegExp(hotkeys[i].url).test(pageUrl)){
            return hotkeys[i];
        }
    }
    return {url:pageUrl, hotkeys:[]};
}

