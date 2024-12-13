import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('Logowanie...');
    const resp = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (resp.ok) {
      const data = await resp.json();
      // Zakładamy, że backend zwraca token JWT w data.token
      localStorage.setItem('token', data.token);
      setMsg('Zalogowano!');
      window.location.href = '/';
    } else {
      const err = await resp.json();
      setMsg('Błąd: ' + (err.detail || err.msg || 'nieznany'));
    }
  };

  return (
    <div className="card p-4">
      <h2>Logowanie</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nazwa użytkownika</label>
          <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} required/>
        </div>
        <div className="mb-3">
          <label>Hasło</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required/>
        </div>
        <button className="btn btn-primary" type="submit">Zaloguj</button>
      </form>
      {msg && <p className="mt-3">{msg}</p>}
      <p className="mt-3">Nie pamiętasz hasła? <a href="/request-reset">Przywróć hasło</a></p>
    </div>
  );
}

export default Login;
