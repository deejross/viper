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
            @blur="$v.url.$touch"
            @keyup.enter="login"
          />
        </q-field>
        <q-field
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
              type="text"
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
            icon="lock outline"
            color="primary"
            class="offset-9 col-3"
            :disabled="formInvalid"
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

export default {
  data () {
    return {
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
      pass: '' // for user/pass auth
    }
  },
  validations: {
    auth: { required },
    token: { required },
    role: { required },
    jwt: { required },
    user: { required },
    pass: { required },
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
    login () {
      if (this.formInvalid) return
      console.log('go')
    }
  }
}
</script>

<style lang="stylus">
@import '~variables'

body
  background-color $neutral
</style>