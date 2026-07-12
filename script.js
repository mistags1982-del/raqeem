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





function escapeHTML(value=""){

const div=document.createElement("div");

div.textContent=value;

return div.innerHTML;

}







// =================
// القصائد
// =================


const grid = document.getElementById("poemGrid");

const filterButtons =
document.querySelectorAll(".filter");


let posts=[];

let currentType="all";




function renderPosts(){


if(!grid) return;


grid.innerHTML="";



const filteredPosts =
currentType==="all"
?
posts
:
posts.filter(post=>post.type===currentType);



if(filteredPosts.length===0){

grid.innerHTML =
"<p>لا توجد نصوص في هذا القسم.</p>";

return;

}



filteredPosts.forEach(post=>{


const article=document.createElement("article");

article.className="card";



const content=post.content || "";

const excerpt =
content.length>150
?
content.substring(0,150)+"..."
:
content;



article.innerHTML=`

<div class="card-body">


<small>
${escapeHTML(post.author || "رقيم")}
</small>


<h3>
${escapeHTML(post.title || "بلا عنوان")}
</h3>


<p>
${escapeHTML(excerpt)}
</p>


<a href="post.html?id=${post.id}">
قراءة النص ←
</a>


</div>

`;



grid.appendChild(article);



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


const postsQuery=query(

collection(db,"posts"),

orderBy("createdAt","desc")

);



const snapshot=await getDocs(postsQuery);



posts=snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));


renderPosts();



}catch(error){

console.error(error);


if(grid)

grid.innerHTML=
"<p>تعذر تحميل النصوص.</p>";

}


}



loadPosts();









// =================
// الشعراء
// =================



const poetsGrid =
document.getElementById("poetsGrid");




async function loadPoets(){


if(!poetsGrid) return;



poetsGrid.innerHTML="";



try{


const snapshot =
await getDocs(
collection(db,"poets")
);



if(snapshot.empty){


poetsGrid.innerHTML=
"<p>لا يوجد شعراء حالياً.</p>";


return;

}




snapshot.forEach(doc=>{


const poet=doc.data();



poetsGrid.innerHTML += `


<article class="card">


<div class="card-body">


<h3>

${escapeHTML(poet.name || "شاعر")}

</h3>


<p>

${escapeHTML(poet.style || "")}

</p>



<a href="poet.html?id=${doc.id}">

صفحة الشاعر ←

</a>


</div>


</article>


`;



});



}catch(error){


console.error(error);


poetsGrid.innerHTML=
"<p>تعذر تحميل الشعراء.</p>";

}



}




loadPoets();





});
