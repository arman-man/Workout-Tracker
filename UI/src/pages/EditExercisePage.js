import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

export const EditExercisePage = ({ exercise }) => {

    const [name, setName] = useState(exercise.name);
    const [reps, setReps] = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);
    const [unit, setUnit] = useState(exercise.unit);
    const [date, setDate] = useState(exercise.date.toLocaleString("en-US").slice(0, 10));


    const history = useHistory();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: name,
                reps: reps,
                weight: weight,
                unit: unit,
                date: date
            }),
            headers: { 'Content-Type': 'application/json', },
        });

        if (response.status === 200) {
            alert("Successfully edited exercise!");
        } else {
            const errMessage = await response.json();
            if (errMessage.errors !== undefined) {
                alert(`Failed to update exercise. Status ${response.status}. ${errMessage.errors[0].msg}`);
            }
            else {
                alert(`Failed to update exercise. Status ${response.status}. ${errMessage.error}`);
            }
        }
        history.push("/");
    };

    return (
        <>
            <article>
                <h2>Edit Exercise</h2>
                <p>Must contain valid name, reps, weight, unit, and date.</p>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <label htmlFor="name">Exercise</label>
                    <input required
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        id="name" />

                    <label htmlFor="reps">Reps</label>
                    <input required
                        type="number"
                        value={reps}
                        onChange={e => setReps(e.target.value)}
                        id="reps" />

                    <label htmlFor="weight">Weight</label>
                    <input required
                        type="number"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                        id="weight" />

                    <label htmlFor="unit">Unit</label>
                    <select required
                        name="unit" id="unit"
                        value={unit}
                        onChange={e => setUnit(e.target.value)}>
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
                            onClick={editExercise}
                            id="submit"
                        >Save</button></label>
                </form>
            </article>
        </>
    );
}
export default EditExercisePage;