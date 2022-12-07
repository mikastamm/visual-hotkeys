
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
    test(){
        alert("uiAPI");
        console.log("uiAPI");
    }
    popupController:IPopupController = new PopupController();

}
export var uiAPI:UiAPI = new UiAPI();