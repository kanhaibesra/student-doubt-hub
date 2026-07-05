/* ==========================
   Student Doubt Hub
   Clean Script.js
========================== */

/* --------------------------
   Mobile Menu
-------------------------- */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

/* --------------------------
   Dark / Light Mode
-------------------------- */
const themeBtn = document.getElementById("theme-toggle");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            themeBtn.innerHTML = "☀️";
        } else {
            themeBtn.innerHTML = "🌙";
        }

    });
}

/* --------------------------
   Scroll To Top
-------------------------- */
const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (document.documentElement.scrollTop > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

/* --------------------------
   Show / Hide Password
-------------------------- */
const passwordInput = document.getElementById("password");
const showPasswordBtn = document.getElementById("showPassword");

if (passwordInput && showPasswordBtn) {

    showPasswordBtn.addEventListener("click", () => {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";
            showPasswordBtn.innerHTML = "Hide Password";

        } else {

            passwordInput.type = "password";
            showPasswordBtn.innerHTML = "Show Password";

        }

    });

}

/* --------------------------
   Login Function
-------------------------- */
function loginUser() {

    const email = document.getElementById("email");
    const password = document.getElementById("password");
console.log(email);
console.log(password);

console.log(email.value);
console.log(password.value);
    if (!email || !password) {
        alert("Input fields not found.");
        return;
    }

    if (email.value.trim() === "" || password.value.trim() === "") {

        alert("Please fill all fields.");
        return;

    }

    localStorage.setItem("student", email.value);

    alert("Login Successful 🎉");

    window.location.href = "dashboard.html";

}

/* --------------------------
   Dashboard Welcome
-------------------------- */
const welcome = document.getElementById("welcome");

if (welcome) {

    const student = localStorage.getItem("student");

    if (student) {

        welcome.innerHTML =
            "Logged in as : <b>" + student + "</b>";

    } else {

        welcome.innerHTML = "Welcome Student";

    }

}
if(window.location.pathname.includes("dashboard.html")){

const student=localStorage.getItem("student");

if(!student){

alert("Please Login First");

window.location.href="login.html";

}

}
function searchCourse(){

const input=document.getElementById("searchCourse");

if(!input) return;

const filter=input.value.toUpperCase();

const cards=document.getElementsByClassName("course-card");

for(let i=0;i<cards.length;i++){

const text=cards[i].innerText;

if(text.toUpperCase().indexOf(filter)>-1){

cards[i].style.display="block";

}else{

cards[i].style.display="none";

}

}

}
function searchCourse(){

const input=document.getElementById("searchCourse");

if(!input) return;

const filter=input.value.toUpperCase();

const cards=document.getElementsByClassName("course-card");

for(let i=0;i<cards.length;i++){

const text=cards[i].innerText;

if(text.toUpperCase().indexOf(filter)>-1){

cards[i].style.display="block";

}else{

cards[i].style.display="none";

}

}

}
/* =======================
   QUIZ SYSTEM
======================= */
let timer = 5;
let interval;
const quizData = [

{
question:"Speed ki SI Unit kya hai?",
options:["Meter","Second","Meter/Second","Newton"],
answer:2
},

{
question:"Light ki speed kitni hoti hai?",
options:["3×10⁸ m/s","5×10⁶ m/s","1500 m/s","300 m/s"],
answer:0
},

{
question:"Earth ka natural satellite kaun hai?",
options:["Mars","Moon","Sun","Jupiter"],
answer:1
}

];

let currentQuestion=0;

let score=0;

function loadQuestion(){

if(!document.getElementById("question")) return;

document.getElementById("question").innerHTML=

quizData[currentQuestion].question;

for(let i=0;i<4;i++){

document.getElementById("option"+i).innerHTML=

quizData[currentQuestion].options[i];
document.getElementById("progress").innerHTML =
"Question " + (currentQuestion + 1) + " / " + quizData.length;

document.getElementById("nextBtn").disabled = true;

clearInterval(interval);

timer = 5;

document.getElementById("timer").innerHTML = timer;

interval = setInterval(() => {

timer--;

document.getElementById("timer").innerHTML = timer;

if(timer <= 0){

clearInterval(interval);

nextQuestion();

}

},1000);

const buttons = document.querySelectorAll(".option-btn");

buttons.forEach(btn => {

btn.classList.remove("correct","wrong");

btn.disabled = false;

});
}

document.getElementById("score").innerHTML=

"Score : "+score;

}

function checkAnswer(selected){

if(selected===quizData[currentQuestion].answer){

score++;

alert("✅ Correct");

}else{

alert("❌ Wrong");

}

}

function nextQuestion(){

currentQuestion++;

if(currentQuestion >= quizData.length){

    localStorage.setItem("quizScore", score);

    alert("Quiz Finished 🎉");

    alert("Final Score : "+score+"/"+quizData.length);

    window.location.href="dashboard.html";

    return;
}

loadQuestion();

}

loadQuestion();
/* ======================
PROFILE
====================== */

const studentEmail = document.getElementById("studentEmail");

const studentName = document.getElementById("studentName");

