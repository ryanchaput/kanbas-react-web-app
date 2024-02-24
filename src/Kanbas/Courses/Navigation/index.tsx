import { Link, useLocation } from "react-router-dom";
import "./index.css";

function CourseNavigation() {
    const links = ["Home", "Modules", "Piazza", "Grades", "Assignments", "People", "Zoom Meetings", "Announcements", "Pages", "Files", "Syllabus", "Outcomes", "Quizzes", "Settings"];
    const { pathname } = useLocation();
    return (
        <ul className="wd-navigation">
            {links.map((link, index) => (
                <li key={index} className={pathname.includes(link) ? "wd-active" : ""}>
                    <Link to={link}>{link}</Link>
                </li>
            ))}
        </ul>
    );
}
export default CourseNavigation;