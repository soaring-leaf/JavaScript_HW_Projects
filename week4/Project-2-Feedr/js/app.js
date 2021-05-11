/*
  Please add all Javascript code to this file.
*/

// https://api.nytimes.com/svc/topstories/v2/science.json?api-key=yZlbREPYRfGdxwYMAKQjpAe4AqmFA4lT
// The possible section value are: arts, automobiles, 
// books, business, fashion, food, health, home, insider, 
// magazine, movies, nyregion, obituaries, opinion, 
// politics, realestate, science, sports, sundayreview, 
// technology, theater, t-magazine, travel, upshot, us, and world.

const myBody = document.querySelector('body');
const myHeader = document.createElement('header');
const mySect = document.createElement('section');
mySect.className = 'container';

const topAnchor = document.createElement('a');
topAnchor.href = '#';

const topLabel = document.createElement('h1');
topLabel.textContent = 'Feedr';
topAnchor.appendChild(topLabel);

mySect.appendChild(topAnchor);

const myNav = document.createElement('nav');
const topList = document.createElement('ul');
const topSourceListItem = document.createElement('li');
const topSourceItem = document.createElement('a');
topSourceItem.href = '#';
topSourceItem.textContent = `News Source: Source Name`;
topSourceListItem.appendChild(topSourceItem);

const sourceList = document.createElement('ul');
const sourceItem1 = document.createElement('li');
const sourceAnchor1 = document.createElement('a');
sourceAnchor1.href = '#'; // 'https://www.nytimes.com/section/science'
sourceAnchor1.textContent = 'NYT Science'
sourceAnchor1.setAttribute('id','nyt-source');
sourceItem1.appendChild(sourceAnchor1);
sourceList.appendChild(sourceItem1);

const sourceItem2 = document.createElement('li');
const sourceAnchor2 = document.createElement('a');
sourceAnchor2.href = '#'; 
sourceAnchor2.textContent = 'Guardian Science'
sourceAnchor2.setAttribute('id','guardian-source');
sourceItem2.appendChild(sourceAnchor2);
sourceList.appendChild(sourceItem2);

const searchSec = document.createElement('section');
searchSec.setAttribute('id','search');
const myInput = document.createElement('input');
myInput.setAttribute('type','text');
myInput.setAttribute('name','name');
myInput.setAttribute('value','');

const inputAnchor = document.createElement('a');
inputAnchor.href = '#';
const searchIcon = document.createElement('img');
searchIcon.setAttribute('src','images/search.png');
searchIcon.setAttribute('alt','');
inputAnchor.appendChild(searchIcon);

searchSec.appendChild(myInput);
searchSec.appendChild(inputAnchor);

myNav.appendChild(topList)
  .appendChild(topSourceListItem)
  .appendChild(sourceList);
myNav.appendChild(searchSec);

const divTop = document.createElement('div');
divTop.setAttribute('class','clearfix');

mySect.appendChild(myNav);
mySect.appendChild(divTop);

myBody.appendChild(myHeader)
  .appendChild(mySect);

const divPop = document.createElement('div');
divPop.setAttribute('id','popUp');
divPop.setAttribute('class','loader hidden');

const popAnchor = document.createElement('a');
popAnchor.href = '#';
popAnchor.setAttribute('class','closePopUp');
popAnchor.textContent = 'X';

const popArticle = document.createElement('div');
popArticle.setAttribute('class','container');
const popTitle = document.createElement('h1');
popTitle.textContent = 'Article Title Here';
const popDescript = document.createElement('p');
popDescript.textContent = 'Article Description Here';
const articleAnchor = document.createElement('a');
articleAnchor.href = '#';
articleAnchor.setAttribute('class','popUpAction');
articleAnchor.setAttribute('target','_blank');
articleAnchor.textContent = 'Read more from Source';

popArticle.appendChild(popTitle);
popArticle.appendChild(popDescript);
popArticle.appendChild(articleAnchor);

divPop.appendChild(popAnchor);
divPop.appendChild(popArticle);

myBody.appendChild(divPop);

const mainSec = document.createElement('section');
mainSec.setAttribute('id','main');
mainSec.setAttribute('class','container loader');

myBody.appendChild(mainSec);

let articles = [];

sourceAnchor1.addEventListener('click',function() {
  document.querySelector('#popUp').setAttribute('class','loader');
  articles = getArticles(NYT_API,NYT_KEY,0);
})

