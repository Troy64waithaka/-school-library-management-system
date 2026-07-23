import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import { FaHome, FaLaugh, FaBars, FaTimes } from 'react-icons/fa'
import JokeGenerator from './components/JokeGenerator'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4 animate-spin">
            <div className="w-14 h-14 bg-white rounded-full"></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Navigation */}
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
                <span>📚</span>
                <span className="hidden sm:inline">SLMS</span>
              </Link>

              {/* Desktop Navigation */}
              <ul className="hidden md:flex space-x-8 items-center">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition flex items-center gap-2">
                    <FaHome /> Home
                  </Link>
                </li>
                <li>
                  <Link to="/jokes" className="text-gray-600 hover:text-blue-600 font-medium transition flex items-center gap-2">
                    <FaLaugh /> Joke Generator
                  </Link>
                </li>
              </ul>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              >
                {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden pb-4 border-t border-gray-200">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-4 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition flex items-center gap-2"
                >
                  <FaHome /> Home
                </Link>
                <Link
                  to="/jokes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 px-4 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition flex items-center gap-2"
                >
                  <FaLaugh /> Joke Generator
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jokes" element={<JokeGenerator />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            📚 School Library Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A premium solution for modern Kenyan schools supporting both CBC and 8-4-4 curricula with powerful library management features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/jokes"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-lg hover:shadow-xl"
            >
              Try Joke Generator 😂
            </Link>
            <a
              href="https://github.com/Troy64waithaka/-school-library-management-system"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-lg transition shadow-lg hover:shadow-xl"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎓',
                title: 'Student Management',
                description: 'Register and manage students with admission numbers and curriculum tracking.',
              },
              {
                icon: '📖',
                title: 'Book Management',
                description: 'Add, edit, and organize books with categories, authors, and ISBN support.',
              },
              {
                icon: '↔️',
                title: 'Borrowing System',
                description: 'Track book borrowing, returns, renewals, and manage due dates efficiently.',
              },
              {
                icon: '📊',
                title: 'Reports & Analytics',
                description: 'Generate comprehensive reports in PDF, Excel, and printable formats.',
              },
              {
                icon: '🔐',
                title: 'Secure Access',
                description: 'Role-based access control with Firebase authentication and security.',
              },
              {
                icon: '🌙',
                title: 'Dark & Light Mode',
                description: 'Beautiful responsive design with both dark and light theme options.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition shadow-lg hover:shadow-xl"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass backdrop-blur-md rounded-xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Frontend</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">⚛️</span> React.js 18
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">🎨</span> Tailwind CSS
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">✨</span> Framer Motion
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">🧭</span> React Router
                </li>
              </ul>
            </div>
            <div className="glass backdrop-blur-md rounded-xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Backend & Services</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-orange-500">🔥</span> Firebase Firestore
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-500">🔐</span> Firebase Auth
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-500">💾</span> Firebase Storage
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-500">🚀</span> Node.js & Express
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Clone the repository and start building your library management system today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/Troy64waithaka/-school-library-management-system"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition shadow-lg"
            >
              View Repository
            </a>
            <Link
              to="/jokes"
              className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-2">&copy; 2024 School Library Management System. All rights reserved.</p>
          <p className="text-gray-400 text-sm">
            Developed for modern schools in Kenya | MIT License
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
