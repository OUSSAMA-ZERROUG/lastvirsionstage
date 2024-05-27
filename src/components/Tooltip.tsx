import React from 'react';

interface TooltipProps {
  label: string;
  content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ label, content }) => {
  return (
    <div className="fixed top-0 left-0 h-full w-1/3 flex justify-center items-center bg-orange-950 bg-opacity-70">
      <div className="bg-gray-200 rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-gray-800 font-semibold">{label}:</h2>
          {/* Remove the close button */}
        </div>
        <div className="text-gray-800 text-lg">{content}</div>
      </div>
    </div>
  );
};

export default Tooltip;
