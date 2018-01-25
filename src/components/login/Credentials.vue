<template>
  <div class="row">
    <q-card class="col-6 offset-3 self-center" style="background-color: white;">
      <q-card-title>
        Login
      </q-card-title>

      <q-card-separator />

      <q-card-main>
        <q-field
          icon="vpn key"
          label="Vault URL"
          helper="The URL used to connect to the Vault API"
          :error="$v.url.$error"
          error-label="Please enter a valid URL"
        >
          <q-input
            type="url"
            v-model="url"
            @blur="checkURL"
            @keyup.enter="login"
          />
        </q-field>

        <q-progress v-if="checking"
          indeterminate
          style="height: 5px"
        />

        <q-field v-if="sealed"
          icon="lock outline"
          label="Unseal key"
          helper="Enter an unseal key, then press Enter"
          :error="$v.unsealKey.$error"
          error-label="Please enter a valid unseal key, then press Enter"
        >
          <q-input
            type="password"
            v-model="unsealKey"
            @blur="$v.unsealKey.$touch"
            @keyup.enter="unseal"
          />
        </q-field>

        <q-field v-if="checked"
          icon="list"
          label="Auth Type"
          helper="The type of authentication to use"
          :error="$v.auth.$error"
          error-label="Please enter a valid Auth type"
        >
          <q-select
            v-model="auth"
            :options="authOptions"
            @blur="$v.auth.$touch"
          />
        </q-field>

        <div v-if="auth === 'token' || auth === 'github'">
          <q-field
            icon="label outline"
            label="Token"
            helper="The token to use for authentication"
            :error="$v.token.$error"
            error-label="Please enter a valid token"
          >
            <q-input
              type="password"
              v-model="token"
              @blur="$v.token.$touch"
              @keyup.enter="login"
            />
          </q-field>
        </div>

        <div v-if="auth === 'gcp' || auth === 'kubernetes'">
          <q-field
            icon="person"
            label="Role"
            helper="The role to use for authentication"
            :error="$v.role.$error"
            error-label="Please enter a valid role"
          >
            <q-input
              type="text"
              v-model="role"
              @blur="$v.role.$touch"
              @keyup.enter="login"
            />
          </q-field>

          <q-field
            icon="fingerprint"
            label="JWT"
            helper="The JWT token to use for authentication"
            :error="$v.jwt.$error"
            error-label="Please enter a valid JWT token"
          >
            <q-input
              type="password"
              v-model="jwt"
              @blur="$v.jwt.$touch"
              @keyup.enter="login"
            />
          </q-field>
        </div>

        <div v-if="auth === 'ldap' || auth === 'okta' || auth === 'userpass' || auth === 'radius'">
          <q-field
            icon="person"
            label="Username"
            helper="The username to use for authentication"
            :error="$v.user.$error"
            error-label="Please enter a valid username"
          >
            <q-input
              type="text"
              v-model="user"
              @blur="$v.user.$touch"
              @keyup.enter="login"
            />
          </q-field>

          <q-field
            icon="fingerprint"
            label="Password"
            helper="The password to use for authentication"
            :error="$v.pass.$error"
            error-label="Please enter a valid password"
          >
            <q-input
              type="password"
              v-model="pass"
              @blur="$v.pass.$touch"
              @keyup.enter="login"
            />
          </q-field>
        </div>

        <div class="row">
          <q-btn
            icon="info outline"
            color="info"
            class="col-3"
            :disabled="$v.url.$invalid"
            @click="health"
          >
            Check
          </q-btn>
          <q-btn
            icon="lock outline"
            color="primary"
            class="offset-6 col-3"
            :disabled="formInvalid || loading"
            @click="login"
          >
            Login
          </q-btn>
        </div>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import url from '@/util/validators/url'
import { Toast } from 'quasar'
import client from '@/util/vault/client'

