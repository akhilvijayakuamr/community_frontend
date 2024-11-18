import { useState } from 'react';
import Logo from '../../../assets/images/AssureTech_transparent-.png'

const availableTags = [
  'Technology', 'Science', 'Health', 'Education', 'Finance', 'Travel', 'Food', 'Sports', 'Entertainment', 'Politics'
];

export default function Tag() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-14 bg-gradient-to-b from-purple-800  via-black to-black">
      <div className="bg-transparent p-6 rounded-lg shadow-lg w-full max-w-md">
      <div className="flex justify-center mb-1 ">
              <img
                src={Logo}
                alt="Logo"
                className="size-32 object-contain"
              />
            </div>
        <h2 className="text-2xl font-bold mb-4 text-white text-center">Select Your Interests</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {availableTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleToggleTag(tag)}
              className={`py-2 px-4 rounded-lg transition-colors duration-300 ${
                selectedTags.includes(tag)
                  ? 'bg-fuchsia-900 text-white'
                  : 'bg-gray-800 text-white hover:bg-gray-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Selected Tags:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTags.map(tag => (
              <span
                key={tag}
                className="bg-pink-700  text-gray-400 py-1 px-3 rounded-full flex items-center space-x-2"
              >
                <span>{tag}</span>
                <button
                  onClick={() => handleToggleTag(tag)}
                  className="text-xs text-gray-200 hover:text-white"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
