import React, { useState } from 'react';

function ResetPassword() {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(''); // token otrzymany np. w mailu
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('Ustawianie nowego hasła...');
    const resp = await fetch('/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, newPassword, token })
    });

    if (resp.ok) {
      const data = await resp.json();
      setMsg(data.msg || 'Hasło zmienione pomyślnie!');
    } else {
      const err = await resp.json();
      setMsg('Błąd: ' + (err.detail || err.msg || 'nieznany'));
    }
  };

  return (
    <div className="card p-4">
      <h2>Ustaw nowe hasło</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nazwa użytkownika</label>
          <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} required/>
        </div>
        <div className="mb-3">
          <label>Token resetu hasła</label>
          <input className="form-control" value={token} onChange={e => setToken(e.target.value)} required/>
        </div>
        <div className="mb-3">
          <label>Nowe hasło</label>
          <input type="password" className="form-control" value={newPassword} onChange={e => setNewPassword(e.target.value)} required/>
        </div>
        <button className="btn btn-primary" type="submit">Ustaw nowe hasło</button>
      </form>
      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
}

export default ResetPassword;
