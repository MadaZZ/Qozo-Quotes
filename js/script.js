// Encapsulating query url using closure
const queryData = (function () {
    let quoteApiUrl = 'https://type.fit/api/quotes';
    let twitterApiUrl = 'https://twitter.com/intent/tweet';
    
    function getTwitterApiURL(){
        return twitterApiUrl;
    }

    function getQuoteApiURL(){
        return quoteApiUrl;
    }

    return {
        getTwitterApiURL,
        getQuoteApiURL
    }
})();

var quoteArray = [];

// Function to get new quote
const getNewQuote = async function (url) {
    try {
        const response = await fetch(url, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
        const data = await response.json();
        quoteArray = [...data];
        console.log(quoteArray);
    } catch (error) {
        console.log('There is an issue: ' + error)
        return [];
    }
}

const postNewQuote = () => {
    try {
        let randomIndex = Math.floor(Math.random() * quoteArray.length);
        document.getElementById('quote').innerHTML = quoteArray[randomIndex].text
        console.log(quoteArray[randomIndex].author);
        if(quoteArray[randomIndex].author === '' || quoteArray[randomIndex].author === null || quoteArray[randomIndex].author === undefined){
            document.getElementById('author').innerHTML = 'MadaZZ';
        } else {
            document.getElementById('author').innerHTML = quoteArray[randomIndex].author
        }
    } catch (err) {
        console.log(err);
    }
}

const tweetCurrentQuote = () => {
    let tweetQuoteText = document.getElementById('quote').innerHTML;
    let tweetQuoteAuthor = document.getElementById('author').innerHTML;
    
    const twitterRequest = `https://twitter.com/intent/tweet?text=${tweetQuoteText} ~ ${tweetQuoteAuthor}`;
    window.open(twitterRequest, '_blank')
}

document.getElementById('generate').onclick = postNewQuote;

document.getElementById('twitter').onclick = tweetCurrentQuote;

//On load of js file
getNewQuote(queryData.getQuoteApiURL());