
function Dane() {
let limit = 100;

document.addEventListener('click', function (event) {

	if (!event.target.matches('.page--item')) return;

	event.preventDefault();

  const page = event.target.getAttribute('data-id');
	
  document.getElementById('list').innerHTML = '';

  renderView(page);

}, false);

const pagination = async () => {
  return await fetch('https://api.spaceflightnewsapi.net/v3/articles/count').then(response => response.json())
}

const fetchPage = async (page) => {
  let offset = 0;
  if (page > 1) {
    offset = page * limit;
  }

  return await fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=${limit}&_start=${offset}`).then(response => response.json())
}

const renderView = (page) => {
  fetchPage(page).then(articles => {
    articles.map((article) => {
      renderArticle(article)
    })
  });
}

renderView(1);

pagination().then(pagination => {
  const pages = parseInt(pagination / limit);

  for (let page = 1; page <= pages; page++) {
    //console.log('page: ', page);
    document.getElementById('pagination').innerHTML += `
    
      <button class="page--item" style="btn btn--micro" data-id="${page}">${page}</button>
    
    `
  }
});

function renderArticle(article) {
  html =`
          
          <section class="testimonial-section">
          <div class="grid-3-cols">
            <div class="testimonial-box" >
            
                <p>${article.id} ${article.title}</p>
                
            </div>
            <a class="btn btn--small" href="${article.url}" >Show Web</a> 
            <a class="testimonial-text">${article.summary}</a>
            <p>${article.publishedAt} ${article.newsSite}</p>
          </div>
          </div>
          </section>
          `

  document.getElementById('list').innerHTML += html;      
}

}

