import React from 'react';
import PropTypes from 'prop-types';
import firebase from "@firebase/app";
import "@firebase/firestore";


const data = [
  {
    "name": "Ball Slams"
  },
  {
    "name": "Bench press"
  },
  {
    "name": "Bench Press w/band 4.2.1"
  },
  {
    "name": "Bench Press w/Grey band"
  },
  {
    "name": "Bent over row"
  },
  {
    "name": "Bosu Ball Push-Ups"
  },
  {
    "name": "Cables 4"
  },
  {
    "name": "Cables: High"
  },
  {
    "name": "Cables: Low"
  },
  {
    "name": "Cables: Medium"
  },
  {
    "name": "Circuit- Red Platform Burpees"
  },
  {
    "name": "Double Plate Squeze Up/Down"
  },
  {
    "name": "Dumbbell Tricep Skullcrushers"
  },
  {
    "name": "Dumbell Overhead Chest (inward hand torque)"
  },
  {
    "name": "Farmer's Carry"
  },
  {
    "name": "Foam Roll - Calves"
  },
  {
    "name": "Frog Squats/Bear Crawl Circuit"
  },
  {
    "name": "Front/Side Shoulder raises"
  },
  {
    "name": "Glute Bridge"
  },
  {
    "name": "Glute Bridge 1 leg"
  },
  {
    "name": "Goblet Squats"
  },
  {
    "name": "Hex Bar Deadlift"
  },
  {
    "name": "Hex Deadlift"
  },
  {
    "name": "Hex deadlift"
  },
  {
    "name": "Hex Deadlift 4"
  },
  {
    "name": "Ice Skaters"
  },
  {
    "name": "Incline Bench Press"
  },
  {
    "name": "Kettlebell Swings"
  },
  {
    "name": "Kevlar Ball Left/Right/Down"
  },
  {
    "name": "Kevlar Ball Side Slams"
  },
  {
    "name": "Lawnmowers"
  },
  {
    "name": "Laying Flys"
  },
  {
    "name": "Left"
  },
  {
    "name": "Leg Press"
  },
  {
    "name": "Lunges (then with rotation)"
  },
  {
    "name": "Overhead Press"
  },
  {
    "name": "Planks (navel through spine)"
  },
  {
    "name": "Powerball single arm shoulder raise"
  },
  {
    "name": "Push-Ups"
  },
  {
    "name": "PVR Rotational Throw"
  },
  {
    "name": "Red Platform Arms in"
  },
  {
    "name": "Rolling Ball Push-Ups"
  },
  {
    "name": "Romanian Deadlift"
  },
  {
    "name": "Shoulder press"
  },
  {
    "name": "Side crunches"
  },
  {
    "name": "Sled Workout"
  },
  {
    "name": "Squat/Curl/Press"
  },
  {
    "name": "Squat/Press"
  },
  {
    "name": "Squats"
  },
  {
    "name": "Squeeze Press"
  },
  {
    "name": "Stability Ball Back Cobras"
  },
  {
    "name": "Stability Ball Back Extension"
  },
  {
    "name": "Stability Ball Chest Press"
  },
  {
    "name": "Stability Ball Chest Press 1 arm"
  },
  {
    "name": "Stability Ball Crunches"
  },
  {
    "name": "Stability Ball Glute Bridge"
  },
  {
    "name": "Stability Ball Shoulder Press 1 Arm"
  },
  {
    "name": "Stability Ball Squat/Curl/Press"
  },
  {
    "name": "Standing off box (red)"
  },
  {
    "name": "Static Stretch - Couch"
  },
  {
    "name": "Step-Up to Balance"
  },
  {
    "name": "Stick Rotational Lunges"
  },
  {
    "name": "Toe Touches"
  },
  {
    "name": "Toe Touches (with pad) 4"
  },
  {
    "name": "Treadmill - 3 min fast"
  },
  {
    "name": "TRX Row"
  },
  {
    "name": "Weighted Lunges"
  }
]

function uploadData () {
    var firestore = firebase.firestore();
    

    for(var i = 0; i < data.length; i++) {
        data[i].Date = new Date(data[i].Date)
        // console.log(data[i]);
        firestore.collection("exercises").add(data[i]).then(function(response) {
            console.log("Success!", response);
          }, function(error) {
            console.error("Failed!", error);
          });
    }

}

export default uploadData;
