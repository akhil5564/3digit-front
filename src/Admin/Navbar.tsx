import React, { useState } from 'react';
import './navbar.css';
import logo from '../assets/6075689.webp';
import { IconAlignRight, IconClipboardCopy, IconCamera } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import Tesseract from 'tesseract.js';

interface NavbarProps {
  handlePaste: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ handlePaste }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isCameraActive, setCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const startCamera = async () => {
    try {
      // List all media devices to check for available cameras
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      
      if (videoDevices.length > 0) {
        // Log the available video devices
        console.log('Available video devices:', videoDevices);
  
        // Request user media from the first available camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: videoDevices[0].deviceId }
        });
        
        console.log('Camera Stream Started:', stream);
        setCameraStream(stream);
        setCameraActive(true);
      } else {
        console.error('No video devices found');
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };
  

  const stopCamera = () => {
    if (cameraStream) {
      const tracks = cameraStream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setCameraActive(false);
  };

  const captureImage = () => {
    const video = document.getElementById('video') as HTMLVideoElement;
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);

      const img = canvas.toDataURL('image/png');

      // Use Tesseract.js to perform OCR on the captured image
      Tesseract.recognize(img, 'eng', {
        logger: (m) => console.log(m),
      })
        .then(({ data: { text } }) => {
          console.log('OCR Result:', text);
          setExtractedText(text);
        })
        .catch((error) => console.error('OCR error:', error));
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button className='nbtn' onClick={handlePaste}>
        <IconClipboardCopy stroke={2} />
      </button>

      {/* Camera button to start or stop the camera */}
      <button
        className='nbtn'
        onClick={() => {
          if (isCameraActive) {
            stopCamera();
          } else {
            startCamera();
          }
        }}
      >
        <IconCamera stroke={2} />
      </button>

      {/* Video element to show the camera feed */}
      {isCameraActive && (
        <div className="camera-container">
          <video
            id="video"
            autoPlay
            playsInline
            style={{ width: '100%', height: 'auto' }}
          />
          <button onClick={captureImage}>Capture Image</button>
        </div>
      )}

      {/* Dropdown menu */}
      <button className='nbtn' onClick={toggleDropdown}>
        <IconAlignRight stroke={2} />
      </button>

      {/* Dropdown content */}
      {isDropdownVisible && (
        <div className="dropdown-1">
          <ul>
            <li><Link to='/sales'>SALES REPORT</Link></li>
            <li><Link to='/winning'>WINNER'S REPORT</Link></li>
            <li><Link to='/pnl'>PROFIT AND LOSS</Link></li>
            <li><Link to='/netpay'>NET PAY</Link></li>
            <li><Link to='/countreport'>COUNT REPORT</Link></li>
            <li><Link to='/more'>MORE</Link></li>
            <li><Link to='/logout'>LOGOUT</Link></li>
          </ul>
        </div>
      )}

      {/* Show extracted text from OCR */}
      {extractedText && (
        <div className="ocr-result">
          <h4>Extracted Text from Image:</h4>
          <p>{extractedText}</p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
