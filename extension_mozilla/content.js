window.onload = () => {
  console.log("hello from content.js");
};

const askFeedback = () => {
  browser.storage.sync.get(["feedback"], (response) => {
    // check if feedback was already requested
    if (!response.feedback) {
      browser.runtime.sendMessage({
        notify: true,
        id: "feedback",
        title: "I'm sure you liked our extension",
        content:
          "Please take a moment to rate our extension. We'd love your valuable feedback 🤗",
      });
      browser.storage.sync.set({ feedback: true });
    }
  });
};

const main = async () => {
  if (
    document.body.textContent.toLowerCase().includes("logout") ||
    document.body.textContent.toLowerCase().includes("log out") ||
    document.body.textContent.toLowerCase().includes("logged out") ||
    document.body.textContent.toLowerCase().includes("logged in")
  ) {
    browser.storage.sync.set({ attempted_login: false });
    browser.runtime.sendMessage({ close_tab: true });
  } else {
    try {
      browser.storage.sync.get(["username", "password"], (res) => {
        username = res.username;
        password = res.password;

        if (!(username || password)) {
          username = "";
          password = "";
          browser.runtime.sendMessage({
            notify: true,
            title: "Your'e just one step away",
            content:
              "You can save your Username and Password by clicking on the extension icon.",
          });
          browser.runtime.sendMessage({
            notify: true,
            title: "We value your privacy",
            content: "Your Username and Password is only saved on your device.",
          });
        } else {
          document.querySelector("input[name='userId']").value = username;
          document.querySelector("input[name='password']").value = password;

          browser.storage.sync.get(["attempted_login"], (response) => {
            if (!response.attempted_login) {
              document.querySelector(".loginbutton").click();
              browser.storage.sync.set({ attempted_login: true });
              askFeedback();
            } else {
              browser.runtime.sendMessage({
                notify: true,
                title: "Oops! Unable to login ",
                content:
                  "You may edit your Username and Password by clicking on the extension icon :)",
              });
            }
          });
        }
      });
    } catch (error) {
      browser.runtime.sendMessage({
        notify: true,
        title: "Something went wrong :(",
        content:
          "We were unable to login automatically. You may drop your query at hg242322@gmail.com.\nWe'd be happy to hear your feedback !!",
      });
    }
  }
};

main();
