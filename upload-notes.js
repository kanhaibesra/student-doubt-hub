import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
const uploadBtn = document.getElementById("uploadBtn");

uploadBtn.addEventListener("click", async () => {

    const subject = document.getElementById("subject").value.trim();
    const file = document.getElementById("pdfFile").files[0];

    if (!subject || !file) {
        alert("Please enter subject and select a PDF.");
        return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "ja9yo23q");

    try {

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/s1fclqwm/raw/upload",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        console.log(data);
await addDoc(collection(db, "notes"), {

    subject: subject,

    pdfUrl: data.secure_url,

    createdAt: serverTimestamp()

});
        alert("✅ PDF Uploaded Successfully!");

        console.log("PDF URL:", data.secure_url);

    } catch (error) {

        alert("Upload Failed!");

        console.error(error);

    }

});