import {OnPageHotkey} from "./on-page-hotkeys";
import {IShortcutDefinition, InjectionTypes, IPageShortcuts, IKeystrokeCombination} from "./hotkeys-definition-interfaces";
import {getElementByXpath, getElementsByXpath, getRelativeElementByXpath} from "../util/xpath";
import {CommonHotkeys, resolveCommonHotkeyKeystroke} from "./common-hotkeys";
import {keyToCode} from "../util/keyboard";
import {Keystroke, KeystrokeCombination} from "./hotkey-definition-classes";

export function resolveHotkeys(pageHotekeys:IPageShortcuts):OnPageHotkey[]{
    var onPageHotkeys:OnPageHotkey[] = [];
    pageHotekeys.hotkeys.forEach(hotkey => {
        if (hotkey.keystrokes.keys.some(x=>x.indexed))
            onPageHotkeys.push(...resolveSequence(hotkey));
        else
            onPageHotkeys.push(resolveSingle(hotkey));
    });
    return onPageHotkeys;
}



function setIterativeHotkeys(target:IKeystrokeCombination, i:Number){
    target = Object.assign(new KeystrokeCombination(), target);
    target.keys = target.keys.map(keystroke=>{
        const cpy = Object.assign(new Keystroke(), keystroke);
        if(cpy.indexed)
        {
            cpy.key = i.toString();
            cpy.code = keyToCode(i.toString());
        }
        console.log(i)
            return cpy;
    });
    return target;
}

function resolveSingle(target: IShortcutDefinition):OnPageHotkey{
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

function resolveSequence(target: IShortcutDefinition):OnPageHotkey[]{
    var matchingElements = getElementsByXpath(target.displayXpath);
    var matches:OnPageHotkey[] = [];
    const maxExpansion = Math.min(matchingElements.length, 10)
    for (var i = 0; i < maxExpansion; i++) {
        const index = i;
        var displayElement = matchingElements[index];

        matches.push({
           _name: target._name,
              injectionType: target.injectionType,
                displayElementContainer: displayElement,
                clickElement: getRelativeElementByXpath(displayElement, target.clickXpath),
                keystrokes: setIterativeHotkeys(target.keystrokes, (index+1)%10),

        });
    }
    return matches;
}
