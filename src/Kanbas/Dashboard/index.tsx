import { Link } from "react-router-dom";
function Dashboard(
    {
        courses, course, setCourse, addNewCourse, deleteCourse, updateCourse
    }: {
        courses: any[]; course: any; setCourse: (course: any) => void;
        addNewCourse: () => void; deleteCourse: (course: any) => void;
        updateCourse: () => void;
    }
) {
    return (
        <div>
            <h1>Dashboard</h1>
            <h5>Add or Edit a Course</h5>
            <input value={course.name} className="form-control"
                placeholder="Course Name" onChange={(e) => setCourse({ ...course, name: e.target.value })} />
            <input value={course.number} className="form-control"
                placeholder="Course Number" onChange={(e) => setCourse({ ...course, number: e.target.value })} />
            <input value={course.startDate} className="form-control" type="date"
                onChange={(e) => setCourse({ ...course, startDate: e.target.value })} />
            <input value={course.endDate} className="form-control" type="date"
                onChange={(e) => setCourse({ ...course, endDate: e.target.value })} />

            <button onClick={addNewCourse} className="btn btn-success" >
                Add
            </button>
            <button onClick={updateCourse} className="btn btn-info" >
                Update
            </button>
            <h2>Published Courses (3)</h2>
            <div className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course) => (
                        <div key={course._id} className="col" style={{ width: 300 }}>
                            <div className="card">
                                <img src={course.image} className="card-img-top" style={{ height: 150 }} />
                                <div className="card-body">
                                    <Link className="card-title"
                                        to={`/Kanbas/Courses/${course._id}/Home`} style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>{course.name}
                                        <button className="btn btn-warning" onClick={(event) => {
                                            event.preventDefault();
                                            setCourse(course);
                                        }}>
                                            Edit
                                        </button>
                                        <button className="btn btn-danger" onClick={(event) => {
                                            event.preventDefault();
                                            deleteCourse(course._id);
                                        }}>
                                            Delete
                                        </button>
                                    </Link>
                                    <p className="card-text">{course.name}</p>
                                    <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">Go </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Dashboard;