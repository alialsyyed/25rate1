import { cn } from "@/lib/utils";

interface RatingFacesProps {
  rating: number | null;
  onRatingChange: (rating: number) => void;
  labels: string[];
}

export function RatingFaces({ rating, onRatingChange, labels }: RatingFacesProps) {
  const faces = [
    // Terrible - Very sad face
    <svg viewBox="0 0 100 100" className="w-16 h-16">
      <circle cx="50" cy="50" r="45" fill="currentColor" />
      <circle cx="35" cy="40" r="3" fill="white" />
      <circle cx="65" cy="40" r="3" fill="white" />
      <path d="M 35 70 Q 50 55 65 70" stroke="white" strokeWidth="3" fill="none" />
    </svg>,
    // Bad - Sad face
    <svg viewBox="0 0 100 100" className="w-16 h-16">
      <circle cx="50" cy="50" r="45" fill="currentColor" />
      <circle cx="35" cy="40" r="3" fill="white" />
      <circle cx="65" cy="40" r="3" fill="white" />
      <path d="M 35 65 Q 50 55 65 65" stroke="white" strokeWidth="3" fill="none" />
    </svg>,
    // Okay - Neutral face
    <svg viewBox="0 0 100 100" className="w-16 h-16">
      <circle cx="50" cy="50" r="45" fill="currentColor" />
      <circle cx="35" cy="40" r="3" fill="white" />
      <circle cx="65" cy="40" r="3" fill="white" />
      <line x1="35" y1="65" x2="65" y2="65" stroke="white" strokeWidth="3" />
    </svg>,
    // Good - Happy face
    <svg viewBox="0 0 100 100" className="w-16 h-16">
      <circle cx="50" cy="50" r="45" fill="currentColor" />
      <circle cx="35" cy="40" r="3" fill="white" />
      <circle cx="65" cy="40" r="3" fill="white" />
      <path d="M 35 60 Q 50 75 65 60" stroke="white" strokeWidth="3" fill="none" />
    </svg>,
    // Great - Very happy face
    <svg viewBox="0 0 100 100" className="w-16 h-16">
      <circle cx="50" cy="50" r="45" fill="currentColor" />
      <circle cx="35" cy="40" r="3" fill="white" />
      <circle cx="65" cy="40" r="3" fill="white" />
      <path d="M 30 58 Q 50 80 70 58" stroke="white" strokeWidth="3" fill="none" />
    </svg>
  ];

  const colors = [
    "text-red-500 hover:text-red-600",
    "text-orange-500 hover:text-orange-600", 
    "text-yellow-500 hover:text-yellow-600",
    "text-green-500 hover:text-green-600",
    "text-emerald-500 hover:text-emerald-600"
  ];

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex space-x-6">
        {faces.map((face, index) => (
          <button
            key={index}
            onClick={(event) => {
              onRatingChange(index + 1);
              // Add a small animation delay
              setTimeout(() => {
                const button = event.currentTarget as HTMLButtonElement;
                if (button) {
                  button.style.transform = "scale(1.2)";
                  setTimeout(() => {
                    button.style.transform = "";
                  }, 200);
                }
              }, 100);
            }}
            className={cn(
              "flex flex-col items-center space-y-2 p-4 rounded-xl transition-all duration-300 transform hover:scale-110",
              rating === index + 1 
                ? "bg-blue-100 dark:bg-blue-900/20 scale-110 shadow-lg" 
                : "hover:bg-gray-100 dark:hover:bg-gray-800",
              colors[index]
            )}
          >
            <div className="transition-transform duration-300 hover:rotate-12">
              {face}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {labels[index]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
