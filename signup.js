import { auth } from "./firebase.js";

import {
createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const signupBtn=document.getElementById("signupBtn");

signupBtn.addEventListener("click",()=>{

const name=document.getElementById("fullName").value;

const email=document.getElementById("email").value;

const password=document.getElementById("password").value;

const confirmPassword=document.getElementById("confirmPassword").value;

if(name==="" || email==="" || password===""){

alert("Please fill all fields.");

return;

}

if(password!==confirmPassword){

alert("Passwords do not match.");

return;

}

createUserWithEmailAndPassword(auth,email,password)

.then((userCredential)=>{

const user=userCredential.user;

alert("✅ Account Created Successfully");

localStorage.setItem("student",email);

localStorage.setItem("profileName",name);

window.location.href="dashboard.html";

})

.catch((error)=>{

alert(error.message);

});

});