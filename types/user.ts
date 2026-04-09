export interface AuthResponse {
  user: User
}

export interface User {
  id: string
  aud: string
  role: string
  email: string
  email_confirmed_at: string | null
  confirmed_at: string | null
  last_sign_in_at: string | null
  phone: string
  app_metadata: {
    provider: string
    providers: string[]
  }
  user_metadata: {
    avatar_url: string
    email: string
    email_verified: boolean
    full_name: string
    name: string
    picture: string
    iss?: string
    provider_id?: string
    sub?: string
    phone_verified?: boolean
  }
  identities: Identity[]
  created_at: string
  updated_at: string
  is_anonymous: boolean
}

export interface Identity {
  identity_id: string
  id: string
  user_id: string
  identity_data: {
    avatar_url: string
    email: string
    email_verified: boolean
    full_name: string
    name: string
    picture: string

    iss?: string
    provider_id?: string
    sub?: string
    phone_verified?: boolean
  }
  provider: string
  last_sign_in_at: string
  created_at: string
  updated_at: string
  email: string
}
