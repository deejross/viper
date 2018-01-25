const keyUrl = 'url'
const keyRelay = 'relay'
const keyToken = 'token'

import { LocalStorage } from 'quasar'

export default {
  relay () {
    return LocalStorage.get.item(keyRelay) + '/vault'
  },
  setRelay (u) {
    LocalStorage.set(keyRelay, u)
  },
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
    let url = this.relay()
    return fetch(`${url}/v1/sys/health`, {
      headers: {
        'X-Forward-To': this.url()
      }
    }).then((resp) => {
      return resp.json()
    })
  },
  unseal (key) {
    let url = this.relay()
    return fetch(`${url}/v1/sys/unseal`, {
      method: 'PUT',
      body: JSON.stringify({ key }),
      headers: {
        'X-Forward-To': this.url()
      }
    }).then((resp) => {
      return resp.json()
    })
  },
  login (method, userOrToken, password) {
    let url = this.relay()
    if (method === 'token') {
      return this.lookup(userOrToken)
    } else {
      return fetch(`${url}/auth/${method}/login`, {
        method: 'POST',
        body: JSON.stringify({ username: userOrToken, password }),
        headers: {
          'X-Forward-To': this.url()
        }
      })
    }
  },
  lookup (t) {
    let token = this.token()
    let url = this.relay()
    return fetch(`${url}/v1/auth/token/lookup/${t}`, {
      headers: {
        'X-Forward-To': this.url(),
        'X-Vault-Token': token
      }
    }).then((resp) => {
      return resp.json()
    })
  },
  capabilitiesSelf (path) {
    let token = this.token()
    let url = this.relay()
    return fetch(`${url}/v1/sys/capabilities-self`, {
      method: 'POST',
      body: JSON.stringify({ path }),
      headers: {
        'X-Forward-To': this.url(),
        'X-Vault-Token': token
      }
    }).then((resp) => {
      return resp.json()
    })
  },
  mounts () {
    let url = this.relay()
    return fetch(`${url}/v1/sys/mounts`, {
      headers: {
        'X-Forward-To': this.url()
      }
    }).then((resp) => {
      return resp.json()
    })
  }
}