if(studentEmail){

const email = localStorage.getItem("student");

studentEmail.innerHTML = "📧 " + email;

if(email){

studentName.innerHTML = email.split("@")[0];

const quizScore = document.getElementById("quizScore");

if(quizScore){

    quizScore.innerHTML = localStorage.getItem("quizScore") || 0;

}
}

}
/* ======================
   EDIT PROFILE
====================== */

const profileImg = document.querySelector(".profile-img");

if(profileImg){

const savedImage = localStorage.getItem("profileImage");

if(savedImage){

profileImg.src = savedImage;

}

const savedName = localStorage.getItem("profileName");

if(savedName){

studentName.innerHTML = savedName;

document.getElementById("nameInput").value = savedName;

}

}
function saveProfile(){
console.log(document.getElementById("profileImage").files);
const name = document.getElementById("nameInput").value;

if(name){

localStorage.setItem("profileName",name);

studentName.innerHTML=name;

}

const file=document.getElementById("profileImage").files[0];
console.log(file);
if(file){

const reader=new FileReader();

reader.onload=function(e){

localStorage.setItem("profileImage",e.target.result);

profileImg.src=e.target.result;

}

reader.readAsDataURL(file);

}

alert("✅ Profile Saved Successfully");

}
/* ======================
   ASK DOUBT SYSTEM
====================== */

function saveDoubt() {

    const subject = document.getElementById("subject").value.trim();
    const question = document.getElementById("question").value.trim();

    if(subject === "" || question === ""){
        alert("Please fill all fields.");
        return;
    }

    let doubts = JSON.parse(localStorage.getItem("doubts")) || [];

    doubts.push({
        subject: subject,
        question: question,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("doubts", JSON.stringify(doubts));

    document.getElementById("subject").value = "";
    document.getElementById("question").value = "";

    loadDoubts();

    alert("✅ Doubt Submitted Successfully!");
}

function loadDoubts(){

    const doubtList = document.getElementById("doubtList");

    if(!doubtList) return;

    let doubts = JSON.parse(localStorage.getItem("doubts")) || [];

    doubtList.innerHTML = "";

    if(doubts.length === 0){
        doubtList.innerHTML = "<p>No doubts submitted yet.</p>";
        return;
    }

    doubts.forEach((doubt,index)=>{

        doubtList.innerHTML += `
        <div class="doubt-card">

            <h3>${doubt.subject}</h3>

            <p>${doubt.question}</p>

            <small>${doubt.date}</small>

            <br><br>

            <button class="btn" onclick="deleteDoubt(${index})">
                🗑 Delete
            </button>

        </div>
        `;

    });

}

function deleteDoubt(index){

    let doubts = JSON.parse(localStorage.getItem("doubts")) || [];

    doubts.splice(index,1);

    localStorage.setItem("doubts", JSON.stringify(doubts));

    loadDoubts();

}

loadDoubts();
/* ======================
   NOTES SEARCH
====================== */

function searchNotes(){

const input=document.getElementById("searchNotes");

if(!input) return;

const filter=input.value.toUpperCase();

const cards=document.getElementsByClassName("note-card");

for(let i=0;i<cards.length;i++){

const text=cards[i].innerText;

if(text.toUpperCase().indexOf(filter)>-1){

cards[i].style.display="block";

}else{

cards[i].style.display="none";

}

}

}
/* ======================
PDF SYSTEM
====================== */

function previewPDF(file){

window.location.href="view-pdf.html?file="+file;

}

function downloadPDF(subject){

let count=localStorage.getItem(subject+"Download") || 0;

count++;

localStorage.setItem(subject+"Download",count);

document.getElementById(subject+"Count").innerHTML=count;

window.open("notes/"+subject+".pdf","_blank");

}

window.onload=function(){

const physics=document.getElementById("physicsCount");

if(physics){

physics.innerHTML=

localStorage.getItem("physicsDownload") || 0;

}

}
/* ======================
   ADMIN PANEL
====================== */

function adminLogin(){

const username =
document.getElementById("adminUsername").value;

const password =
document.getElementById("adminPassword").value;

if(username==="admin" && password==="12345"){

localStorage.setItem("admin","true");

window.location.href="admin-dashboard.html";

}else{

alert("Invalid Username or Password");

}

}

function adminLogout(){

localStorage.removeItem("admin");

window.location.href="admin.html";

}
/* ======================
   ADMIN DOUBTS
====================== */

function loadAdminDoubts(){

const list=document.getElementById("adminDoubtList");

if(!list) return;

const doubts=JSON.parse(localStorage.getItem("doubts")) || [];

list.innerHTML="";

if(doubts.length===0){

list.innerHTML="<p>No Doubts Found.</p>";

return;

}

doubts.forEach((doubt,index)=>{

list.innerHTML+=`

<div class="admin-doubt">

<h3>📚 ${doubt.subject}</h3>

<p>${doubt.question}</p>

<small>${doubt.date}</small>

<br><br>

<button class="btn" onclick="deleteAdminDoubt(${index})">

🗑 Delete

</button>

</div>

`;

});

}

function deleteAdminDoubt(index){

let doubts=JSON.parse(localStorage.getItem("doubts")) || [];

doubts.splice(index,1);

localStorage.setItem("doubts",JSON.stringify(doubts));

loadAdminDoubts();

}

loadAdminDoubts();