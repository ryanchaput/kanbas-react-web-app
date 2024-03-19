import React, { useState } from "react";
//import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
} from "./reducer";
import { KanbasState } from "../../store";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
function ModuleList() {
    const { courseId } = useParams();
    const moduleList = useSelector((state: KanbasState) => state.modulesReducer.modules);
    const module = useSelector((state: KanbasState) => state.modulesReducer.module);
    const dispatch = useDispatch();
    return (
        <>
            {/* <!-- Add buttons here --> */}
            <ul className="list-group wd-modules">
                <li className="list-group-item">
                    <button className="btn btn-success" onClick={() => dispatch(addModule({ ...module, course: courseId }))}>
                        Add
                    </button>
                    <button className="btn btn-secondary" onClick={() => dispatch(updateModule(module))}>
                        Update
                    </button>
                    <input className="form-control" value={module.name}
                        onChange={(e) =>
                            dispatch(setModule({
                                ...module, name: e.target.value
                            }))} />
                    <textarea className="form-control" value={module.description}
                        onChange={(e) => dispatch(setModule({
                            ...module, description: e.target.value
                        }))} />
                </li>
                {moduleList
                    .filter((module) => module.course === courseId)
                    .map((module, index) => (
                        <li key={index}
                            className="list-group-item">
                            <button className="btn btn-warning" onClick={(event) => { dispatch(setModule(module)) }}>
                                Edit
                            </button>
                            <button className="btn btn-danger" onClick={() => dispatch(deleteModule(module._id))} >
                                Delete
                            </button>
                            <div>
                                <FaEllipsisV className="me-2" />
                                {module.name}
                                <span className="float-end">
                                    <FaCheckCircle className="text-success" />
                                    <FaPlusCircle className="ms-2" />
                                    <FaEllipsisV className="ms-2" />
                                </span>
                            </div>
                            {/*selectedModule._id === module._id && (
                            <ul className="list-group">
                                {module.lessons?.map((lesson, index) => (
                                    <li className="list-group-item" key={index}>
                                        <FaEllipsisV className="me-2" />
                                        {lesson.name}
                                        <span className="float-end">
                                            <FaCheckCircle className="text-success" />
                                            <FaEllipsisV className="ms-2" />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                                )*/}
                        </li>
                    ))}
            </ul>
        </>
    );
}
export default ModuleList;