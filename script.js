const APIKEY = "c6a77e056e1f4753b7e50b5c16884194";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchnews("india"));

function reload(){
    window.location.reload();
}

async function fetchnews(query){
    const res = await fetch(`${url}${query}&apiKey=${APIKEY}`);
    const data = await res.json();
    console.log(data);
    BindData(data.articles);
}

function BindData(articles){

    const cradtemplate = document.getElementById('card-template');
    const cradcontainer = document.getElementById('card-container');

    cradcontainer.innerHTML='';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardclone = cradtemplate.content.cloneNode(true);
        filldataincrad(cardclone,article);
        cradcontainer.appendChild(cardclone);
    });

}

function filldataincrad(cardclone,article){
    const newsimg = cardclone.querySelector("#news-img");
    const newstitle = cardclone.querySelector("#news-title");
    const newssource = cardclone.querySelector("#news-source");
    const newsdes = cardclone.querySelector("#news-des");

    newsimg.src =article.urlToImage;
    newstitle.innerHTML = article.title;
    newsdes.innerHTML = article.description;
    
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newssource.innerHTML = `${article.source.name} • ${date}`;

    cardclone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url, "_blank");
    })
}

let currentselnav = null;

function onnavitemclick(id){
    fetchnews(id);
    const navitem = document.getElementById(id);
    currentselnav?.classList.remove('active');
    currentselnav = navitem;
    currentselnav.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchnews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});