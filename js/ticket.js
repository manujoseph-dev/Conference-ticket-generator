const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const userNameSpan = document.querySelector(".username-header");
const userEmailSpan = document.querySelector(".userEmail-header");
const githubUserName = document.querySelector(".github-username");
const profileUserName = document.querySelector(".username");
const profileImg = document.querySelector(".profile-img");
const monthDate = document.querySelector(".monthDate");
const contestId = document.querySelector(".contest-id");
// Get values from the local Storage

const fullName = localStorage.getItem("fullName");
const email = localStorage.getItem("email");
const github = localStorage.getItem("github");
const profileImage = localStorage.getItem("profile");

// Insert into html
if (fullName) {
    userNameSpan.textContent = fullName ;
    profileUserName.textContent = fullName;
};
if (email) userEmailSpan.textContent = email;
if (github) githubUserName.textContent = `@${github}`;
if (profileImage) {
    profileImg.src = profileImage ;
    profileImg.alt = profileImage ;
}
// generate secreat id
const random5 = Math.floor(10000 + Math.random() * 90000);
contestId.textContent = `#${random5}`;

      localStorage.removeItem(fullName);
      localStorage.removeItem(email);
      localStorage.removeItem(github);
      localStorage.removeItem(userProfile);
// Insert month and year 

// get month
const dateObj = new Date();
let month = months[dateObj.getMonth()];
const year = dateObj.getFullYear();

monthDate.textContent = `${month} 27, ${year}`;
