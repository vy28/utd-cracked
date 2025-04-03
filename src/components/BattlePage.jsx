import React, { useState, useEffect } from 'react';
import ComparisonCard from './ComparisonCard';

const BattlePage = ({ profiles, onVote }) => {
  const [pair, setPair] = useState([]);
  const [reveal, setReveal] = useState(false);

  // Select two random, distinct profiles.
  const generatePair = () => {
    if (profiles.length < 2) {
      setPair([]);
      return;
    }
    let indices = [];
    while (indices.length < 2) {
      const randIndex = Math.floor(Math.random() * profiles.length);
      if (!indices.includes(randIndex)) {
        indices.push(randIndex);
      }
    }
    setPair([profiles[indices[0]], profiles[indices[1]]]);
  };

  // Generate a new pair when the profiles list changes or on initial mount.
  useEffect(() => {
    generatePair();
  }, [profiles]);

  // When a vote is cast, update Elo ratings, reveal names, then refresh after 2 seconds.
  const handleVote = (winnerId) => {
    const winner = pair.find(profile => profile.id === winnerId);
    const loser = pair.find(profile => profile.id !== winnerId);
    onVote(winnerId, loser.id);
    setReveal(true);
    setTimeout(() => {
      setReveal(false);
      generatePair();
    }, 2000);
  };

  if (profiles.length < 2) {
    return <div>Not enough profiles to battle.</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-6">
        {pair.map(profile => (
          <ComparisonCard 
            key={profile.id} 
            profile={profile} 
            onVote={handleVote} 
            reveal={reveal} 
          />
        ))}
      </div>
      <p className="mt-4 text-gray-600">Click on the profile you think is more "cracked".</p>
    </div>
  );
};

export default BattlePage;