import { Image } from "lucide-react";

export const ImageSkeleton = () => {
  return (
    <div
      className="w-16 h-16 object-cover mr-4 transition-transform duration-200 transform 
  hover:scale-110 flex items-center justify-center"
    >
      <Image />
    </div>
  );
};
