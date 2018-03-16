const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');
const _ = require('lodash');

// grab super secret stuff from .env file
dotenv.config();

const app = express();

// set API routes to /api/
const router = express.Router();

router.get('/PATRICK', async (req, res) => {
  const PATRICK_KEY = process.env.PATRICK;
  axios.get('https://api.yelp.com/v3/businesses/search?term="dive bar"&location=mcgill',
  {
    headers: {
      Authorization: `Bearer ${PATRICK_KEY}`
    }
  }).then(result => {
    res.json(result.data.businesses);
  }).catch(err => {
    console.log(err);
  })
});

app.use('/api', router);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`PATRICK listening on ${port}`);