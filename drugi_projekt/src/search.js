function Dane() {

  const count = document.getElementById('count').value;

  document.getElementById('articles2').innerHTML = '';

  const fetchArticles = async () => {
    const limit = count > 0 ? count : 10;

    return await fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=${limit}`).then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
  }
  
  fetchArticles().then(articles => {
    articles.map((article) => {
      renderArticle(article)
    })
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

            document.getElementById('articles2').innerHTML += html;      
  }



}