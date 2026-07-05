import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

console.log("✅ Login JS Loaded");

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please fill all fields.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)

    .then((userCredential) => {

        alert("✅ Login Successful");

        localStorage.setItem("student", userCredential.user.email);

        window.location.href = "dashboard.html";

    })

    .catch((error) => {

        switch (error.code) {

            case "auth/invalid-credential":
                alert("❌ Invalid Email or Password");
                break;

            case "auth/user-not-found":
                alert("❌ User not found");
                break;

            case "auth/too-many-requests":
                alert("❌ Too many attempts. Try again later.");
                break;

            default:
                alert(error.message);

        }

    });

});