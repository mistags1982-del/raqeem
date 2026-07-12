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

apiKey:"AIzaSyCJklR3ku0zBWSiwgY8eQECt7kJETboA",

authDomain:"raqeem-2ab23.firebaseapp.com",

projectId:"raqeem-2ab23",

storageBucket:"raqeem-2ab23.firebasestorage.app",

messagingSenderId:"404345905166",

appId:"1:404345905166:web:3809b83c0e56c1a6781c5f"

};


const app = initializeApp(firebaseConfig);

const auth=getAuth(app);

const db=getFirestore(app);



const register=document.getElementById("register");

const login=document.getElementById("login");

const title=document.getElementById("title");

const message=document.getElementById("message");

const switchBtn=document.getElementById("switch");



switchBtn.onclick=()=>{


register.classList.toggle("hidden");

login.classList.toggle("hidden");


if(register.classList.contains("hidden")){

title.textContent="تسجيل الدخول";

switchBtn.textContent="ليس لديك حساب؟ إنشاء حساب";

}else{

title.textContent="إنشاء حساب";

switchBtn.textContent="لديك حساب؟ تسجيل الدخول";

}


};



document.getElementById("registerBtn").onclick=async()=>{


try{


const userCredential =
await createUserWithEmailAndPassword(

auth,

email.value,

password.value

);


await setDoc(

doc(db,"users",userCredential.user.uid),

{

name:name.value,

email:email.value,

createdAt:new Date()

}

);


message.textContent="تم إنشاء الحساب";


setTimeout(()=>{

location.href="index.html";

},1500);



}catch(e){

message.textContent="حدث خطأ: "+e.message;

}


};



document.getElementById("loginBtn").onclick=async()=>{


try{


await signInWithEmailAndPassword(

auth,

loginEmail.value,

loginPassword.value

);


location.href="index.html";


}catch(e){

message.textContent="بيانات الدخول غير صحيحة";

}


};
