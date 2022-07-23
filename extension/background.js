chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.notify) {
    const options = {
      type: "basic",
      title: request.heading,
      message: request.content,
      iconUrl: "icons/icon_128.png",
    };

    // async function deleteCurrentTab() {
    //   let queryOptions = { active: true, lastFocusedWindow: true };
    //   let [tab] = await chrome.tabs.query(queryOptions);
    //   tabId=parseInt(tab)
    //   chrome.tabs.remove(tabId)
    // }
    // deleteCurrentTab();

    
    
    if (request.id === "feedback") {
      chrome.notifications.create(request.id, options, (id) => {
        console.log(`notification sent - ${id}`);
        setTimeout(chrome.tabs.query({
          currentWindow:true,
          active:true
        },function(tabs){
          chrome.tabs.remove(tabs[0].id);
        }),5000);
      });
    } else {
      chrome.notifications.create(options, (id) => {
        console.log(`notification sent - ${id}`);
        setTimeout(chrome.tabs.query({
          currentWindow:true,
          active:true
        },function(tabs){
          chrome.tabs.remove(tabs[0].id);
        }),5000);
      });
    }
  }
});

chrome.notifications.onClicked.addListener((id) => {
  if (id === "feedback") {
    window.open("https://chrome.google.com/webstore/category/extensions");
  }
});

chrome.notifications.onButtonClicked.addListener((id) => {
  if (id === "feedback") {
    window.open("https://chrome.google.com/webstore/category/extensions");
  }
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.sync.set({ login_count: 0 }, (response) => {
    console.log(`login count - ${response.login_count}`);
  });
});
