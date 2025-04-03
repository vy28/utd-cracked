import React from 'react';

const ComparisonCard = ({ profile, onVote, reveal }) => {
  return (
    <div 
      className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-xl transition"
      onClick={() => onVote(profile.id)}
    >
      <img 
        src={profile.imageUrl} 
        alt={reveal ? profile.name : "Hidden Profile"}
        className="w-24 h-24 rounded-full mx-auto"
      />
      <h2 className="text-xl font-semibold text-center mt-2">
        {reveal ? profile.name : "???"}
      </h2>
      <p className="text-center text-gray-500">{profile.title}</p>
      <ul className="mt-4 text-sm">
        {profile.experiences.slice(0, 5).map((exp, index) => (
          <li key={index} className="text-gray-600">• {exp}</li>
        ))}
      </ul>
      <p className="mt-2 text-center text-sm text-gray-800">Elo: {profile.elo}</p>
    </div>
  );
};

export default ComparisonCard;