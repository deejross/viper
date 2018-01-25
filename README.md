# Viper

![logo](src/statics/viper-logo.png)

Web UI for HashiCorp's Vault

## Requirements
* At least one Vault instance installed and running

## Features
* [X] Multiple Vault instances
* [ ] Login methods
	* [ ] AWS
	* [ ] Google Cloud
	* [ ] Kubernetes
	* [ ] GitHub
	* [ ] LDAP
	* [ ] Okta
	* [ ] RADIUS
	* [ ] Tokens
	* [ ] Username/password
* [ ] Auth backend management
	* [ ] Approle
	* [ ] AWS
	* [ ] Google Cloud
	* [ ] Kubernetes
	* [ ] GitHub
	* [ ] LDAP
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
	* [X] Seal / unseal
	* [ ] Manage Audit backends

## Build Setup
### Requirements
* Go
* Node.js

**NOTE**: Since CORS is not available on a sealed Vault, a small reverse proxy is used to relay requests from the UI to the desired Vault instance. When developing Viper, you must ensure the reverse proxy is running:
```shell
go run main.go
```

Once started, `quasar dev` can be run in a separate terminal session to start the frontend.

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
