export interface IReservation {
  id?: string
  user_id?: string | null
  restaurant_id: number
  deal_id: number
  guest_count: number
  time_range: string
  created_at?: string | null
  transaction_id?: string | null
  guest_name?: string | null
  guest_email?: string | null
  redeem?: boolean
  phone?: string
  remark?: string
}
