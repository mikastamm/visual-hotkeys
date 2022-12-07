import {IOnPageHotkey} from "../hotkey-definition/on-page-hotkeys";


export interface IHotkeyExecutor {
    execute(hotkey:IOnPageHotkey): void;
}

export interface ILinkExecutor extends IHotkeyExecutor {
    execute(hotkey:IOnPageHotkey): void;
    executeNewTab(hotkey:IOnPageHotkey): void;
}

export class LinkExecutor implements ILinkExecutor {
    execute(hotkey:IOnPageHotkey): void {
        hotkey.clickElement?.click();
    }
    executeNewTab(hotkey:IOnPageHotkey): void {
        hotkey.clickElement?.dispatchEvent(new MouseEvent("auxclick", {
            button: 1,
        }));
    }
}

export const hotkeyExecutor:IHotkeyExecutor = new LinkExecutor();
