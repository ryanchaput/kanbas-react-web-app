import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import Assignment3 from '../a3';
function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2024-04-02", completed: false, score: 0,
    });
    const [module, setModule] = useState({
        id: "TestID", name: "TestName", description: "TestDescription",
        course: "TestCourse",
    });
    const ASSIGNMENT_URL = 'http://localhost:4000/a5/assignment';
    const MODULE_URL = 'http://localhost:4000/a5/module';
    const fetchAssignment = async () => {
        const response = await axios.get(`${ASSIGNMENT_URL}`);
        setAssignment(response.data);
    };
    const updateTitle = async () => {
        const response = await axios
            .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
        setAssignment(response.data);
    };
    useEffect(() => {
        fetchAssignment();
    }, []);

    return (
        <div>
            <h3>Working with Objects</h3>
            <h3>Modifying Properties</h3>
            <input onChange={(e) => setAssignment({
                ...assignment, title: e.target.value
            })}
                value={assignment.title} type="text" />
            <button onClick={updateTitle} >
                Update Title to: {assignment.title}
            </button>
            <button onClick={fetchAssignment} >
                Fetch Assignment
            </button>
            <h4>Modifying Properties</h4>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <a className="btn btn-outline-info" href={`${ASSIGNMENT_URL}/name/${assignment.title}`}>
                        Update Assignment Title
                    </a>
                </div>
                <input type="text" className="form-control"
                    onChange={(e) => setAssignment({
                        ...assignment,
                        title: e.target.value
                    })}
                    value={assignment.title} />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <a className="btn btn-outline-info" href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
                        Update Assignment Score
                    </a>
                </div>
                <input type="number" className="form-control"
                    onChange={(e) => setAssignment({
                        ...assignment,
                        score: parseInt(e.target.value)
                    })}
                    value={assignment.score} />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <a className="btn btn-outline-info" href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}>
                        Update Assignment Completion
                    </a>
                </div>
                <input type="checkbox"
                    onChange={(e) => setAssignment({
                        ...assignment,
                        completed: e.target.checked
                    })}
                    value={assignment.completed.toString()} />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <a className="btn btn-outline-success" href={`${MODULE_URL}/name/${module.name}`}>
                        Update Module Name
                    </a>
                </div>
                <input type="text" className="form-control"
                    onChange={(e) => setModule({
                        ...module,
                        name: e.target.value
                    })}
                    value={module.name} />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <a className="btn btn-outline-success" href={`${MODULE_URL}/description/${module.description}`}>
                        Update Module Description
                    </a>
                </div>
                <input type="text" className="form-control"
                    onChange={(e) => setModule({
                        ...module,
                        description: e.target.value
                    })}
                    value={module.description} />
            </div>
            <h4>Retrieving Objects</h4>
            <a className="btn btn-outline-info" href={`http://localhost:4000/a5/assignment`}>
                Get Assignment
            </a><br></br>
            <a className="btn btn-outline-success" href={`http://localhost:4000/a5/module`}>
                Get Module
            </a>
            <h4>Retrieving Properties</h4>
            <a className="btn btn-outline-info" href="http://localhost:4000/a5/assignment/title">
                Get Title
            </a><br></br>
            <a className="btn btn-outline-success" href="http://localhost:4000/a5/module/name">
                Get Module Name
            </a>
        </div>
    );
}
export default WorkingWithObjects;