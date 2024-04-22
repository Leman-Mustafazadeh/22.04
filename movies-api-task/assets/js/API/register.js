import { endpoints } from "./constants.js"
import { post, getAll } from "./requests/index.js"

/* signup */
let form1 = document.querySelector(".form1")
let name1 = document.querySelector(".name1")
let regusernameinp = document.querySelector(".regusernameinp")
let password1 = document.querySelector(".password1")
let email1 = document.querySelector(".email1")
let reguseremail = document.querySelector(".reguseremail")
let name2 = document.querySelector(".name2")
let confirmPass = document.querySelector(".confirmPass")
let admin = document.querySelector(".chekAdmin")
const nameRequired = document.querySelector(".name-required")
const fullnameRequired = document.querySelector(".fullname-required")
const emailRequired = document.querySelector(".email-required")
const passwordRequired = document.querySelector(".password-required")
const confirmRequired = document.querySelector(".confirm-required")
const emailUse = document.querySelector(".email-use")
const userUse = document.querySelector(".user-use")
/* signin */
let logForm = document.querySelector(".logFrom")
let logInp = document.querySelector(".logInp")
let logPass = document.querySelector(".logPass")
const inpRequired = document.querySelector(".inp-required")
const passRequired = document.querySelector(".pas-required")
let output = document.querySelector(".fa-sign-out")
let user = document.querySelector(".user")
let backSign = document.querySelector(".back-sign")

class User {
    constructor(id, name1, fullname1, password1, email1, confirmPass, islogged, admin) {
        this.id = id
        this.name1 = name1
        this.fullname1 = fullname1
        this.password1 = password1
        this.email1 = email1
        this.confirmPass = confirmPass
        this.islogged = islogged ? islogged : false;
        this.admin = admin
        this.favorites = []
    }
}
let ID = crypto.randomUUID()

form1?.addEventListener("submit", (e) => {
    e.preventDefault();
    const newUser = new User(ID, name1.value, name2.value, password1.value, email1.value, confirmPass.value, true, admin.checked)
    // console.log(newUser);
    /*     fetch("http://localhost:3000/users", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }); */

    /* {
            userId: 1,
            title: "Fix my bugs",
            completed: false
        } */

    getAll(endpoints.user).then(res => {
        const users = res.data
        // if (users.some((user) => user.name1 === regusernameinp.value)) {
        //     alert("salam")
        // }
        if (users.some((user) => user.name1 === regusernameinp.value)) {
            userUse.classList.replace("d-none", "d-block")
        }
        if (users.some((user) => user.email1 === reguseremail.value)) {
            emailUse.classList.replace("d-none", "d-block")
        }
    })
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8}$/

    const namePattern = /^[a-zA-Z]+$/;
    const fulPat = document.querySelector(".fulPatt")
    const passPatt = document.querySelector(".passPatt")
    if (regusernameinp.value === "") {
        console.log("salam");
        nameRequired.classList.replace("d-none", "d-block")
        console.log("laman");
    } else {
        nameRequired.classList.replace("d-block", "d-none")
    }
    if (name2.value === "") {
        fullnameRequired.classList.replace("d-none", "d-block")
    } else {
        fullnameRequired.classList.replace("d-block", "d-none")
    }
    if (email1.value === "") {
        emailRequired.classList.replace("d-none", "d-block")
    } else {
        emailRequired.classList.replace("d-block", "d-none")
    }
    if (password1.value === "") {
        passwordRequired.classList.replace("d-none", "d-block")
    } else {
        passwordRequired.classList.replace("d-block", "d-none")
    }
    if (confirmPass.value === "") {
        confirmRequired.classList.replace("d-none", "d-block")
    } else {
        confirmRequired.classList.replace("d-block", "d-none")
    }

    // if (passwordPattern.test(password)) {
    //     return true; 
    // } else {
    //     return false;
    // }
    // console.log(!namePattern.test(regusernameinp.value));
    if (!namePattern.test(regusernameinp.value)) {
        fulPat.classList.replace("d-none", "d-block")
    }
    if (!passwordPattern.test(password1.value)) {
        passPatt.classList.replace("d-none", "d-block")
    } else {
        passPatt.classList.replace("d-block", "d-none")
        if (password1.value === confirmPass.value) {
            window.location.replace("login.html")
            console.log("salam");
        } else {
            window.alert("password with confirm password not same")
        }
    }



    /*    getAll(endpoints.user).then(res => {
            res.data.map(user => {
                if (user.name1 === name1.value || user.password1 === password1.value || user.email1 === email1.value || user.confirmPass === confirmPass.value) {
                   alert("AD qeydiyyatda var")
                    return
                }else if (name1.value.trim() === "" || name2.value.trim() === "" || password1.value.trim() === "" || confirmPass.value.trim() === ""){
                    alert("alert")
                     return
                }else{
                    post(endpoints.user, newUser)
                    window.location.replace("login.html")
                    reset()
                }
                
            })
            
        }) */


})

function reset() {
    name1.value = "",
        name2.value = "",
        password1.value = "",
        email1.value = "",
        confirmPass.value = ""
}


logForm?.addEventListener("submit", function (e) {
    e.preventDefault();
    if (logInp.value.trim() === "") {
        inpRequired.classList.replace("d-none", "d-block");
        return;
    } else {
        inpRequired.classList.replace("d-block", "d-none");
    }

    if (logPass.value.trim() === "") {
        passRequired.classList.replace("d-none", "d-block");
        return;
    } else {
        passRequired.classList.replace("d-block", "d-none");
    }
    getAll(endpoints.user)
        .then(res => {
            const foundUser = res.data.find(user => user.name1 === logInp.value);
            if (foundUser) {
                if (foundUser.password1 === logPass.value) {
                    localStorage.setItem("user", JSON.stringify(foundUser));
                    window.location.replace("index.html");
                } else {
                    alert("Incorrect password");
                }
            } else {
                alert("User not found");
            }
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            alert("Error fetching user data. Please try again later.");
        });
});

const eyeBtn = document.querySelector(".eyeBtn")
if (eyeBtn) {
    eyeBtn.addEventListener('mousedown',()=>{
        logPass.setAttribute("type", "text")
    })
    eyeBtn.addEventListener('mouseup',()=>{
        logPass.setAttribute("type", "text")
    })
}

