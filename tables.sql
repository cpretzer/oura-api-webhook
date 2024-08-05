 create table oura_payloads (
    id text PRIMARY KEY DEFAULT gen_random_uuid(),
    data_type varchar(256) NOT NULL,
    event_time TIMESTAMP NOT NULL,
    event_type varchar(256) NOT NULL,
    object_id varchar(256) NOT NULL,
    processed_time TIMESTAMP default null,
    user_id varchar(256) NOT NULL
 );

for et in create update delete; \
do for dt in "tag" "enhanced_tag" "workout" "session" "sleep" "daily_sleep" "daily_readiness" "daily_activity" "daily_spo2" "sleep_time" "rest_mode_period" "ring_configuration" "daily_stress" "daily_cycle_phases"; \
do curl --location -X POST "https://api.ouraring.com/v2/webhook/subscription" -H "-H "Content-Type: application/json" --data-raw "{ \
"callback_url": "https://oura-api-webhook.vercel.app/api/oura-webhook", \
"verification_token": "123", \
"event_type": $et, \
"data_type": $dt \
}"; \
done; \
done

