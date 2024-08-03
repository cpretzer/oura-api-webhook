 create table ouraPayloads (
    id text PRIMARY KEY DEFAULT gen_random_uuid(),
    data_type varchar(256) NOT NULL,
    event_time TIMESTAMP NOT NULL,
    event_type varchar(256) NOT NULL,
    object_id varchar(256) NOT NULL,
    processed_time TIMESTAMP,
    user_id varchar(256) NOT NULL
 );