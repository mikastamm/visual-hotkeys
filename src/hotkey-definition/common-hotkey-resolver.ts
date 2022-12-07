import {IKeystrokeCombinationDefinition, KeystrokeCombinationDefinition} from "./hotkeys-definition-types";

export interface ICommonHotkeyResolver {
    getKeystrokeCombination(definition:IKeystrokeCombinationDefinition):IKeystrokeCombinationDefinition;

}
class CommonHotkeyResolver implements ICommonHotkeyResolver{
    commonHotkeyKeystrokes = {
        "fuzzy-search": ["LeftAlt","p"],
        "menu": ["o"],
    };

    getKeystrokeCombination(definition:IKeystrokeCombinationDefinition):IKeystrokeCombinationDefinition{
        if(!definition.preset)
            return definition;

        return new KeystrokeCombinationDefinition({keys: this.commonHotkeyKeystrokes[definition.preset]});
    }
}
export var commonHotkeyResolver:ICommonHotkeyResolver = new CommonHotkeyResolver();

