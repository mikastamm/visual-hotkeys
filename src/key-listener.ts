import {IOnPageHotkey} from "./hotkey-definition/on-page-hotkeys";
import {keyTracker} from "./util/keystate-tracker";

export const HOTKEY_DOWN = "vishk-keydown";
export const HOTKEY_UP = "vishk-keyup";

export var ignoreList = ["AltRight"]

export function registerKeyListeners(hotkey: IOnPageHotkey) {
    window.addEventListener("keyup", (event) => {
        for (var j = 0; j < hotkey.keystrokes.keys.length; j++) {
            keyTracker.trackKeyUp(event);
            if (hotkey.keystrokes.keys[j].equals(event)) {
                if (hotkeysEnabled())
                    window.dispatchEvent(new CustomEvent(HOTKEY_UP, {detail: hotkey}));
            }
        }
    });
    window.addEventListener("keydown", (event) => {
        for (var j = 0; j < hotkey.keystrokes.keys.length; j++) {
            keyTracker.trackKeyDown(event);
            if (hotkey.keystrokes.keys[j].equals(event)) {
                if (hotkeysEnabled())
                    window.dispatchEvent(new CustomEvent(HOTKEY_DOWN, {detail: hotkey}));
            }
        }
    });
}


function hotkeysEnabled(): boolean {
    if (document.activeElement instanceof HTMLInputElement) {
        return false;
    }
    return true;
}