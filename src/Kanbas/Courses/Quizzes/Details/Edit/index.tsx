import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import * as client from '../../client';
import { updateQuiz } from '../../reducer';

function QuizEdit() {
    const { courseId, quizId } = useParams();
    const [quiz, setQuiz] = useState<any>({ _id: "" });
    const [activeTab, setActiveTab] = useState("section1");
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

    useEffect(() => {
        client.findQuizById(quizId)
            .then((quiz) => setQuiz(quiz));
    }, [quizId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = e.target;
        setQuiz((prevState: any) => ({
            ...prevState,
            [id]: value
        }));
    };
  
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

                {/* Details Tab */}

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
                            <input type="number" id="points" value={quiz.points} onChange={handleInputChange}/>
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

                {/* Questions Tab */}

                <div className={activeTab === "section2" ? "tab-pane active" : "tab-pane"} id="section2">
                    <h2>Questions</h2>
                </div>
            </div>
        </div>
    );
}
export default QuizEdit;