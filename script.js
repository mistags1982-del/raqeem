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

    const postsQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(postsQuery);

    grid.innerHTML = "";

    if (snapshot.empty) {
      grid.innerHTML = "<p>لا توجد نصوص منشورة بعد.</p>";
      return;
    }

    snapshot.forEach((documentSnapshot) => {

      const post = documentSnapshot.data();

      const article = document.createElement("article");

      article.className = "card";

      const content = post.content || "";

      const excerpt =
        content.length > 150
        ? content.substring(0, 150) + "..."
        : content;

      article.innerHTML = `
        <div class="card-body">
          <small>${post.author || "رقيم"}</small>

          <h3>${post.title || "بلا عنوان"}</h3>

          <p>${excerpt}</p>

          <a href="post.html?id=${documentSnapshot.id}">
            قراءة النص ←
          </a>
        </div>
      `;

      grid.appendChild(article);

    });

  } catch (error) {

    console.error(error);

    grid.innerHTML =
      "<p>تعذر تحميل النصوص.</p>";

  }

});
