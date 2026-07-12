import {
getAuth,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";


const auth = getAuth();


const userArea =
document.getElementById("userArea");



onAuthStateChanged(auth,(user)=>{


if(!userArea) return;



if(user){


userArea.innerHTML = `

<a href="profile.html" class="user-mini">


<img src="${
user.photoURL ||
'https://i.imgur.com/6VBx3io.png'
}">


<span>

${

user.displayName ||

user.email.split("@")[0]

}

</span>


</a>

`;



}

else{


userArea.innerHTML = `

<a href="auth.html">

دخول

</a>

`;

}


});
