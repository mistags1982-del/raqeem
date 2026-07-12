import { initializeApp }
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



const firebaseConfig = {

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



const message=document.getElementById("message");



// Google Login

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



message.textContent="تم الدخول";


setTimeout(()=>{

location.href="index.html";

},1000);



}

catch(e){

console.error(e);

message.textContent=e.message;

}


};




// تبديل

switch.onclick=()=>{


register.classList.toggle("hidden");

login.classList.toggle("hidden");


if(login.classList.contains("hidden")){

title.textContent="إنشاء حساب";

switch.textContent="لديك حساب؟ تسجيل الدخول";

}else{

title.textContent="تسجيل الدخول";

switch.textContent="ليس لديك حساب؟ إنشاء حساب";

}


};





// إنشاء بالإيميل

registerBtn.onclick=async()=>{


try{


const result=
await createUserWithEmailAndPassword(

auth,

email.value.trim(),

password.value

);



await setDoc(

doc(db,"users",result.user.uid),

{

name:name.value,

email:email.value,

createdAt:new Date()

}

);



location.href="index.html";


}

catch(e){

message.textContent=e.message;

}


};





// دخول بالإيميل

loginBtn.onclick=async()=>{


try{


await signInWithEmailAndPassword(

auth,

loginEmail.value.trim(),

loginPassword.value

);



location.href="index.html";


}

catch(e){

message.textContent=e.message;

}


};
