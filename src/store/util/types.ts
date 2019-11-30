export interface UtilState {
  offline: boolean
  loading: boolean
  error: Dictionary<any> | null
  attributeTypes: AttributeType[] | null
}
export interface AttributeType {
  id: number
  sort_order: number
  name: string
  verify_seconds: string
  preview_name: string
  empty_value: Dictionary<string>
  actions: AttributeAction[]
}
export interface AttributeAction {
  sort_order: number
  name: string
  display_name: string
  icon: string
  user_only: boolean
  unverified_only: boolean
  action_value: string
}

export const FETCH_ATTRIBUTE_TYPES = 'FETCH_ATTRIBUTE_TYPES'
export const SET_OFFLINE = 'SET_OFFLINE'

interface FetchAttributeTypesAction {
  type: typeof FETCH_ATTRIBUTE_TYPES
  payload?: AttributeType[]
  loading?: boolean
  error?: Dictionary<any> | null
}

interface SetOfflineAction {
  type: typeof SET_OFFLINE
  payload: boolean
}

export type UtilActions = FetchAttributeTypesAction | SetOfflineAction
