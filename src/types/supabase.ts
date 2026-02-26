export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      banks: {
        Row: {
          id: string
          name: string
          short_name: string
          logo_color: string
          logo_text: string
          website: string
          loyalty_program: string
          is_digital: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['banks']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['banks']['Insert']>
      }
      cards: {
        Row: {
          id: string
          bank_id: string
          name: string
          franchise: string
          type: string
          tier: string
          annual_fee_note: string
          has_no_annual_fee: boolean
          gradient: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['cards']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['cards']['Insert']>
      }
      card_benefits: {
        Row: {
          id: string
          card_id: string
          category: string
          title: string
          description: string
          value: number | null
          value_type: string
          conditions: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['card_benefits']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['card_benefits']['Insert']>
      }
      user_cards: {
        Row: {
          id: string
          user_id: string
          card_id: string
          nickname: string
          last_four: string
          is_primary: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['user_cards']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['user_cards']['Insert']>
      }
      promotions: {
        Row: {
          id: string
          bank_id: string | null
          card_id: string | null
          title: string
          description: string
          discount_value: string
          category: string
          valid_until: string | null
          url: string
          is_active: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['promotions']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['promotions']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
