import {Keystroke, KeystrokeCombination} from "./hotkey-definition-classes";
import {IKeystrokeCombination, InjectionTypes} from "./hotkeys-definition-interfaces";



export interface IOnPageHotkey {
    _name: string;
    keystrokes: IKeystrokeCombination;
    displayElement: Element;
    clickElement: Element;
    injectionType: InjectionTypes;
}

export class OnPageHotkey implements IOnPageHotkey{
    _name: string;
    clickElement: Element;
    displayElement: Element;
    injectionType: InjectionTypes;
    keystrokes: IKeystrokeCombination;

}