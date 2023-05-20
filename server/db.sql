--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: yazmintorres
--

CREATE TABLE public.users (
    id text NOT NULL,
    email character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO yazmintorres;

--
-- Name: videos; Type: TABLE; Schema: public; Owner: yazmintorres
--

CREATE TABLE public.videos (
    id text NOT NULL,
    etag text,
    title text,
    channel_title text,
    thumbnail_url text
);


ALTER TABLE public.videos OWNER TO yazmintorres;

--
-- Name: workouts; Type: TABLE; Schema: public; Owner: yazmintorres
--

CREATE TABLE public.workouts (
    id integer NOT NULL,
    user_id text NOT NULL,
    video_id text NOT NULL,
    target_area text NOT NULL,
    exercises json[] NOT NULL
);


ALTER TABLE public.workouts OWNER TO yazmintorres;

--
-- Name: workouts_id_seq; Type: SEQUENCE; Schema: public; Owner: yazmintorres
--

CREATE SEQUENCE public.workouts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workouts_id_seq OWNER TO yazmintorres;

--
-- Name: workouts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yazmintorres
--

ALTER SEQUENCE public.workouts_id_seq OWNED BY public.workouts.id;


--
-- Name: workouts id; Type: DEFAULT; Schema: public; Owner: yazmintorres
--

ALTER TABLE ONLY public.workouts ALTER COLUMN id SET DEFAULT nextval('public.workouts_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: yazmintorres
--



--
-- Data for Name: videos; Type: TABLE DATA; Schema: public; Owner: yazmintorres
--



--
-- Data for Name: workouts; Type: TABLE DATA; Schema: public; Owner: yazmintorres
--



--
-- Name: workouts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yazmintorres
--

SELECT pg_catalog.setval('public.workouts_id_seq', 74, true);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: yazmintorres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: yazmintorres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: videos videos_pkey; Type: CONSTRAINT; Schema: public; Owner: yazmintorres
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (id);


--
-- Name: workouts workouts_pkey; Type: CONSTRAINT; Schema: public; Owner: yazmintorres
--

ALTER TABLE ONLY public.workouts
    ADD CONSTRAINT workouts_pkey PRIMARY KEY (id);


--
-- Name: workouts workouts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yazmintorres
--

ALTER TABLE ONLY public.workouts
    ADD CONSTRAINT workouts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: workouts workouts_video_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yazmintorres
--

ALTER TABLE ONLY public.workouts
    ADD CONSTRAINT workouts_video_id_fkey FOREIGN KEY (video_id) REFERENCES public.videos(id);


--
-- PostgreSQL database dump complete
--

