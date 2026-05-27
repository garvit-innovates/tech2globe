import { FileText, UploadCloud, X } from "lucide-react";
import { useRef, useState } from "react";

export default function UploadZone({ files, onFilesChange }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const mergeFiles = (incomingFiles) => {
    const existingNames = new Set(files.map((file) => `${file.name}-${file.size}`));
    const merged = [
      ...files,
      ...incomingFiles.filter(
        (file) => !existingNames.has(`${file.name}-${file.size}`)
      ),
    ];
    onFilesChange(merged);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    mergeFiles(
      [...event.dataTransfer.files].filter((file) =>
        /\.(pdf|docx)$/i.test(file.name)
      )
    );
  };

  const removeFile = (targetName) => {
    onFilesChange(files.filter((file) => file.name !== targetName));
  };

  return (
    <div className="rounded-[2rem] border border-borderSoft bg-white p-5 shadow-card">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-[1.5rem] border-2 border-dashed p-8 text-center transition ${
          isDragging
            ? "border-accentGold bg-accentSoft/50"
            : "border-borderSoft bg-secondaryBg hover:border-accentGold/60 hover:bg-accentSoft/30"
        }`}
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-accentGold shadow-card">
          <UploadCloud size={28} />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold text-textMain">
          Drag and drop resumes here
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Upload multiple PDF or DOCX files. Tap to browse from your device.
        </p>
        <button
          type="button"
          className="mt-5 rounded-full bg-textMain px-5 py-2.5 text-sm font-semibold text-white"
        >
          Choose files
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          multiple
          className="hidden"
          onChange={(event) => mergeFiles([...(event.target.files || [])])}
        />
      </div>

      <div className="mt-5 space-y-3">
        {files.length ? (
          files.map((file) => (
            <div
              key={`${file.name}-${file.size}`}
              className="flex items-center justify-between rounded-2xl border border-borderSoft px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-accentSoft p-2 text-accentGold">
                  <FileText size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-textMain">{file.name}</p>
                  <p className="text-xs text-slate-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  removeFile(file.name);
                }}
                className="rounded-full p-2 text-slate-400 transition hover:bg-secondaryBg hover:text-danger"
              >
                <X size={16} />
              </button>
            </div>
          ))
        ) : (
          <p className="rounded-2xl bg-secondaryBg px-4 py-3 text-sm text-slate-500">
            No files selected yet.
          </p>
        )}
      </div>
    </div>
  );
}
