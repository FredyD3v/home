const loader = document.getElementById('loader');
const container = document.getElementById('container');
let quoteText = document.getElementById('quote');
let authorName = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];


function loading() {
    loader.hidden = false;
    container.hidden = true;

}

function complete() {
    loader.hidden = true;
    container.hidden = false;
}

// grab quotes locally
function newQuote() {
    // pick random quote from apiQuote
    // use apiQuotes in place of localQuotes for online api
    loading();

    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]

    if (quote.text.length > 10) {
        quoteText.classList.add('long-quote');
        
    } else {
        quoteText.classList.remove('long-quote');
    }

    complete();
    quoteText.textContent = quote.text;

    if (quote.author = 'null') {
        authorName.textContent = "unknown";
    } else {
        authorName.textContent = quote.author; 
    }
    
}

//grab quotes from api
function newAPIQuote() {
    // use apiQuotes in place of localQuotes for online api
    loading();

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    

    if (quote.text.length > 10) {
        quoteText.classList.add('long-quote');
        
    } else {
        quoteText.classList.remove('long-quote');
    }

    complete();
    quoteText.textContent = quote.text;

    if (quote.author = 'null') {
        authorName.textContent = "unknown";
    } else {
        authorName.textContent = quote.author; 
    }
    
}

// get quotes from api or get from local quotes
async function getQuote() {
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newAPIQuote();
    } catch (error) {
        newQuote();
    }
}

function createTweet() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}`;

    window.open(twitterUrl, '_blank');
}

twitterBtn.addEventListener('click', createTweet);
newQuoteBtn.addEventListener('click', getQuote);


getQuote();