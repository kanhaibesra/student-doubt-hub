import { auth, db } from "./firebase.js";

import {
    collection,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

function loadDoubts() {

    const doubtList = document.getElementById("adminDoubtList");
    const totalDoubts = document.getElementById("totalDoubts");

    onSnapshot(collection(db, "doubts"), (querySnapshot) => {

        doubtList.innerHTML = "";
        totalDoubts.textContent = querySnapshot.size;

        if (querySnapshot.empty) {
            doubtList.innerHTML = "<p>No Doubts Found.</p>";
            return;
        }

        querySnapshot.forEach((document) => {

            const data = document.data();

            doubtList.innerHTML += `
            <div class="card" style="margin-top:15px;">

                <h3>📘 ${data.subject}</h3>

                <p><b>Question:</b> ${data.question}</p>

                <p><b>Email:</b> ${data.email}</p>

                <textarea
                    id="reply-${document.id}"
                    placeholder="Write reply..."
                    rows="3"
                    style="width:100%;margin-top:10px;">${data.reply || ""}</textarea>

                <br><br>

                <button
                    class="btn"
                    onclick="sendReply('${document.id}')">

                    📩 Send Reply

                </button>

                <br><br>

                <button
                    class="btn"
                    onclick="deleteDoubt('${document.id}')">

                    🗑 Delete

                </button>

            </div>
            `;

        });

    });

}

loadDoubts();

window.sendReply = async function(id){

    const reply = document.getElementById("reply-" + id).value.trim();

    if(reply === ""){

        alert("Write a reply first.");

        return;

    }

    try{

        await updateDoc(doc(db,"doubts",id),{

            reply: reply

        });

        alert("✅ Reply Sent");

    }catch(error){

        alert(error.message);

    }

};

window.deleteDoubt = async function(id){

    const ok = confirm("Delete this doubt?");

    if(!ok) return;

    try{

        await deleteDoc(doc(db,"doubts",id));

        alert("✅ Doubt Deleted");

    }catch(error){

        alert(error.message);

    }

};

window.adminLogout = async function(){

    try{

        await signOut(auth);

        alert("✅ Logged Out Successfully");

        window.location.href = "admin.html";

    }catch(error){

        alert(error.message);

    }

};