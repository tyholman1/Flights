require('dotenv').config();
const mongoose = require('mongoose');
const Flight = require('./models/flight');
const Destination = require('./models/flight');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; 
const methodOverride = require('method-override');

// Global Configuration
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const jsxViewEngine = require('jsx-view-engine');

// Connection Error/Success
// Define callback functions for various events
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('open', () => console.log('mongo connected!'));
db.on('close', () => console.log('mongo disconnected'));


// Automatically close after 5 seconds
// for demonstration purposes to see that you must use db.close() in order to regain control of Terminal tab
// setTimeout(() => {
//   db.close();
// }, 5000);


app.set('view engine', 'jsx')
app.set('views', './views')
app.engine('jsx',jsxViewEngine())

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

//////////////////////////

// Index
app.get('/flight', async (req, res) => {
  try {
    const foundFlight = await Flight.find({});
    console.log(foundFlight);
    res.status(200).render('Index', {
      flight: foundFlight,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// New
app.get('/flight/new', (req, res) => {
  console.log('New controller');
  res.render('New');
});

// Update
app.put('/flight/:id', async (req, res) => {
  try {
    const destination = req.body
    const foundFlight = await Flight.findById(req.params.id)
    foundFlight.destinations.push(destination)
    const updatedFlight = await Flight.findByIdAndUpdate(
      // id is from the url that we got by clicking on the edit <a/> tag
      req.params.id, 
      // the information from the form, with the update that we made above
      foundFlight,
      // need this to prevent a delay in the update
      {new: true})
      console.log(updatedFlight)
      res.status(201).redirect('/flight')
  } catch (err) {
    res.status(400).send(err);
  }
});

// Create
app.post('/flight', async (req, res) => {
    try {
      req.body.flightNo = req.body.flightNo === "true"
     const createdFlight = await Flight.create(req.params.id);

      res.status(200).redirect('/flight');
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // Edit
// app.get('/flight/:id/edit', async( req, res ) => {
//   try {
//     // find the document in the database that we want to update 
//     const foundFlight = await Flight.findById(req.params.id);
//     res.render('Edit', {
//       flight: foundFlight //pass in the foundFlight so that we can prefill the form
//     })
//   } catch (err) {
//     res.status(400).send(err);
//   }
// })
 
// Show
app.get('/flight/:id', async (req, res) => {
  try {
    const foundFlight = await Destination.findById(req.params.id);

    //second param of the render method must be an object
    res.render('Show', {
      //there will be a variable available inside the jsx file called fruit, its value is fruits[req.params.indexOfFruitsArray]
      flight: foundFlight
    });
  } catch (err) {
    res.status(400).send(err);
  }
});
  
  
  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
