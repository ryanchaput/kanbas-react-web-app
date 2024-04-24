import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import * as client from '../../client';
import { updateQuiz } from '../../reducer';
import { nanoid } from '@reduxjs/toolkit';

function QuizEdit() {
    const { courseId, quizId } = useParams();
    const [quiz, setQuiz] = useState<any>({ _id: "" });
    const [activeTab, setActiveTab] = useState("section1");
    const [questions, setQuestions] = useState<any>([]); // List of questions
    const defaultMCAnswers = [
        { answer: "Answer 1", correct: false },
        { answer: "Answer 2", correct: false },
        { answer: "Answer 3", correct: false },
        { answer: "Answer 4", correct: false }
    ];
    const defaultTFAnswers = [
        { answer: "True", correct: true },
        { answer: "False", correct: false }
    ];
    const defaultFBAnswers = [
        { answer: "Blank Answer 1", correct: true },
        { answer: "Blank Answer 2", correct: true },
    ];
    const defaultQuestion = {
        _id: "default",
        question: "Question",
        points: 10,
        type: "Multiple Choice",
        answers: defaultMCAnswers,
    };
    const [editedQuestion, setEditedQuestion] = useState<any>(defaultQuestion); // Question being edited
    //const [question, setQuestion] = useState<any>(defaultQuestion); // New question
    const [points, setPoints] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleUpdateQuiz = () => {
        client.updateQuiz(quiz)
        .then((status) => {
            dispatch(updateQuiz(quiz));
            // Navigate to the Quiz Details page on successful update
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`);
        })
        .catch((error) => {
            console.error("Error updating quiz", error);
        });
    };
    const handleAddQuestion = () => {
        const q = { ...defaultQuestion, _id: nanoid() };
        setQuestions([...questions, q]);
        
    };
    const handleDeleteQuestion = (questionId: string) => {
        setQuestions(questions.filter((question: any) => question._id !== questionId));
        setPoints(
            questions.reduce((acc: number, question: any) => acc + question.points, 0)
        );
    };
    const handleSaveQuestion = (question: any) => {
        setQuestions(questions.map((q: any) => {
            if (q._id === question._id) {
                return question;
            } else {
                return q;
            }
        }));
        setPoints(
            questions.reduce((acc: number, question: any) => acc + question.points, 0)
        );
        handleCloseEditMenu();
    }
    const handleEditQuestion = (question: any) => {
        setEditedQuestion(question);
    };
    const handleCloseEditMenu = () => {
        setEditedQuestion(defaultQuestion);
    };
    useEffect(() => {
        client.findQuizById(quizId)
            .then((quiz) => setQuiz(quiz));
        setPoints(
            questions.reduce((acc: number, question: any) => acc + question.points, 0)
        );
    }, [quizId, handleAddQuestion]);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = e.target;
        setQuiz((prevState: any) => ({
            ...prevState,
            [id]: value
        }));
    };
    // Edit Quiz Details Menu
    const details = (
        <div className={activeTab === "section1" ? "tab-pane active" : "tab-pane"} id="section1">
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={quiz.name} onChange={handleInputChange}/>
                </li>
                <li className="list-group-item">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" value={quiz.description} onChange={handleInputChange}/>
                </li>
                <li className="list-group-item">
                <label htmlFor="type">Quiz Type</label>
                    <select id="type" value={quiz.type} onChange={handleInputChange}>
                        <option value="Graded Quiz">Graded Quiz</option>
                        <option value="Practice Quiz">Practice Quiz</option>
                        <option value="Graded Survey">Graded Survey</option>
                        <option value="Ungraded Survey">Ungraded Survey</option>
                    </select>
                </li>
                <li className="list-group-item">
                    <label htmlFor="points">Points</label>
                    <input type="number" id="points" value={points} readOnly/>
                </li>
                <li className="list-group-item">
                    <label htmlFor="assignmentGroup">Assignment Group</label>
                    <select id="assignmentGroup" value={quiz.assignmentGroup} onChange={handleInputChange}>
                        <option value="Quizzes">Quizzes</option>
                        <option value="Assignments">Assignments</option>
                        <option value="Exams">Exams</option>
                        <option value="Project">Project</option>
                    </select>
                </li>
                <li className="list-group-item">
                    <label htmlFor="shuffle">Shuffle Answers</label>
                    <select id="shuffle" value={quiz.shuffle} onChange={handleInputChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </li>
                <li className="list-group-item">
                    <label htmlFor="time">Time Limit</label>
                    <input type="number" id="time" value={quiz.time} onChange={handleInputChange}/>
                </li>
                <li className="list-group-item">
                    <label htmlFor="multipleAttempts">Multiple Attempts</label>
                    <select id="multipleAttempts" value={quiz.multipleAttempts} onChange={handleInputChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </li>
                <li className="list-group-item">
                    <label htmlFor="showCorrect">Show Correct Answers</label>
                    <select id="showCorrect" value={quiz.showCorrect} onChange={handleInputChange}>
                        <option value="Immediately">Immediately</option>
                        <option value="After Last Attempt">After Last Attempt</option>
                        <option value="After Due Date">After Due Date</option>
                    </select>
                </li>
                <li className="list-group-item">
                    <label htmlFor="accessCode">Access Code</label>
                    <input type="text" id="accessCode" value={quiz.accessCode} onChange={handleInputChange}/>
                </li>
                <li className="list-group-item">
                    <label htmlFor="oneQ">One Question at a Time</label>
                    <select id="oneQ" value={quiz.oneQ} onChange={handleInputChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </li>
                <li className="list-group-item">
                    <label htmlFor="camera">Webcam Required</label>
                    <select id="camera" value={quiz.camera} onChange={handleInputChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </li>
                <li className="list-group-item">
                    <label htmlFor="lockQ">Lock Questions After Answering</label>
                    <select id="lockQ" value={quiz.lockQ} onChange={handleInputChange}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </li>
                <li className="list-group-item">
                <label htmlFor="published">Published</label>
                    <select id="published" value={quiz.published} onChange={handleInputChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </li>
                <li className="list-group-item">
                    <label htmlFor="due">Due Date</label>
                    <input type="date" id="due" value={quiz.due} onChange={handleInputChange}/>
                </li>
                <li className="list-group-item">
                    <label htmlFor="available">Available Date</label>
                    <input type="date" id="available" value={quiz.available} onChange={handleInputChange}/>
                </li>
                <li className="list-group-item">
                    <label htmlFor="until">Until Date</label>
                    <input type="date" id="until" value={quiz.until} onChange={handleInputChange}/>
                </li>
            </ul>
        </div>
    );
    const multipleChoiceMenu = (
        <div>
            <label htmlFor="question">Question</label>
            <input type="text" id="question" value={editedQuestion.question} onChange={(e) => {
                setEditedQuestion({
                    ...editedQuestion,
                    question: e.target.value
                });
            }}/>
            <label htmlFor="points">Points</label>
            <input type="number" id="points" value={editedQuestion.points} onChange={(e) => {
                setEditedQuestion({
                    ...editedQuestion,
                    points: e.target.value
                });
            }}/>
            <label htmlFor="type">Type</label>
            <select id="type" value={editedQuestion.type} onChange={(e) => {
                setEditedQuestion({
                    ...editedQuestion,
                    type: e.target.value
                });
            }}>
                <option value="Multiple Choice">Multiple Choice</option>
                <option value="True/False">True/False</option>
                <option value="Fill in the Blank">Fill in the Blank</option>
            </select>
            <ul className="list-group list-group-flush">
                {editedQuestion.answers.map((answer: any, index: number) => (
                    <li key={index} className="list-group-item">
                        <input type="text" value={answer.answer} onChange={(e) => {
                            setEditedQuestion({
                                ...editedQuestion,
                                answers: editedQuestion.answers.map((a: any, i: number) => {
                                    if (i === index) {
                                        return {
                                            ...a,
                                            answer: e.target.value
                                        };
                                    } else {
                                        return a;
                                    }
                                })
                            });
                        }}/>
                        <input type="radio" checked={answer.correct} onChange={(e) => {
                            setEditedQuestion({
                                ...editedQuestion,
                                answers: editedQuestion.answers.map((a: any, i: number) => {
                                    if (i === index) {
                                        return {
                                            ...a,
                                            correct: e.target.checked
                                        };
                                    } else {
                                        return a;
                                    }
                                })
                            });
                        }}/>
                    </li>
                ))}
            </ul>
        </div>
    );
    const trueFalseMenu = (
        <div>
            <label htmlFor="question">Question</label>
            <input type="text" id="question" value={editedQuestion.question} onChange={(e) => {
                setEditedQuestion({
                    ...editedQuestion,
                    question: e.target.value
                });
            }}/>
            <label htmlFor="points">Points</label>
            <input type="number" id="points" value={editedQuestion.points} onChange={(e) => {
                setEditedQuestion({
                    ...editedQuestion,
                    points: e.target.value
                });
            }}/>
            <label htmlFor="type">Type</label>
            <select id="type" value={editedQuestion.type} onChange={(e) => {
                setEditedQuestion({
                    ...editedQuestion,
                    type: e.target.value
                });
            }}>
                <option value="Multiple Choice">Multiple Choice</option>
                <option value="True/False">True/False</option>
                <option value="Fill in the Blank">Fill in the Blank</option>
            </select>
            <ul className="list-group list-group-flush">
                {editedQuestion.answers.map((answer: any, index: number) => (
                    <li key={index} className="list-group-item">
                        <input type="text" value={answer.answer} onChange={(e) => {
                            setEditedQuestion({
                                ...editedQuestion,
                                answers: editedQuestion.answers.map((a: any, i: number) => {
                                    if (i === index) {
                                        return {
                                            ...a,
                                            answer: e.target.value
                                        };
                                    } else {
                                        return a;
                                    }
                                })
                            });
                        }}/>
                        <input type="radio" checked={answer.correct} onChange={(e) => {
                            setEditedQuestion({
                                ...editedQuestion,
                                answers: editedQuestion.answers.map((a: any, i: number) => {
                                    if (i === index) {
                                        return {
                                            ...a,
                                            correct: e.target.checked
                                        };
                                    } else {
                                        return a;
                                    }
                                })
                            });
                        }}/>
                    </li>
                ))}
            </ul>
        </div>
    );
    // Edit Question Menu
    const editedQuestionMenu = (
        <div>
            <label htmlFor="question">Question</label>
            <input type="text" id="question" value={editedQuestion.question} onChange={(e) => {
                setEditedQuestion({
                    ...editedQuestion,
                    question: e.target.value
                });
            }}/>
            <label htmlFor="points">Points</label>
            <input type="number" id="points" value={editedQuestion.points} onChange={(e) => {
                setEditedQuestion({
                    ...editedQuestion,
                    points: e.target.value
                });
            }}/>
            <label htmlFor="type">Type</label>
            <select id="type" value={editedQuestion.type} onChange={(e) => {
                setEditedQuestion({
                    ...editedQuestion,
                    type: e.target.value
                });
            }}>
                <option value="Multiple Choice">Multiple Choice</option>
                <option value="True/False">True/False</option>
                <option value="Fill in the Blank">Fill in the Blank</option>
                <option value="Short Answer">Short Answer</option>
                <option value="Matching">Matching</option>
            </select>
            <ul className="list-group list-group-flush">
                {editedQuestion.answers.map((answer: any, index: number) => (
                    <li key={index} className="list-group-item">
                        <input type="text" value={answer.answer} onChange={(e) => {
                            setEditedQuestion({
                                ...editedQuestion,
                                answers: editedQuestion.answers.map((a: any, i: number) => {
                                    if (i === index) {
                                        return {
                                            ...a,
                                            answer: e.target.value
                                        };
                                    } else {
                                        return a;
                                    }
                                })
                            });
                        }}/>
                        <input type="checkbox" checked={answer.correct} onChange={(e) => {
                            setEditedQuestion({
                                ...editedQuestion,
                                answers: editedQuestion.answers.map((a: any, i: number) => {
                                    if (i === index) {
                                        return {
                                            ...a,
                                            correct: e.target.checked
                                        };
                                    } else {
                                        return a;
                                    }
                                })
                            });
                        }}/>
                    </li>
                ))}
            </ul>
        </div>
    );
    // List of Questions
    const questionList = (
        <div className={activeTab === "section2" ? "tab-pane active" : "tab-pane"} id="section2">
            <button className="btn btn-primary" onClick={handleAddQuestion}>
                Add Question
            </button>
            <ul className="list-group list-group-flush">
                {questions.map((question: any, index: number) => (
                    <li key={index} className="list-group-item">
                        <h5>{question.question} ({question.type})</h5>
                        <ul className="list-group list-group-flush">
                            {question.answers.map((answer: any, index: number) => (
                                <li key={index} className="list-group-item">
                                    {answer.correct ? <strong>{answer.answer}</strong> : answer.answer}
                                </li>
                            ))}
                        </ul>
                        {editedQuestion && editedQuestion._id === question._id && (
                            <div>
                                {/* Edit Question Menu */}
                                {editedQuestionMenu}
                                <button className="btn btn-success btn-sm" onClick={() => handleSaveQuestion(editedQuestion)}>
                                    Save
                                </button>
                                <button className="btn btn-secondary btn-sm" onClick={handleCloseEditMenu}>
                                    Close
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteQuestion(question._id)}>
                                    Delete
                                </button>
                            </div>
                        )}
                        <button className="btn btn-warning btn-sm" onClick={() => handleEditQuestion(question)}>
                            Edit Question
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div>
            <span>
                <button className="btn btn-info" onClick={handleUpdateQuiz}>Save</button>
                <button className="btn btn-success">Save & Publish</button>
                <button className="btn btn-danger" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`)}>Cancel</button>
            </span>
            <h1>Edit Quiz: {quiz.name}</h1>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className={activeTab === "section1" ? "nav-link active" : "nav-link"} onClick={() => setActiveTab("section1")}>Details</a>
                </li>
                <li className="nav-item">
                    <a className={activeTab === "section2" ? "nav-link active" : "nav-link"} onClick={() => setActiveTab("section2")}>Questions</a>
                </li>
            </ul>
            <div className="tab-content">
                {details}
                {questionList}
            </div>
        </div>
    );
}
export default QuizEdit;