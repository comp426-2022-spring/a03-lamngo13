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

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });
    

app.get('/app/flips/:number', (req, res) => {
	res.statusCode = 200;
    res.statusMessage = "OK"
    res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'});
    res.end(res.statusCode+ ' ' +res.statusMessage)
});

var aNum = req.params.number;