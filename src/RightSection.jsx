import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet } from "react-router-dom";
import Image from "../public/images/default-avatar-profile-icon-.jpg";
import FileUpload from "./FileUpload";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function RightSection() {
  const [box, showBox] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  function handleBox() {
    showBox((boxval) => !boxval);
  }
  return (
    <section className="right-section">
      <nav style={{ marginBottom: "2rem" }}>
        <ul>
          <li>
            <FontAwesomeIcon
              icon={faCircleUser}
              size="xl"
              onClick={handleBox}
            />
          </li>
        </ul>
      </nav>
      {box && (
        <nav
          style={{
            margin: "2.5rem 1rem",
            border: "2px solid #d3d3d3",
            width: "250px",
            height: "auto",
            borderRadius: "0.5rem",
            position: "fixed",
          }}
        >
          <h3
            style={{
              position: "absolute",
              top: "2%",
              right: "5%",
              cursor: "pointer",
              fontWeight: "bolder",
              fontSize: "1.2rem",
            }}
            onClick={handleBox}
          >
            X
          </h3>{" "}
          <h3 style={{ textAlign: "center", fontWeight: "bolder" }}>
            {userDetails.userDetails?.firstName &&
            userDetails.userDetails?.lastName
              ? `${userDetails.userDetails?.firstName}, ${userDetails.userDetails?.lastName}`
              : `Unknown User`}
          </h3>
          <img
            src={userDetails?.profilePic ? userDetails?.profilePic : Image}
            width="50%"
            height="60%"
            style={{
              margin: "1rem auto",
              border: "1px solid #d3d3d3",
              borderRadius: "50%",
            }}
          />
          <h3 style={{ textAlign: "center", cursor: "pointer" }}>
            <Link to="/">Dashboard</Link>
          </h3>
          <h3 style={{ textAlign: "center", cursor: "pointer" }}>
            <Link to="/userprofile">My User Profile</Link>
          </h3>
          <h3 style={{ textAlign: "center", cursor: "pointer" }}>
            <Link to="/AddFirewall">Firewall Settings</Link>
          </h3>
        </nav>
      )}
      <div
        height="250px"
        width="200px"
        style={{
          backgroundColor: "red",
          bottom: "80%",
          position: "sticky",
          left: "-20%",
        }}
      ></div>

      <div className="content">
        <Outlet />
      </div>
    </section>
  );
}
