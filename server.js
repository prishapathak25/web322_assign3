/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Prisha Pathak Student ID: 178231213 Date: 24/10/23
*
********************************************************************************/

const express = require('express');
const legoData = require('./modules/legoSets');

const app = express();
const port = process.env.PORT || 8080;

legoData.initialize()
  .then(() => {

    app.use(express.static('public'));

    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/views/home.html'); 
    });

    app.get('/about', (req, res) => {
      res.sendFile(__dirname + '/views/about.html');
    });

    app.get('/lego/sets', (req, res) => {
      const theme = req.query.theme; 
      if (theme) {
        legoData.getSetsByTheme(theme)
          .then(sets => res.json(sets))
          .catch(error => res.status(404).send(error));
      } else {
        legoData.getAllSets()
          .then(sets => res.json(sets))
          .catch(error => res.status(404).send(error));
      }
    });

    app.get('/lego/sets/num-demo', (req, res) => {
      const setNum = '001-1'; 
      legoData.getSetByNum(setNum)
        .then(set => res.json(set))
        .catch(error => res.status(404).send(error));
    });

    app.get('/lego/sets/theme-demo', (req, res) => {
      const theme = 'tech'; 
      legoData.getSetsByTheme(theme)
        .then(sets => res.json(sets))
        .catch(error => res.status(404).send(error));
    });

    app.get('/404', (req, res) => {
      res.sendFile(__dirname + '/views/404.html');
    });

    // app.use((req, res) => {
    //   res.status(404).sendFile(__dirname + '/views/404.html');
    // });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Failed to initialize Lego data:', error);
  });
