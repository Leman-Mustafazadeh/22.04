import { endpoints } from "./API/constants.js";
import { post } from "./API/requests/index.js";
let title = document.querySelector(".add-title");
let poster = document.querySelector(".add-poster");
let trailer = document.querySelector(".add-trailer");
let genre = document.querySelector(".add-genre");
let year = document.querySelector(".add-year");
let age = document.querySelector(".add-age");
let country = document.querySelector(".add-counrty");
let description = document.querySelector(".add-description");
let form2 = document.querySelector(".form-2");
form2.addEventListener("click", function (e) {
  e.preventDefault();
  let newMovie = {
    title: title.value,
    poster: getIMg,
    trailer: trailer.value,
    genre: genre.value,
    country: country.value,
    ageRestriction: age.value,
    trailerURL: `https://www.youtube.com/embed/${trailer.value.split("=")[1]}`,
    description: description.value,
  };
  post(endpoints.movies, newMovie).then((res) =>
    window.location.replace("index.html")
  );
});
const localData = JSON.parse(localStorage.getItem("user"));
if (!localData && window.location.pathname.includes("add.html")) {
  window.location.href = "index.html";
}

let getIMg = null;
poster?.addEventListener("change", () => {
  if (poster.files !== null) {
    const getFile = poster.files[0];
    if (getFile) {
      const reader = new FileReader();
      reader.onload = function (e) {
        getIMg = e.target?.result;
      };
      reader.readAsDataURL(getFile);
    }
  }
});

// drop

const dropZone = document.getElementById("drop-zone");
const posterInput = document.getElementById("poster");

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("drag-over");
});
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    displayImage(file);
  }
  dropZone.classList.remove("drag-over");
});
posterInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    displayImage(file);
  }
});
function displayImage(file) {
  const reader = new FileReader();
  reader.onload = function () {
    dropZone.style.backgroundImage = `url('${reader.result}')`;
  };
  reader.readAsDataURL(file);
}
document.getElementById("movie-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
});
