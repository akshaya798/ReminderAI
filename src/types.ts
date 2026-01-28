export type AssetStatus = 'active' | 'inactive' | 'archived'

export interface Asset {
  id: string
  name: string
  status: AssetStatus
  metadata: { [k: string]: any }
}

export interface Group {
  id: string
  name: string
  status: 'active' | 'inactive' | 'archived'
  config: { [k: string]: any }
  assets: Asset[]
  createdAt?: string
  lastUpdated?: string
}
