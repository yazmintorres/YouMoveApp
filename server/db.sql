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
-- Name: students; Type: TABLE; Schema: public; Owner: yazmintorres
--

CREATE TABLE public.students (
    id integer NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    is_current boolean
);


ALTER TABLE public.students OWNER TO yazmintorres;

--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: yazmintorres
--

CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.students_id_seq OWNER TO yazmintorres;

--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: yazmintorres
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


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
-- Name: students id; Type: DEFAULT; Schema: public; Owner: yazmintorres
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- Name: workouts id; Type: DEFAULT; Schema: public; Owner: yazmintorres
--

ALTER TABLE ONLY public.workouts ALTER COLUMN id SET DEFAULT nextval('public.workouts_id_seq'::regclass);


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: yazmintorres
--

INSERT INTO public.students (id, firstname, lastname, is_current) VALUES (1, 'Yazmin ', 'Torres', true);
INSERT INTO public.students (id, firstname, lastname, is_current) VALUES (3, 'Jesus', 'Hernandez', NULL);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: yazmintorres
--

INSERT INTO public.users (id, email) VALUES ('google-oauth2|105689678130160470190', 'yazspam98@gmail.com');
INSERT INTO public.users (id, email) VALUES ('google-oauth2|101810540722720199599', 'yazminmoniquetorres@gmail.com');


--
-- Data for Name: videos; Type: TABLE DATA; Schema: public; Owner: yazmintorres
--

INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('w8cSjkXkYRc', 'i5A-YMnelXDcJuInHO9njb1AYAA', '20 Minute Shoulder Workout with Dumbbells | Caroline Girvan', 'Caroline Girvan', 'https://i.ytimg.com/vi/w8cSjkXkYRc/maxresdefault.jpg');
INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('ME0cj3FTbms', 'rCehHx1atEa4Wg0c-vlBFwNXz7I', '20 MIN SOLID ARMS & SHOULDER WORKOUT with Dumbbells', 'Caroline Girvan', 'https://i.ytimg.com/vi/ME0cj3FTbms/maxresdefault.jpg');
INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('P7k7ABUKmxo', '1zQZWzAj6CIXYjz1HSPSjNNBBxU', '20 MIN TONED ARMS + SHOULDER Workout With Weights - No Repeat, Upper Body Dumbbell Workout', 'growingannanas', 'https://i.ytimg.com/vi/P7k7ABUKmxo/maxresdefault.jpg');
INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('Bl28i6fWljU', '8ml3DCN7A8AdbOs98xqeFGRv-QQ', '20 Minute Arms and Shoulders Workout with Dumbbells | Caroline Girvan', 'Caroline Girvan', 'https://i.ytimg.com/vi/Bl28i6fWljU/maxresdefault.jpg');
INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('wH-YPotqDlg', 'vUiyAi6QLYpgZya5j7KLe_1wJ_c', '20 Min INTENSE DUMBBELL SHOULDER WORKOUT at Home | Supersets', 'Caroline Girvan', 'https://i.ytimg.com/vi/wH-YPotqDlg/maxresdefault.jpg');
INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('I9nG-G4B5Bs', 'XIY9XBUS2XaVBURSwuAZ7SN_Rdw', 'Lower Body Workout | Toned Legs & Butt | 2 Weeks Challenge', 'Chloe Ting', 'https://i.ytimg.com/vi/I9nG-G4B5Bs/maxresdefault.jpg');
INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('SCxNnWW2zB8', 'VBntsNKO0Se0b3nQq-Sxy0sDn3M', 'IRON Series 30 Min Leg Workout - Dumbbell Leg Day | 1', 'Caroline Girvan', 'https://i.ytimg.com/vi/SCxNnWW2zB8/maxresdefault.jpg');
INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('Yx56BTARqho', 'JYE3W38-46sWJ09V_Bj8LDRhuLY', '7-Minute Butt Workout Women', 'GymRa', 'https://i.ytimg.com/vi/Yx56BTARqho/maxresdefault.jpg');
INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('jBhZWX91bec', 'FEg-NXnOiBwkpUEfNJMDpsDaEQw', '10 Minute Dumbbell Chest Workout at Home', 'Caroline Girvan', 'https://i.ytimg.com/vi/jBhZWX91bec/maxresdefault.jpg');
INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('KzZILhT_YvY', 'S-9KKTuJZXPwrx-G0xUbvfW35QY', 'BICEP BLOW UP - Biceps Workout at Home with Dumbbells | No Repeat', 'Caroline Girvan', 'https://i.ytimg.com/vi/KzZILhT_YvY/maxresdefault.jpg');
INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('RVTfIfox9EY', '8bAIZZkAm7i16gZQaZf49Mqg84Q', 'TONE YOUR ARMS Workout - QUICK & INTENSE (No Equipment)', 'MadFit', 'https://i.ytimg.com/vi/RVTfIfox9EY/maxresdefault.jpg');
INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('FJA3R7n_594', '2U-JEitI5ltcDUuJN9ktoz6K1V8', '10 MIN LEG/BOOTY/THIGH WORKOUT (No Equipment Killer Legs)', 'MadFit', 'https://i.ytimg.com/vi/FJA3R7n_594/maxresdefault.jpg');
INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('WD3FvnZpVig', 'MmOIBiWlIhB1GKUXfzYdyVh6W3I', '20 Min BICEP WORKOUT with DUMBBELLS at Home | Caroline Girvan', 'Caroline Girvan', 'https://i.ytimg.com/vi/WD3FvnZpVig/maxresdefault.jpg');
INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('Opi9dfVfACc', 'vr6Rhr6Hp2jAm6evyL-zryIA7us', 'Best Leg Exercises [Quick Home Routine]', 'Roberta''s Gym', 'https://i.ytimg.com/vi/Opi9dfVfACc/maxresdefault.jpg');
INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('aJVVELtDM7g', '9fECrweZNWpH7AD_Wwt4ZUZTKYk', '15 Min ARMS AND SHOULDERS Workout with DUMBBELLS', 'Caroline Girvan', 'https://i.ytimg.com/vi/aJVVELtDM7g/maxresdefault.jpg');
INSERT INTO public.videos (id, etag, title, channel_title, thumbnail_url) VALUES ('V9lvyOIDAII', 'CI3i7LH1rFM-erP4gPY0ciHmc3k', 'Lift And Firm Your Breasts In 2 Weeks | 5 min Chest Lift Workout *quick*', 'Sanne Vander', 'https://i.ytimg.com/vi/V9lvyOIDAII/maxresdefault.jpg');


--
-- Data for Name: workouts; Type: TABLE DATA; Schema: public; Owner: yazmintorres
--

INSERT INTO public.workouts (id, user_id, video_id, target_area, exercises) VALUES (23, 'google-oauth2|101810540722720199599', 'w8cSjkXkYRc', 'full-body', '{"{\"name\":\"new\",\"durationMinutes\":\"\",\"durationSeconds\":\"\",\"weight\":\"\",\"reps\":\"\",\"sets\":\"\"}"}');


--
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yazmintorres
--

SELECT pg_catalog.setval('public.students_id_seq', 3, true);


--
-- Name: workouts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yazmintorres
--

SELECT pg_catalog.setval('public.workouts_id_seq', 68, true);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: yazmintorres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


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

