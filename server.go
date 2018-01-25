package main

import (
	"crypto/tls"
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"
)

func main() {
	fmt.Println("Viper Relay Server, listening on port 8000")

	http.HandleFunc("/", mainHandler)
	http.ListenAndServe(":8000", nil)
}

func mainHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.URL.String())
	if strings.HasPrefix(r.URL.Path, "/vault/") {
		Proxy(w, r, "/vault")
		return
	}

	http.FileServer(http.Dir("static")).ServeHTTP(w, r)
}

// Proxy a request to a specified host by setting the proto://host:port in the `X-Forward-To` request header.
func Proxy(w http.ResponseWriter, r *http.Request, trimPrefix string) {
	dest := r.Header.Get("X-Forward-To")
	if len(dest) == 0 {
		w.Write([]byte("Missing required header"))
		w.WriteHeader(400)
		return
	}

	u, err := url.Parse(dest)
	if err != nil {
		w.Write([]byte(err.Error()))
		w.WriteHeader(400)
		return
	}

	if len(trimPrefix) > 0 {
		r.URL.Path = strings.TrimPrefix(r.URL.Path, trimPrefix)
	}

	t := &http.Transport{
		TLSClientConfig: &tls.Config{
			InsecureSkipVerify: true,
		},
	}

	p := httputil.NewSingleHostReverseProxy(u)
	p.Transport = t
	p.ServeHTTP(w, r)
}
