const EMAIL_PATTERN = /^\S+@\S+\.\S+$/

export const MIN_PASSWORD_LENGTH = 6

export function isValidEmail(email: string) {
  return EMAIL_PATTERN.test(email)
}

export function isValidPassword(password: string) {
  return password.length >= MIN_PASSWORD_LENGTH
}
