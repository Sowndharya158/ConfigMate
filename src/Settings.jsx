import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addFirewall } from "./FirewallSettingsSlice";

export default function Settings() {
  let dispatch = useDispatch();
  const stateVal = useSelector((state) => state.addFirewall);
  const [formEle, setFormEle] = useState({
    firewallname: "",
    requestor: "",
    env: "",
    desc: "",
  });
  function handleChange(e) {
    setFormEle((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function handleFirewall(e) {
    e.preventDefault();
    dispatch(addFirewall({ data: formEle }));
    setFormEle({
      firewallname: "",
      requestor: "",
      env: "",
      desc: "",
    });
  }
  console.log(stateVal);
  return (
    <>
      <h3 className="tracking-wide text-center font-mono text-lg font-bold">
        Add/Update Firewall Settings
      </h3>
      <section className="upload-container">
        <form className="flex flex-col gap-4" onSubmit={handleFirewall}>
          <div className="form-elements">
            <label>Firewall Device / Cluster</label>
            <input
              type="text"
              name="firewallname"
              id="firewallname"
              required
              onChange={handleChange}
              value={formEle.firewallname}
            />
          </div>
          <div className="form-elements">
            <label>Environment</label>

            <input
              type="text"
              name="env"
              id="env"
              required
              onChange={handleChange}
              value={formEle.env}
            />
          </div>
          <div className="form-elements">
            <label>RequestedBy</label>

            <input
              type="text"
              name="requestor"
              value={formEle.requestor}
              id="requestor"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-elements">
            <label>Description</label>

            <input
              type="text"
              value={formEle.desc}
              name="desc"
              id="desc"
              required
              onChange={handleChange}
            />
          </div>
          <button
            style={{
              padding: "0.5rem",
              backgroundColor: "#5a5fed",
              color: "#fff",
              border: "1px solid #000",
              display: "inline",
              textAlign: "center",
              width: "10rem",
              margin: "0 auto",
              cursor: "pointer",
              borderRadius: "0.2rem",
            }}
          >
            Add Firewall
          </button>
        </form>
      </section>
    </>
  );
}
