const extension_url = "https://chrome.google.com/webstore/category/extensions";
const login_url = "https://phc.prontonetworks.com/cgi-bin/authlogin";
const logout_url = "https://phc.prontonetworks.com/cgi-bin/authlogout";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.close_tab) {
    chrome.tabs.remove(sender.tab.id);
  } else if (request.login) {
    chrome.tabs.create({
      url: login_url,
    });
  } else if (request.notify) {
    const options = {
      type: "basic",
      title: request.title,
      message: request.content,
      iconUrl: "icons/icon_128.png",
    };

    if (request.id === "feedback") {
      chrome.notifications.create(request.id, options);
    } else {
      chrome.notifications.create(options);
    }
  }
});

// feedback notification redirect

chrome.notifications.onClicked.addListener((id) => {
  if (id === "feedback") {
    window.open(extension_url);
  }
});

chrome.notifications.onButtonClicked.addListener((id) => {
  if (id === "feedback") {
    window.open(extension_url);
  }
});

chrome.runtime.onStartup.addListener(() => {
  chrome.storage.sync.set({ attempted_login: false });
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "login") {
    chrome.tabs.create({
      url: login_url,
    });
  } else if (command === "logout") {
    chrome.tabs.create({
      url: logout_url,
    });
  }
});
