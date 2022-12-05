import {codeToKey, keyToCode} from "../util/keyboard";
import {CommonHotkeys, resolveCommonHotkeyKeystroke} from "./common-hotkeys";
import {IOnPageHotkey} from "./on-page-hotkeys";

export interface IPageShortcuts {
    url: string;
    hotkeys: IShortcutDefinition[];
};



export interface IShortcutDefinition {
    _name: string;
    keystrokes: IKeystrokeCombination;
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

export interface IKeystroke {
    key: string | undefined;
    code: string | undefined;

    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
    //Wether to assign a number for each element on the page
    indexed: boolean;
    preset?: CommonHotkeys;
}

export interface IKeystrokeCombination{
    preset?:CommonHotkeys;
    // Define a private property '_myProp'
    keys: IKeystroke[];
}

