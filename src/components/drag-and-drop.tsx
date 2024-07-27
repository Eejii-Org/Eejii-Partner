"use client";
import { useState } from "react";
import { CameraIcon } from "./icons/camera";

export const DragAndDropFileUpload = ({
  file,
  setFile,
}: {
  file?: File | undefined;
  setFile: (file: File | undefined) => void;
}) => {
  const [fileEnter, setFileEnter] = useState(false);
  return (
    <div className="container px-4 max-w-5xl mx-auto">
      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setFileEnter(true);
          }}
          onDragLeave={(e) => {
            setFileEnter(false);
          }}
          onDragEnd={(e) => {
            e.preventDefault();
            setFileEnter(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setFileEnter(false);
            if (e.dataTransfer.items) {
              [...e.dataTransfer.items].forEach((item, i) => {
                if (item.kind === "file") {
                  const file = item.getAsFile();
                  if (file) {
                    // let blobUrl = URL.createObjectURL(file);
                    setFile(file);
                  }
                  console.log(`items file[${i}].name = ${file?.name}`);
                }
              });
            } else {
              [...e.dataTransfer.files].forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`);
              });
            }
          }}
          className={`${
            fileEnter ? "border-4" : "border-2"
          } mx-auto  bg-white flex flex-col w-full max-w-xs h-72 border-gray-500 border-dashed items-center justify-center`}
        >
          <div className="w-full flex flex-col items-center">
            <CameraIcon width={100} height={100} color="#6b7280" stroke={1} />
            <label htmlFor="file" className="text-gray-500 text-center">
              Файлаа энд байршуулна уу
            </label>
          </div>
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={(e) => {
              let files = e.target.files;
              if (files && files[0]) {
                // let blobUrl = URL.createObjectURL(files[0]);
                setFile(files?.[0]);
              }
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <object
            className="rounded-md object-contain w-full max-w-xs h-72"
            data={URL.createObjectURL(file)}
            type="image/png" //need to be updated based on type of file
          />
          <button
            onClick={() => setFile(undefined)}
            className="px-4 mt-10 uppercase py-2 tracking-widest outline-none bg-red-600 text-white rounded"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};
