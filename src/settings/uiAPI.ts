import ElementPicker from "html-element-picker"
import {browser} from "webextension-polyfill-ts";



export interface IPopupController{
    toggleVisualsOnCurrentPage();
    visualsEnabledOnCurrentPage();

    toggleVisualsOnDomain();
    visualsEnabledOnDomain();

    toggleVisualsOnAllPages();
    visualsEnabledOnAllPages();


}

export class PopupController implements  IPopupController{
    toggleVisualsOnAllPages() {
    }

    toggleVisualsOnCurrentPage() {
    }

    toggleVisualsOnDomain() {
    }

    visualsEnabledOnAllPages() {
    }

    visualsEnabledOnCurrentPage() {
    }

    visualsEnabledOnDomain() {
    }

}

export class UiAPI{
    public elemetPicker = new ElementPickerManager();
    test(){
        alert("uiAPI");
        console.log("uiAPI");
    }
    popupController:IPopupController = new PopupController();

}

export class ElementPickerManager{
    public elementPicker:ElementPicker;
    public async pickElement(){
     /*   console.log("pickElement");
        let options = {
            container: document.body,
            selectors: "*",
            background: "rgba(153, 235, 255, 0.5)",
            borderWidth: 5,
            transition: "all 150ms ease",
            ignoreElements: [document.body],
            action: {}
        }
        this.elementPicker = new ElementPicker(options);
        console.log(this.elementPicker);*/
        await browser.runtime.sendMessage({type: "newHotkey"});
    }
}


export var uiAPI:UiAPI = new UiAPI();