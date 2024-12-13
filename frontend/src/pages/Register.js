import React, { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('Rejestrowanie...');
    const resp = await fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (resp.ok) {
      const data = await resp.json();
      setMsg(data.msg || 'Zarejestrowano pomyślnie!');
    } else {
      const err = await resp.json();
      setMsg('Błąd: ' + (err.detail || err.msg || 'nieznany'));
    }
  };

  return (
    <div className="card p-4">
      <h2>Rejestracja</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nazwa użytkownika</label>
          <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} required/>
        </div>
        <div className="mb-3">
          <label>Hasło</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required/>
        </div>
        <button className="btn btn-primary" type="submit">Zarejestruj</button>
      </form>
      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
}

export default Register;
