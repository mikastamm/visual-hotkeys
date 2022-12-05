import {IOnPageHotkey} from "../hotkey-definition/on-page-hotkeys";
import {InjectionTypes} from "../hotkey-definition/hotkeys-definition-interfaces";

export function injectKeyHtmlObject(target: IOnPageHotkey) {

    // Create the HTML element for the hotkey
    const hotkeyElement = document.createElement("div");
    hotkeyElement.classList.add("vishk-key");
    hotkeyElement.innerText = target.keystrokes.keys
        .map(keystroke => keystroke.key || keystroke.code)
        .join(", ");

    // Insert the hotkey element at the appropriate location
    switch (target.injectionType) {
        case InjectionTypes.inlineBefore:
            target.displayElement.prepend(hotkeyElement);
            break;
        case InjectionTypes.inlineAfter:
            target.displayElement.append(hotkeyElement);
            break;
        case InjectionTypes.absoluteBefore:
            hotkeyElement.classList.add("vishk-key-before");
            target.displayElement.prepend(hotkeyElement);
            break;
        case InjectionTypes.absoluteAfter:
            hotkeyElement.classList.add("vishk-key-after");
            target.displayElement.prepend(hotkeyElement);
            break;
        default:
            // Handle invalid injectionType
            break;
    }
}

