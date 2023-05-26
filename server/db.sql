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
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
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

INSERT INTO public.users (id, email) VALUES ('google-oauth2|105689678130160470190', 'yazspam98@gmail.com');
INSERT INTO public.users (id, email) VALUES ('google-oauth2|101810540722720199599', 'yazminmoniquetorres@gmail.com');
INSERT INTO public.users (id, email) VALUES ('google-oauth2|106328801478292141139', 'ytorres@alumni.scu.edu');


--
-- Data for Name: videos; Type: TABLE DATA; Schema: public; Owner: yazmintorres
--

INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('w8cSjkXkYRc', 'i5A-YMnelXDcJuInHO9njb1AYAA', '20 Minute Shoulder Workout with Dumbbells | Caroline Girvan', 'Caroline Girvan', 'https://i.ytimg.com/vi/w8cSjkXkYRc/maxresdefault.jpg');
INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('ME0cj3FTbms', 'rCehHx1atEa4Wg0c-vlBFwNXz7I', '20 MIN SOLID ARMS & SHOULDER WORKOUT with Dumbbells', 'Caroline Girvan', 'https://i.ytimg.com/vi/ME0cj3FTbms/maxresdefault.jpg');
INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('wH-YPotqDlg', 'vUiyAi6QLYpgZya5j7KLe_1wJ_c', '20 Min INTENSE DUMBBELL SHOULDER WORKOUT at Home | Supersets', 'Caroline Girvan', 'https://i.ytimg.com/vi/wH-YPotqDlg/maxresdefault.jpg');
INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('I9nG-G4B5Bs', 'XIY9XBUS2XaVBURSwuAZ7SN_Rdw', 'Lower Body Workout | Toned Legs & Butt | 2 Weeks Challenge', 'Chloe Ting', 'https://i.ytimg.com/vi/I9nG-G4B5Bs/maxresdefault.jpg');
INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('6fy9vFP03HQ', 'aAQH8eiqMyVKAaisAKTycz16sbM', '10 minute Lower Body Workout // Floor Exercises for Legs & Glutes', 'SeniorShape Fitness', 'https://i.ytimg.com/vi/6fy9vFP03HQ/maxresdefault.jpg');
INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('1dJ-d7tVwEk', 'cmJapqBy2IuoCDZiYmn6jcK1Kys', '10 min Intense BACK WORKOUT (At Home & Apartment Friendly)', 'MadFit', 'https://i.ytimg.com/vi/1dJ-d7tVwEk/maxresdefault.jpg');


--
-- Data for Name: workouts; Type: TABLE DATA; Schema: public; Owner: yazmintorres
--

INSERT INTO public.workouts (id, created_at, updated_at, user_id, video_id, target_area, exercises) VALUES (77, '2023-05-25 19:52:15.84452-07', '2023-05-26 01:35:38.349-07', 'google-oauth2|105689678130160470190', 'w8cSjkXkYRc', 'shoulders', '{"{\"name\":\"Exercise 1\",\"durationMinutes\":\"\",\"durationSeconds\":\"30\",\"weight\":\"\",\"reps\":\"\",\"sets\":\"5\",\"setsCompleted\":[null,null,\"on\"],\"exerciseCompleted\":true}"}');
INSERT INTO public.workouts (id, created_at, updated_at, user_id, video_id, target_area, exercises) VALUES (78, '2023-05-25 19:52:15.845108-07', '2023-05-26 01:39:43.789-07', 'google-oauth2|105689678130160470190', 'ME0cj3FTbms', 'upper-body', '{"{\"name\":\"ARMS\",\"durationMinutes\":\"\",\"durationSeconds\":\"\",\"weight\":\"\",\"reps\":\"\",\"sets\":\"4\",\"setsCompleted\":[false,null,null,\"on\"],\"exerciseCompleted\":true}","{\"name\":\"new\",\"durationMinutes\":\"\",\"durationSeconds\":\"\",\"weight\":\"\",\"reps\":\"\",\"sets\":\"7\",\"exerciseCompleted\":false,\"setsCompleted\":[null,null,\"on\"]}"}');
INSERT INTO public.workouts (id, created_at, updated_at, user_id, video_id, target_area, exercises) VALUES (79, '2023-05-25 19:52:15.845247-07', '2023-05-26 01:41:15.021-07', 'google-oauth2|105689678130160470190', 'wH-YPotqDlg', 'shoulders', '{"{\"name\":\"Updayr\",\"durationMinutes\":\"\",\"durationSeconds\":\"\",\"weight\":\"\",\"reps\":\"\",\"sets\":\"\"}"}');
INSERT INTO public.workouts (id, created_at, updated_at, user_id, video_id, target_area, exercises) VALUES (80, '2023-05-25 20:09:01.414955-07', '2023-05-26 01:41:41.326-07', 'google-oauth2|105689678130160470190', 'I9nG-G4B5Bs', 'lower-body', '{"{\"name\":\"Push-ups\",\"sets\":\"5\",\"setsCompleted\":[null,\"on\",null,null,true],\"exerciseCompleted\":false}"}');
INSERT INTO public.workouts (id, created_at, updated_at, user_id, video_id, target_area, exercises) VALUES (81, '2023-05-26 01:44:43.40854-07', '2023-05-26 01:44:48.76-07', 'google-oauth2|101810540722720199599', '6fy9vFP03HQ', 'lower-body', '{"{\"name\":\"Squats\",\"durationMinutes\":\"\",\"durationSeconds\":\"\",\"weight\":\"20\",\"reps\":\"10\",\"sets\":\"4\",\"exerciseCompleted\":true}"}');
INSERT INTO public.workouts (id, created_at, updated_at, user_id, video_id, target_area, exercises) VALUES (82, '2023-05-26 01:46:08.486145-07', '2023-05-26 01:49:11.871-07', 'google-oauth2|101810540722720199599', '1dJ-d7tVwEk', 'back', '{"{\"name\":\"Pull back\",\"durationMinutes\":\"\",\"durationSeconds\":\"\",\"weight\":\"\",\"reps\":\"\",\"sets\":\"\"}","{\"name\":\"Change\",\"durationMinutes\":\"\",\"durationSeconds\":\"\",\"weight\":\"\",\"reps\":\"\",\"sets\":\"\"}","{\"name\":\"Pull back\",\"durationMinutes\":\"\",\"durationSeconds\":\"\",\"weight\":\"\",\"reps\":\"\",\"sets\":\"\"}","{\"name\":\"Change\",\"durationMinutes\":\"\",\"durationSeconds\":\"\",\"weight\":\"\",\"reps\":\"\",\"sets\":\"\"}"}');


--
-- Name: workouts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yazmintorres
--

SELECT pg_catalog.setval('public.workouts_id_seq', 82, true);


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

