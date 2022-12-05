import {Keystroke} from "./hotkey-definition-classes";

export enum CommonHotkeys{
    OPEN_SETTINGS = "open-settings",
    GOTO_HOME = "goto-home",
    SEARCH = "search",
    NEXT_PAGE = "next-page",
    PREVIOUS_PAGE = "previous-page",
}


export function resolveCommonHotkeyKeystroke(hotkey:CommonHotkeys|undefined):Keystroke[]{
    const commonHotkeyKeystrokes = {
        "fuzzy-search": [Keystroke.fromString("alt+p")],
        "open-settings": [Keystroke.fromString("alt+ctrl+o")],
        "goto-home": [Keystroke.fromString("alt+s")],
        "search": [Keystroke.fromString("alt+ctrl+s")],
        "next-page": [Keystroke.fromString("alt+ctrl+n")],
        "previous-page": [Keystroke.fromString("alt+ctrl+p")]
    };
        var preset = commonHotkeyKeystrokes[hotkey as CommonHotkeys];
        preset.forEach(keystroke=>keystroke.preset = hotkey);
        return preset;
}