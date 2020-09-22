// Encapsulating api urls using closure
const queryData = (function () {
    let quoteApiUrl = 'https://type.fit/api/quotes';
    let twitterApiUrl = 'https://twitter.com/intent/tweet';

    function getTwitterApiURL() {
        return twitterApiUrl;
    }

    function getQuoteApiURL() {
        return quoteApiUrl;
    }

    return {
        getTwitterApiURL,
        getQuoteApiURL
    }
})();

var quoteArray = [];

function showLoadingIndicator(){
    let loader = document.getElementsByClassName('loader')
    let content = document.getElementsByClassName('quote-container')
    loader[0].classList.remove('hidden')
    content[0].classList.add('hidden')
}

function hideLoadingIndicator(){
    let loader = document.getElementsByClassName('loader')
    let content = document.getElementsByClassName('quote-container')
    loader[0].classList.add('hidden')
    content[0].classList.remove('hidden')
}


// Function to get new quote
const getNewQuote = async function (url) {
    try {
        showLoadingIndicator();
        const response = await fetch(url, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
        const data = await response.json();
        quoteArray = [...data];
        hideLoadingIndicator();
    } catch (error) {
        console.log('There is an issue: ' + error)
        hideLoadingIndicator()
        return [];
    }
}

// Function to Update a new quote to the UI
const postNewQuote = () => {
    try {
        showLoadingIndicator();
        let randomIndex = Math.floor(Math.random() * quoteArray.length);
        document.getElementById('quote').innerHTML = quoteArray[randomIndex].text
        console.log(quoteArray[randomIndex].author);
        if (quoteArray[randomIndex].author === '' || quoteArray[randomIndex].author === null || quoteArray[randomIndex].author === undefined) {
            document.getElementById('author').innerHTML = 'MadaZZ';
        } else {
            document.getElementById('author').innerHTML = quoteArray[randomIndex].author
        }
        hideLoadingIndicator()
    } catch (err) {
        console.log(err);
        hideLoadingIndicator()
    }
}

// Function Tweet the current quote on the UI
const tweetCurrentQuote = () => {
    let tweetQuoteText = document.getElementById('quote').innerHTML;
    let tweetQuoteAuthor = document.getElementById('author').innerHTML;

    const twitterRequest = `https://twitter.com/intent/tweet?text=${tweetQuoteText} ~ ${tweetQuoteAuthor}`;
    window.open(twitterRequest, '_blank')
}

// Add event Listeners to buttons
document.getElementById('generate').onclick = postNewQuote;
document.getElementById('twitter').onclick = tweetCurrentQuote;

//On load of js file
getNewQuote(queryData.getQuoteApiURL());