import React, { useState, useEffect } from 'react';
import ComparisonCard from './ComparisonCard';

const BattlePage = ({ profiles, onVote }) => {
  const [pair, setPair] = useState([]);
  const [reveal, setReveal] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState(null);

  // Function to generate a new pair of profiles.
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
    // Do not automatically hide the names; wait for "Rank Next" click.
    setReveal(false);
    setSelectedWinner(null);
  };

  // Generate a new pair on mount or when profiles change.
  useEffect(() => {
    generatePair();
  }, [profiles]);

  // Handle selection of the winner.
  const handleSelection = (winnerId) => {
    if (reveal) return; // Prevent re-selection if already revealed.
    const winner = pair.find(profile => profile.id === winnerId);
    const loser = pair.find(profile => profile.id !== winnerId);
    // Update Elo ratings using the onVote callback.
    onVote(winnerId, loser.id);
    setSelectedWinner(winnerId);
    setReveal(true);
  };

  // Move to the next battle when "Rank Next" is clicked.
  const handleNext = () => {
    generatePair();
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
            onSelect={handleSelection} 
            reveal={reveal} 
            isSelected={selectedWinner === profile.id} 
          />
        ))}
      </div>
      {reveal && (
        <button 
          onClick={handleNext}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Rank Next
        </button>
      )}
      <p className="mt-4 text-gray-600">
        Click on the profile you think is more "cracked".
      </p>
    </div>
  );
};

export default BattlePage;