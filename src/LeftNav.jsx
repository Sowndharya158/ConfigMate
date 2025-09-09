import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
export default function LeftNav() {
  return (
    <section className="left-nav">
      <h1 className="logo">ConfigMate</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <FontAwesomeIcon
                icon={faChartLine}
                style={{ color: "#5a5fed" }}
              />{" "}
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/uploadRules">
              <FontAwesomeIcon
                icon={faCloudArrowUp}
                style={{ color: "#5a5fed" }}
              />
              Upload Rules
            </Link>
          </li>
          <li>
            <Link to="/History">
              <FontAwesomeIcon icon={faClock} style={{ color: "#5a5fed" }} />
              History
            </Link>
          </li>
          <li>
            <Link to="/AddFirewall">
              <FontAwesomeIcon icon={faGear} style={{ color: "#5a5fed" }} />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
