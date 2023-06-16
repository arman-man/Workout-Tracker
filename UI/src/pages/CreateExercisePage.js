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
            const errMessage = await response.json();
            if (errMessage.errors !== undefined) {
                alert(`Failed to create exercise. Status ${response.status}. ${errMessage.errors[0].msg}`);
            }
            else {
                alert(`Failed to create exercise. Status ${response.status}. ${errMessage.error}`);
            }
        }
        history.push("/");
    };


    return (
        <>
            <article>
                <h2>Create Exercise</h2>
                <p>Must contain valid name, reps, weight, unit, and date.</p>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <label htmlFor="name">Exercise</label>
                    <input required
                        type="text"
                        placeholder="Exercise name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        id="name" />

                    <label htmlFor="reps">Reps</label>
                    <input required
                        type="number"
                        value={reps}
                        placeholder="Reps performed"
                        onChange={e => setReps(e.target.value)}
                        id="reps" />

                    <label htmlFor="weight">Weight</label>
                    <input required
                        type="number"
                        placeholder="Weight used"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                        id="weight" />

                    <label htmlFor="unit">Unit</label>
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

                    <label htmlFor="date">Date</label>
                    <input required
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        id="date" />

                    <label htmlFor="submit">
                        <button
                            type="submit"
                            onClick={createExercise}
                            id="submit"
                        >Create</button></label>
                </form>
            </article>
        </>
    );
}

export default CreateExercisePage;