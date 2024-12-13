import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [msg, setMsg] = useState('Ładowanie...');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMsg('Musisz się zalogować, aby zobaczyć notatki');
      return;
    }

    fetch('/api/notes', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Błąd ładowania notatek');
        }
        return res.json();
      })
      .then(data => {
        setNotes(data);
        setMsg('');
      })
      .catch(err => {
        setMsg(err.message);
      });
  }, []);

  return (
    <div>
      <h2>Twoje Notatki</h2>
      {msg && <p>{msg}</p>}
      <ul>
        {notes.map(n => <li key={n.id}>{n.title}</li>)}
      </ul>
    </div>
  );
}

export default Dashboard;
