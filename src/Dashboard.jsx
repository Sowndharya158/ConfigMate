import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
export default function Dashboard() {
  const formData = useSelector((state) => state.upload);
  const fireWallDetails = useSelector((state) => state.addFirewall.firewalls);
  let categories = {};
  let AllowVsDeny = { allow: 0, deny: 0 };
  formData.configFiles.forEach((curr, index, arra) => {
    curr.formData.file?.data.forEach((item) => {
      if (item.Action.toLowerCase() === "allow") {
        let temp = AllowVsDeny["allow"];
        AllowVsDeny["allow"] = temp + 1;
      }
      if (item.Action.toLowerCase() === "deny") {
        let temp = AllowVsDeny["deny"];
        AllowVsDeny["deny"] = temp + 1;
      }
    });
  });
  formData.configFiles.forEach((curr, index, arra) => {
    curr.formData.file?.data.forEach((item) => {
      if (!Object.keys(categories).includes(item.Application)) {
        categories[item.Application] = 1;
      } else {
        let temp = categories[item.Application];
        categories[item.Application] = temp + 1;
      }
    });
  });
  console.log(categories);
  const [state, setState] = useState({
    series: Object.values(AllowVsDeny),
    options: {
      chart: { type: "pie", width: 380 },
      labels: Object.keys(AllowVsDeny),
      responsive: [
        {
          breakpoint: 480,
          options: {
            width: 200,
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  const [barData, setBarData] = useState({
    series: [{ data: Object.values(categories) }],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: Object.keys(categories),
      },
    },
  });

  console.log("The states are -- ", formData, AllowVsDeny);
  return (
    <div className="upload-section">
      <h2 className="tracking-wide text-center font-mono text-lg font-bold">
        Dashboard
      </h2>
      <div className="Summary-cards">
        <div className="Summary-card">
          <h4>Total Firewalls</h4>
          {fireWallDetails.length > 0 ? (
            <h3>{fireWallDetails.length}</h3>
          ) : (
            <h3>Nothing to Show</h3>
          )}
        </div>
        <div className="Summary-card">
          <h4>Rules Uploaded</h4>
          {formData.configFiles?.length > 0 ? (
            <h3>
              {formData.configFiles.reduce((acc, form) => {
                return acc + form.formData.file.data?.length;
              }, 0)}
            </h3>
          ) : (
            <h3>Nothing to Show</h3>
          )}
        </div>
        <div className="Summary-card">
          <h4>Allow vs Deny rules</h4>
          {formData.configFiles.length > 0 ? (
            <h3>
              {formData.configFiles.reduce((acc, formEle) => {
                return (
                  acc +
                    formEle.formData.file.data?.reduce((acc1, ele) => {
                      return ele.Action.toLowerCase() === "allow"
                        ? acc1 + 1
                        : acc1;
                    }, 0) || 0
                );
              }, 0)}{" "}
              Allow
            </h3>
          ) : (
            <h3>Nothing to Show</h3>
          )}
        </div>
        <div className="Summary-card">
          <h4>Rules missing comments</h4>
          <h3>Nothing to Show</h3>
        </div>
      </div>
      <div className="section-2">
        <div className="TableSection">
          {Object.keys(categories).length ? (
            <ReactApexChart
              options={barData.options}
              series={barData.series}
              type="bar"
            />
          ) : (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "300px",
                flexWrap: "wrap",
                justifyContent: "center",
                alignContent: "center",
                gap: "1rem",
                flexDirection: "column",
              }}
            >
              <h3 style={{ textAlign: "center", fontWeight: "bolder" }}>
                No data
              </h3>
              <h5>There was no data found for the visual</h5>
            </div>
          )}
        </div>
        <div className="TableSection">
          {AllowVsDeny.allow > 0 || AllowVsDeny.deny > 0 ? (
            <ReactApexChart
              options={state.options}
              series={state.series}
              type="pie"
              width={380}
            />
          ) : (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "300px",

                flexWrap: "wrap",
                justifyContent: "center",
                alignContent: "center",
                gap: "1rem",
                flexDirection: "column",
              }}
            >
              <h3 style={{ textAlign: "center", fontWeight: "bolder" }}>
                No data
              </h3>
              <h5>There was no data found for the visual</h5>
            </div>
          )}
        </div>
      </div>
      <div className="section-2">
        <div className="TableSection">
          <table>
            <thead>
              <tr>
                <th>Firewall</th>
                <th>File</th>
                <th>Rules</th>
                <th>Uploaded On</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {formData.configFiles.length > 0 ? (
                formData.configFiles.map((item) => {
                  return (
                    <tr>
                      <td>{item.formData.firewallname}</td>
                      <td>{item.formData.file.name} </td>
                      <td>{item.formData.file.data.length}</td>
                      <td>{item.uploadedAt}</td>
                      <td>{item.formData.requestor}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} style={{ border: "none" }}>
                    <h3 style={{ textAlign: "center" }}>No data available</h3>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="TableSection">
          <h3>Risks and Compliance Highlights</h3>

          <div style={{ display: "flex", gap: "1rem" }}>
            <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#f47c0b" }} />
            <h4>Any-to-Any Rules: 0</h4>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#f47c0b" }} />
            <h4>Sensitive Ports Allowed: 0</h4>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#f47c0b" }} />
            <h4>No Logging Enabled: 0</h4>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#f47c0b" }} />
            <h4>Missing Comments: 0</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
