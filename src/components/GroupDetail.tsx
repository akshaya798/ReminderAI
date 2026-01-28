import React, { useEffect, useState } from 'react'
import { Group, Asset } from '../types'
import { fetchGroup, fetchAssets, createAsset, updateAsset, deleteAsset, bulkAssets, fetchMetrics, updateGroup, deleteGroup } from '../api'

export default function GroupDetail({ groupId, role, onBack }: { groupId: string | null, role: string, onBack: () => void }) {
  const [group, setGroup] = useState<Group | null>(null)
  const [assets, setAssets] = useState<Asset[]>([])
  const [name, setName] = useState('')
  const [newAssetName, setNewAssetName] = useState('')
  const [metrics, setMetrics] = useState<any>(null)

  useEffect(() => { if (groupId) load() }, [groupId, role])

  async function load() {
    const g = await fetchGroup(groupId!, role)
    setGroup(g)
    const a = await fetchAssets(groupId!, role)
    setAssets(a)
    const m = await fetchMetrics(groupId!, role)
    setMetrics(m)
  }

  async function handleCreateAsset(e: React.FormEvent) {
    e.preventDefault()
    if (!newAssetName) return
    await createAsset(groupId!, { name: newAssetName }, role)
    setNewAssetName('')
    await load()
  }

  async function handleBulk(action: string) {
    await bulkAssets(groupId!, action, [], role)
    await load()
  }

  async function handleDeleteAsset(id: string) {
    await deleteAsset(groupId!, id, role)
    await load()
  }

  async function handleUpdateGroup() {
    if (!group) return
    await updateGroup(group.id, { name }, role)
    setName('')
    await load()
  }

  async function handleDeleteGroup() {
    if (!group) return
    await deleteGroup(group.id, role)
    onBack()
  }

  if (!groupId) return <div className="detail-empty">Select a group</div>
  if (!group) return <div className="detail-loading">Loading...</div>

  return (
    <div className="detail-container">
      <div className="detail-header">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <div className="header-content">
          <h2 className="detail-title">{group.name}</h2>
          <div className="header-stats">
            <span className="stat-item">
              <span className="stat-label">Status:</span>
              <span className={`stat-value status-${group.status.toLowerCase()}`}>{group.status}</span>
            </span>
            <span className="stat-item">
              <span className="stat-label">Assets:</span>
              <span className="stat-value">{group.assets.length}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <div className="section-header">
          <h3>Group Information</h3>
        </div>
        <div className="form-group">
          <input 
            className="form-input"
            placeholder="Enter new group name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
          <div className="button-group">
            <button className="btn btn-primary" onClick={handleUpdateGroup}>Update Group</button>
            {role === 'admin' && (
              <button className="btn btn-danger" onClick={handleDeleteGroup}>Delete Group</button>
            )}
          </div>
        </div>
      </div>

      {metrics && (
        <div className="detail-section">
          <div className="section-header">
            <h3>Metrics</h3>
          </div>
          <div className="metrics-content">
            <pre className="metrics-block">{JSON.stringify(metrics, null, 2)}</pre>
          </div>
        </div>
      )}

      <div className="detail-section">
        <div className="section-header">
          <h3>Assets Management</h3>
          <p className="section-subtitle">Manage and organize your assets</p>
        </div>
        
        <div className="form-group">
          <form onSubmit={handleCreateAsset} className="create-asset-form">
            <input 
              className="form-input"
              placeholder="Enter new asset name" 
              value={newAssetName} 
              onChange={e => setNewAssetName(e.target.value)} 
            />
            <button className="btn btn-primary" type="submit">+ Create Asset</button>
          </form>
        </div>

        <div className="bulk-actions">
          <p className="action-label">Quick Actions:</p>
          <div className="button-group">
            <button className="btn btn-secondary" onClick={() => handleBulk('activate')}>✓ Activate All</button>
            <button className="btn btn-secondary" onClick={() => handleBulk('deactivate')}>✗ Deactivate All</button>
            <button className="btn btn-secondary" onClick={() => handleBulk('archive')}>📦 Archive All</button>
          </div>
        </div>

        <div className="assets-list">
          {assets.length === 0 ? (
            <div className="empty-state">
              <p>No assets yet. Create one to get started.</p>
            </div>
          ) : (
            <div className="assets-grid">
              {assets.map(a => (
                <div key={a.id} className="asset-card">
                  <div className="asset-header">
                    <div className="asset-info">
                      <h4 className="asset-name">{a.name}</h4>
                      <span className={`asset-status status-${a.status.toLowerCase()}`}>{a.status}</span>
                    </div>
                  </div>
                  {a.metadata && (
                    <div className="asset-metadata">
                      <pre>{JSON.stringify(a.metadata, null, 2)}</pre>
                    </div>
                  )}
                  <div className="asset-actions">
                    <button 
                      className="btn btn-small btn-secondary"
                      onClick={async () => { 
                        await updateAsset(groupId!, a.id, { status: a.status === 'active' ? 'inactive' : 'active' }, role); 
                        await load() 
                      }}
                    >
                      {a.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button 
                      className="btn btn-small btn-danger"
                      onClick={() => handleDeleteAsset(a.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
