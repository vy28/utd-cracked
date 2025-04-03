import React, { useState } from 'react'
import BattlePage from './components/BattlePage'
import Leaderboard from './components/Leaderboard'
import dummyData from './data'

function App() {
  const [profiles, setProfiles] = useState(dummyData)
  const [view, setView] = useState('battle') // "battle" or "leaderboard"
  const [selectedMajor, setSelectedMajor] = useState('All')

  // Update Elo ratings using the standard Elo formula.
  const updateElo = (winnerId, loserId) => {
    setProfiles(prevProfiles => {
      const winner = prevProfiles.find(p => p.id === winnerId)
      const loser = prevProfiles.find(p => p.id === loserId)
      if (!winner || !loser) return prevProfiles

      const K = 32
      const expectedWinner = 1 / (1 + Math.pow(10, (loser.elo - winner.elo) / 400))
      const expectedLoser = 1 / (1 + Math.pow(10, (winner.elo - loser.elo) / 400))

      const newWinnerElo = Math.round(winner.elo + K * (1 - expectedWinner))
      const newLoserElo = Math.round(loser.elo + K * (0 - expectedLoser))

      return prevProfiles.map(p => {
        if (p.id === winnerId) return { ...p, elo: newWinnerElo }
        if (p.id === loserId) return { ...p, elo: newLoserElo }
        return p
      })
    })
  }

  // Filter profiles based on the selected major.
  const filteredProfiles = selectedMajor === 'All'
    ? profiles
    : profiles.filter(profile => profile.major === selectedMajor)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cracked UTD</h1>
        <nav>
          <button onClick={() => setView('battle')} className="mr-4 hover:underline">
            Battle
          </button>
          <button onClick={() => setView('leaderboard')} className="hover:underline">
            Leaderboard
          </button>
        </nav>
      </header>
      <main className="p-6">
        {view === 'battle' && (
          <>
            <div className="mb-4">
              <label className="mr-2 font-semibold">Filter by Major:</label>
              <select 
                value={selectedMajor} 
                onChange={(e) => setSelectedMajor(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="All">All</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Business">Business</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
              </select>
            </div>
            <BattlePage profiles={filteredProfiles} onVote={updateElo} />
          </>
        )}
        {view === 'leaderboard' && (
          <Leaderboard profiles={profiles} />
        )}
      </main>
    </div>
  )
}

export default App