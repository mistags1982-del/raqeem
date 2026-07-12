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

  const db =
  getFirestore(app);



  function escapeHTML(value = "") {

    const div =
    document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

  }



  // HEADER

  const header =
  document.getElementById("header");


  function updateHeader() {

    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 20
    );

  }


  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  updateHeader();



  // REVEAL

  const revealElements =
  document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    revealElements.forEach(element => {

      element.classList.add(
        "reveal-ready"
      );

    });


    const observer =
    new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    }, {

      threshold: 0.03,

      rootMargin:
      "0px 0px 80px 0px"

    });


    revealElements.forEach(element => {

      observer.observe(element);

    });


    setTimeout(() => {

      revealElements.forEach(element => {

        const rect =
        element.getBoundingClientRect();

        if (
          rect.top <
          window.innerHeight
        ) {

          element.classList.add(
            "visible"
          );

        }

      });

    }, 200);

  }



  // POEMS

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
        post =>
        post.type === currentType
      );


    if (!filteredPosts.length) {

      grid.innerHTML = `

      <p class="loading">

      لا توجد نصوص في هذا القسم.

      </p>

      `;

      return;

    }


    filteredPosts.forEach(
      (post, index) => {


        const article =
        document.createElement(
          "article"
        );


        article.className = "card";


        const content =
        post.content || "";


        const excerpt =

        content.length > 150

        ? content.slice(0, 150) + "..."

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


        <a href="post.html?id=${encodeURIComponent(post.id)}">

        قراءة النص ←

        </a>

        </div>

        `;


        article.animate(

          [

            {
              opacity: 0,
              transform:
              "translateY(20px)"
            },

            {
              opacity: 1,
              transform:
              "translateY(0)"
            }

          ],

          {

            duration: 600,

            delay: index * 60,

            fill: "both",

            easing:
            "cubic-bezier(.2,.8,.2,1)"

          }

        );


        grid.appendChild(article);

      }

    );

  }



  filterButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {


        filterButtons.forEach(btn => {

          btn.classList.remove(
            "active"
          );

        });


        button.classList.add(
          "active"
        );


        currentType =
        button.dataset.type;


        renderPosts();

      }

    );

  });



  async function loadPosts() {

    try {


      const postsQuery =
      query(

        collection(db, "posts"),

        orderBy(
          "createdAt",
          "desc"
        )

      );


      const snapshot =
      await getDocs(postsQuery);


      posts =
      snapshot.docs.map(
        documentSnapshot => ({

          id:
          documentSnapshot.id,

          ...documentSnapshot.data()

        })
      );


      renderPosts();


    } catch (error) {


      console.error(
        "Posts error:",
        error
      );


      if (grid) {

        grid.innerHTML = `

        <p class="loading">

        تعذر تحميل النصوص.

        </p>

        `;

      }

    }

  }



  // POETS

  const poetsGrid =
  document.getElementById(
    "poetsGrid"
  );


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
          document.createElement(
            "article"
          );


          article.className =
          "poet-card";


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


          <a href="poet.html?id=${encodeURIComponent(documentSnapshot.id)}">

          صفحة الشاعر ←

          </a>

          `;


          article.animate(

            [

              {
                opacity: 0,

                transform:
                "translateY(20px)"
              },

              {
                opacity: 1,

                transform:
                "translateY(0)"
              }

            ],

            {

              duration: 600,

              delay: index * 70,

              fill: "both",

              easing:
              "cubic-bezier(.2,.8,.2,1)"

            }

          );


          poetsGrid.appendChild(
            article
          );

        }

      );


    } catch (error) {


      console.error(
        "Poets error:",
        error
      );


      poetsGrid.innerHTML = `

      <p class="loading">

      تعذر تحميل الشعراء.

      </p>

      `;

    }

  }



  await Promise.all([

    loadPosts(),

    loadPoets()

  ]);


})
.catch(error => {

  console.error(
    "Raqeem error:",
    error
  );

});
