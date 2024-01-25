CREATE TABLE IF NOT EXISTS public.todos
(
    id bigint NOT NULL DEFAULT nextval('todos_id_seq'::regclass),
    "userID" character varying(12) COLLATE pg_catalog."default",
    content character varying(255) COLLATE pg_catalog."default",
    completed boolean,
    CONSTRAINT todos_pkey PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    username character varying(32) COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_username_key UNIQUE (username)
)

CREATE TABLE IF NOT EXISTS public.sessions
(
    sid character varying COLLATE pg_catalog."default" NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL,
    CONSTRAINT session_pkey PRIMARY KEY (sid)
)