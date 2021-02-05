// Iteration #1
const mongoose = require('mongoose')

require('../configs/db.config.js')

let DroneModel = require('../model/Drone.model.js')

DroneModel.create ( [
    {name : 'Megatron V3', propellers: 4, maxSpeed: 20},
    {name : 'Optimus', propellers: 3, maxSpeed: 10},
    {name : 'Terminator', propellers: 5, maxSpeed:50}
])
    .then(()=>{
        console.log('Data seeded')
        mongoose.connection.close()
    })
    .catch(()=>{
        console.log('Data seeding went wrong')
    })