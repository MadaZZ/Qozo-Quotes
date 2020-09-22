// Encapsulating query url using closure
const queryData = (function () {
    var url = 'https://type.fit/api/quotes';
    return {
        url: url
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

//On load event
getNewQuote(queryData.url);

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

document.getElementById('generate').onclick = postNewQuote;
