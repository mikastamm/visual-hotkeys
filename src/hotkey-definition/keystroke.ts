import {codeToKey, keyToCode} from "../util/keyboard";
import {CommonHotkeys} from "./common-hotkeys";

export class Keystroke {
    key: string | undefined;
    code: string | undefined;

    readonly altKey: boolean;
    readonly ctrlKey: boolean;
    readonly metaKey: boolean;
    readonly shiftKey: boolean;
    //Wether to assign a number for each element on the page
    readonly indexed: boolean;
    preset?: CommonHotkeys;
    constructor(key: string | undefined, code: string | undefined, altKey: boolean, ctrlKey: boolean, metaKey: boolean, shiftKey: boolean, indexed: boolean) {
        this.key = key;
        this.code = code;
        this.altKey = altKey;
        this.ctrlKey = ctrlKey;
        this.metaKey = metaKey;
        this.shiftKey = shiftKey;
        this.indexed = indexed;
    }

    public static FromKey(key: string, altKey: boolean, ctrlKey: boolean, metaKey: boolean, shiftKey: boolean, indexed: boolean) {
        return new Keystroke(key, keyToCode(key), altKey, ctrlKey, metaKey, shiftKey,   indexed);
    }

    static FromCode(code: string, altKey: boolean, ctrlKey: boolean, metaKey: boolean, shiftKey: boolean, indexed: boolean) {
        return new Keystroke(codeToKey(code), code, altKey, ctrlKey, metaKey, shiftKey, indexed);
    }

    public static fromString(keyCombination: string): Keystroke {
        console.log(keyCombination);

        // Split the key combination string into an array of individual keys
        let keys = keyCombination.split('+');

        // Define the initial values for the key, code, altKey, ctrlKey, metaKey, and shiftKey properties
        let key: string | undefined;
        let code: string | undefined;

        let altKey = false;
        let ctrlKey = false;
        let metaKey = false;
        let shiftKey = false;
        let indexed = false;

        // Loop through the keys in the key combination
        for (const k of keys) {
            // If the key is "alt", set the altKey property to true
            if (k.toLowerCase() === 'alt') {
                altKey = true;
            }
            // If the key is "ctrl" or "control", set the ctrlKey property to true
            else if (k.toLowerCase() === 'ctrl' || k.toLowerCase() === 'control') {
                ctrlKey = true;
            }
            // If the key is "meta", set the metaKey property to true
            else if (k.toLowerCase() === 'meta') {
                metaKey = true;
            }
            // If the key is "shift", set the shiftKey property to true
            else if (k.toLowerCase() === 'shift') {
                shiftKey = true;
            }
            else if(k.toLowerCase() === 'index'){
                indexed = true;
            }
            // Otherwise, the key is a regular key, so set the key and code properties
            else {
                key = k;
                code = keyToCode(k);
            }
        }

        // Return a new Keystroke object with the values obtained from the key combination string
        var res = new Keystroke(key, code, altKey, ctrlKey, metaKey, shiftKey, indexed);
        console.log(res)
        return res;
    }

}