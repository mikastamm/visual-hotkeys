import {OnPageHotkey} from "./on-page-hotkeys";
import {ShortcutDefinition, InjectionTypes, PageShortcut, KeystrokeCombination} from "./hotkeys-definition";
import {getElementByXpath, getElementsByXpath, getRelativeElementByXpath} from "../util/xpath";
import {CommonHotkeys, resolveCommonHotkeyKeystroke} from "./common-hotkeys";
import {keyToCode} from "../util/keyboard";
import {Keystroke} from "./keystroke";

export function resolveHotkeys(pageHotekeys:PageShortcut):OnPageHotkey[]{
    var onPageHotkeys:OnPageHotkey[] = [];
    pageHotekeys.hotkeys.forEach(hotkey => {
        if (hotkey.keystrokes.keys.some(x=>x.indexed))
            onPageHotkeys.push(...resolveSequence(hotkey));
        else
            onPageHotkeys.push(resolveSingle(hotkey));
    });
    return onPageHotkeys;
}



function setIterativeHotkeys(target:KeystrokeCombination, i:Number){
    target.keys = target.keys.map(keystroke=>{
        const cpy = Object.assign(Keystroke, keystroke);
        if(cpy.indexed)
        {
            cpy.key = i.toString();
            cpy.code = keyToCode(i.toString());
        }
            return cpy;
    });
    return target;
}

function resolveSingle(target: ShortcutDefinition):OnPageHotkey{
    var displayElement = getElementByXpath(target.displayXpath);
    return {
        _name: target._name,
        injectionType: target.injectionType,
        displayElement: displayElement,
        clickElement: getRelativeElementByXpath(displayElement, target.clickXpath),
        keystrokes: target.keystrokes
    }
}

function resolveSequence(target: ShortcutDefinition):OnPageHotkey[]{
    var matchingElements = getElementsByXpath(target.displayXpath);
    var matches:OnPageHotkey[] = [];
    for (var i = 0; i < matchingElements.length; i++) {
        var displayElement = matchingElements[i];
        matches.push({
           _name: target._name,
              injectionType: target.injectionType,
                displayElement: displayElement,
                clickElement: getRelativeElementByXpath(displayElement, target.clickXpath),
                keystrokes: setIterativeHotkeys(target.keystrokes, i),

        });
    }
    return matches;
}
