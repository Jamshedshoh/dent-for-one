import { Layout } from "../Layout";
import { useState } from "react";
import { Plus, Save, Trash, Edit } from "lucide-react";

interface Note {
  id: string;
  patientName: string;
  date: string;
  content: string;
  tags: string[];
}

const mockNotes: Note[] = [
  {
    id: "1",
    patientName: "John Doe",
    date: "2023-10-15",
    content: "Patient reported sensitivity in lower left molar. Recommended desensitizing toothpaste.",
    tags: ["sensitivity", "molar"]
  },
  {
    id: "2",
    patientName: "Jane Smith",
    date: "2023-10-16",
    content: "Routine cleaning completed. No cavities detected. Advised to maintain current oral hygiene routine.",
    tags: ["cleaning", "checkup"]
  },
  {
    id: "3",
    patientName: "Michael Brown",
    date: "2023-10-17",
    content: "Patient needs wisdom tooth extraction. Scheduled for next month.",
    tags: ["extraction", "wisdom tooth"]
  }
];

export const Notes = () => {
  const [notes, setNotes] = useState(mockNotes);
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim()) {
      const noteToAdd = {
        id: (notes.length + 1).toString(),
        patientName: "New Patient",
        date: new Date().toISOString().split('T')[0],
        content: newNote,
        tags: []
      };
      setNotes([...notes, noteToAdd]);
      setNewNote("");
      setIsAdding(false);
    }
  };

  return (
    <Layout>
      <div className="p-5 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Patient Notes</h2>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Note
          </button>
        </div>

        {isAdding && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full h-32 p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter new note..."
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Note
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-lg">{note.patientName}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(note.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{note.content}</p>
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {notes.length === 0 && (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No notes found</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
