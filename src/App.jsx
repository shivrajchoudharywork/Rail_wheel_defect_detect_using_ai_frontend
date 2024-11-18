import React, { useState } from 'react';
import axios from 'axios';
import "./style.css"


function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data.classification);
    } catch (error) {
      console.error('Error uploading the image:', error);
      setResult('Error occurred');
    }
  };

  return (
    <div className="container">
      <h1>Railway Wheel Defect Detection</h1>
      <div className="file-upload">
        <input type="file" onChange={handleFileChange} />
        {previewUrl && (
          <div className="image-preview">
            <img 
              src={previewUrl} 
              alt="Wheel Preview" 
              style={{ maxWidth: '300px', marginTop: '1rem' }}
            />
          </div>
        )}
        <button className="btn-upload" onClick={handleUpload}>Upload and Check</button>
      </div>
      {result && <h2 className="result">Result : {result}</h2>}
    </div>
  );
}

export default App;