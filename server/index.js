const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 4000

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-user-role')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

app.use(bodyParser.json())

// In-memory data store
const groups = {}
let gidCounter = 1
let aidCounter = 1

function now() { return new Date().toISOString() }

function requireRole(minRole) {
  const roles = ['viewer', 'editor', 'admin']
  return (req, res, next) => {
    const role = (req.header('x-user-role') || 'viewer')
    if (roles.indexOf(role) < roles.indexOf(minRole)) {
      return res.status(403).json({ error: 'insufficient_role' })
    }
    req.userRole = role
    next()
  }
}

// Group CRUD
app.get('/api/groups', (req, res) => {
  const list = Object.values(groups).map(g => ({
    id: g.id,
    name: g.name,
    status: g.status,
    assetCount: g.assets.length,
    lastUpdated: g.lastUpdated
  }))
  res.json(list)
})

app.post('/api/groups', requireRole('editor'), (req, res) => {
  const { name, status = 'active', config = {} } = req.body
  const id = String(gidCounter++)
  groups[id] = { id, name, status, config, assets: [], createdAt: now(), lastUpdated: now() }
  res.status(201).json(groups[id])
})

app.get('/api/groups/:gid', (req, res) => {
  const g = groups[req.params.gid]
  if (!g) return res.status(404).json({ error: 'not_found' })
  res.json(g)
})

app.put('/api/groups/:gid', requireRole('editor'), (req, res) => {
  const g = groups[req.params.gid]
  if (!g) return res.status(404).json({ error: 'not_found' })
  const { name, status, config } = req.body
  if (name) g.name = name
  if (status) g.status = status
  if (config) g.config = config
  g.lastUpdated = now()
  res.json(g)
})

app.delete('/api/groups/:gid', requireRole('admin'), (req, res) => {
  const g = groups[req.params.gid]
  if (!g) return res.status(404).json({ error: 'not_found' })
  delete groups[req.params.gid]
  res.status(204).send()
})

// Asset CRUD under group
app.get('/api/groups/:gid/assets', (req, res) => {
  const g = groups[req.params.gid]
  if (!g) return res.status(404).json({ error: 'not_found' })
  res.json(g.assets)
})

app.post('/api/groups/:gid/assets', requireRole('editor'), (req, res) => {
  const g = groups[req.params.gid]
  if (!g) return res.status(404).json({ error: 'not_found' })
  const { name, status = 'active', metadata = {} } = req.body
  const id = String(aidCounter++)
  const asset = { id, name, status, metadata: Object.assign({ createdAt: now(), updatedAt: now() }, metadata) }
  g.assets.push(asset)
  g.lastUpdated = now()
  res.status(201).json(asset)
})

app.get('/api/groups/:gid/assets/:aid', (req, res) => {
  const g = groups[req.params.gid]
  if (!g) return res.status(404).json({ error: 'not_found' })
  const a = g.assets.find(x => x.id === req.params.aid)
  if (!a) return res.status(404).json({ error: 'not_found' })
  res.json(a)
})

app.put('/api/groups/:gid/assets/:aid', requireRole('editor'), (req, res) => {
  const g = groups[req.params.gid]
  if (!g) return res.status(404).json({ error: 'not_found' })
  const a = g.assets.find(x => x.id === req.params.aid)
  if (!a) return res.status(404).json({ error: 'not_found' })
  const { name, status, metadata } = req.body
  if (name) a.name = name
  if (status) a.status = status
  if (metadata) a.metadata = Object.assign({}, a.metadata, metadata)
  a.metadata.updatedAt = now()
  g.lastUpdated = now()
  res.json(a)
})

app.delete('/api/groups/:gid/assets/:aid', requireRole('editor'), (req, res) => {
  const g = groups[req.params.gid]
  if (!g) return res.status(404).json({ error: 'not_found' })
  const idx = g.assets.findIndex(x => x.id === req.params.aid)
  if (idx === -1) return res.status(404).json({ error: 'not_found' })
  g.assets.splice(idx, 1)
  g.lastUpdated = now()
  res.status(204).send()
})

// Bulk asset operation
app.post('/api/groups/:gid/assets/bulk', requireRole('editor'), (req, res) => {
  const g = groups[req.params.gid]
  if (!g) return res.status(404).json({ error: 'not_found' })
  const { action, assetIds } = req.body
  const targets = assetIds && assetIds.length ? g.assets.filter(a => assetIds.includes(a.id)) : g.assets
  targets.forEach(a => {
    if (action === 'activate') a.status = 'active'
    if (action === 'deactivate') a.status = 'inactive'
    if (action === 'archive') a.status = 'archived'
    a.metadata.updatedAt = now()
  })
  g.lastUpdated = now()
  res.json({ affected: targets.length })
})

// Group metrics
app.get('/api/groups/:gid/metrics', (req, res) => {
  const g = groups[req.params.gid]
  if (!g) return res.status(404).json({ error: 'not_found' })
  const count = g.assets.length
  const active = g.assets.filter(a => a.status === 'active').length
  const health = count ? Math.round((active / count) * 100) : 100
  const lastUpdated = g.lastUpdated
  res.json({ count, active, health, lastUpdated })
})

// Seed sample data
;(function seed() {
  const g1 = String(gidCounter++)
  groups[g1] = { id: g1, name: 'Default Group', status: 'active', config: {}, assets: [], createdAt: now(), lastUpdated: now() }
  groups[g1].assets.push({ id: String(aidCounter++), name: 'Pump A', status: 'active', metadata: { owner: 'ops', tags: ['pump'], createdAt: now(), updatedAt: now() } })
  groups[g1].assets.push({ id: String(aidCounter++), name: 'Compressor B', status: 'inactive', metadata: { owner: 'maint', tags: ['compressor'], createdAt: now(), updatedAt: now() } })
})()

app.listen(PORT, () => console.log('API server listening on port', PORT))
