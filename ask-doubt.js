import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
window.saveDoubt = async function () {

    const subject = document.getElementById("subject").value.trim();
    const question = document.getElementById("question").value.trim();

    if (subject === "" || question === "") {
        alert("Please fill all fields.");
        return;
    }

    try {

        await addDoc(collection(db, "doubts"), {

    uid: auth.currentUser.uid,
    email: auth.currentUser.email,
    subject: subject,
    question: question,
    createdAt: serverTimestamp()

});

        alert("✅ Doubt Submitted Successfully!");

        document.getElementById("subject").value = "";
        document.getElementById("question").value = "";

    } catch (error) {

        alert(error.message);

    }

}
function loadMyDoubts() {

    const doubtList = document.getElementById("doubtList");

    if (!doubtList) return;

    onSnapshot(

        query(
            collection(db, "doubts"),
            where("email", "==", auth.currentUser.email)
        ),

        (snapshot) => {

            doubtList.innerHTML = "";

            if (snapshot.empty) {

                doubtList.innerHTML = "<p>No Doubts Yet.</p>";
                return;

            }

            snapshot.forEach((document) => {

                const data = document.data();

                doubtList.innerHTML += `
                <div class="card" style="margin-top:15px;">

                    <h3>📘 ${data.subject}</h3>

                    <p><b>Question:</b> ${data.question}</p>

                    <p>
                        <b>Admin Reply:</b><br>
                        ${data.reply ? data.reply : "🟡 Waiting for Admin Reply..."}
                    </p>

                </div>
                `;

            });

        }

    );

}

auth.onAuthStateChanged((user) => {

    if (user) {

        loadMyDoubts();

    }

});