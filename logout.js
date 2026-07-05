import { auth, signOut } from "./firebase.js";

window.logoutUser = function(){

    signOut(auth)
    .then(()=>{

        localStorage.removeItem("student");

        alert("✅ Logged Out Successfully");

        window.location.href="login.html";

    })
    .catch((error)=>{

        alert(error.message);

    });

}