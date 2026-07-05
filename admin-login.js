import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const loginBtn = document.getElementById("adminLoginBtn");

loginBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please fill all fields.");
        return;
    }

    try {

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        // ✅ Sirf Admin Email Allow
        if (userCredential.user.email !== "admin@studentdoubthub.com") {

            alert("❌ You are not authorized as Admin.");

            await auth.signOut();

            return;

        }

        alert("✅ Admin Login Successful");

        window.location.href = "admin-dashboard.html";

    } catch (error) {

        alert(error.message);

    }

});