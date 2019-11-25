export interface UtilState {
  offline: boolean
  globalLoading: boolean
  globalError: Dictionary | null
  attributeTypes: AttributeType[] | null
}
export interface AttributeType {
  id: number
  sort_order: number
  name: string
  verify_seconds: string
  preview_name: string
  empty_value: { [index: string]: string }
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

interface VerifySessionAction {
  type: typeof FETCH_ATTRIBUTE_TYPES
  payload?: AttributeType[]
  loading?: boolean
  error?: Dictionary | null
}

export type UtilActions = VerifySessionAction
