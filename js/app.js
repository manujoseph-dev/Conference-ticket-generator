const fileInput = document.querySelector(".files");
const uploadImg = document.querySelector(".upload-img");
const dropzone = document.querySelector(".drop-box");
const showEdit = document.querySelector(".edit");
const info = document.querySelector(".info");
const removeImg = document.querySelector(".remove-img");
const changeImg = document.querySelector(".change-img");
const fileError = document.getElementById("file-error");
const userInput = document.querySelectorAll(".userInput");
const submitBtn = document.querySelector(".submit-btn");

let userProfile;
var selectedProfile = [];

//click to upload image
uploadImg.addEventListener("click", () => {
  fileInput.click();
});

changeImg.addEventListener("click", (e) => {
  e.preventDefault();
  fileInput.click();
});

fileInput.addEventListener("change", (e) => {
  const { files } = e.target;
  handleImages(files);
  setActive(dropzone, false);
  fileInput.value = "";
});

removeImg.addEventListener("click", (e) => {
  e.preventDefault();
  uploadImg.src = " ";
  uploadImg.alt = "";
  selectedProfile = [];
});
// adding and remove the active class

const setActive = (dropzone, active = true) => {
  const hasActiveClass = dropzone.classList.contains("active");
  const activeEditFunction = showEdit.classList.contains("hidden");

  if (active && !hasActiveClass) {
    return dropzone.classList.add("active");
  }

  if (!active && hasActiveClass) {
    return dropzone.classList.remove("active");
  }

  if (activeEditFunction) {
    return showEdit.classList.remove("hidden"), info.classList.add("hidden");
  }
};

//drag and drop funtion

dropzone.addEventListener("dragenter", (e) => {
  e.preventDefault();
  setActive(dropzone);
});

dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  setActive(dropzone);
});

dropzone.addEventListener("dragleave", (e) => {
  e.preventDefault();
  setActive(dropzone, false);
});

dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  setActive(dropzone, false);
  const { files } = e.dataTransfer;
  handleImages(files);
});

// checking the file is valid

const handleImages = (files) => {
  selectedProfile = [...files].filter((file) =>
    ["image/jpeg", "image/png"].includes(file.type)
  );
  selectedProfile.forEach(showImage);
};

// displaying image

const showImage = (image) => {
  const reader = new FileReader();
  reader.readAsDataURL(image);
  if (image.size > 512000) {
    fileError.querySelector("img").classList.add("icon-error");
    fileError.style.color = "hsl(7, 71%, 60%)";
    fileError.innerHTML = `
    <img src="./assets/images/icon-info.svg" alt="icon-info">
    File too large. Please upload a photo under 500KB.`;
  } else {
    fileError.style.color = "hsl(245, 15%, 58%)";
    fileError.innerHTML = `
    <img src="./assets/images/icon-info.svg" alt="icon-info">
    Upload your photo (JPG or PNG, max size: 500KB).`;
    reader.addEventListener("load", (e) => {
      userProfile = e.target.result;
      uploadImg.src = e.target.result;
      uploadImg.alt = "Profile picture";
    });
  }
};

// submit button

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  let allValid = true ;
  userInput.forEach((input) => {
    // --- Full Name ---

    if (input.name === "fullname") {

      if (input.value.trim() === "") {
        input.style.outlineColor = "#f57261ff ";
        document.querySelector(".err-fullname").style.display = "block";
        allValid = false;
      } else {
        input.style.outlineColor = "#8784a4ff";
        document.querySelector(".err-fullname").style.display = "none";
        allValid = true;
      }
    }
    // --- EMAIL ---

    if (input.name === "email") {
      if (input.value.trim() === "" || !pattern.test(input.value)) {
        input.style.outlineColor = "#f57261ff";
        document.querySelector(".err-email").style.display = "block";
        allValid = false;
      } else {
        input.style.outlineColor = "#8784a4ff";
        document.querySelector(".err-email").style.display = "none";
        allValid = true;
      }
    }
    // --- Github User Name ---

    if (input.name === "githubUserName") {
      if (input.value.trim() === "") {
        input.style.outlineColor = "#f57261ff ";
        document.querySelector(".err-github").style.display = "block";
        allValid = false;
      } else {
        input.style.outlineColor = "#8784a4ff";
        document.querySelector(".err-github").style.display = "none";
        allValid = true;
      }
    }

  });
    
if (userProfile){
      allValid = true;
    }else{
      allValid = false;
      alert("Upload Profile Image.");
    }
    
  if ( allValid) {
      const fullName = document.querySelector("input[name='fullname']").value;
      const email = document.querySelector("input[name='email']").value;
      const github = document.querySelector("input[name='githubUserName']").value;

      // Save to local Storage

      localStorage.setItem("fullName",fullName);
      localStorage.setItem("email",email);
      localStorage.setItem("github",github);
      localStorage.setItem("profile",userProfile);
      window.location = "ticket.html";
    }
});

