import("https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js")
.then(async ({ initializeApp }) => {

const {
getFirestore,
collection,
getDocs,
query,
orderBy
} = await import(
"https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js"
);


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



const grid = document.getElementById("poemGrid");

const poetsGrid = document.getElementById("poetsGrid");



function escapeHTML(text=""){

const div=document.createElement("div");

div.textContent=text;

return div.innerHTML;

}



// تحميل الشعراء

async function loadPoets(){

if(!poetsGrid) return;


try{


const snap = await getDocs(
collection(db,"poets")
);



poetsGrid.innerHTML="";



if(snap.empty){

poetsGrid.innerHTML="<p>لا يوجد شعراء حالياً</p>";

return;

}



snap.forEach(item=>{


const poet=item.data();



poetsGrid.innerHTML += `

<article class="card">

<div class="card-body">

<h3>
${escapeHTML(poet.name)}
</h3>

<p>
${escapeHTML(poet.style || "")}
</p>


<a href="poet.html?name=${encodeURIComponent(poet.name)}">

صفحة الشاعر ←

</a>

</div>

</article>

`;

});


}

catch(error){

console.log(error);

poetsGrid.innerHTML="<p>خطأ في تحميل الشعراء</p>";

}


}




// تحميل القصائد

async function loadPosts(){


if(!grid) return;


try{


const q=query(

collection(db,"posts"),

orderBy("createdAt","desc")

);



const snap=await getDocs(q);


grid.innerHTML="";


snap.forEach(item=>{


const post=item.data();



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

</p>


<a href="post.html?id=${item.id}">

قراءة النص ←

</a>


</div>


</article>


`;


});


}


catch(error){

console.log(error);

grid.innerHTML="<p>تعذر تحميل النصوص</p>";

}


}





loadPosts();

loadPoets();


});
