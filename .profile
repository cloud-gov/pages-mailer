export AUTH_USERNAME="$(echo $VCAP_SERVICES | jq -r '."user-provided"[] | select(.name == "auth") | .credentials | .username')"
export AUTH_PASSWORD="$(echo $VCAP_SERVICES | jq -r '."user-provided"[] | select(.name == "auth") | .credentials | .password')"
export SMTP_CERT="$(echo $VCAP_SERVICES | jq -r '."user-provided"[] | select(.name == "smtp") | .credentials | .cert')"
export SMTP_HOST="$(echo $VCAP_SERVICES | jq -r '."user-provided"[] | select(.name == "smtp") | .credentials | .host')"
export SMTP_PASSWORD="$(echo $VCAP_SERVICES | jq -r '."user-provided"[] | select(.name == "smtp") | .credentials | .password')"
export SMTP_PORT="$(echo $VCAP_SERVICES | jq -r '."user-provided"[] | select(.name == "smtp") | .credentials | .port')"
export SMTP_USER="$(echo $VCAP_SERVICES | jq -r '."user-provided"[] | select(.name == "smtp") | .credentials | .user')"