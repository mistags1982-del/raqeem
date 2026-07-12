import {
initializeApp
}
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";


import {

getAuth,
onAuthStateChanged

}
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";


import {

getFirestore,
doc,
getDoc

}
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";



const firebaseConfig = {

apiKey:
"AIzaSyCJ01klR3ku0zBWSiwgY8eQECt7kJETboA",

authDomain:
"raqeem-2ab23.firebaseapp.com",

projectId:
"raqeem-2ab23",

storageBucket:
"raqeem-2ab23.firebasestorage.app",

messagingSenderId:
"404345905166",

appId:
"1:404345905166:web:3809b83c0e56c1a6781c5f"

};



const app =
initializeApp(firebaseConfig);



const auth =
getAuth(app);



const db =
getFirestore(app);





onAuthStateChanged(auth, async(user)=>{


if(!user){

location.href="auth.html";

return;

}




const userRef =
doc(db,"users",user.uid);



const snap =
await getDoc(userRef);



let data = {};



if(snap.exists()){

data = snap.data();

}




// الصورة

document.getElementById("photo").src =

data.photo ||

user.photoURL ||

"https://i.imgur.com/6VBx3io.png";





// الاسم

document.getElementById("name").textContent =

data.name ||

user.displayName ||

user.email.split("@")[0];





// اليوزر

document.getElementById("username").textContent =

data.username ?

"@" + data.username

:

"@" + user.email.split("@")[0];





// النبذة

document.getElementById("bio").textContent =

data.bio ||

"كاتب في رقيم";





// الأرقام

document.getElementById("followers").textContent =

data.followers || 0;



document.getElementById("following").textContent =

data.following || 0;



document.getElementById("posts").textContent =

data.posts || 0;



});
