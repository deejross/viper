<template>
  <div>
    <q-inner-loading :visible="loading">
      <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
    </q-inner-loading>

    <q-btn @click="logout">Logout</q-btn>

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
        this.mounts = json.data
        this.loading = false
      }).catch((err) => {
        Toast.create.negative({html: err, timeout: 5000})
        this.loading = false
      })
    },
    logout () {
      client.logout()
    }
  },
  mounted () {
    this.getMounts()
  }
}
</script>