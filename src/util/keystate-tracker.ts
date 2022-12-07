
interface IKeyStateTracker {
    isKeyPressed(key: string) : boolean;
    trackKeyDown(event: KeyboardEvent) : void;
    trackKeyUp(event: KeyboardEvent) : void;
}

class KeyStateTracker implements IKeyStateTracker {
    currentPressedKeys = new Set();
    public isKeyPressed (key: string) {
        return this.currentPressedKeys.has(key);
    }
    public trackKeyDown (event: KeyboardEvent) {
        this.currentPressedKeys.add(event.code);
    };

    public trackKeyUp (event: KeyboardEvent) {
        this.currentPressedKeys.delete(event.code);}
}

export const keyTracker:IKeyStateTracker = new KeyStateTracker();
