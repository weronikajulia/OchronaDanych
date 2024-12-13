import React, { useState } from 'react';

function RequestReset() {
  const [username, setUsername] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('Wysyłanie prośby o reset...');
    const resp = await fetch('/auth/request-reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });

    if (resp.ok) {
      const data = await resp.json();
      setMsg(data.msg || 'Instrukcje wysłane. Sprawdź email.');
    } else {
      const err = await resp.json();
      setMsg('Błąd: ' + (err.detail || err.msg || 'nieznany'));
    }
  };

  return (
    <div className="card p-4">
      <h2>Przywracanie hasła</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nazwa użytkownika</label>
          <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} required/>
        </div>
        <button className="btn btn-primary" type="submit">Wyślij prośbę</button>
      </form>
      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
}

export default RequestReset;
