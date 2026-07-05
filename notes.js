import { db } from "./firebase.js";

import {
    collection,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const notesContainer = document.getElementById("notesContainer");

function loadNotes() {

    onSnapshot(collection(db, "notes"), (querySnapshot) => {

        notesContainer.innerHTML = "";

        querySnapshot.forEach((doc) => {

            const data = doc.data();

            notesContainer.innerHTML += `

            <div class="card note-card">

                <h2>📘 ${data.subject}</h2>

                <button
                class="btn"
                onclick="window.open('${data.pdfUrl}', '_blank')">

                👀 Open PDF

                </button>

                <br><br>

                <a
                href="${data.pdfUrl}"
                target="_blank"
                class="btn">

                📥 Download

                </a>

            </div>

            `;

        });

    });

}

loadNotes();
window.searchNotes = function () {

    const input = document.getElementById("searchNotes").value.toLowerCase();

    const cards = document.querySelectorAll(".note-card");

    cards.forEach((card) => {

        const text = card.innerText.toLowerCase();

        if (text.includes(input)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

};