export default {
  data () {
    return {
      checking: false,
      checked: false,
      sealed: false,
      loading: false,
      auth: '',
      authOptions: [
        // { label: 'AWS', value: 'aws' }, // requires a bunch of fields
        { label: 'GitHub', value: 'github' }, // only requires a token field
        { label: 'Google Cloud', value: 'gcp' }, // only requires role and jwt fields
        { label: 'Kubernetes', value: 'kubernetes' }, // only requires role and jwt fields
        { label: 'LDAP', value: 'ldap' }, // only requires username and password fields
        { label: 'Okta', value: 'okta' }, // only requires username and password fields
        { label: 'RADIUS', value: 'radius' }, // only requires username and password fields
        { label: 'Token', value: 'token' }, // only requires a token field
        { label: 'Username & Password', value: 'userpass' } // only requires username and password fields
      ],
      url: '',
      token: '', // for token auth
      role: '', // for role/jwt auth
      jwt: '', // for role/jwt auth
      user: '', // for user/pass auth
      pass: '', // for user/pass auth
      unsealKey: '' // for unsealing th Vault
    }
  },
  validations: {
    auth: { required },
    token: { required },
    role: { required },
    jwt: { required },
    user: { required },
    pass: { required },
    unsealKey: { required },
    url: { required, url }
  },
  computed: {
    formInvalid () {
      if (this.$v.url.$invalid) return true

      if (this.auth === 'github' || this.auth === 'token') {
        return this.$v.token.$invalid
      } else if (this.auth === 'gcp' || this.auth === 'kubernetes') {
        return this.$v.role.$invalid && this.$v.jwt.$invalid
      } else if (this.auth === 'ldap' || this.auth === 'okta' || this.auth === 'radius' || this.auth === 'userpass') {
        return this.$v.user.$invalid && this.$v.pass.$invalid
      }

      return true
    }
  },
  methods: {
    checkURL () {
      client.setRelay(window.location.protocol + '//' + window.location.host)

      this.$v.url.$touch()
      if (this.$v.url.$invalid) return

      this.checked = false
      this.checking = true
      this.sealed = false

      client.setUrl(this.url)

      client.health().then((json) => {
        if (!json.initialized) {
          Toast.create.negative({html: 'Vault is not initialized. This must be done using the Vault CLI.', timeout: 5000})
        } else if (json.sealed) {
          this.checking = false
          this.sealed = true
        } else {
          this.checking = false
          this.checked = true
        }
      }).catch((err, resp) => {
        console.log(err.message, resp)
        Toast.create.negative({html: 'Unable to connect to Vault. Please ensure the URL is correct.', timeout: 5000})
        this.checking = false
      })
    },
    health () {
      if (this.$v.url.$invalid) return
      client.health().then((json) => {
        Toast.create.info({html: `Name: ${json.cluster_name}<br/>Initialized: ${json.initialized}<br/>Sealed: ${json.sealed}<br/>Version: ${json.version}`, timeout: 5000})
      }).catch(() => {
        Toast.create.negative({html: 'Unable to connect to Vault. Please ensure the URL is correct.', timeout: 5000})
      })
    },
    login () {
      if (this.formInvalid) return
      client.login(this.auth, this.token).then((json) => {
        Toast.create.negative({html: 'Not yet implemented', timeout: 5000})
      }).catch(() => {
        Toast.create.negative({html: 'Unable to connect to Vault. Please ensure the URL is correct.', timeout: 5000})
      })
    },
    unseal () {
      if (this.unsealKey === '') return
      client.unseal(this.unsealKey).then((resp) => {
        return resp.json()
      }).then((json) => {
        console.log(json)
        if (json.sealed === false) {
          Toast.create.positive({html: 'Vault unsealed', timeout: 5000})
          this.checked = true
        } else {
          Toast.create.info({html: `Unseal status: ${json.progress} of ${json.t}`})
        }

        this.sealed = json.sealed
        this.unsealKey = ''
      }).catch((err) => {
        Toast.create.negative({html: err.message, timeout: 5000})
      })
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'

body
  background-color $neutral
</style>