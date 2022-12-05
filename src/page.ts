import * as hotkeyLoader from './hotkey-definition/loader';
import {browser} from "webextension-polyfill-ts";
import {getHotkeysForPage} from "./hotkey-definition/loader";
import {injectKeyHtmlObject} from "./visual/visual-key-injector";
var hotkeys = await getHotkeysForPage(window.location.href);
for(var i=0; i<hotkeys.length; i++){
    injectKeyHtmlObject(hotkeys[i]);
}
console.log(hotkeys);
