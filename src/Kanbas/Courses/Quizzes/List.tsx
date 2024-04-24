import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import {
    addQuiz,
    deleteQuiz,
    updateQuiz,
    setQuiz,
    setQuizzes,
} from "./reducer";
import * as client from "./client";
import { KanbasState } from "../../store";
import {
    FaEllipsisV,
    FaCheckCircle,
    FaPlusCircle,
    FaTimesCircle,
    FaBook,
} from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { findQuizzesForCourse, createQuiz } from "./client";

function QuizList() {
    const { courseId } = useParams();
    const quizList = useSelector((state: KanbasState) => state.quizzesReducer.quizzes);
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleDeleteQuiz = (quizId: string) => {
        client.deleteQuiz(quizId).then((status) => {
            dispatch(deleteQuiz(quizId));
        });
    };
    const handleAddQuiz = () => {
        createQuiz(courseId, quiz)
            .then((quiz) => {
                dispatch(addQuiz(quiz));
                navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`);
            });
    };
    const handleUpdateQuiz = (quiz: any) => {
        client.updateQuiz(quiz)
        .then((status) => {
            dispatch(updateQuiz(quiz))
        });
    };
    useEffect(() => {
        findQuizzesForCourse(courseId)
            .then((quizzes) =>
                dispatch(setQuizzes(quizzes))
            );
    }, [courseId]);

    const [showMenu, setShowMenu] = useState(false);

    const handleToggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <>
            <button className="btn btn-success" onClick={handleAddQuiz}>
                <FaPlusCircle/> Quiz
            </button>
            <ul className="list-group wd-quizzes">
                {quizList
                    .filter((quiz) => quiz.course === courseId)
                    .map((quiz, index) => (
                        <li key={index} className="list-group-item" style={quiz.published ? { borderLeft: '5px solid green' } : { }}>
                            <div style={{ fontSize: '18px' }}>
                                <FaBook className="me-2" style={ quiz.published ? {color: 'green'} : {} } />
                                <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}>
                                    <strong>{quiz.name}</strong>
                                </Link>
                                <span className="float-end">
                                    <button className="btn btn-light" onClick={() => handleUpdateQuiz({ ...quiz, published: !quiz.published })} >
                                        {quiz.published ? <FaCheckCircle className="text-success" /> : <FaTimesCircle />}
                                    </button>
                                    <button className="btn btn-light" onClick={handleToggleMenu}>
                                        <FaEllipsisV />
                                    </button>
                                    {showMenu && (
                                        <div className="menu">
                                            <button className={quiz.published ? "btn btn-outline-danger btn-sm" : "btn btn-outline-success btn-sm"} onClick={() => handleUpdateQuiz({ ...quiz, published: !quiz.published })}>
                                                {quiz.published ? "Unpublish" : "Publish"}
                                            </button>
                                            <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/Kanbas/Courses/${courseId}/Quizzes/Edit/${quiz._id}`)}>
                                                Edit
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteQuiz(quiz._id)}>
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </span>
                            </div>
                            <div>
                                <span>
                                    <strong>Not available until:</strong> {quiz.available}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <strong>Due:</strong> {quiz.due}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {quiz.points || 0} pts&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {quiz.questions && <>{quiz.questions.length} Questions</>}
                                </span>
                            </div>
                        </li>
                    ))}
            </ul>
        </>
    );
}
export default QuizList;
