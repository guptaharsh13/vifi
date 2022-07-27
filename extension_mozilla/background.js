const extension_url = "https://chrome.google.com/webstore/category/extensions";
const login_url = "https://phc.prontonetworks.com/cgi-bin/authlogin";
const logout_url = "https://phc.prontonetworks.com/cgi-bin/authlogout";

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.close_tab) {
    browser.tabs.remove(sender.tab.id);
  } else if (request.login) {
    browser.tabs.create({
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
      browser.notifications.create(request.id, options);
    } else {
      browser.notifications.create(options);
    }
  }
});

// feedback notification redirect

browser.notifications.onClicked.addListener((id) => {
  if (id === "feedback") {
    window.open(extension_url);
  }
});

browser.notifications.onButtonClicked.addListener((id) => {
  if (id === "feedback") {
    window.open(extension_url);
  }
});

browser.runtime.onStartup.addListener(() => {
  browser.storage.sync.set({ attempted_login: false });
});

browser.commands.onCommand.addListener((command) => {
  if (command === "login") {
    browser.tabs.create({
      url: login_url,
    });
  } else if (command === "logout") {
    browser.tabs.create({
      url: logout_url,
    });
  }
});
