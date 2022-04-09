// console.log("content.js is working | from ViFi");

if (
  document.body.textContent.includes("Congratulations") ||
  document.body.textContent.includes("You have successfully logged out.")
) {
  chrome.storage.sync.set({ login_count: 0 }, () => {
    console.log(`login count - ${login_count}`);
  });
} else {
  try {
    chrome.storage.sync.get(["username", "password"], (res) => {
      username = res.username;
      password = res.password;

      // console.log(`Username - ${username}`);
      // console.log(`Password - ${password}`);

      if (!(username || password)) {
        username = "";
        password = "";
        // console.log("Your'e just one step away\n\nYou can save your Username and Password by clicking on the extension icon.\nWe value your privacy, and thus, your Username and Password is only saved on your device.");
        // alert(
        //   "Your'e just one step away\n\nYou can save your Username and Password by clicking on the extension icon.\nWe value your privacy, and thus, your Username and Password is only saved on your device."
        // );
        chrome.runtime.sendMessage(
          {
            notify: true,
            heading: "Your'e just one step away",
            content:
              "You can save your Username and Password by clicking on the extension icon.",
          },
          () => {
            console.log("message sent to background.js");
          }
        );
        chrome.runtime.sendMessage(
          {
            notify: true,
            heading: "We value your privacy",
            content: "Your Username and Password is only saved on your device.",
          },
          () => {
            console.log("message sent to background.js");
          }
        );
      } else {
        document.querySelector("input[name='userId']").value = username;
        document.querySelector("input[name='password']").value = password;

        chrome.storage.sync.get(["login_count"], (response) => {
          if (!response.login_count) {
            login_count = 0;
          } else {
            login_count = response.login_count;
          }

          if (login_count === 0) {
            document.querySelector(".loginbutton").click();
            chrome.storage.sync.get(["feedback"], (response) => {
              console.log(`feedback - ${response.feedback}`);

              if (!response.feedback) {
                chrome.runtime.sendMessage({
                  notify: true,
                  id: "feedback",
                  heading: "I'm sure you liked our extension",
                  content:
                    "Please take a moment to rate our extension. We'd love your valuable feedback 🤗",
                });
              } else {
                console.log("feedback already requested");
              }

              chrome.storage.sync.set({ feedback: true }, () => {
                console.log("feedback requested");
              });
            });
          } else {
            console.log(`login count - ${login_count}`);
            chrome.runtime.sendMessage({
              notify: true,
              heading: "Oops! Unable to login ",
              content:
                "You may edit your Username and Password by clicking on the extension icon :)",
            });
          }

          login_count++;

          chrome.storage.sync.set({ login_count }, () => {
            console.log(`login count - ${login_count}`);
          });
        });
      }
    });
  } catch (error) {
    chrome.runtime.sendMessage({
      notify: true,
      heading: "Something went wrong :(",
      content:
        "We were unable to login automatically. You may drop your query at hg242322@gmail.com.\nWe'd be happy to hear your feedback !!",
    });
    // console.log("Unable to login | from ViFi");
    console.log(error);
  }
}
