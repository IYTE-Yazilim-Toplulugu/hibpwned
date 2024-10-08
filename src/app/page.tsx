'use client'

import Image from 'next/image';
import SafeIcon from "@/safe-icon.png"
import React, { useState } from 'react';

const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [breaches, setBreaches] = useState<any[]>([]);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'warning' | null } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setMessage({ text: 'Please enter a valid email address.', type: 'warning' });
      return;
    }

    setLoading(true);
    setMessage(null);
    setBreaches([]);

    try {
      const res = await fetch(`/api/check-email?email=${email}`);
      const data = await res.json();

      if (res.ok) {
        if (data.length > 0) {
          // Sort breaches by breachDate (latest first)
          const sortedBreaches = data.sort((a: any, b: any) =>
            new Date(b.breachDate).getTime() - new Date(a.breachDate).getTime()
          );
          setBreaches(sortedBreaches);
        }
      } else {
        setMessage({ text: data.message, type: res.status === 429 ? 'warning' : res.status === 404 ? 'success' : null });
      }
    } catch (err) {
      setMessage({ text: 'Failed to fetch data', type: null });
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#fff' }}>
      <h1>Check Email for Breaches</h1>
      <img src="/favicon.ico" alt="Logo" width={100} height={100} />

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{ padding: '10px', width: '100%', maxWidth: '300px' }}
          required
        />
        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px' }}>
          {loading ? 'Checking...' : 'Check'}
        </button>
      </form>

      {loading && <div className="spinner">Loading...</div>}

      {message && (
        <div className={`message-container ${message.type}`}>
          {message.type === 'success' && (
            <>
              <Image src={SafeIcon} alt="Safe Icon" width={50} style={{ marginBottom: '10px' }} />
              <p>{message.text}</p>
            </>
          )}
          {message.type !== 'success' && <p>{message.text}</p>}
        </div>
      )}

{breaches.length > 0 && (
        <div style={{ marginTop: '20px', maxWidth: '960px', margin: '0 auto' }}>
          <h2>Breach Results:</h2>
          {/* Display total number of breaches */}
          <p><strong>Total Breaches Found: {breaches.length}</strong></p>
          
          <div className="breach-list">
            {breaches.map((breach, index) => (
              <div key={index} className="breach-container">
                
                <div className="breach-details">
                {breach.logo && <img src={breach.logo} alt={breach.name} width={50} className="breach-logo" />} 
                  <h3>{breach.name}</h3>
                  <p><strong>Breach Date:</strong> {new Date(breach.breachDate).toLocaleDateString()}</p>
                  <p><strong>Description:</strong> <div dangerouslySetInnerHTML={{ __html: breach.description }} /></p>
                  <p><strong>Data Classes:</strong> {breach.dataClasses.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
