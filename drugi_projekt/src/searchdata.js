var stNumber=[];

function getNumbers(){
    stNumber=document.getElementById("numerOd").value;
}

function aktualizujDane() {
    getNumbers();
    pobierzDane();
}

function pobierzDane(){
    $.ajax({
        type:"GET",
        url:"https://api.spaceflightnewsapi.net/v3/articles/"+stNumber,
    }).done(function(response){
        if(response.lenght<0){
            alert("no data")
            return;
        }
        var choArticle=response;

        const myArray=Object.values(choArticle);
        document.getElementById("articles").innerHTML=myArray;
        let fielledArray=[...new Array(1)].map(()=>choArticle);
        const setupCards=(array)=>{
            let html=``;
            array.forEach(({id,title,url,summary,publishedAt,newsSite})=>{
                html=`
                <h2> Article ${stNumber}</h2>
                <section class="testimonial-section">
                <div class="grid-3-cols">
                  <div class="testimonial-box" >
                  
                      <p>${id} ${title}</p>
                      
                  </div>
                  <a class="btn btn--small" href="${url}" >Show Web</a> 
                  <a class="testimonial-text">${summary}</a>
                  <p>${publishedAt} ${newsSite}</p>
                </div>
                </div>
                </section>
                `  
                //html +=card
                //getCardElm.innerHTML=html;
                //console.log(html);
            })
            document.getElementById('articles').innerHTML=html;

        }
        setupCards(fielledArray);
    }).fail(function (error) { //Funkcja wykonująca się gdy połączenie nie zakończy się sukcesem lub serwer zwróci błąd
        if (error.response) //Istenieje odpowiedź z serwera
            if (error.response.status == 404)
                alert("404");
            else
                alert("Nie można pobrać liczby przypadków - błąd serwera");
        else //Brak odpowiedzi z serwera
            alert("Brak połącznia");
    });
    
};