sourceAnchor2.addEventListener('click',function() {
  document.querySelector('#popUp').setAttribute('class','loader');
  articles = getArticles(GUARD_API,GUARD_KEY,1);
})

// need to be able to close Popup
popAnchor.addEventListener('click',function() {
  document.querySelector('#popUp').setAttribute('class','loader hidden');
}); 

//==============================
// Functions
//==============================

// Gets articles using the provided api link and key
// Returns a list of retrieved articles
function getArticles(link,key,thisSrc) {
  const articleList = [];
  
  fetch(`${link}${key}`)
    .then(function(res) {
      
      return res.json();
    })
    .then(function(articleRes) {
      console.log(articleRes);
      if(thisSrc === 0) { // NYT Article Response
        for(let i=0;i<articleRes.results.length;i++) {
          articleList.push(articleRes.results[i]);
        }
      } else if(thisSrc === 1){ // Guardian Article Response
        for(let i=0;i<articleRes.response.results.length;i++) {
          articleList.push(articleRes.response.results[i]);
        }
      }
      resetArticles();
      deployArticles(articleList,thisSrc);
      document.querySelector('#popUp').setAttribute('class','loader hidden');
    });
}

// takes list of newly retrieved articles and adds them to
// the main section of the page
function deployArticles(aList,mySrc) {
  console.log(aList);
  const main = document.querySelector('#main');

  for(let i=0; i<aList.length; i++) {
    const articleTag = document.createElement('article');
    articleTag.setAttribute('id',i);
    articleTag.setAttribute('class','article');

    const imgSec = document.createElement('section');
    imgSec.setAttribute('class','featuredImage');

    const imgTag = document.createElement('img');
    //imgTag.setAttribute('class','featuredImage');

    const contentSec = document.createElement('section');
    contentSec.setAttribute('class','articleContent');

    const contentAnchor = document.createElement('a');
    contentAnchor.href = '#';

    const contentTitle = document.createElement('h3');

    if(mySrc === 0) { // Set values for NYT
      if(aList[i].multimedia !== null) {
        imgTag.setAttribute('src',aList[i].multimedia[0].url);
        imgTag.setAttribute('alt',aList[i].multimedia[0].caption);
      }  
      contentTitle.textContent = aList[i].title;
    } else if(mySrc === 1) { // set values for Guardian
      imgTag.setAttribute('src','images/article_placeholder_1.jpg');
      contentTitle.textContent = aList[i].webTitle;
    }

    contentSec.appendChild(contentAnchor)
      .appendChild(contentTitle);
    
    const articleDiv = document.createElement('div');
    articleDiv.setAttribute('class','clearfix');


    articleTag.appendChild(imgSec)
      .appendChild(imgTag);
    articleTag.appendChild(contentSec);
    articleTag.appendChild(articleDiv);

    main.appendChild(articleTag);

    setListener(articleTag,aList[i],mySrc);
  }
}

// clears the Main Articles section to prep for the 
// next source callout
function resetArticles() {
  const mainSec = document.querySelector('#main');

  if(mainSec !== null) {
    while (mainSec.firstChild) {
      mainSec.removeChild(mainSec.lastChild);
    }
  }
}

// Sets a listener for the article to allow the popup
// when an article is clicked
function setListener(myArticle,articleObj,mySrc) {
  
  myArticle.addEventListener('click', function(evt) {
    const popper = document.querySelector('#popUp');
    popper.setAttribute('class','loader');
    const popperTitle = popper.getElementsByTagName('h1');
    const popperContent = popper.getElementsByTagName('p');
    const popperAnchor = popper.getElementsByTagName('a');
   
    if(mySrc === 0) {
      popperTitle[0].textContent = articleObj.title;
      popperContent[0].textContent = articleObj.abstract;
      popperAnchor[1].setAttribute('target',articleObj.short_url);
      popperAnchor[1].href = articleObj.short_url;
      popperAnchor[1].textContent = 'Read full Article';
    } else if(mySrc === 1) {
      popperTitle[0].textContent = articleObj.webTitle;
      popperContent[0].textContent = '';
      popperAnchor[1].setAttribute('target',articleObj.webUrl);
      popperAnchor[1].href = articleObj.webUrl;
      popperAnchor[1].textContent = 'Read full Article';
    }
    popper.setAttribute('class','popUpAction');
  })
}