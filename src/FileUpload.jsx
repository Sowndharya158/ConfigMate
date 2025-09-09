import UploadForm from "./UploadForm";
export default function FileUpload() {
  return (
    <div className="upload-section">
      <h3 className="tracking-wide text-center font-mono text-lg font-bold">
        Configure Metadata
      </h3>
      <UploadForm />
    </div>
  );
}
