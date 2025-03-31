import React, { useState } from "react";

const ImageUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "doctor"); // Ensure the correct preset name

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        // console.log("Uploaded Image:", data);
        onUpload(data.secure_url);
        alert("Image uploaded successfully!");
      } else {
        const errorData = await response.json();
        // console.error(errorData.error.message);
        alert(errorData.error.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button type="button" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default ImageUpload;