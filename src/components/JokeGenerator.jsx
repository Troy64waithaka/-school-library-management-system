import React, { useState } from 'react'
import { FaLaugh, FaSync, FaCopy, FaCheck } from 'react-icons/fa'

const JokeGenerator = () => {
  const [joke, setJoke] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [jokeType, setJokeType] = useState('general')

  const fetchJoke = async (type = jokeType) => {
    setLoading(true)
    setError(null)
    setCopied(false)

    try {
      const response = await fetch(
        `https://v2.jokeapi.dev/joke/${type}?format=json`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch joke')
      }

      const data = await response.json()

      if (data.error) {
        throw new Error('Could not retrieve joke')
      }

      setJoke(data)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setJoke(null)
    } finally {
      setLoading(false)
    }
  }

  const handleTypeChange = (e) => {
    const newType = e.target.value
    setJokeType(newType)
    fetchJoke(newType)
  }

  const copyToClipboard = () => {
    if (!joke) return

    const jokeText =
      joke.type === 'single' ? joke.joke : `${joke.setup}\n${joke.delivery}`

    navigator.clipboard.writeText(jokeText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-2">
            <FaLaugh className="text-4xl text-purple-500" />
            <h1 className="text-4xl font-bold text-gray-800">Joke Generator</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Get a random joke to brighten your day! 😂
          </p>
        </div>

        {/* Main Card */}
        <div className="glass backdrop-blur-md rounded-2xl shadow-2xl p-8 mb-6 border border-white/20">
          {/* Type Selector */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Joke Category:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: 'general', label: '😄 General' },
                { value: 'knock-knock', label: '🚪 Knock-Knock' },
                { value: 'programming', label: '💻 Programming' },
                { value: 'miscellaneous', label: '🎲 Miscellaneous' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setJokeType(option.value)
                    fetchJoke(option.value)
                  }}
                  className={`py-2 px-3 rounded-lg font-medium transition-all duration-200 ${
                    jokeType === option.value
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                      : 'bg-white/40 text-gray-700 hover:bg-white/60'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Joke Display */}
          <div className="bg-gradient-to-br from-white/60 to-white/40 rounded-xl p-8 mb-6 min-h-32 flex flex-col justify-center border border-white/30">
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-200"></div>
              </div>
            ) : error ? (
              <div className="text-center">
                <p className="text-red-500 font-semibold mb-2">❌ {error}</p>
                <p className="text-gray-600 text-sm">Please try again</p>
              </div>
            ) : joke ? (
              <div className="space-y-4">
                {joke.type === 'single' ? (
                  <p className="text-xl text-gray-800 leading-relaxed font-medium">
                    {joke.joke}
                  </p>
                ) : (
                  <>
                    <p className="text-lg text-gray-700 font-semibold">
                      {joke.setup}
                    </p>
                    <p className="text-xl text-purple-600 font-bold pl-4 border-l-4 border-purple-500">
                      {joke.delivery}
                    </p>
                  </>
                )}
                {joke.category && (
                  <p className="text-sm text-gray-500 pt-2">
                    Category: <span className="font-semibold">{joke.category}</span>
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 text-lg mb-2">No joke yet</p>
                <p className="text-gray-500 text-sm">Click "Get Joke" to start laughing!</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <button
              onClick={() => fetchJoke()}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <FaSync className={loading ? 'animate-spin' : ''} />
              Get Joke
            </button>

            {joke && (
              <button
                onClick={copyToClipboard}
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {copied ? (
                  <>
                    <FaCheck /> Copied!
                  </>
                ) : (
                  <>
                    <FaCopy /> Copy
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center text-gray-600 text-sm">
          <p>Powered by JokeAPI - Keep smiling! 😊</p>
        </div>
      </div>
    </div>
  )
}

export default JokeGenerator
