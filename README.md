[![CodeQL](https://github.com/cloud-gov/pages-mailer/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/cloud-gov/pages-mailer/actions/workflows/codeql-analysis.yml)

# Pages Mailer - Test PR

An HTTP interface to send emails using an internal SMTP server.

This application provides a way for pages applications to send emails via the cloud.gov smtp server
without each space having access to the required ASG. It is only accessible on the internal network
and requires basic authentication.

## Usage

To use `pages-mailer`:
- create a `network-policy` on cloud.gov to allow container to container networking:

  ```
  # target the space containing the target app
  cf target -s <target-space>

  # add the network policy
  cf add-network-policy <target-app-name> pages-mailer -s email -o gsa-18f-federalist
  ```
- include basic authentication credentials that match those in the `auth` user-provided-service in
`email` space
- send a POST request to the `/send` endpoint with required json data

### Example
```bash
curl -X POST \
-H "Content-Type: application/json" \
-u '<username>:<password>' \
-d '{ "html": "<h1>Some Email Content</h1>", "subject": "Email Subject", "to": ["hello@agency.gov"] }' \
http://pages-mailer.apps.internal:8080/send
```
Note: specying the port is required to reach the application over the internal network.

## Configuration

The application can be configured via the following environment variables:

| Variable                         |                                                             |
| ---------------------------------|-------------------------------------------------------------|
| AUTH_USERNAME                    | Basic authentication username                               |
| AUTH_PASSWORD                    | Basic authentication password                               |
| CF_INSTANCE_CERT                 | SSL Certificate (optional to support ssl)                   |
| CF_INSTANCE_KEY                  | SSL Certificate Key (optional to support ssl)               |
| FROM                             | Email address to send emails from                           |
| HOST                             | Host for the http server                                    |
| PORT                             | Port for the http server                                    |
| SMTP_CERT                        | Certificate chain to trust for SMTP server                  |
| SMTP_HOST                        | Hostname of SMTP server                                     |
| SMTP_PASSWORD                    | Password for authentication with SMTP server                |
| SMTP_PORT                        | Port for SMTP server                                        |
| SMTP_USER                        | Username for authentication with SMTP server                |
| TRANSPORT                        | The mailer transport: 'smtp' (leave empty for json)         |
|                                  |                                                             |

## cloud.gov Configuration

Configuration on cloud.gov is provided 2 ways:
### For non-secret or feature-related values
Via environment values listed under the `env` key in the [manifest](manifest.yml).

### For secret values or external services
Via cloud.gov `services` which are also listed under the `services` key in the [manifest](manifest.yml).

Values provided via cloud.gov `services` are mapped to ordinary environment variables before the application starts, see [.profile](.profile) for details.

## Pipeline Configuration

This application leverages [Concourse](https://concourse-ci.org) for its deployment
automation, but it's not dependent on it. You can find example and live
concourse configuration files in [the `ci/` directory](/ci).

## Development

### Requirements
- `node 16.8`
- `npm 7.x`

### Get Started
- `git clone git@github.com:cloud-gov/pages-mailer.git`
- `cd pages-mailer`
- `npm install`
- `cp sample.env .env`
- `npm run dev`

### Testing
`npm test`

### Linting
`npm run lint`
