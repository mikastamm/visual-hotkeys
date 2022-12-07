import {
    IKeystrokeCombinationDefinition, IPageShortcuts, IShortcutDefinition,
    KeyDefinition, Keystroke,
    SequenceDefinition,
    SequenceTypes
} from "./hotkeys-definition-types";
import {KeystrokeCombinations, OnPageHotkey} from "./on-page-hotkeys";
import {KeystrokeCombinationDefinition, ShortcutDefinition} from "./hotkey-definition-classes";
import {getKeystrokeKeys} from "./common-hotkey-resolver";
import {getElementByXpath, getElementsByXpath, getRelativeElementByXpath} from "../util/xpath";
import {keyToCodeMap} from "./key-to-code-map";

export interface IHotkeySequenceExpander {
    expandAndConvertToKeystroke(definition: IKeystrokeCombinationDefinition): KeystrokeCombinations[];
}

class HotkeySequenceResolver implements IHotkeySequenceExpander {

    sequenceKeys = {};

    constructor() {
        this.sequenceKeys[SequenceTypes.digits] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        this.sequenceKeys[SequenceTypes.letterRow0] = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
        this.sequenceKeys[SequenceTypes.letterRow1] = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
        this.sequenceKeys[SequenceTypes.letterRow2] = ["z", "x", "c", "v", "b", "n", "m"];
    }


    expandSequence(sequence: SequenceDefinition): KeyDefinition[] {
        return this.sequenceKeys[sequence.type] as KeyDefinition[];
    }

    expandAndConvertToKeystroke(definition: IKeystrokeCombinationDefinition): KeystrokeCombinations[] {
        if (!definition.sequence)
            return [new KeystrokeCombinations([definition.keys])];

        let keystrokeCombinations: KeystrokeCombinations[] = [];
        for (const key in this.expandSequence(definition.sequence)) {
            const existingKeys = new Keystroke(Array.from(definition.keys.codes)) ?? [];
            existingKeys.codes.push(keyToCodeMap[key]);
            var combinations = new KeystrokeCombinations([existingKeys]);
            combinations.partOfSequence = true;
            keystrokeCombinations.push(combinations);
        }
        return keystrokeCombinations;
    }

}

export const hotkeySequenceResolver: IHotkeySequenceExpander = new HotkeySequenceResolver();