async function loadHotkeys(){
    return JSON.parse( await fetch(browser.runtime.getURL("/hotkey-definition/hotkey-definition.json")));
}

async function loadHotkeysForPage(pageUrl){
    var hotkeys= await loadHotkeys();
    for(var i=0;i<hotkeys.length;i++){
        if(new RegExp(hotkeys[i].url).test(pageUrl)){
            return hotkeys[i].hotkeys;
        }
    }
}
