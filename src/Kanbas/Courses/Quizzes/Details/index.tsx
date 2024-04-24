import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import * as client from '../client';
import { updateQuiz } from '../reducer';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function QuizDetails() {
    const { courseId, quizId } = useParams();
    const [quiz, setQuiz] = useState<any>({ _id: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdateQuiz = (quiz: any) => {
        client.updateQuiz(quiz)
        .then((status) => {
            dispatch(updateQuiz(quiz))
        });
    };

    useEffect(() => {
        client.findQuizById(quizId)
            .then((quiz) => setQuiz(quiz));
    }, [quiz]);

    return (
        <div>
            <span className="float-end">
                <button className={quiz.published ? "btn btn-success" : "btn btn-danger"} onClick={() => handleUpdateQuiz({ ...quiz, published: !quiz.published })}>
                    {quiz.published ? <FaCheckCircle /> : <FaTimesCircle />}
                    {quiz.published ? " Published" : " Unpublished"}
                </button>
                <button className="btn btn-primary" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/Edit/${quiz._id}`)}>
                    Edit
                </button>
                <button className= "btn btn-outline-dark" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/Preview/${quiz._id}`)}>
                    Preview
                </button>
            </span>
            <h2>Quiz Details: {quiz.name}</h2>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Description: {quiz.description}</li>
                <li className="list-group-item">Quiz Type: {quiz.type}</li>
                <li className="list-group-item">Points: {quiz.points || 0}</li>
                <li className="list-group-item">Assignment Group: Quizzes</li>
                <li className="list-group-item">Shuffle Answers: {quiz.shuffle || "Yes"}</li>
                <li className="list-group-item">Time Limit: {quiz.time} Minutes</li>
                <li className="list-group-item">Multiple Attempts: {quiz.multipleAttempts || "No"}</li>
                <li className="list-group-item">Show Correct Answers: {quiz.showCorrect || "Immediately"}</li>
                <li className="list-group-item">Access Code: {quiz.accessCode}</li>
                <li className="list-group-item">One Question at a Time: {quiz.oneQ || "Yes"}</li>
                <li className="list-group-item">Webcam Required: {quiz.camera || "No"}</li>
                <li className="list-group-item">Lock Questions After Answering: {quiz.lockQ || "No"}</li>
                <li className="list-group-item">Published: {String(quiz.published)}</li>
                <li className="list-group-item">Due Date: {quiz.due}</li>
                <li className="list-group-item">Available Date: {quiz.available}</li>
                <li className="list-group-item">Until Date: {quiz.until}</li>
            </ul>
        </div>
    );
}
export default QuizDetails;