import './App.css'
import React, { useState } from 'react'
import GroupList from './components/GroupList'
import GroupDetail from './components/GroupDetail'

function App() {
  const [role, setRole] = useState<'admin'|'editor'|'viewer'>('admin')
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="container">
      <h1>AMC Reminder & Escalation</h1>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ width: 300, borderRight: '1px solid #ddd' }}>
          <div style={{ padding: 12 }}>
            <label>Role: </label>
            <select value={role} onChange={e => setRole(e.target.value as any)}>
              <option value="admin">admin</option>
              <option value="editor">editor</option>
              <option value="viewer">viewer</option>
            </select>
          </div>
          <GroupList role={role} onSelect={g => setSelected(g.id)} />
        </div>
        <div style={{ flex: 1 }}>
          <GroupDetail groupId={selected} role={role} onBack={() => setSelected(null)} />
        </div>
      </div>
    </div>
  )
}

export default App
