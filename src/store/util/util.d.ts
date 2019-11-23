export interface UtilState extends StateSlice {
  offline: boolean
  globalLoading: boolean
  globalError: Dictionary | null
  attributeTypes: AttributeType[] | null
}
export interface AttributeType {
  id: number
  sort_order: int
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
