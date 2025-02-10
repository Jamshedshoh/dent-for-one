import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { ImageSkeleton } from "./ImageSkeleton";

interface CollapseCardProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode[];
  imageUrl?: string;
  imageSkeleton?: boolean;
}

export const CollapseCard = ({
  title,
  children,
  actions,
  imageUrl,
  imageSkeleton = false,
}: CollapseCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-16 h-16 object-cover mr-4 transition-transform duration-200 transform hover:scale-110 cursor-pointer" 
            onClick={openImageModal}
          />
        )}
        {!imageUrl && imageSkeleton && <ImageSkeleton />}
        <div className="flex-1">
          <button onClick={toggleExpand}>
            <h3 className="font-medium flex-1">{title}</h3>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          {actions || ''}
          <button className="flex-1" onClick={toggleExpand} aria-label="Expand/Collapse" title="Expand/Collapse">
            <span className="text-gray-500">
              {isExpanded ? <ChevronUp /> : <ChevronDown />}
            </span>
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="border-t border-gray-200 p-4">{children}</div>
      )}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10" onClick={closeImageModal}>
          <img src={imageUrl} alt={title} className="max-w-full max-h-full" />
        </div>
      )}
    </div>
  );
};
