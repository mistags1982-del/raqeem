import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";


import {

getFirestore,
collection,
getDocs,
query,
orderBy,
addDoc,
serverTimestamp

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



const app = initializeApp(firebaseConfig);

const db = getFirestore(app);





// القصائد

const grid = document.getElementById("poemGrid");

const filterButtons = document.querySelectorAll(".filter");


let posts = [];

let currentType="all";




function escapeHTML(value=""){

const div=document.createElement("div");

div.textContent=value;

return div.innerHTML;

}




function renderPosts(){


grid.innerHTML="";


let filtered =
currentType==="all"
?
posts
:
posts.filter(post=>post.type===currentType);



if(filtered.length===0){

grid.innerHTML="<p>لا توجد نصوص حالياً</p>";

return;

}



filtered.forEach(post=>{


grid.innerHTML += `


<article class="card">


<div class="card-body">


<small>
${escapeHTML(post.author || "رقيم")}
</small>


<h3>
${escapeHTML(post.title)}
</h3>


<p>

${escapeHTML(
(post.content || "").substring(0,150)
)}

...

</p>


<a href="post.html?id=${post.id}">
قراءة النص ←
</a>


</div>


</article>


`;



});


}





filterButtons.forEach(button=>{


button.onclick=()=>{


filterButtons.forEach(btn=>{

btn.classList.remove("active");

});


button.classList.add("active");


currentType=button.dataset.type;


renderPosts();


};


});






async function loadPosts(){


try{


const q=query(

collection(db,"posts"),

orderBy("createdAt","desc")

);



const snap=await getDocs(q);



posts=snap.docs.map(doc=>({

id:doc.id,

...doc.data()

}));



renderPosts();


}

catch(e){

console.log(e);

grid.innerHTML="تعذر تحميل النصوص";

}


}



loadPosts();







// الشعراء


const poetsGrid=document.getElementById("poetsGrid");



async function loadPoets(){


if(!poetsGrid) return;



poetsGrid.innerHTML="";



const snap=await getDocs(

collection(db,"poets")

);



if(snap.empty){

poetsGrid.innerHTML=
"<p>لا يوجد شعراء حالياً</p>";

return;

}



snap.forEach(doc=>{


const poet=doc.data();



poetsGrid.innerHTML += `


<article class="card">


<h3>

${escapeHTML(poet.name)}

</h3>


<p>

${escapeHTML(poet.style || "")}

</p>



<a href="poet.html?id=${doc.id}">

صفحة الشاعر ←

</a>



</article>



`;



});


}



loadPoets();







// إرسال القصائد للمراجعة


const sendPoem=document.getElementById("sendPoem");



if(sendPoem){


sendPoem.onclick=async()=>{


const name=
document.getElementById("senderName").value.trim();


const title=
document.getElementById("poemTitle").value.trim();


const type=
document.getElementById("poemType").value;


const content=
document.getElementById("poemContent").value.trim();



const message=
document.getElementById("sendMessage");



if(!name || !title || !content){


message.innerHTML=
"أكمل جميع الحقول";


return;

}




try{


await addDoc(

collection(db,"pendingPosts"),

{


author:name,

title:title,

type:type,

content:content,

status:"pending",

createdAt:serverTimestamp()


}

);



message.innerHTML=
"تم إرسال القصيدة للمراجعة";



document.getElementById("senderName").value="";

document.getElementById("poemTitle").value="";

document.getElementById("poemContent").value="";



}

catch(e){


console.log(e);


message.innerHTML=
"حدث خطأ أثناء الإرسال";


}



};


}
