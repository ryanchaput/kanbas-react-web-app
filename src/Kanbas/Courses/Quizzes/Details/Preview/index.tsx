import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as client from '../../client';
import { FaInfoCircle, FaQuestionCircle } from 'react-icons/fa';

function PreviewQuiz() {
    const { courseId, quizId } = useParams();
    const [quiz, setQuiz] = useState<any>({ _id: "" });
    const navigate = useNavigate();

    useEffect(() => {
        client.findQuizById(quizId)
            .then((quiz) => setQuiz(quiz));
    }, [quizId]);
    
    return (
        <div>
            <h1>{quiz.name}</h1>
            <div className="alert alert-danger d-flex align-items-center">
                <FaInfoCircle style={{ fontSize: '1.5rem'}} />
                This is a preview of the published version of the quiz
            </div>
            <button className="btn btn-primary" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/Edit/${quiz._id}`)}>
                Edit this Quiz
            </button>
            <p>Started: {new Date().toLocaleString()}</p>
            <p><strong>Instructions:</strong> {quiz.description}</p>

            {/* Question display goes here */}
            
            <ul className="list-group list-group-flush">
                {quiz.questions && quiz.questions.map((question: any, index: number) => (
                    <li key={index} className="list-group-item">
                        <div className="card">
                            <div className="card-header">
                                <h3>Question {index + 1}</h3>
                            </div>
                            <div className="card-body">
                                <h5>{question.question}</h5>
                                <ul className="list-group list-group-flush">
                                    {question.answers.map((answer: any, index: number) => (
                                        <li key={index} className="list-group-item">
                                            {answer.correct ? <strong>{answer.answer}</strong> : answer.answer}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            
            {/* Question list goes here */}
            
            <h4>Questions</h4>
            <ul className="list-group list-group-flush">
                <li>
                    <FaQuestionCircle />
                    Question 1
                </li>
                {quiz.questions && quiz.questions.map((question: any, index: number) => (
                    <li key={index} className="list-group-item">
                        <FaQuestionCircle />
                        <strong>Question {index}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default PreviewQuiz;