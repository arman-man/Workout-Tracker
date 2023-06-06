import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Exercise({ exercise, onEdit, onDelete }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{new Date(exercise.date).toLocaleDateString("en-US")}</td>
            <td><MdDeleteForever onClick={() => onDelete(exercise._id)} /></td>
            <td><MdEdit onClick={() => onEdit(exercise)} /></td>
        </tr>
    );
}

export default Exercise;



