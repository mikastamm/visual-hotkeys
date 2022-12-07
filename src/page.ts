import * as hotkeyLoader from './hotkey-definition/loader';
import {browser} from "webextension-polyfill-ts";
import {getHotkeysForPage} from "./hotkey-definition/loader";
import {injectKeyHtmlObject, respondVisuallyToHotkeys} from "./visual/visual-key-injector";
import {registerKeyListeners} from "./key-listener";
import {respondFunctionallyToHotkeyPresses} from "./hotkey-execution/hotkey-execution";
var hotkeys = await getHotkeysForPage(window.location.href);
for(var i=0; i<hotkeys.length; i++){
    registerKeyListeners(hotkeys[i]);
    injectKeyHtmlObject(hotkeys[i]);
}
respondVisuallyToHotkeys();
respondFunctionallyToHotkeyPresses();

