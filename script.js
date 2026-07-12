import("https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js")
.then(async ({ initializeApp }) => {

  const { getFirestore, collection, getDocs, query, orderBy } =
  await import("https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js");

  const firebaseConfig = {
    apiKey: "AIzaSyCJ01klR3ku0zBWSiwgY8eQECt7kJETboA",
    authDomain: "raqeem-2ab23.firebaseapp.com",
    projectId: "raqeem-2ab23",
    storageBucket: "raqeem-2ab23.firebasestorage.app",
    messagingSenderId: "404345905166",
    appId: "1:404345905166:web:3809b83c0e56c1a6781c5f"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const grid = document.getElementById("poemGrid");

  grid.innerHTML = "<p>جارٍ تحميل النصوص...</p>";

  try {

    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    grid.innerHTML = "";

    if(snapshot.empty){
      grid.innerHTML = "<p>لا توجد نصوص منشورة بعد.</p>";
      return;
    }

    snapshot.forEach(doc => {

      const post = doc.data();

      const article = document.createElement("article");
      article.className = "card";

      const excerpt = post.content.length > 150
        ? post.content.substring(0,150) + "..."
        : post.content;

      article.innerHTML = `
        <div class="card-body">
          <small>${post.author || "رقيم"}</small>
          <h3>${post.title}</h3>
          <p>${excerpt}</p>
          <a href="post.html?id=${doc.id}">
            قراءة النص ←
          </a>
        </div>
      `;

      grid.appendChild(article);

    });

  } catch(error) {

    console.error(error);

    grid.innerHTML =
      "<p>تعذر تحميل النصوص.</p>";

  }

});
