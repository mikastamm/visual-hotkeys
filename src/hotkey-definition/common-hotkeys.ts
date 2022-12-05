import {Keystroke} from "./keystroke";

export enum CommonHotkeys{
    OPEN_SETTINGS = "open-settings",
    GOTO_HOME = "goto-home",
    SEARCH = "search",
    NEXT_PAGE = "next-page",
    PREVIOUS_PAGE = "previous-page",
}

const commonHotkeyKeystrokes = {
    "fuzzy-search": [Keystroke.fromString("alt+p")],
    "open-settings": [Keystroke.fromString("alt+ctrl+o")],
    "goto-home": [Keystroke.fromString("alt+s")],
    "search": [Keystroke.fromString("alt+ctrl+s")],
    "next-page": [Keystroke.fromString("alt+ctrl+n")],
    "previous-page": [Keystroke.fromString("alt+ctrl+p")]
};
export function resolveCommonHotkeyKeystroke(hotkey:CommonHotkeys|undefined):Keystroke[]{
        var preset = commonHotkeyKeystrokes[hotkey];
        preset.forEach(keystroke=>keystroke.preset = hotkey);
        return preset;
}