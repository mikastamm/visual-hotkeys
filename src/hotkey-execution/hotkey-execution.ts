import {IOnPageHotkey} from "../hotkey-definition/on-page-hotkeys";
import {HOTKEY_DOWN, HOTKEY_UP} from "../key-listener";
import htmlInputs from "rollup-plugin-chrome-extension/types/src/html-inputs";
import {hotkeyExecutor, ILinkExecutor} from "./hotkey-executor";
import {hkAPI} from "../frontend/hkAPI";

export function respondFunctionallyToHotkeyPresses() {

        // @ts-ignore
        window.addEventListener(HOTKEY_DOWN, (event: CustomEvent) => {

        });
        // @ts-ignore
        window.addEventListener(HOTKEY_UP, (event: CustomEvent) => {
            let hotkey = event.detail as IOnPageHotkey;
            if (hkAPI.content.keyStateTracker.isKeyPressed("AltRight"))
                (hotkeyExecutor as ILinkExecutor)?.executeNewTab(hotkey);
                else
                hotkeyExecutor.execute(hotkey);

        });

}