import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addFile } from "./fileSlice";
import * as XLSX from "xlsx";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
export default function UploadForm() {
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    changerequestid: "",
    firewallname: "",
    env: "",
    requestor: "",
    approval: "",
    effdate: "",
    tags: "",
  });
  const [fileData, setFileData] = useState(null);
  let data = useSelector((state) => state.upload);
  let firewallNames = useSelector((state) => state.addFirewall.firewalls);
  console.log(firewallNames);
  console.log("test-- ", data);
  let dispatch = useDispatch();

  function handleChange(e) {
    setFormData((data) => {
      return { ...data, [e.target.name]: e.target.value };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!fileData) {
      alert("Please upload a file to proceed..");
      return;
    }
    dispatch(addFile({ ...formData, file: fileData }));
    setFormData({
      title: "",
      description: "",
      changerequestid: "",
      firewallname: "",
      env: "",
      requestor: "",
      approval: "",
      effdate: "",
      tags: "",
    });
    setFileData(null);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    toast.success("File imported successfully!");
  }
  function handleFileImport(e) {
    console.log("Check---", e);
    const file = e.target.files[0];
    if (!file) return;
    if (!/\.(csv|xlsx)$/i.test(file.name)) {
      alert("Please attach csv or xlsx file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      console.log(sheet);
      setFileData({ name: file.name, data: sheet });
    };
    reader.readAsBinaryString(file);
  }
  return (
    <section className="upload-container">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="form-elements">
          <label htmlFor="title">Upload Title / Project Name</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            onChange={handleChange}
            value={formData.title}
          />
        </div>
        <div className="form-elements">
          <label>Description / Justification</label>
          <input
            type="text"
            name="description"
            id="description"
            onChange={handleChange}
            required
            value={formData.description}
          />
        </div>
        <div className="form-elements">
          <label>Change Request ID</label>
          <input
            type="text"
            name="changerequestid"
            id="changerequestid"
            required
            onChange={handleChange}
            value={formData.changerequestid}
          />
        </div>

        <div className="form-elements">
          <label>Firewall Device / Cluster</label>
          {firewallNames.length > 0 ? (
            <select
              name="firewallname"
              id="firewallname"
              value={formData.firewallname}
              onChange={(e) => handleChange(e)}
            >
              <option>Please select the firewall</option>
              {firewallNames.map((item) => {
                return (
                  <option value={item.firewallname}>{item.firewallname}</option>
                );
              })}
            </select>
          ) : (
            <input
              type="text"
              name="firewallname"
              id="firewallname"
              required
              onChange={handleChange}
              value={formData.firewallname}
            />
          )}
        </div>
        <div className="form-elements">
          <label>Environment</label>

          <input
            type="text"
            name="env"
            id="env"
            required
            onChange={handleChange}
            value={formData.env}
          />
        </div>
        <div className="form-elements">
          <label>Requested By</label>

          <input
            type="text"
            name="requestor"
            id="requestor"
            required
            onChange={handleChange}
            value={formData.requestor}
          />
        </div>
        <div className="form-elements">
          <label>Approval By</label>

          <input
            type="text"
            name="approval"
            id="approval"
            required
            onChange={handleChange}
            value={formData.approval}
          />
        </div>
        <div className="form-elements">
          <label>Effective Date</label>
          <input
            type="date"
            name="effdate"
            id="effdate"
            required
            onChange={handleChange}
            value={formData.effdate}
          />{" "}
        </div>
        <div className="form-elements">
          <label>Tags / Categories</label>
          <input
            type="text"
            name="tags"
            id="tags"
            required
            onChange={handleChange}
            value={formData.tags}
          />{" "}
        </div>
        <div
          style={{
            margin: "1rem",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <p style={{ fontWeight: "600" }}>
            Please upload the rules file in .csv format
          </p>{" "}
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            style={{ color: "#5a5fed" }}
            size="lg"
          />
          <input
            type="file"
            name="importfile"
            id="importfile"
            ref={fileRef}
            onChange={(e) => handleFileImport(e)}
            style={{ marginLeft: "1rem" }}
            required
          />
        </div>
        <button
          style={{
            padding: "0.8rem",
            backgroundColor: "#5a5fed",
            color: "#fff",
            border: "1px solid #000",
            display: "inline",
            textAlign: "center",
            width: "50%",
            margin: "0 auto",
            cursor: "pointer",
          }}
        >
          Upload and Submit
        </button>
      </form>
    </section>
  );
}
