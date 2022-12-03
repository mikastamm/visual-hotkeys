await chrome.scripting.registerContentScripts([
    {
        id: 'visual-hotkey-injector',
        matches: ['http://*/*', 'https://*/*'],
        js: ['visual/visual-key-injector.js', 'hotkey-execution/hotkey-execution.js','page.js'],
        css: ['visual/hotkey.css'],
        runAt: 'document_idle',
        world: 'MAIN',
    },
]);