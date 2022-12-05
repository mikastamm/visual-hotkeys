import {codeToKey, keyToCode} from "../util/keyboard";
import {CommonHotkeys, resolveCommonHotkeyKeystroke} from "./common-hotkeys";
import {Keystroke} from "./keystroke";

export type Hotkey = {
    targets: ShortcutDefinition[];
};

export type ShortcutDefinition = {
    _name: string;
    keystrokes: KeystrokeCombination;
    displayXpath: string;
    // The xpath to the element that should be clicked when the hotkey is pressed
    // This is executed relative to the displayXpath
    clickXpath: string;
    injectionType: InjectionTypes;
}

export enum InjectionTypes {
    inlineBefore = "inlineBefore",
    inlineAfter = "inlineAfter",
    absoluteBefore = "absoluteBefore",
    absoluteAfter = "absoluteAfter"
}

export type PageShortcut = {
    url: string;
    hotkeys: ShortcutDefinition[];
};

export class KeystrokeCombination{
    preset?:CommonHotkeys;
    // Define a private property '_myProp'
    private _keys?: Keystroke[];

    // Define a getter for the 'myProp' property
    get keys(): Keystroke[] {
        return this._keys || resolveCommonHotkeyKeystroke(this.preset);
    }

    // Define a setter for the 'myProp' property
    set keys(value: Keystroke[]) {
        this._keys = value;
    }
}


