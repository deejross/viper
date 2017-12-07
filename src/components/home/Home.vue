<template>
  <div>
    <q-inner-loading :visible="loading">
      <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
    </q-inner-loading>

    <ul v-if="!loading">
      <li v-for="(mount, name) in mounts" :key="name">
        {{ name }} - {{ mount.description }}
      </li>
    </ul>
  </div>
</template>

<script>
import client from '@/util/vault/client'
import { Toast } from 'quasar'

export default {
  data () {
    return {
      loading: true,
      mounts: {}
    }
  },
  methods: {
    getMounts () {
      this.loading = true

      client.mounts().then((json) => {
        this.mounts = json
        this.loading = false
      }).catch(() => {
        Toast.create.negative({html: 'Unable to connect to Vault. Please ensure the URL is correct, and that CORS is enabled.', timeout: 5000})
        this.loading = false
      })
    }
  },
  mounted () {
    this.getMounts()
  }
}
</script>