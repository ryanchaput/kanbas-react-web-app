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
                    <button className="btn btn-info" onClick={() => dispatch(updateModule(module))}>
                        Update
                    </button>
                    <form>
                        <div className="form-group">
                            <input className="form-control" value={module.name}
                                onChange={(e) =>
                                    dispatch(setModule({
                                        ...module, name: e.target.value
                                    }))} />
                            <textarea className="form-control" value={module.description}
                                onChange={(e) => dispatch(setModule({
                                    ...module, description: e.target.value
                                }))} />
                        </div>
                    </form>
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
                        </li>
                    ))}
            </ul>
        </>
    );
}
export default ModuleList;