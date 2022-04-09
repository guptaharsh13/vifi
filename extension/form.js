// console.log("popup.html is working | from form.js");

const notify = (heading, content) => {
  const options = {
    type: "basic",
    title: heading,
    message: content,
    iconUrl: "icon_128.png",
  };
  chrome.notifications.create(options, (id) => {
    console.log(`notification sent - ${id}`);
  });
};

document
  .querySelector("input[type='submit']")
  .addEventListener("click", (e) => {
    console.log("click event listener is working | from form.js");

    const username = document.querySelector("input[name='username']").value;
    const password = document.querySelector("input[name='password']").value;

    try {
      chrome.storage.sync.set({ username, password }, () => {
        alert("Username and Password saved locally !!");
        notify("Your'e all set", "Username and Password saved locally");
        chrome.storage.sync.set({ login_count: 0 }, (res) => {
          console.log(`login count - ${res.login_count}`);
        });
      });
    } catch (error) {
      // console.log("Unable to save Username and Password locally :(");
      alert("Unable to save Username and Password locally :(");
      notify(
        "Something went wrong :(",
        "Unable to save Username and Password locally !!"
      );
    }
  });
