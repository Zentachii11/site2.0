--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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
-- Name: computers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.computers (
    id integer NOT NULL,
    title character varying(255),
    description text,
    gpu character varying(100),
    cpu character varying(100),
    cooling character varying(100),
    ram character varying(100),
    price numeric(100,0),
    price_per_month numeric(10,2),
    image character varying(255)
);


ALTER TABLE public.computers OWNER TO postgres;

--
-- Name: computers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.computers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.computers_id_seq OWNER TO postgres;

--
-- Name: computers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.computers_id_seq OWNED BY public.computers.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    user_id integer NOT NULL,
    computer_id integer NOT NULL,
    customer_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone_number character varying(20) NOT NULL,
    delivery_address text NOT NULL,
    payment_method character varying(50) NOT NULL,
    order_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_order_id_seq OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: computers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.computers ALTER COLUMN id SET DEFAULT nextval('public.computers_id_seq'::regclass);


--
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: computers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.computers (id, title, description, gpu, cpu, cooling, ram, price, price_per_month, image) FROM stdin;
33	выф	выф	вфы	ыф	аыв	пва	12	12.00	\N
34	мси	исм	исм	исм	исм	исм	12	12.00	\N
36	бюоб	иоь	ьить	ьит	ьить	ит	454	54.00	\N
37	нкеншг	иоь	ьить	ьит	ьить	ит	756	54.00	\N
38	рапр	рапр	рапр	апр	апра	апр	54	576.00	\N
39	рпа	рапр	ап	рап	рап		12	12.00	\N
42	авпмвап	вап	пвап				121	12.00	{}
43	dfgdf	gdf	gdf	gdf	gdf	dfg	12	12.00	\N
44	ubivator	super	rtx 5090	i10	cool	128gb	999999999	99999999.00	\N
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (order_id, user_id, computer_id, customer_name, email, phone_number, delivery_address, payment_method, order_date) FROM stdin;
36	43	36	hfgh	hfgh	fgh	hfgh	По счету (для физлица)	2023-12-13 20:51:27.005013
37	44	33	hfgzb	ghfagb	hfgjjmv	hfg	По счету (для физлица)	2023-12-13 20:52:07.411738
38	44	34	hfgh	fhg	hfg	hfg	По счету (для физлица)	2023-12-13 21:10:14.285735
39	44	37	пар	апр	рап	рапр	Банковская карта	2023-12-13 21:16:48.377971
40	48	38	риапри	авпп	пва	пва	По счету (для физлица)	2023-12-14 09:07:33.369107
41	49	36	вап	ваппва	пва	пва	По счету (для физлица)	2023-12-14 09:07:58.260543
42	46	38	bvbv	bcvb	bcv	bcv	По счету (для физлица)	2023-12-14 11:16:24.849
43	51	44	fghfg	fhggfgh@gmail.com	9789587645	bfgbfdgbfghfg	Банковская карта	2023-12-14 20:30:40.639747
44	52	38	gfh	hfgh	hfgh	hfg	По счету (для физлица)	2023-12-21 04:09:54.866412
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password) FROM stdin;
43	admin	admin@gmail.com	admin
44	123	dfgdf	123
45	444	444@gmail.com	$2b$10$MHVmHI1pbXKBhMqnTWSMteO9omReEftlqFLp.hSo3emfAGnCD/UCa
46	111	111	$2b$10$ZwdrslZ3a4v41Ds8mBrbOuAYLTzFGeRG1PzcGrRyTSo3CNcLx3LM.
47	122	122	122
48	ппп	ппп	$2b$10$KODge2ZS/Im0H6/RgET7Be8dMagNMA0wjHK5Jhv3LlrMkdBnHLOPm
49	ооо	ооо	$2b$10$tlgz/FNWKn8G4X4ZJWSZ0OdFwbPuIZBe11SEUWE.IN/XqeQlb8BT6
50	qqqqq	qqqqq@gmail.com	$2b$10$qpV089Djx49KTYgsPQWduuNzVbCSh0cEZse2KQow5POmrWkZxpG56
51	333	333@gmail.com	$2b$10$GmI5jTIJgcpEJfaOkOaklO/X1ezVWezsUXDSAkJa2Xf98my25g3z2
52	gh	hfgh	$2b$10$1ymBuUAFzSwSZ6.qR3XaXupMPpG1KBFMe4Un63WsiQUNOpSuimH5q
\.


--
-- Name: computers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.computers_id_seq', 44, true);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 44, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 52, true);


--
-- Name: computers computers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.computers
    ADD CONSTRAINT computers_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: orders orders_computer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_computer_id_fkey FOREIGN KEY (computer_id) REFERENCES public.computers(id);


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

