import {ShortcutDefinitionId} from "../hotkey-definition/hotkeys-definition-types";

export interface PluginSettings {
    visualToggles:ITogglePluginFeaturesSettings;
    hotkeyToggles:ITogglePluginFeaturesSettings;
}

export interface ITogglePluginFeaturesSettings{
    disabledOnPages: string[];
    disabledOnDomains: string[];
    disabledOnAllPages: boolean;
    disabledShortcutDefinitions: ShortcutDefinitionId[];
    disabledPresets: CommonHotkeys[];
}

export type ICommonHotkeyBindings = {
    [key in CommonHotkeys]: string;
};
export enum CommonHotkeys {
    OPEN_SETTINGS = "open-settings",
    GOTO_HOME = "goto-home",
    SEARCH = "search",
    NEXT_PAGE = "next-page",
    PREVIOUS_PAGE = "previous-page",
}

