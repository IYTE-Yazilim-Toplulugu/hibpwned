'use client'

// src/app/page.tsx
import React, { useState } from 'react';

const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [breaches, setBreaches] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setBreaches([]);
    
    try {
      const res = await fetch(`/api/check-email?email=${email}`);
      const data = await res.json();
      if (res.ok) {
        setBreaches(data);
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to fetch data');
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#fff' }}>
      <h1>Check Email for Breaches</h1>
      {/* Logo */}
      <img src="/favicon.ico" alt="Logo" width={100} height={100} />
      
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{ padding: '10px', width: '300px' }}
          required
        />
        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px' }}>
          Check
        </button>
      </form>
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Display the breach results */}
      {breaches.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Breach Results:</h2>
          <ul>
            {breaches.map((breach, index) => (
              <li key={index}>
                <strong>{breach.Name}</strong> - {breach.Description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
