import * as hotkeyLoader from './hotkey-definition/loader';
import {browser} from "webextension-polyfill-ts";
import {getHotkeysForPage} from "./hotkey-definition/loader";
var hotkeys = await getHotkeysForPage(window.location.href);
console.log(hotkeys);
