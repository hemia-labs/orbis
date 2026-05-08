export interface AuthResponse {
  token: string
  user: UserResponse
}

export interface UserResponse {
  id: string
  email: string
  name: string
}

export interface User {
  user: UserProfile
  membership: UserMembership | null
}

export interface UserProfile {
  id: string
  email: string
  name: string
  lastName: string | null
  avatarUrl: string | null
  emailVerified: boolean
  lastLogin: string
}

export interface UserAuthorization {
  roles: string[]
  permissions: string[]
}

export interface UserMembership {
  organization: UserOrganization
  roles: string[]
  permissions: string[]
}

export interface UserOrganization {
  id: string
  name: string
  slug: string
}
