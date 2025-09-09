import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import Image from "../public/images/default-avatar-profile-icon-.jpg";
import { updateDetails } from "./UserProfileSlice";
import { toast } from "react-toastify";
export default function UserProfile() {
  console.log("Test");

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const imgref = useRef(null);
  const [Image1, setImage1] = useState(userDetails?.profilePic || Image);
  const [Image2, setImage2] = useState(userDetails?.BgPic || "");
  const user = useRef({
    firstName: userDetails.userDetails.firstName || "",
    lastName: userDetails.userDetails.lastName || "",
    dob: userDetails.userDetails.dob || "",
    email: userDetails.userDetails.email || "",
    mobile: userDetails.userDetails.mobile || "",
    address: userDetails.userDetails.address || "",
    hnum: userDetails.userDetails.hnum || "",
    city: userDetails.userDetails.city || "",
    state: userDetails.userDetails.state || "",
    country: userDetails.userDetails.country || "",
    zipcode: userDetails.userDetails.zipcode || "",
  });
  function handleChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        setImage1(imageData); // Set the new image
        console.log("Image 1", imageData);
        dispatch(
          updateDetails({
            name: "profilePic",
            value: imageData,
          })
        );
      };
      reader.readAsDataURL(file);
    }
  }
  function handleChange1() {
    imgref.current.click();
  }
  function handleChangeImage(e) {
    const file2 = e.target.files[0];
    if (file2) {
      const reader1 = new FileReader();
      reader1.onload = (event1) => {
        const imageData2 = event1.target.result;
        setImage2(imageData2); // Set the new image
        console.log("image 2 ", imageData2);
        dispatch(
          updateDetails({
            name: "BgPic",
            value: imageData2,
          })
        );
      };
      reader1.readAsDataURL(file2);
    }
  }
  function handleElementChange(e) {
    user.current[e.target.name] = e.target.value;
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateDetails({ name: "userDetails", value: user.current }));
    toast("User profile updated Successfully");
  }
  console.log("Onchange - ", user);
  return (
    <>
      <div className="Profile">
        <div className="left">
          <form onSubmit={handleSubmit}>
            <h2 style={{ fontWeight: "bolder", marginBottom: "1rem" }}>
              General Information
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "1rem",
              }}
            >
              <div>
                <label HTMLFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  defaultValue={userDetails.userDetails.firstName || ""}
                  onChange={handleElementChange}
                />
              </div>

              <div>
                <label HTMLFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  defaultValue={userDetails.userDetails.lastName || ""}
                  onChange={handleElementChange}
                />
              </div>
              <div>
                <label HTMLFor="dob">Date Of Birth</label>
                <input
                  type="date"
                  name="dob"
                  defaultValue={userDetails.userDetails.dob || ""}
                  onChange={handleElementChange}
                />
              </div>
              <div>
                <label HTMLFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={userDetails.userDetails.email || ""}
                  onChange={handleElementChange}
                />
              </div>
              <div>
                <label HTMLFor="mobile">Phone Number</label>
                <input
                  type="number"
                  name="mobile"
                  defaultValue={userDetails.userDetails.mobile || ""}
                  onChange={handleElementChange}
                />
              </div>
            </div>
            <h2 style={{ fontWeight: "bolder", margin: "1rem" }}>Address</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "1rem",
              }}
            >
              <div>
                <label HTMLFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  defaultValue={userDetails.userDetails.address || ""}
                  onChange={handleElementChange}
                />
              </div>
              <div>
                <label HTMLFor="hnum">House Number</label>
                <input
                  type="text"
                  name="hnum"
                  defaultValue={userDetails.userDetails.hnum || ""}
                  onChange={handleElementChange}
                />
              </div>
              <div>
                <label HTMLFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  defaultValue={userDetails.userDetails.city || ""}
                  onChange={handleElementChange}
                />
              </div>
              <div>
                <label HTMLFor="state">State</label>
                <input
                  type="text"
                  name="state"
                  defaultValue={userDetails.userDetails.state || ""}
                  onChange={handleElementChange}
                />
              </div>
              <div>
                <label HTMLFor="country">Country</label>
                <input
                  type="text"
                  name="country"
                  defaultValue={userDetails.userDetails.country || ""}
                  onChange={handleElementChange}
                />
              </div>
              <div>
                <label HTMLFor="zipcode">Zip Code</label>
                <input
                  type="number"
                  name="zipcode"
                  defaultValue={userDetails.userDetails.zipcode || ""}
                  onChange={handleElementChange}
                />
              </div>
            </div>
            <button
              style={{
                color: "#fff",
                backgroundColor: "#5a5fed",
                padding: "0.5rem 1rem",
                textAlign: "center",
                margin: "1rem",
                right: "0",
                position: "absolute",
              }}
              type="submit"
            >
              Save
            </button>
          </form>
        </div>

        <div className="right">
          <div
            style={{
              height: "160px",
              borderBottom: "2px solid #d3d3d3",
              position: "relative",
              backgroundImage: `url(${Image2})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <FontAwesomeIcon
              icon={faPencil}
              style={{
                left: "85%",
                top: "5%",
                position: "absolute",
                cursor: "pointer",
              }}
              onClick={handleChange1}
            />
            <input
              type="file"
              name="HeaderImg"
              ref={imgref}
              style={{ display: "none" }}
              onChange={handleChangeImage}
            />
            <img
              src={Image1}
              alt="Profile Avatar"
              style={{
                height: "160px",
                width: "160px",
                objectFit: "contain",
                borderRadius: "50%",
                position: "absolute",
                border: "2px solid #d3d3d3",
                top: "70px",
                left: "70px",
              }}
            />
          </div>
          <div
            style={{
              marginTop: "90px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "3rem",
            }}
          >
            <div>
              <h3 style={{ fontWeight: "bold" }}>
                {userDetails.userDetails.firstName &&
                userDetails.userDetails.lastName
                  ? `${userDetails.userDetails.firstName}, ${userDetails.userDetails.lastName}`
                  : `Unknown User`}
              </h3>
              <p>
                {userDetails.userDetails.state &&
                userDetails.userDetails.country
                  ? `${userDetails.userDetails.state}, ${userDetails.userDetails.country}`
                  : `Unknown Place, Country`}
              </p>
            </div>
            <div>
              <h3>Choose Image - JPG,PNG</h3>{" "}
              <input
                type="file"
                name="profile"
                style={{ width: "90%", fontSize: "1rem" }}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
