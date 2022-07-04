browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.notify) {
    const options = {
      type: "basic",
      title: request.heading,
      message: request.content,
      iconUrl: "icons/icon_128.png",
    };

    if (request.id === "feedback") {
      browser.notifications.create(request.id, options, (id) => {
        console.log(`notification sent - ${id}`);
      });
    } else {
      browser.notifications.create(options, (id) => {
        console.log(`notification sent - ${id}`);
      });
    }
  }
});

browser.notifications.onClicked.addListener((id) => {
  if (id === "feedback") {
    window.open("https://browser.google.com/webstore/category/extensions");
  }
});

browser.notifications.onButtonClicked.addListener((id) => {
  if (id === "feedback") {
    window.open("https://browser.google.com/webstore/category/extensions");
  }
});

browser.runtime.onStartup.addListener(() => {
  browser.storage.sync.set({ login_count: 0 }, (response) => {
    console.log(`login count - ${response.login_count}`);
  });
});
