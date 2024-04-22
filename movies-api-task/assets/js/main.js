import { getAll, deleteOne, getOne, update } from "./API/requests/index.js";
import { endpoints } from "./API/constants.js";

const moviesWrapper = document.querySelector(".movies-wrapper");
const editForm = document.querySelector("#edit-form");
const titleInp = document.querySelector("#title");
const posterInp = document.querySelector("#poster");
const trailerURLInp = document.querySelector("#trailerURL");
const genreInp = document.querySelector("#genre");
const ageInp = document.querySelector("#age");
const countryInp = document.querySelector("#country");
const directorInp = document.querySelector("#director");
const descTextArea = document.querySelector("#desc");
const moviesModal = document.querySelector(".moviesModal");
const moviesClose = document.querySelector(".moviesClose");
const moviesModalIframe = document.querySelector(".moviesModal iframe");
let links = document.querySelector(".links")
let containerSelect = document.querySelector(".sort-by-name")
let  sortByFav = document.querySelector(".sort-by-fav")



let regusernameinp = document.querySelector(".regusernameinp")
const localData = JSON.parse(localStorage.getItem("user"));
console.log(localData);
if (localData) {
  links.innerHTML = `
  <li><a href="index.html">Home</a></li>
  ${localData.admin ? `<li class="add"><a  href="add.html">ADD</a></li>` : ""}
 ${localData.admin ? `<li class="adminLi"><span>welcome</span> ${localData.name1}<span>admin <i class="fa-solid fa-lock"></i></span></li>` : `<li>${localData.name1}</li>`} 
  <li><i class="fa-solid fa-right-to-bracket"></i></li>
  `
  !localData.admin ? containerSelect.innerHTML += `<select name="" id="" class="form-select w-25 sort-by-fav">
<option value=""selected disabled >Filter Favorites/All</option>
<option value="all">All</option>
<option value="favorites">Favorites</option>
</select>` : ""
  let toBracket = document.querySelector(".fa-right-to-bracket")
  toBracket?.addEventListener("click", function () {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user")
        location.reload();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  })
}else{
  console.log(1);
  if(window.location.pathname.includes("add.html")){
    window.location.href="index.html"
  }
}
window?.addEventListener("load", () => {
  getAll(endpoints.movies).then((res) => {
    renderCards(res.data);
  });
});

function renderCards(arr) {
  moviesWrapper.innerHTML = "";
  arr.forEach((movie) => {
    moviesWrapper.innerHTML += `<div class="col-lg-3 col-md-6 col-sm-12" data-id=${movie.id} data-editing="false">
        <div class="card">
            <div class="card-img">
                <img class="card-img-top"
                    src="${movie.poster}"
                    alt="${movie.title}">
                    title=${movie.title}
            </div>
            <div class="card-body">
            <marquee class="fs-4 m-2"  width="100%" direction="right">
            ${movie.title}
            </marquee>
                <div class="d-flex  justify-content-between align-items-center">
                    <button id=${movie.id} class="btn lemanBtn btn-outline-secondary mb-0">click for trailer</button> <br>
                    <div class="age-restriction">
                        <span>${movie.ageRestriction}+</span>
                    </div>
                </div>
                <hr>
                <!-- <iframe width="935" height="526" src="https://www.youtube.com/embed/CwXOrWvPBPk"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->
                <a href="detail.html?id=${movie.id}" class="btn btn-outline-info info-btn">
                    <i class="fa-solid fa-circle-info"></i>
                </a>
              ${localData?.admin ? `<button class="btn btn-outline-primary edit-btn"  data-bs-toggle="modal" data-bs-target="#editModal">
              <i class="fa-solid fa-pen-to-square"></i>
          </button>` : ""}
               ${localData?.admin ? ` <button class="btn  btn-outline-danger delete-btn">
               <i class="fa-solid fa-trash"></i>
           </button>` : ""}
           ${!localData?.admin ? `<button  class="btn heartBtn  btn-outline-danger"><i id=${movie.id} class="fa-regular fa-heart"></i></button>` : ""}
            </div>
        </div>
    </div>`;

    //delete buttons
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", async function () {
        const id = this.closest(".col-lg-3").getAttribute("data-id");
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const res = await deleteOne(endpoints.movies, id);
            this.closest(".col-lg-3").remove();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      });
    });
    //edit buttons
    const editBtns = document.querySelectorAll(".edit-btn");
    editBtns.forEach((btn) => {
      btn.addEventListener("click", async function () {
        const id = this.closest(".col-lg-3").getAttribute("data-id");
        const response = await getOne(endpoints.movies, id);
        const movie = response.data[0];
        titleInp.value = movie.title;
        genreInp.value = movie.genre;
        posterInp.value = movie.poster;
        trailerURLInp.value = movie.trailerURL;
        ageInp.value = movie.ageRestriction;
        countryInp.value = movie.country;
        directorInp.value = movie.director;
        descTextArea.value = movie.description;
        this.closest(".col-lg-3").setAttribute("data-editing", "true");
      });
    });
  });


  /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
