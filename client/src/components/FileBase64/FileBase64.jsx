import React from "react";

const FileBase64 = ({ onDone, ...otherProps }) => {
  const handleChange = (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();

    if (image) {
      reader.readAsDataURL(image);
    }

    reader.addEventListener(
      "load",
      () => {
        const fileDataURL = reader.result;
        onDone(fileDataURL);
      },
      false
    );
  };

  return <input type="file" {...otherProps} onChange={handleChange} />;
};

export default FileBase64;
