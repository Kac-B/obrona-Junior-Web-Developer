
function fetchData() {
    fetch('https://api.spaceflightnewsapi.net/v3/articles')
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        let output = '<h2>New Articles</h2> </br> <h2>Spaceflight News API</h2>'
        data.forEach(function (item) {
          output += `
          <section class="testimonial-section">
          <div class="grid-3-cols">
            <div class="testimonial-box" >
            
                <p>${item.id} ${item.title}</p>
                
            </div>
            <a class="btn btn--small" href="${item.url}" >Show Web</a>
            <p></p> 
            <a class="testimonial-text">${item.summary}</a>
            <p>${item.publishedAt} ${item.newsSite}</p>
          </div>
          </div>
          </section>
          `          
        })
        
        document.getElementById('articles').innerHTML=output;
        
      })
      .catch((error) => {
        console.log(`Error Fetching data : ${error}`)
        document.getElementById('articles').innerHTML = 'Error Loading Data'
      })
  }
  fetchData();