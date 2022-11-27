import 'dotenv/config';
import express from 'express';
import * as exercises from './exercises-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());


// CREATE controller ******************************************
app.post('/exercises', (req, res) => {
    exercises.createExercise(
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
    )
        .then(exercise => {
            if (!(req.body.name.length > 0)) {
                console.log(error);
                res.status(400).json({ error: "The name property must be a string containing at least one character" });
            }
            else if (!(req.body.reps > 0)) {
                console.log(error);
                res.status(400).json({ error: "The reps property must be an integer greater than 0." });
            }
            else if (!(req.body.weight > 0)) {
                console.log(error);
                res.status(400).json({ error: "The weight property must be an integer greater than 0." });
            }
            else if ((req.body.unit.toLowerCase() === "kgs" || req.body.unit.toLowerCase() === "lbs" ||
                req.body.unit.toLowerCase() === "miles" || req.body.unit.toLowerCase() === "kms") === false) {
                console.log(error);
                res.status(400).json({ error: "The unit property must be a string of either kgs, lbs, miles, or kms." });
            }
            else {
                res.status(201).json(exercise);
            }
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: "Invalid request" });
        });
});


// RETRIEVE controller ****************************************************
// GET exercise by ID
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => {
            if (exercise !== null) {
                res.json(exercise);
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Request to retrieve document failed' });
        });

});


// GET list of all exercises
app.get('/exercises/', (req, res) => {
    exercises.getExercises()
        .then(exercises => {
            res.status(200).json(exercises)
        })
});

// DELETE Controller ******************************
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request to delete a document failed' });
        });
});

// UPDATE controller ************************************
app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(
        req.params._id,
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
    )

        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({
                    _id: req.params._id,
                    name: req.body.name,
                    reps: req.body.reps,
                    weight: req.body.weight,
                    unit: req.body.unit,
                    date: req.body.date
                })
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request to update a document failed' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});