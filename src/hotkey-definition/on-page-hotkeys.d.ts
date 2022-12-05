import {Keystroke, KeystrokeCombination} from "./hotkey-definition-classes";
import {IKeystrokeCombination, InjectionTypes} from "./hotkeys-definition-interfaces";



export interface IOnPageHotkey {
    _name: string;
    keystrokes: IKeystrokeCombination;
    //The element of the original page, to which the visual hotkey is attached
    displayElementContainer: Element;
    //The visual aid element, showing what hotkey is assigned to the element its attached to
    displayElement?: Element;
    //The element of the original page, which is clicked when the hotkey is pressed
    clickElement: Element;
    //Where to inject the visual hotkey
    injectionType: InjectionTypes;
}

export class OnPageHotkey implements IOnPageHotkey{
    _name: string;
    clickElement: Element;
    displayElementContainer: Element;
    injectionType: InjectionTypes;
    keystrokes: IKeystrokeCombination;
    displayElement?: Element;

}