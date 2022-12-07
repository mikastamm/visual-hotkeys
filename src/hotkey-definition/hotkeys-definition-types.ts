import {CommonHotkeys} from "./common-hotkey-resolver";

export interface IPageShortcuts {
    url: string;
    hotkeys: IShortcutDefinition[];
};

export class PageShortcuts implements IPageShortcuts {
    url: string = "";
    hotkeys: ShortcutDefinition[] = [];

    constructor() {
    }

    public static FromJson(json: any): PageShortcuts {
        return Object.assign(new PageShortcuts(), json);
    }
};

/**************************************************/

export interface IShortcutDefinition {
    _name: string;
    keystrokes: IKeystrokeCombinationDefinition;
    displayXpath: string;
    // The xpath to the element that should be clicked when the hotkey is pressed
    // This is executed relative to the displayXpath
    clickXpath: string;
    injectionType: InjectionTypes;
}

export class ShortcutDefinition implements IShortcutDefinition {
    _name: string = "";
    keystrokes: KeystrokeCombinationDefinition = new KeystrokeCombinationDefinition();
    displayXpath: string = "";
    // The xpath to the element that should be clicked when the hotkey is pressed
    // This is executed relative to the displayXpath
    clickXpath: string = "";
    injectionType: InjectionTypes = InjectionTypes.inlineBefore;
}


/**************************************************/

export enum InjectionTypes {
    inlineBefore = "inlineBefore",
    inlineAfter = "inlineAfter",
    absoluteBefore = "absoluteBefore",
    absoluteAfter = "absoluteAfter"
}

/**************************************************/

export interface IKeystroke {
    codes: string[];
}

export class Keystroke implements IKeystroke {
    codes: string[] = [];

    constructor(codes: string[] = []) {
        this.codes = codes;
    }

    equals(event: KeyboardEvent) {
        return this.codes.includes(event.code)
            && this.codes.includes("AltLeft") === event.altKey
            && this.codes.includes("AltLeft") === event.ctrlKey
            && this.codes.includes("AltLeft") === event.metaKey
            && this.codes.includes("AltLeft") === event.shiftKey;
    }
}

/**************************************************/
export interface IKeystrokeCombinationDefinition {
    preset?: CommonHotkeys;
    sequence?: SequenceDefinition;
    // Define a private property '_myProp'
    keys: IKeystroke;
}

export class KeystrokeCombinationDefinition implements IKeystrokeCombinationDefinition {
    preset?: CommonHotkeys;
    sequence?: SequenceDefinition;
    // Define a private property '_myProp'
    keys: IKeystroke = new Keystroke([]);
    constructor(init?: Partial<IKeystrokeCombinationDefinition>) {
        Object.assign(this, init);
    }
}

/**************************************************/

export interface SequenceDefinition {
    type: SequenceTypes;
}

export enum SequenceTypes {
    digits = "digits",
    letterRow0 = "letterRow0",
    letterRow1 = "letterRow1",
    letterRow2 = "letterRow2",

}

