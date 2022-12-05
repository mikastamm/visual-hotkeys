export function keyToCode(key: string): string {
    // Create a fake keyboard event with the given character
    const event = new KeyboardEvent('keydown', {
        key: key
    });

    // Get the physical key from the event
    return event.key;
}

export function codeToKey(code: string): string {
    // Create a fake keyboard event with the given code
    const event = new KeyboardEvent('keydown', {
        code: code
    });

    return event.key;
}
