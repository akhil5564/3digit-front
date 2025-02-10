import React from 'react';

interface PasteButtonProps {
  onPaste: (copiedData: string) => void;
}

const PasteButton: React.FC<PasteButtonProps> = ({ onPaste }) => {
  const handlePasteButtonClick = () => {
    const copiedData = window.getSelection()?.toString(); // Get copied data from clipboard
    
    if (copiedData) {
      onPaste(copiedData); // Pass copied data to the parent component function
    } else {
      console.error('No copied data found!');
    }
  };

  return (
    <button onClick={handlePasteButtonClick}>Paste</button>
  );
};

export default PasteButton;
