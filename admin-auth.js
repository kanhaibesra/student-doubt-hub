import { auth, onAuthStateChanged } from "./firebase.js";

onAuthStateChanged(auth, (user) => {
console.log("Current User:", user);
console.log("Current Email:", user?.email);
    if (!user) {
        window.location.href = "admin.html";
        return;
    }

    if (user.email !== "admin@studentdoubthub.com") {
        alert("❌ Access Denied");

        auth.signOut();

        window.location.href = "admin.html";
        return;
    }

    console.log("✅ Admin Verified");

});