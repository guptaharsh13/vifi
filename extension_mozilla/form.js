const email = "hg242322@gmail.com";
const login_url = "https://phc.prontonetworks.com/cgi-bin/authlogin";
const logout_url = "https://phc.prontonetworks.com/cgi-bin/authlogout";

document
  .querySelector("input[type='submit']")
  .addEventListener("click", (e) => {
    const username = document.querySelector("input[name='username']").value;
    const password = document.querySelector("input[name='password']").value;

    try {
      chrome.storage.sync.set(
        { username, password, attempted_login: false },
        () => {
          alert("Username and Password saved locally :)");
          chrome.tabs.create({
            url: login_url,
          });
        }
      );
    } catch (error) {
      alert("Unable to save Username and Password locally :(");
    }
  });

document.querySelector("#login").addEventListener("click", (e) => {
  chrome.tabs.create({
    url: login_url,
  });
});
document.querySelector("#logout").addEventListener("click", (e) => {
  chrome.tabs.create({
    url: logout_url,
  });
});
