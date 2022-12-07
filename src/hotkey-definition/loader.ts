import {browser} from "webextension-polyfill-ts";
import {IShortcutDefinition, IPageShortcuts, PageShortcuts} from "./hotkeys-definition-types";
import {OnPageHotkey} from "./on-page-hotkeys";
import {onPageHotkeyFactory} from "./on-page-hotkey-loader";


export async function getHotkeysForPage(url):Promise<OnPageHotkey[]>{
    var hks = await loadShortcutForPage(url);
    return hks.hotkeys.flatMap(hk=> onPageHotkeyFactory.create(hk));
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

