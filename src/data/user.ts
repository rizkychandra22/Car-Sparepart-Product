export interface DemoUser {
  email: string
  password: string
}

/** Local-only mock credentials for the frontend login demo. */
export const USERS: readonly DemoUser[] = [
  {
    email: "test@example.com",
    password: "admin123",
  },
]

/** Validate credentials against the local demo users. */
export function authenticateDemoUser(email: string, password: string): DemoUser | null {
  const normalizedEmail = email.trim().toLowerCase()

  return USERS.find(
    (user) => user.email.toLowerCase() === normalizedEmail && user.password === password
  ) ?? null
}
