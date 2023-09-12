const { Schema, model } = require('mongoose');

const flightSchema = new Schema(
  {
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United'],
    },

    flightNo: { 
        type: Number,
        min: 10,
        max: 9999,
        require:true 
    },
    departs: {
        type: Date,
        default: () => Date.now()+ (365*24*60*60*1000)        
  }
}
);

const Flight = model('Flight', flightSchema);

module.exports = Flight;