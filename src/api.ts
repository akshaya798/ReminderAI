import { Group, Asset } from './types'

const BASE = (import.meta.env.VITE_API_BASE || 'http://localhost:4000') + '/api'

function headers(role = 'admin') {
  return { 'Content-Type': 'application/json', 'x-user-role': role }
}

export async function fetchGroups(role = 'admin'): Promise<Group[]> {
  const r = await fetch(`${BASE}/groups`, { headers: headers(role) })
  return r.json()
}

export async function createGroup(payload: Partial<Group>, role = 'admin') {
  const r = await fetch(`${BASE}/groups`, { method: 'POST', headers: headers(role), body: JSON.stringify(payload) })
  return r.json()
}

export async function updateGroup(id: string, payload: Partial<Group>, role = 'admin') {
  const r = await fetch(`${BASE}/groups/${id}`, { method: 'PUT', headers: headers(role), body: JSON.stringify(payload) })
  return r.json()
}

export async function deleteGroup(id: string, role = 'admin') {
  return fetch(`${BASE}/groups/${id}`, { method: 'DELETE', headers: headers(role) })
}

export async function fetchGroup(id: string, role = 'admin') {
  const r = await fetch(`${BASE}/groups/${id}`, { headers: headers(role) })
  return r.json()
}

export async function fetchAssets(groupId: string, role = 'admin') {
  const r = await fetch(`${BASE}/groups/${groupId}/assets`, { headers: headers(role) })
  return r.json()
}

export async function createAsset(groupId: string, payload: Partial<Asset>, role = 'admin') {
  const r = await fetch(`${BASE}/groups/${groupId}/assets`, { method: 'POST', headers: headers(role), body: JSON.stringify(payload) })
  return r.json()
}

export async function updateAsset(groupId: string, assetId: string, payload: Partial<Asset>, role = 'admin') {
  const r = await fetch(`${BASE}/groups/${groupId}/assets/${assetId}`, { method: 'PUT', headers: headers(role), body: JSON.stringify(payload) })
  return r.json()
}

export async function deleteAsset(groupId: string, assetId: string, role = 'admin') {
  return fetch(`${BASE}/groups/${groupId}/assets/${assetId}`, { method: 'DELETE', headers: headers(role) })
}

export async function bulkAssets(groupId: string, action: string, assetIds: string[] = [], role = 'admin') {
  const r = await fetch(`${BASE}/groups/${groupId}/assets/bulk`, { method: 'POST', headers: headers(role), body: JSON.stringify({ action, assetIds }) })
  return r.json()
}

export async function fetchMetrics(groupId: string, role = 'admin') {
  const r = await fetch(`${BASE}/groups/${groupId}/metrics`, { headers: headers(role) })
  return r.json()
}
