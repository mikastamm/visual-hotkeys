import {IOnPageHotkey, KeystrokeCombinations, OnPageHotkey} from "./on-page-hotkeys";
import {IShortcutDefinition} from "./hotkeys-definition-types";
import {commonHotkeyResolver} from "./common-hotkey-resolver";
import {hotkeySequenceResolver} from "./hotkey-sequence-resolver";
import {hkAPI} from "../frontend/hkAPI";

export interface IOnPageHotkeyFactory {
    create(definitions:IShortcutDefinition):IOnPageHotkey[];
}

export class OnPageHotkeyFactory implements IOnPageHotkeyFactory {
    create(definition: IShortcutDefinition): IOnPageHotkey[] {
        var keystrokeDefs = commonHotkeyResolver.getKeystrokeCombination(definition.keystrokes);
        var keystrokes = hotkeySequenceResolver.expandAndConvertToKeystroke(keystrokeDefs);
        let keystrokesWithElements = this.matchElementsToKeystrokes(keystrokes, definition.displayXpath);

        var onPageHotkeys: IOnPageHotkey[] = [];

        return keystrokesWithElements.map(keystrokeWithElement => {
            var clickXpath = hkAPI.content.contentExtractor.getSelectorForElement(keystrokeWithElement.element as HTMLElement) + definition.clickXpath;

            return new OnPageHotkey({
                _name: definition._name,
                injectionType: definition.injectionType,
                displayElementContainer: keystrokeWithElement.element as HTMLElement,
                clickElement: hkAPI.content.contentExtractor.getElement(clickXpath),
                keystrokes: keystrokeWithElement.keystroke as KeystrokeCombinations
            });
        });
    }

    matchElementsToKeystrokes(keystrokes: KeystrokeCombinations[], displayXpath: string) {
        var matchingElements = hkAPI.content.contentExtractor.getElements(displayXpath);
        const zip = (a:KeystrokeCombinations[], b:HTMLElement[]) => a.map((k, i) => [k, b[i]]);
        return zip(keystrokes, matchingElements)
            .filter(x => x[1] != null)
            .map(x => {
                return {
                    keystroke: x[0],
                    element: x[1]
                };
            });
    }


}
export var  onPageHotkeyFactory:IOnPageHotkeyFactory = new OnPageHotkeyFactory();

