import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');


    const history = useHistory();

    const createExercise = async () => {
        const newExercise = { name: name, reps: reps, weight: weight, unit: unit, date: date };
        const response = await fetch('/exercises', {
            method: 'post',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully created the exercise!");
        } else {
            alert(`Failed to create exercise, status code = ${response.status}`);
        }
        history.push("/");
    };


    return (
        <>
            <article>
                <h2>Create to the collection</h2>
                <p>Paragraph about this page.</p>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <fieldset>
                        <legend>Which exercise are you creating?</legend>
                        <label for="name">Exercise name</label>
                        <input required
                            type="text"
                            placeholder="Name of the exercise"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            id="name" />

                        <label for="reps">Reps done</label>
                        <input required
                            type="number"
                            value={reps}
                            placeholder="Reps of the exercise"
                            onChange={e => setReps(e.target.value)}
                            id="reps" />

                        <label for="weight">Weight</label>
                        <input required
                            type="number"
                            placeholder="Weight of the exercise"
                            value={weight}
                            onChange={e => setWeight(e.target.value)}
                            id="weight" />

                        <label for="unit">Unit</label>
                        <select required
                            name="unit" id="unit"
                            value={unit}
                            onChange={e => setUnit(e.target.value)}>
                            <option>---Select---</option>
                            <option value="lbs">lbs</option>
                            <option value="kgs">kgs</option>
                            <option value="miles">miles</option>
                            <option value="kms">kms</option>
                        </select>

                        <label for="date">Date</label>
                        <input required
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            id="date" />

                        <label for="submit">
                            <button
                                type="submit"
                                onClick={createExercise}
                                id="submit"
                            >Create</button> to the collection</label>
                    </fieldset>
                </form>
            </article>
        </>
    );
}

export default CreateExercisePage;