import { auth, onAuthStateChanged } from "./firebase.js";

onAuthStateChanged(auth, (user) => {

    // Agar login page ya signup page hai to check mat karo
    const page = window.location.pathname;

    if(page.includes("login.html") || page.includes("signup.html") || page.includes("admin.html")){
        return;
    }

    if(!user){
        alert("🔒 Please login first.");
        window.location.href = "login.html";
    }

});