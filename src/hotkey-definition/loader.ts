import {browser} from "webextension-polyfill-ts";
import {IShortcutDefinition, IPageShortcuts} from "./hotkeys-definition-interfaces";
import {resolveHotkeys} from "./hotkey-resolver";
import {OnPageHotkey} from "./on-page-hotkeys";
import {PageShortcuts} from "./hotkey-definition-classes";

export async function getHotkeysForPage(url):Promise<OnPageHotkey[]>{
    var hks = await loadShortcutForPage(url);
    return resolveHotkeys(hks);
}

async function loadShortcut(){
    let response = await fetch(browser.runtime.getURL("hotkey-definition/hotkeys.json"));
    return await response.json();
}

async function loadShortcutForPage(pageUrl):Promise<IPageShortcuts>{
    var pageHotkeySets= await loadShortcut();
    for(var i=0; i<pageHotkeySets.length; i++){
        if(new RegExp(pageHotkeySets[i].url).test(pageUrl)){
            return PageShortcuts.FromJson(pageHotkeySets[i]);
        }
    }
    return new PageShortcuts();
}

