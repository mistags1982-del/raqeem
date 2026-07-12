import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
getFirestore,
doc,
setDoc
}
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";



const firebaseConfig = {

apiKey: "AIzaSyCJ01klR3ku0zBWSiwgY8eQECt7kJETboA",

authDomain: "raqeem-2ab23.firebaseapp.com",

projectId: "raqeem-2ab23",

storageBucket: "raqeem-2ab23.firebasestorage.app",

messagingSenderId: "404345905166",

appId: "1:404345905166:web:3809b83c0e56c1a6781c5f",

measurementId: "G-WLRG1M6HF6"

};



const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);



const registerBox = document.getElementById("register");

const loginBox = document.getElementById("login");

const title = document.getElementById("title");

const switchBtn = document.getElementById("switch");

const message = document.getElementById("message");



// تبديل تسجيل / دخول

switchBtn.onclick = () => {

registerBox.classList.toggle("hidden");

loginBox.classList.toggle("hidden");


if(registerBox.classList.contains("hidden")){

title.textContent = "تسجيل الدخول";

switchBtn.textContent = "ليس لديك حساب؟ إنشاء حساب";

}else{

title.textContent = "إنشاء حساب";

switchBtn.textContent = "لديك حساب؟ تسجيل الدخول";

}

};




// إنشاء حساب

document.getElementById("registerBtn").onclick = async()=>{


const userName =
document.getElementById("name").value.trim();


const userEmail =
document.getElementById("email").value.trim();


const userPassword =
document.getElementById("password").value;



if(!userName || !userEmail || !userPassword){

message.textContent = "أكمل جميع الحقول";

return;

}



try{


const result =
await createUserWithEmailAndPassword(

auth,

userEmail,

userPassword

);



await setDoc(

doc(db,"users",result.user.uid),

{

name:userName,

email:userEmail,

createdAt:new Date()

}

);



message.textContent="تم إنشاء الحساب بنجاح";


setTimeout(()=>{

location.href="index.html";

},1500);



}

catch(error){

console.error(error);

message.textContent =
"حدث خطأ: " + error.message;

}


};





// تسجيل الدخول

document.getElementById("loginBtn").onclick = async()=>{


const email =
document.getElementById("loginEmail").value.trim();


const password =
document.getElementById("loginPassword").value;



try{


await signInWithEmailAndPassword(

auth,

email,

password

);



message.textContent="تم تسجيل الدخول";


setTimeout(()=>{

location.href="index.html";

},1000);



}

catch(error){

console.error(error);

message.textContent =
"الإيميل أو كلمة المرور غير صحيحة";

}


};
