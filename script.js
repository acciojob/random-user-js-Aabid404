//your code here
const userImage = document.getElementById("userImage");
const userName = document.getElementById("userName");
const additionalInfo = document.getElementById("additionalInfo");
const getUserButton = document.getElementById("getUser");
const infoButtons = document.querySelectorAll("[data-attr]");

let currentUser = null;

async function fetchUser() {
    try {
        getUserButton.disabled = true;

        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();

        currentUser = data.results[0];

        userImage.src = currentUser.picture.large;
        userImage.alt = "User Photo";

        userName.textContent =
            currentUser.name.first + " " + currentUser.name.last;

        additionalInfo.textContent = "";
    } catch (error) {
        additionalInfo.textContent = "Unable to load user. Please try again.";
    } finally {
        getUserButton.disabled = false;
    }
}

infoButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (!currentUser) return;

        const attribute = button.getAttribute("data-attr");

        if (attribute === "age") {
            additionalInfo.textContent = "Age: " + currentUser.dob.age;
        } else if (attribute === "email") {
            additionalInfo.textContent = "Email: " + currentUser.email;
        } else if (attribute === "phone") {
            additionalInfo.textContent = "Phone: " + currentUser.phone;
        }
    });
});

getUserButton.addEventListener("click", fetchUser);

fetchUser();