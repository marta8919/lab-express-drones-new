const express = require('express');
const DroneModel = require('../model/Drone.model');

// require the Drone model here

const router = express.Router();

router.get('/drones', (req, res, next) => {

  DroneModel.find()
    .then((drones)=>{
      res.render('drones/list.hbs', {drones})
    })
    .catch(()=>{
      console.log('Something is not working on the /drones route')
    })

});

router.get('/drones/create', (req, res, next) => {
  res.render('./drones/create-form.hbs')
});

router.post('/drones/create', (req, res, next) => {
 
  const {droneName, dronePropellers, droneSpeed} = req.body

  let newDrone = {
    name : droneName,
    propellers : dronePropellers,
    maxSpeed : droneSpeed
  }

  DroneModel.create(newDrone)
    .then(()=>{
      res.redirect('/drones')
    })
    .catch(()=>{
      console.error();
      res.render('./drones/create-form.hbs')
    })

});

router.get('/drones/:id/edit', (req, res, next) => {

  let id = req.params.id 

  DroneModel.findById(id)
    .then ((drones)=>{
      res.render('./drones/update-form.hbs', {drones})
    })
    .catch(()=>{
      console.log('Updating failed')
    })
});

router.post('/drones/:id/edit', (req, res, next) => {

  let id = req.params.id

  const {droneName, dronePropellers, droneSpeed} = req.body

  let editedDrone = {
    name : droneName,
    propellers : dronePropellers,
    maxSpeed : droneSpeed
  }

  DroneModel.findByIdAndUpdate(id, editedDrone)
    .then(()=>{
      res.redirect('/drones')
    })
    .catch(()=>{
      console.log('Something went wrong while editing')
    })

});

router.post('/drones/:id/delete', (req, res, next) => {

  let id = req.params.id

  DroneModel.findByIdAndDelete(id)
    .then(()=>{
      console.log('deleting is working')
      res.redirect('/drones')
    })
    .catch(()=>{
      console.log('Deleted failed')
    })
});

module.exports = router;
