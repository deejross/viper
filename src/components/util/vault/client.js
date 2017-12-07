const keyUrl = 'url'
const keyToken = 'token'

import { LocalStorage } from 'quasar'

export default {
  url () {
    return LocalStorage.get.item(keyUrl)
  },
  setUrl (u) {
    LocalStorage.set(keyUrl, u)
  },
  token () {
    return LocalStorage.get.item(keyToken)
  },
  setToken (t) {
    LocalStorage.set(keyToken, t)
  },
  health () {
    let url = this.url()
    return fetch(`${url}/v1/sys/health`, { mode: 'cors' }).then((resp) => {
      return resp.json()
    })
  },
  unseal (key) {
    let url = this.url()
    return fetch(`${url}/v1/sys/unseal`, {
      method: 'PUT',
      body: JSON.stringify({ key })
    }).then((resp) => {
      return resp.json()
    })
  },
  login (method, userOrToken, password) {
    let url = this.url()
    if (method === 'token') {
      return this.lookup(userOrToken)
    } else {
      return fetch(`${url}/auth/${method}/login`, {
        method: 'POST',
        body: JSON.stringify({ username: userOrToken, password })
      })
    }
  },
  lookup (t) {
    let token = this.token()
    let url = this.url()
    return fetch(`${url}/v1/auth/token/lookup/${t}`, {
      headers: {
        'X-Vault-Token': token
      }
    }).then((resp) => {
      return resp.json()
    })
  },
  capabilitiesSelf (path) {
    let token = this.token()
    let url = this.url()
    return fetch(`${url}/v1/sys/capabilities-self`, {
      method: 'POST',
      body: JSON.stringify({ path }),
      headers: {
        'X-Vault-Token': token
      }
    }).then((resp) => {
      return resp.json()
    })
  },
  mounts () {
    let url = this.url()
    return fetch(`${url}/v1/sys/mounts`).then((resp) => {
      return resp.json()
    })
  }
}
