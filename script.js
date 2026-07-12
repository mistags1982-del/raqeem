const grid=document.getElementById('poemGrid');
function draw(filter='all'){
 grid.innerHTML='';
 poems.filter(p=>filter==='all'||p.category===filter).forEach((p,i)=>{
  const el=document.createElement('article');el.className='card';
  el.innerHTML=`${p.image?`<img src="${p.image}" alt="${p.title}">`:''}<div class="card-body"><small>${p.category}</small><h3>${p.title}</h3><p>${p.excerpt}</p><a href="poem.html?id=${i}">قراءة القصيدة ←</a></div>`;
  grid.appendChild(el);
 });
}
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelector('.filters .active').classList.remove('active');b.classList.add('active');draw(b.dataset.filter)});
draw();