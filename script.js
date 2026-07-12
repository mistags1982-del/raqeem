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
  const filterButtons = document.querySelectorAll(".filter");

  let posts = [];
  let currentType = "all";

  function escapeHTML(value = "") {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
  }

  function renderPosts() {

    grid.innerHTML = "";

    const filteredPosts = currentType === "all"
      ? posts
      : posts.filter(post => post.type === currentType);

    if (filteredPosts.length === 0) {
      grid.innerHTML = "<p>لا توجد نصوص في هذا القسم.</p>";
      return;
    }

    filteredPosts.forEach(post => {

      const article = document.createElement("article");

      article.className = "card";

      const content = post.content || "";

      const excerpt = content.length > 150
        ? content.substring(0, 150) + "..."
        : content;

      article.innerHTML = `
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

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      filterButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      currentType = button.dataset.type;

      renderPosts();

    });

  });

  try {

    const postsQuery = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(postsQuery);

    posts = snapshot.docs.map(documentSnapshot => ({
      id: documentSnapshot.id,
      ...documentSnapshot.data()
    }));

    renderPosts();

  } catch (error) {

    console.error(error);

    grid.innerHTML = "<p>تعذر تحميل النصوص.</p>";

  }

});
