import {ShortcutDefinition, InjectionTypes, KeystrokeCombination} from "./hotkeys-definition";
import {Keystroke} from "./keystroke";



export type OnPageHotkey = {
    _name: string;
    keystrokes: KeystrokeCombination;
    displayElement: Element;
    clickElement: Element;
    injectionType: InjectionTypes;
}


