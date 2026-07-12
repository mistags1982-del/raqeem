import {initializeApp}
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";


import {

getAuth,
GoogleAuthProvider,
signInWithPopup,
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



const firebaseConfig={

apiKey:"AIzaSyCJ01klR3ku0zBWSiwgY8eQECt7kJETboA",

authDomain:"raqeem-2ab23.firebaseapp.com",

projectId:"raqeem-2ab23",

storageBucket:"raqeem-2ab23.firebasestorage.app",

messagingSenderId:"404345905166",

appId:"1:404345905166:web:3809b83c0e56c1a6781c5f",

measurementId:"G-WLRG1M6HF6"

};



const app=initializeApp(firebaseConfig);

const auth=getAuth(app);

const db=getFirestore(app);



const msg=document.getElementById("msg");



// Google

document.getElementById("googleBtn").onclick=async()=>{

try{

const provider=new GoogleAuthProvider();

const result=
await signInWithPopup(auth,provider);


const user=result.user;


await setDoc(

doc(db,"users",user.uid),

{
name:user.displayName,
email:user.email,
photo:user.photoURL,
createdAt:new Date()
},

{
merge:true
}

);


location.href="index.html";


}catch(e){

console.log(e);

msg.textContent=e.code;

}

};




// إنشاء حساب

document.getElementById("registerBtn").onclick=async()=>{


try{


const user =
await createUserWithEmailAndPassword(

auth,

document.getElementById("email").value.trim(),

document.getElementById("password").value

);



await setDoc(

doc(db,"users",user.user.uid),

{

name:document.getElementById("name").value,

email:user.user.email,

createdAt:new Date()

}

);


location.href="index.html";


}catch(e){

console.log(e);

msg.textContent=e.code;

}

};




// دخول

document.getElementById("loginBtn").onclick=async()=>{


try{


await signInWithEmailAndPassword(

auth,

loginEmail.value.trim(),

loginPassword.value

);


location.href="index.html";


}catch(e){

console.log(e);

msg.textContent=e.code;

}

};




// تبديل

document.getElementById("switch").onclick=()=>{


register.classList.toggle("hidden");

login.classList.toggle("hidden");


};
