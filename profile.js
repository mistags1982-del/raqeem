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

apiKey:"AIzaSyCJ01klR3ku0zBWSiwgY8eQECt7kJETboA",

authDomain:"raqeem-2ab23.firebaseapp.com",

projectId:"raqeem-2ab23",

storageBucket:"raqeem-2ab23.firebasestorage.app",

messagingSenderId:"404345905166",

appId:"1:404345905166:web:3809b83c0e56c1a6781c5f"

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




// بيانات Firebase Auth

document.getElementById("name").textContent =

user.displayName || "مستخدم رقيم";


document.getElementById("photo").src =

user.photoURL ||

"https://i.imgur.com/6VBx3io.png";





// جلب بيانات Firestore

const userRef =

doc(db,"users",user.uid);



const snapshot =

await getDoc(userRef);




if(snapshot.exists()){


const data =
snapshot.data();



document.getElementById("bio").textContent =

data.bio ||

"كاتب في رقيم";



document.getElementById("followers").textContent =

data.followers || 0;



document.getElementById("following").textContent =

data.following || 0;



document.getElementById("posts").textContent =

data.posts || 0;



}

else{


// إنشاء بيانات أولية

console.log(
"لا يوجد ملف مستخدم"
);


}



});
