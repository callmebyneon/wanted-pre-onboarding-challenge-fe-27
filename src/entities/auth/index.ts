const TOKEN = "token"

export const tokenStorage = {
  getToken: () => {
    return localStorage.getItem(TOKEN)
  },
  setToken: (token: string) => {
    localStorage.setItem(TOKEN, token)
  },
  deleteToken: () => {
    localStorage.removeItem(TOKEN)
  },
}

export class AuthController {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage
  }

  getToken() {
    return this.storage.getItem(TOKEN)
  }

  setToken(token: string) {
    this.storage.setItem(TOKEN, token)
  }
}