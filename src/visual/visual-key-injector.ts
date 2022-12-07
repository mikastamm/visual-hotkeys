import {IOnPageHotkey} from "../hotkey-definition/on-page-hotkeys";
import {InjectionTypes} from "../hotkey-definition/hotkeys-definition-types";
import {HOTKEY_DOWN, HOTKEY_UP} from "../key-listener";

export function injectKeyHtmlObject(target: IOnPageHotkey) {

    // Create the HTML element for the hotkey
    const hotkeyElement = document.createElement("div");
    target.displayElement = hotkeyElement;
    hotkeyElement.classList.add("vishk-key")
    hotkeyElement.classList.add("vishk-key-hidden");
    hotkeyElement.innerText = target.keystrokes.keystrokes
        .map(keystroke => keystroke.codes.join("+"))
        .join(", ");

    placeVisualKey(target, hotkeyElement);
    setTimeout(() => {
        hotkeyElement.classList.remove("vishk-key-hidden");

    }, 1);
}

function placeVisualKey(target: IOnPageHotkey, hotkeyElement: HTMLDivElement) {
    if(!target.displayElementContainer)
        return;
    // Insert the hotkey element at the appropriate location
    switch (target.injectionType) {
        case InjectionTypes.inlineBefore:
            target.displayElementContainer.prepend(hotkeyElement);
            break;
        case InjectionTypes.inlineAfter:
            target.displayElementContainer.append(hotkeyElement);
            break;
        case InjectionTypes.absoluteBefore:
            hotkeyElement.classList.add("vishk-key-before");
            target.displayElementContainer.prepend(hotkeyElement);
            break;
        case InjectionTypes.absoluteAfter:
            hotkeyElement.classList.add("vishk-key-after");
            target.displayElementContainer.prepend(hotkeyElement);
            break;
        default:
            // Handle invalid injectionType
            break;
    }
}

export function respondVisuallyToHotkeys() {

    // @ts-ignore
    window.addEventListener(HOTKEY_DOWN, (event: CustomEvent) => {
        let hotkey = event.detail as IOnPageHotkey;
        hotkey.displayElement?.classList.add("vishk-key-active");
    });
    // @ts-ignore
    window.addEventListener(HOTKEY_UP, (event: CustomEvent) => {
        let hotkey = event.detail as IOnPageHotkey;
        hotkey.displayElement?.classList.remove("vishk-key-active");
    });
}