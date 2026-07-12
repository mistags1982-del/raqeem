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


  // =========================
  // حماية النص
  // =========================

  function escapeHTML(value = "") {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
  }


  // =========================
  // الهيدر الزجاجي
  // =========================

  const header = document.getElementById("header");

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 25) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  // =========================
  // حركة ظهور الأقسام
  // =========================

  const revealElements =
    document.querySelectorAll(".reveal");

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  // =========================
  // القصائد
  // =========================

  const grid =
    document.getElementById("poemGrid");

  const filterButtons =
    document.querySelectorAll(".filter");

  let posts = [];

  let currentType = "all";


  function renderPosts() {

    if (!grid) return;

    grid.innerHTML = "";

    const filteredPosts =
      currentType === "all"
        ? posts
        : posts.filter(
            post => post.type === currentType
          );

    if (filteredPosts.length === 0) {

      grid.innerHTML = `
        <p class="loading">
          لا توجد نصوص في هذا القسم.
        </p>
      `;

      return;
    }


    filteredPosts.forEach((post, index) => {

      const article =
        document.createElement("article");

      article.className = "card";

      article.style.opacity = "0";

      article.style.transform =
        "translateY(25px)";


      const content =
        post.content || "";

      const excerpt =
        content.length > 150
          ? content.substring(0, 150) + "..."
          : content;


      article.innerHTML = `

        <div class="card-body">

          <small>
            ${escapeHTML(
              post.author || "رقيم"
            )}
          </small>

          <h3>
            ${escapeHTML(
              post.title || "بلا عنوان"
            )}
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


      setTimeout(() => {

        article.style.transition =
          "opacity .7s ease, transform .7s cubic-bezier(.2,.8,.2,1)";

        article.style.opacity = "1";

        article.style.transform =
          "translateY(0)";

      }, index * 80);

    });

  }


  filterButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        filterButtons.forEach(btn => {
          btn.classList.remove("active");
        });

        button.classList.add("active");

        currentType =
          button.dataset.type;

        renderPosts();

      }
    );

  });


  async function loadPosts() {

    try {

      const postsQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc")
      );

      const snapshot =
        await getDocs(postsQuery);

      posts = snapshot.docs.map(
        documentSnapshot => ({
          id: documentSnapshot.id,
          ...documentSnapshot.data()
        })
      );

      renderPosts();

    } catch (error) {

      console.error(error);

      if (grid) {

        grid.innerHTML = `
          <p class="loading">
            تعذر تحميل النصوص.
          </p>
        `;

      }

    }

  }


  // =========================
  // الشعراء
  // =========================

  const poetsGrid =
    document.getElementById("poetsGrid");


  async function loadPoets() {

    if (!poetsGrid) return;

    poetsGrid.innerHTML = "";

    try {

      const snapshot =
        await getDocs(
          collection(db, "poets")
        );


      if (snapshot.empty) {

        poetsGrid.innerHTML = `
          <p class="loading">
            لا يوجد شعراء حاليًا.
          </p>
        `;

        return;

      }


      snapshot.docs.forEach(
        (documentSnapshot, index) => {

          const poet =
            documentSnapshot.data();

          const article =
            document.createElement("article");

          article.className = "poet-card";

          article.style.opacity = "0";

          article.style.transform =
            "translateY(25px)";


          article.innerHTML = `

            <div>

              <h3>
                ${escapeHTML(
                  poet.name || "شاعر"
                )}
              </h3>

              <p>
                ${escapeHTML(
                  poet.style ||
                  "صوت شعري في رقيم"
                )}
              </p>

            </div>

            <a href="poet.html?id=${documentSnapshot.id}">
              صفحة الشاعر ←
            </a>

          `;


          poetsGrid.appendChild(article);


          setTimeout(() => {

            article.style.transition =
              "opacity .7s ease, transform .7s cubic-bezier(.2,.8,.2,1)";

            article.style.opacity = "1";

            article.style.transform =
              "translateY(0)";

          }, index * 90);

        }
      );

    } catch (error) {

      console.error(error);

      poetsGrid.innerHTML = `
        <p class="loading">
          تعذر تحميل الشعراء.
        </p>
      `;

    }

  }


  // =========================
  // تشغيل الموقع
  // =========================

  await Promise.all([
    loadPosts(),
    loadPoets()
  ]);

})
.catch(error => {

  console.error(
    "Raqeem initialization error:",
    error
  );

});
