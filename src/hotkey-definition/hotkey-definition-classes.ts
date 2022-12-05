import {CommonHotkeys, resolveCommonHotkeyKeystroke} from "./common-hotkeys";
import {codeToKey, keyToCode} from "../util/keyboard";
import {
    IKeystroke,
    IKeystrokeCombination, InjectionTypes,
    IPageShortcuts,
    IShortcutDefinition
} from "./hotkeys-definition-interfaces";

export class PageShortcuts implements IPageShortcuts{
    url: string = "";
    hotkeys: IShortcutDefinition[] = [];
    constructor() {
    }
    public static FromJson(json:any):PageShortcuts {
       return Object.assign(new PageShortcuts(), json);
    }
};



export class ShortcutDefinition implements IShortcutDefinition{
    _name: string ="";
    keystrokes: IKeystrokeCombination = new KeystrokeCombination();
    displayXpath: string ="";
    // The xpath to the element that should be clicked when the hotkey is pressed
    // This is executed relative to the displayXpath
    clickXpath: string ="";
    injectionType: InjectionTypes = InjectionTypes.inlineBefore;
}






export class Keystroke implements IKeystroke{
    key: string | undefined;
    code: string | undefined;

    altKey: boolean =false;
    ctrlKey: boolean = false;
    metaKey: boolean = false;
    shiftKey: boolean =false;
    //Wether to assign a number for each element on the page
    indexed: boolean = false;
    preset?: CommonHotkeys;




    public static fromString(keyCombination: string): Keystroke {
        var res = new Keystroke();

        // Split the key combination string into an array of individual keys\
        let keys = keyCombination.split('+');



        // Loop through the keys in the key combination
        for (const k of keys) {
            // If the key is "alt", set the altKey property to true
            if (k.toLowerCase() === 'alt') {
                res.altKey = true;
            }
            // If the key is "ctrl" or "control", set the ctrlKey property to true
            else if (k.toLowerCase() === 'ctrl' || k.toLowerCase() === 'control') {
                res.ctrlKey = true;
            }
            // If the key is "meta", set the metaKey property to true
            else if (k.toLowerCase() === 'meta') {
                res.metaKey = true;
            }
            // If the key is "shift", set the shiftKey property to true
            else if (k.toLowerCase() === 'shift') {
                res.shiftKey = true;
            }
            else if(k.toLowerCase() === 'index'){
                res.indexed = true;
            }
            // Otherwise, the key is a regular key, so set the key and code properties
            else {
                res.key = k;
                res.code = keyToCode(k);
            }
        }

        // Return a new HotkeyDefinitionClasses object with the values obtained from the key combination string
        return res;
    }

}

export class KeystrokeCombination implements IKeystrokeCombination{
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