localData?.favorites?.forEach(favor => {
  let elements = document.querySelectorAll(".fa-regular");
  elements.forEach(element => {
    if (element.id == favor.moviID) {
      element.className = "fa-solid fa-heart";
      element.id = favor.id;
      element.addEventListener("click", function () {
        const localDAta2 = JSON.parse(localStorage.getItem("user"));
        const favorIdToDelete = this.id;
        this.className = "fa-regular fa-heart"
        fetch(`http://localhost:3000/users/${localData.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            favorites: localDAta2.favorites.filter(favorite => favorite.id != favorIdToDelete)
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then(res => res.json()).then(data => localStorage.setItem("user", JSON.stringify(data)))
          .catch(error => console.error('Error:', error));
      })
    }
  });
 
});

let sortByFav = document.querySelector(".sort-by-fav")
  sortByFav?.addEventListener("change",(e)=>{
    console.log(e.target.value);
    console.log(sortByFav.value);
    sortByFavs(sortByFav.value)
  })
  
  function sortByFavs(favs) {
    getAll(endpoints.movies).then(res => {
      const fav = res.data
        const selectFavs = sortByFavs.value
        if (selectFavs === "favorites") {
          const favoriteMovie = favs.filter(movie => userFav.favorites.some(item => item.id === movie.id))
          renderCards(favoriteMovie)
        } else {
          renderCards(fav)
        }
    })
  }
  /* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2 */

  const btnHeartAll = document.querySelectorAll(".heartBtn");

  btnHeartAll.forEach(btnHeart => {
    btnHeart.addEventListener("click", function () {

      if (this.children[0].className === "fa-solid fa-heart") {
        this.children[0].className = "fa-regular fa-heart";
        const localDAta2 = JSON.parse(localStorage.getItem("user"));
        const favorIdToDelete = this.children[0].id;
        fetch(`http://localhost:3000/users/${localData.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            favorites: localDAta2.favorites.filter(favorite => favorite.id != favorIdToDelete)
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then(res => res.json()).then(data => localStorage.setItem("user", JSON.stringify(data)))
          .catch(error => console.error('Error:', error));
      } else {
        let favorId = new Date().valueOf();
        let moviID = this.children[0].getAttribute("id");
        const localDAta2 = JSON.parse(localStorage.getItem("user"));

        this.children[0].className = "fa-solid fa-heart";
        this.children[0].id = favorId;
        fetch(`http://localhost:3000/users/${localData.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ favorites: [...localDAta2.favorites, { id: favorId, moviID: moviID }] }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then(res => res.json())
          .then(data => localStorage.setItem("user", JSON.stringify(data)))
          .catch(error => console.error('Error:', error));
      }

    });
  });


  const btnOpenMovie = document.querySelectorAll(".lemanBtn");
  btnOpenMovie.forEach((btn) => {
    btn.addEventListener("click", function () {
      const getId = this.getAttribute("id");
      arr.map((item) => {
        if (item.id == getId) {
          moviesModalIframe.src = item.trailerURL;
          setTimeout(() => {
            moviesModal.style.display = "flex";
          }, 600);
        }
      });
    });
  });
}
editForm?.addEventListener("submit", function (e) {
  e.preventDefault();
  const cards = document.querySelectorAll(".col-lg-3");
  let id;
  Array.from(cards).map((card) => {
    if (card.getAttribute("data-editing") == "true") {
      id = card.getAttribute("data-id");
      card.setAttribute("data-editing", "false");
    }
  });
  const updatedMovie = {
    title: titleInp.value,
    genre: genreInp.value,
    country: countryInp.value,
    director: directorInp.value,
    ageRestriction: ageInp.value,
    poster: posterInp.value,
    trailerURL: trailerURLInp.value,
    description: descTextArea.value,
  };
  update(endpoints.movies, id, updatedMovie).then(() => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Movie Updated Successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    getAll(endpoints.movies).then((res) => {
      renderCards(res.data);
    });
  });
});

//sort
const sortSelectOption = document.querySelector(".sort-by-name-select");
sortSelectOption?.addEventListener("change", async (e) => {
  let res = await getAll(endpoints.movies);
  if (e.target.value == "ascending") {
    let sortedArr = [...res.data].sort((x, y) =>
      x.title.localeCompare(y.title));
    renderCards(sortedArr);
  } else if (e.target.value == "descending") {
    let sortedArr = [...res.data].sort((x, y) =>
      y.title.localeCompare(x.title)
    );
    renderCards(sortedArr);
  }
});

/* filter serach */
const searchInp = document.querySelector(".searchInp");

searchInp?.addEventListener("input", async (e) => {
  let { data } = await getAll(endpoints.movies);
  const filter = data.filter((item) =>
    item.title
      .toLowerCase()
      .trim()
      .includes(e.target.value.trim().toLowerCase())
  );
  renderCards(filter);
});

/* modal open */

moviesClose?.addEventListener("click", () => {
  moviesModal.style.display = "none";
  moviesModalIframe.src = "";
});
