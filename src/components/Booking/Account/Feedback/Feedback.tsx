import { Layout } from "../Layout";
import { useState } from "react";
import { Plus, Save, Star, Check, MessageSquare } from "lucide-react";

interface Feedback {
  id: string;
  date: string;
  content: string;
  rating: number;
  isAnonymous: boolean;
}

interface Survey {
  id: string;
  title: string;
  completed: boolean;
}

const mockFeedbacks: Feedback[] = [
  {
    id: "1",
    date: "2023-10-15",
    content: "Great experience with the dentist. Very professional and gentle.",
    rating: 5,
    isAnonymous: false
  },
  {
    id: "2",
    date: "2023-10-16",
    content: "The waiting time was a bit long, but the treatment was excellent.",
    rating: 4,
    isAnonymous: true
  }
];

const mockSurveys: Survey[] = [
  {
    id: "S1",
    title: "Patient Satisfaction Survey",
    completed: true
  },
  {
    id: "S2",
    title: "Dental Care Experience Survey",
    completed: false
  }
];

export const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState(mockFeedbacks);
  const [surveys] = useState(mockSurveys);
  const [isAdding, setIsAdding] = useState(false);
  const [newFeedback, setNewFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleAddFeedback = () => {
    if (newFeedback.trim()) {
      const feedbackToAdd = {
        id: (feedbacks.length + 1).toString(),
        date: new Date().toISOString().split('T')[0],
        content: newFeedback,
        rating: rating,
        isAnonymous: isAnonymous
      };
      setFeedbacks([...feedbacks, feedbackToAdd]);
      setNewFeedback("");
      setRating(0);
      setIsAnonymous(false);
      setIsAdding(false);
    }
  };

  return (
    <Layout>
      <div className="p-5 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Feedback & Surveys</h2>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Leave Feedback
          </button>
        </div>

        {isAdding && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-500`}
                  >
                    <Star className="w-full h-full" />
                  </button>
                ))}
              </div>
            </div>
            <textarea
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              className="w-full h-32 p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Share your feedback..."
            />
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="anonymous" className="ml-2 text-sm text-gray-600">
                Submit anonymously
              </label>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFeedback}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
              >
                <Save className="w-5 h-5 mr-2" />
                Submit Feedback
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Feedback</h3>
            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        {new Date(feedback.date).toLocaleDateString()}
                      </p>
                      {feedback.isAnonymous && (
                        <span className="text-xs text-gray-500">(Anonymous)</span>
                      )}
                    </div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{feedback.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Surveys</h3>
            <div className="space-y-4">
              {surveys.map((survey) => (
                <div key={survey.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <MessageSquare className="w-6 h-6 text-blue-500" />
                      <h4 className="font-medium text-gray-800">{survey.title}</h4>
                    </div>
                    {survey.completed ? (
                      <span className="flex items-center text-sm text-green-600">
                        <Check className="w-4 h-4 mr-1" />
                        Completed
                      </span>
                    ) : (
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Take Survey
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
