import { useDispatch, useSelector } from "react-redux";

export default function History() {
  const formData = useSelector((state) => state.upload);
  const fireWallDetails = useSelector((state) => state.addFirewall.firewalls);
  return (
    <>
      <div style={{ margin: "3rem" }}>
        <h2 style={{ fontWeight: "bolder", textAlign: "center" }}>
          Upload History
        </h2>
      </div>
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
    </>
  );
}
