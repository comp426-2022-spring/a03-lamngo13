//takes an arbitrary
//port number as a cmd line
//arg (npm run server)
//port should default to 5000
import { coinFlip, coinFlips, countFlips, flipACoin} from './modules/coin.mjs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const express = require('express')
const app = express()

const argv = require('minimist')(process.argv.slice(2))
argv['port']
const port = argv['port'] || process.env.PORT || 5000

//start an app server
const server = app.listen(port, () => { 
    console.log('App listening on port %PORT%'.replace('%PORT%',port)) 
});


app.get('/app/', (req, res) => { //CHECKPOINTT
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });

//RANDOM COIN FLIP ENDPOINT /app/flip/
app.get('/app/flip/', (req, res) => {
    // Respond with status 200
    res.statusCode = 200;
    let outcome = coinFlip();

    //sending the data
    if (outcome == "heads") {
        res.json({"flip":"heads"});
    } else {
        res.json({"flip":"tails"});
    }
    //res.json(coinFlip())
});
    
//MANY FLIPS
app.get('/app/flips/:number', (req, res) => {
	// Respond with status 200
    res.statusCode = 200;
    let theNum = req.params.number;
    let zraw = coinFlips(theNum);
    let zsummary = countFlips(coinFlips(zraw))

    //send the data
    res.json({"raw":zraw, "summary":zsummary})

    
});


// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});