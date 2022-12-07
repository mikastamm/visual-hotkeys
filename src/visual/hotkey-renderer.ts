export interface IHotkeyRenderer {
    getHotkeyTextFromCode(code:string);
}

export class HotkeyRenderer implements IHotkeyRenderer {
    getHotkeyTextFromCode(code:string){
        return code.replace("Digit", "");
    }
}

