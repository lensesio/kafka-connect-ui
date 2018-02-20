## Kafka Connect UI ##

[![](https://images.microbadger.com/badges/image/landoop/kafka-connect-ui.svg)](http://microbadger.com/images/landoop/kafka-connect-ui)

This is a small docker image for Landoop's kafka-connect-ui.
It serves the kafka-connect-ui from port 8000 by default.
A live version can be found at <https://kafka-connect-ui.landoop.com>

The software is stateless and the only necessary option is your Kafka Connect
URL:

    docker run --rm -it -p 8000:8000 \
               -e "CONNECT_URL=http://connect.distributed.url" \
               landoop/kafka-connect-ui

Visit http://localhost:8000 to see the UI.

The `CONNECT_URL` can be a comma separated array of Connect worker
endpoints. E.g: `"CONNECT_URL=http://connect.1.url,http://connect.2.url"`

Additionally you can assign custom names to your Connect clusters by appending
a semicolon and the cluster name after the endpoint URL. E.g:
`"CONNECT_URL=http://connect.1.url;dev cluster,http://connect.2.url;production cluster"`.

> **Important**: For the `CONNECT_URL` you have to use an IP address or a domain
> that can be resolved to it. **You can't use** `localhost` even if you serve
> Connect's REST port from your localhost. The reason for this is that a docker
> container has its own network, so your _localhost_ is different from the
> container's _localhost_. As an example, if you are in your home network and
> have an IP address of `192.168.5.65` and run Connect from your computer,
> instead of `http://127.0.1:8083` you must use `http://192.168.5.65:8083`.

# Configuration options

## Kafka Connect UI

The only option for the UI, is the URL(s) of your Connect cluster(s).

- `CONNECT_URL=[connect.cluster.1.url;name],...`
  
  As an example, if you have a connect cluster at http://10.0.0.1:8083 and you
  want to name *dev cluster* you would set:
  
      -e "CONNECT_URL=http://10.0.0.1:8083,dev cluster"

## Docker Options

- `PROXY=[true|false]`
  
  Whether to proxy Connect endpoints via the internal webserver. This option
  is by default set to `true` as older versions of Connect do not support CORS,
  so there isn't another way to make the UI work. If you have a recent Connect
  (0.11 or 1.0) and permit CORS, you can disable the proxying feature.
- `PROXY_SKIP_VERIFY=[true|false]`
  
  Whether to accept self-signed certificates when proxying Connect via https.
- `PORT=[PORT]`
  
  The port number to use for kafka-connect-ui. The default is `8000`.
  Usually the main reason for using this is when you run the
  container with `--net=host`, where you can't use docker's publish
  flag (`-p HOST_PORT:8000`).
- `CADDY_OPTIONS=[OPTIONS]`
  
  The webserver that powers the image is Caddy. Via this variable
  you can add options that will be appended to its configuration
  (Caddyfile). Variables than span multiple lines are supported.
  
  As an example, you can set Caddy to not apply timeouts via:
  
      -e "CADDY_OPTIONS=timeouts none"
  
  Or you can set basic authentication via:
  
      -e "CADDY_OPTIONS=basicauth / [USER] [PASS]"

# Kafka Connect Configuration

If you don't wish to proxy Connect's REST api, you should permit CORS via setting
`access.control.allow.methods=GET,POST,PUT,DELETE,OPTIONS` and
`access.control.allow.origin=*`.

# Logging

In the latest iterations, the container will print informational messages during
startup at stderr and web server logs at stdout. This way you may sent the logs
(stdout) to your favorite log management solution.
