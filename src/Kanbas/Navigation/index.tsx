import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt, FaInbox, FaClock, FaDesktop, FaShare, FaQuestion } from "react-icons/fa";
function KanbasNavigation() {
    const links = [
        { label: "Account", icon: <FaRegUserCircle className="fs-2" /> },
        { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" /> },
        { label: "Courses", icon: <FaBook className="fs-2" /> },
        { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" /> },
        {
            label: "Inbox", icon: <FaInbox className="fs-2" />
        },
        {
            label: "History", icon: <FaClock className="fs-2" />
        },
        {
            label: "Studio", icon: <FaDesktop className="fs-2" />
        },
        {
            label: "Commons", icon: <FaShare className="fs-2" />
        },
        {
            label: "Help", icon: <FaQuestion className="fs-2" />
        }
    ];
    const { pathname } = useLocation();
    return (
        <ul className="wd-kanbas-navigation">
            <li>
                <a href="http://northeastern.edu"><img src="/images/northeastern.jpg" style={{ "maxWidth": "65px", "height": "auto" }} /></a></li>
            {links.map((link, index) => (
                <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
                    <Link to={`/Kanbas/${link.label}`}> {link.icon} {link.label}</Link>
                </li>
            ))}
        </ul>
    );
}
export default KanbasNavigation;