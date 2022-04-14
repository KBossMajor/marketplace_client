import React from 'react';
import S3 from "react-aws-s3";

const Upload = () => {
    const fileInput = React.useRef();

  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
  };

  const handleClick = (event) => {
    event.preventDefault();
    let newArr = fileInput.current.files[0];
    // handleUpload(newArr);
    // console.log(newArr);
    for (let i = 0; i < newArr.length; i++) {
      handleUpload(newArr[i]);
      
    }
  };

  const handleUpload = (file) => {
    let newFileName = file.name.replace(/\..+$/, "");
    // let newFileName = 'test-file';
    // console.log(file)
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFileName).then((data) => {
      if (data.status === 204) {
        console.log("data");
      } else {
        console.log("fail");
      }
    });
  };

  return (
    <>
      <form className='upload-steps' onSubmit={handleClick}>
        <label>
          Upload file:
          <input type='file' multiple ref={fileInput} />
        </label>
        <br />
        <button type='submit'>Upload</button>
      </form>
    </>
  );
}

export default Upload
