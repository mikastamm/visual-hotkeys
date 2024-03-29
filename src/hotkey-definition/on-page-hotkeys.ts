import {IKeystroke, InjectionTypes, Keystroke} from "./hotkeys-definition-types";


export interface IOnPageHotkey {
    _name?: string;
    keystrokes: KeystrokeCombinations;
    //The element of the original page, to which the visual hotkey is attached
    displayElementContainer?: HTMLElement;
    //The visual aid element, showing what hotkey is assigned to the element its attached to
    displayElement?: HTMLElement;
    //The element of the original page, which is clicked when the hotkey is pressed
    clickElement?: HTMLElement;
    //Where to inject the visual hotkey
    injectionType: InjectionTypes;
}

export class OnPageHotkey implements IOnPageHotkey{
    _name?: string;
    clickElement?: HTMLElement;
    displayElementContainer?: HTMLElement;
    injectionType: InjectionTypes = InjectionTypes.inlineBefore;
    keystrokes: KeystrokeCombinations = new KeystrokeCombinations([]);
    displayElement?: HTMLElement;
    constructor(init?: Partial<IOnPageHotkey>) {
        Object.assign(this, init);
    }

}
export class KeystrokeCombinations {
    keystrokes: IKeystroke[];
    partOfSequence: boolean =false;

    constructor(keystrokes: IKeystroke[])
    {
        this.keystrokes = keystrokes;

    }
}
