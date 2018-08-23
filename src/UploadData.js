import React from 'react';
import PropTypes from 'prop-types';
import firebase from "@firebase/app";
import "@firebase/firestore";


const data = [
	{
		"Date": "8/10/2018",
		"Exercise": "Hex deadlift",
		"Person": "Q",
		"Weight": 145,
		"Reps": 10,
		"ExerciseNumber": 1
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Hex deadlift",
		"Person": "Q",
		"Weight": 165,
		"Reps": 10,
		"ExerciseNumber": 2
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Hex deadlift",
		"Person": "Q",
		"Weight": 165,
		"Reps": 10,
		"ExerciseNumber": 3
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Bench",
		"Person": "Q",
		"Weight": 115,
		"Reps": 10,
		"ExerciseNumber": 4
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Bench",
		"Person": "Q",
		"Weight": 115,
		"Reps": 10,
		"ExerciseNumber": 5
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Bench",
		"Person": "Q",
		"Weight": 115,
		"Reps": 10,
		"ExerciseNumber": 6
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Bent over row",
		"Person": "Q",
		"Weight": 50,
		"Reps": 10,
		"ExerciseNumber": 7
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Bent over row",
		"Person": "Q",
		"Weight": 70,
		"Reps": 10,
		"ExerciseNumber": 8
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Bent over row",
		"Person": "Q",
		"Weight": 70,
		"Reps": 10,
		"ExerciseNumber": 9
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Shoulder press",
		"Person": "Q",
		"Weight": 40,
		"Reps": 10,
		"ExerciseNumber": 10
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Shoulder press",
		"Person": "Q",
		"Weight": 40,
		"Reps": 10,
		"ExerciseNumber": 11
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Shoulder press",
		"Person": "Q",
		"Weight": 40,
		"Reps": 10,
		"ExerciseNumber": 12
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Bench",
		"Person": "Q",
		"Weight": 115,
		"Reps": 10,
		"ExerciseNumber": 13
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Bench",
		"Person": "Q",
		"Weight": 115,
		"Reps": 10,
		"ExerciseNumber": 14
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Bench",
		"Person": "Q",
		"Weight": 115,
		"Reps": 10,
		"ExerciseNumber": 15
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Bent over row",
		"Person": "Q",
		"Weight": 70,
		"Reps": 10,
		"ExerciseNumber": 16
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Bent over row",
		"Person": "Q",
		"Weight": 70,
		"Reps": 10,
		"ExerciseNumber": 17
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Bent over row",
		"Person": "Q",
		"Weight": 80,
		"Reps": 10,
		"ExerciseNumber": 18
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Shoulder press",
		"Person": "Q",
		"Weight": 50,
		"Reps": 10,
		"ExerciseNumber": 19
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Shoulder press",
		"Person": "Q",
		"Weight": 50,
		"Reps": 10,
		"ExerciseNumber": 20
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Shoulder press",
		"Person": "Q",
		"Weight": 50,
		"Reps": 10,
		"ExerciseNumber": 21
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Leg Press",
		"Person": "Q",
		"Weight": 360,
		"Reps": 10,
		"ExerciseNumber": 22
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Leg Press",
		"Person": "Q",
		"Weight": 360,
		"Reps": 10,
		"ExerciseNumber": 23
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Leg Press",
		"Person": "Q",
		"Weight": 360,
		"Reps": 10,
		"ExerciseNumber": 24
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Shoulder Press",
		"Person": "Q",
		"Weight": 50,
		"Reps": 15,
		"ExerciseNumber": 25
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Shoulder Press",
		"Person": "Q",
		"Weight": 60,
		"Reps": 10,
		"ExerciseNumber": 26
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Shoulder Press",
		"Person": "Q",
		"Weight": 60,
		"Reps": 10,
		"ExerciseNumber": 27
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Bent over row",
		"Person": "Q",
		"Weight": 80,
		"Reps": 10,
		"ExerciseNumber": 28
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Bent over row",
		"Person": "Q",
		"Weight": 80,
		"Reps": 10,
		"ExerciseNumber": 29
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Bent over row",
		"Person": "Q",
		"Weight": 80,
		"Reps": 10,
		"ExerciseNumber": 30
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Bench",
		"Person": "Q",
		"Weight": 125,
		"Reps": 10,
		"ExerciseNumber": 31
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Bench",
		"Person": "Q",
		"Weight": 125,
		"Reps": 10,
		"ExerciseNumber": 32
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Bench",
		"Person": "Q",
		"Weight": 125,
		"Reps": 7,
		"ExerciseNumber": 33
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Hex deadlift",
		"Person": "Q",
		"Weight": 185,
		"Reps": 10,
		"ExerciseNumber": 34
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Hex deadlift",
		"Person": "Q",
		"Weight": 185,
		"Reps": 10,
		"ExerciseNumber": 35
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Hex deadlift",
		"Person": "Q",
		"Weight": 185,
		"Reps": 10,
		"ExerciseNumber": 36
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Hex deadlift",
		"Person": "C",
		"Weight": 95,
		"Reps": 10,
		"ExerciseNumber": 1
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Hex deadlift",
		"Person": "C",
		"Weight": 95,
		"Reps": 15,
		"ExerciseNumber": 2
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Hex deadlift",
		"Person": "C",
		"Weight": 95,
		"Reps": 10,
		"ExerciseNumber": 3
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Bench",
		"Person": "C",
		"Weight": 95,
		"Reps": 10,
		"ExerciseNumber": 4
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Bench",
		"Person": "C",
		"Weight": 95,
		"Reps": 10,
		"ExerciseNumber": 5
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Bench",
		"Person": "C",
		"Weight": 95,
		"Reps": 10,
		"ExerciseNumber": 6
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Bent over row",
		"Person": "C",
		"Weight": 20,
		"Reps": 10,
		"ExerciseNumber": 7
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Bent over row",
		"Person": "C",
		"Weight": 20,
		"Reps": 10,
		"ExerciseNumber": 8
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Bent over row",
		"Person": "C",
		"Weight": 20,
		"Reps": 10,
		"ExerciseNumber": 9
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Shoulder press",
		"Person": "C",
		"Weight": 20,
		"Reps": 10,
		"ExerciseNumber": 10
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Shoulder press",
		"Person": "C",
		"Weight": 15,
		"Reps": 10,
		"ExerciseNumber": 11
	},
	{
		"Date": "8/10/2018",
		"Exercise": "Shoulder press",
		"Person": "C",
		"Weight": 15,
		"Reps": 10,
		"ExerciseNumber": 12
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Bench",
		"Person": "C",
		"Weight": 65,
		"Reps": 10,
		"ExerciseNumber": 13
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Bench",
		"Person": "C",
		"Weight": 95,
		"Reps": 10,
		"ExerciseNumber": 14
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Bench",
		"Person": "C",
		"Weight": 95,
		"Reps": 10,
		"ExerciseNumber": 15
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Bent over row",
		"Person": "C",
		"Weight": 50,
		"Reps": 10,
		"ExerciseNumber": 16
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Bent over row",
		"Person": "C",
		"Weight": 50,
		"Reps": 10,
		"ExerciseNumber": 17
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Bent over row",
		"Person": "C",
		"Weight": 50,
		"Reps": 10,
		"ExerciseNumber": 18
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Shoulder press",
		"Person": "C",
		"Weight": 30,
		"Reps": 10,
		"ExerciseNumber": 19
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Shoulder press",
		"Person": "C",
		"Weight": 30,
		"Reps": 10,
		"ExerciseNumber": 20
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Shoulder press",
		"Person": "C",
		"Weight": 30,
		"Reps": 10,
		"ExerciseNumber": 21
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Leg Press",
		"Person": "C",
		"Weight": 160,
		"Reps": 10,
		"ExerciseNumber": 22
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Leg Press",
		"Person": "C",
		"Weight": 160,
		"Reps": 10,
		"ExerciseNumber": 23
	},
	{
		"Date": "8/14/2018",
		"Exercise": "Leg Press",
		"Person": "C",
		"Weight": 160,
		"Reps": 10,
		"ExerciseNumber": 24
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Shoulder Press",
		"Person": "C",
		"Weight": 40,
		"Reps": 10,
		"ExerciseNumber": 25
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Shoulder Press",
		"Person": "C",
		"Weight": 40,
		"Reps": 10,
		"ExerciseNumber": 26
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Shoulder Press",
		"Person": "C",
		"Weight": 40,
		"Reps": 10,
		"ExerciseNumber": 27
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Bent over row",
		"Person": "C",
		"Weight": 60,
		"Reps": 10,
		"ExerciseNumber": 28
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Bent over row",
		"Person": "C",
		"Weight": 60,
		"Reps": 10,
		"ExerciseNumber": 29
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Bent over row",
		"Person": "C",
		"Weight": 60,
		"Reps": 10,
		"ExerciseNumber": 30
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Bench",
		"Person": "C",
		"Weight": 105,
		"Reps": 10,
		"ExerciseNumber": 31
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Bench",
		"Person": "C",
		"Weight": 105,
		"Reps": 9,
		"ExerciseNumber": 32
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Bench",
		"Person": "C",
		"Weight": 105,
		"Reps": 8,
		"ExerciseNumber": 33
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Hex deadlift",
		"Person": "C",
		"Weight": 105,
		"Reps": 10,
		"ExerciseNumber": 34
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Hex deadlift",
		"Person": "C",
		"Weight": 105,
		"Reps": 10,
		"ExerciseNumber": 35
	},
	{
		"Date": "8/20/2018",
		"Exercise": "Hex deadlift",
		"Person": "C",
		"Weight": 105,
		"Reps": 10,
		"ExerciseNumber": 36
	}
]

function uploadData () {
    var firestore = firebase.firestore();
    

    for(var i = 0; i < data.length; i++) {
        data[i].Date = new Date(data[i].Date)
        // console.log(data[i]);
        firestore.collection("workout-history").add(data[i]).then(function(response) {
            console.log("Success!", response);
          }, function(error) {
            console.error("Failed!", error);
          });
    }

}

export default uploadData;
