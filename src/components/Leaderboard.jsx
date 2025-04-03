import React from 'react';

const Leaderboard = ({ profiles }) => {
  const sortedProfiles = [...profiles].sort((a, b) => b.elo - a.elo);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <ul>
        {sortedProfiles.map((profile, index) => (
          <li 
            key={profile.id} 
            className="bg-white shadow p-4 rounded mb-2 flex justify-between items-center"
          >
            <span className="font-semibold">
              {index + 1}. {profile.name} ({profile.major})
            </span>
            <span className="font-bold text-blue-600">{profile.elo} elo</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;