# Viper
Server-less Web UI for HashiCorp's Vault

## Requirements
* At least one Vault instance installed and running
* CORS enabled
	* Check if enabled: `vault read /sys/config/cors`
	* Enable it if disabled: `vault write /sys/config/cors enabled=true allowed_origins=*`

## Features
* [ ] Multiple Vault instances
* [ ] Login methods
	* [ ] Approle
	* [ ] AWS
	* [ ] Google Cloud
	* [ ] Kubernetes
	* [ ] GitHub
	* [ ] LDAP
	* [ ] MFA
	* [ ] Okta
	* [ ] RADIUS
	* [ ] TLS
	* [ ] Tokens
	* [ ] Username/password
* [ ] Auth backend management
	* [ ] Approle
	* [ ] AWS
	* [ ] Google Cloud
	* [ ] Kubernetes
	* [ ] GitHub
	* [ ] LDAP
	* [ ] MFA
	* [ ] Okta
	* [ ] RADIUS
	* [ ] TLS
	* [ ] Tokens
	* [ ] Username/password
* [ ] Key/Value backend
	* [ ] List backends
	* [ ] Create backends
	* [ ] Manage backends
	* [ ] List secrets
	* [ ] Read secrets
	* [ ] Write secrets
	* [ ] Rich text editor
	* [ ] Cubbyhole
* [ ] Use Secret backends
	* [ ] AWS
	* [ ] Consul
	* [ ] Databases
	* [ ] Identity
	* [ ] PKI
	* [ ] RabbitMQ
	* [ ] SSH
	* [ ] TOTP
	* [ ] Transit
* [ ] Manage Secret backends
	* [ ] AWS
	* [ ] Consul
	* [ ] Databases
	* [ ] Identity
	* [ ] PKI
	* [ ] RabbitMQ
	* [ ] SSH
	* [ ] TOTP
	* [ ] Transit
* [ ] System
	* [ ] Seal / unseal
	* [ ] Manage Audit backends

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8081
$ quasar dev

# build for production with minification
$ quasar build

# lint code
$ quasar lint
```
