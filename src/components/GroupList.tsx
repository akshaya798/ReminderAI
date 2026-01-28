import React, { useEffect, useState } from 'react'
import { fetchGroups, createGroup } from '../api'
import { Group } from '../types'

export default function GroupList({ role, onSelect }: { role: string, onSelect: (g: Group) => void }) {
  const [groups, setGroups] = useState<Group[]>([])
  const [name, setName] = useState('')

  useEffect(() => { load() }, [role])

  async function load() {
    const g = await fetchGroups(role)
    setGroups(g)
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!name) return
    const g = await createGroup({ name }, role)
    setName('')
    setGroups(prev => [g, ...prev])
  }

  return (
    <div style={{ padding: 12 }}>
      <h2>Groups</h2>
      <form onSubmit={handleCreate} style={{ marginBottom: 8 }}>
        <input placeholder="New group name" value={name} onChange={e => setName(e.target.value)} />
        <button type="submit">Create</button>
      </form>
      <ul>
        {groups.map(g => (
          <li key={g.id} style={{ marginBottom: 6 }}>
            <button onClick={() => onSelect(g)}>{g.name}</button>
            <span style={{ marginLeft: 8, color: '#666' }}>({g.assetCount ?? g.assets?.length ?? 0} assets)</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
