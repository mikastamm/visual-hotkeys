import {IKeyStateTracker, KeyStateTracker} from "../util/keystate-tracker";
import {HotkeyRenderer, IHotkeyRenderer} from "../visual/hotkey-renderer";
import {IPageContentExtractor, XpathPageContentExtractor} from "../util/xpath";



class BackgroundAPI {
}

class ContentAPI {
    keyStateTracker:IKeyStateTracker = new KeyStateTracker();
    hotkeyRenderer:IHotkeyRenderer = new HotkeyRenderer();
    contentExtractor:IPageContentExtractor = new XpathPageContentExtractor();
}
export class HkAPI{
    background:BackgroundAPI = new BackgroundAPI();
    content:ContentAPI = new ContentAPI();
}
export var hkAPI:HkAPI = new HkAPI();
