import {IOnPageHotkey, KeystrokeCombinations, OnPageHotkey} from "./on-page-hotkeys";
import {IShortcutDefinition} from "./hotkeys-definition-types";
import {getElementByXpath, getElementsByXpath, getRelativeElementByXpath} from "../util/xpath";
import {commonHotkeyResolver} from "./common-hotkey-resolver";
import {hotkeySequenceResolver} from "./hotkey-sequence-resolver";

export interface IOnPageHotkeyFactory {
    create(definitions:IShortcutDefinition):IOnPageHotkey[];
}

export class OnPageHotkeyFactory implements IOnPageHotkeyFactory {
    create(definition: IShortcutDefinition): IOnPageHotkey[] {
        var keystrokeDefs = commonHotkeyResolver.getKeystrokeCombination(definition.keystrokes);
        var keystrokes = hotkeySequenceResolver.expandAndConvertToKeystroke(keystrokeDefs);
        keystrokes = this.matchElementsToKeystrokes(keystrokes, definition.displayXpath);

        var onPageHotkeys: IOnPageHotkey[] = [];

        keystrokes.forEach(keystroke => {
            return new OnPageHotkey({
                _name: definition._name,
                injectionType: definition.injectionType,
                displayElementContainer: displayElement,
                clickElement: getRelativeElementByXpath(displayElement, target.clickXpath),
                keystrokes: setIterativeHotkeys(target.keystrokes, (index + 1) % 10),
            });
        });
        return [];
    }

    matchElementsToKeystrokes(keystrokes: KeystrokeCombinations[], displayXpath: string) {
        var matchingElements = getElementsByXpath(displayXpath);
        const zip = (a:KeystrokeCombinations[], b:HTMLElement[]) => a.map((k, i) => [k, b[i]]);
        return zip(keystrokes, matchingElements).filter(x=>x[1] != null).map(x=>{
            return
            {
                keystrokeCombination: x[0],
                    matchedElement: x[1]
            }
        });
    }

    resolveSingle(target: IShortcutDefinition): OnPageHotkey {
        var displayElement = getElementByXpath(target.displayXpath);
        return {
            _name: target._name,
            displayElement: undefined,
            injectionType: target.injectionType,
            displayElementContainer: displayElement,
            clickElement: getRelativeElementByXpath(displayElement, target.clickXpath),
            keystrokes: target.keystrokes
        }
    }



    resolveSequence(target: IShortcutDefinition): OnPageHotkey[] {
        var matchingElements = getElementsByXpath(target.displayXpath);
        var matches: OnPageHotkey[] = [];
        const maxExpansion = Math.min(matchingElements.length, 10)
        for (var i = 0; i < maxExpansion; i++) {
            const index = i;
            var displayElement = matchingElements[index];

            matches.push({


            });
        }
        return matches;
    }
}
export var  onPageHotkeyFactory:IOnPageHotkeyFactory = new OnPageHotkeyFactory();

