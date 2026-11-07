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
