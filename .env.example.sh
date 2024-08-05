export NODE_PORT=3002
export POSTGRES_URL="postgres://user:secret-pass@dbhost:5432/mydb?sslmode=require"
export POSTGRES_PRISMA_URL="postgres://user:secret-pass@dbhost:5432/mydb?sslmode=require?sslmode=require&pgbouncer=true&connect_timeout=15"
export POSTGRES_URL_NO_SSL="postgres://user:secret-pass@dbhost:5432/mydb?sslmode=require"
export POSTGRES_URL_NON_POOLING="postgres://user:secret-pass@dbhost:5432/mydb?sslmode=require"
export PGUSER="user"
export PGHOST="dbhost"
export PGPASSWORD="secret-pass"
export PGDATABASE="mydb"
export OAW_VERIFICATION_TOKEN=<randomly generated value> # https://cloud.ouraring.com/v2/docs#section/Setup (try uuidgen)
export OURA_CLIENT_ID=<issued by oura> # https://cloud.ouraring.com/v2/docs#section/Data-Access
export OURA_CLIENT_PASSWORD=<issued by oura> # https://cloud.ouraring.com/v2/docs#section/Data-Access
export OURA_WEBHOOK_URL="https://my-secure-webhook-host.com"