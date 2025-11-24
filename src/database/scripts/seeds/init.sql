-- ** Database generated with pgModeler (PostgreSQL Database Modeler).
-- ** pgModeler version: 1.2.1
-- ** PostgreSQL version: 17.0
-- ** Project Site: pgmodeler.io
-- ** Model Author: ---

-- ** Database creation must be performed outside a multi lined SQL file. 
-- ** These commands were put in this file only as a convenience.

-- object: "atp-sgp" | type: DATABASE --
-- DROP DATABASE IF EXISTS "atp-sgp";
CREATE DATABASE "atp-sgp"
	ENCODING = 'UTF8'
	TABLESPACE = pg_default
	OWNER = postgres;
-- ddl-end --


SET check_function_bodies = false;
-- ddl-end --

SET search_path TO pg_catalog,public;
-- ddl-end --

-- object: public.users_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.users_id_seq CASCADE;
CREATE SEQUENCE public.users_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.users_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.users | type: TABLE --
-- DROP TABLE IF EXISTS public.users CASCADE;
CREATE TABLE public.users (
	id integer NOT NULL DEFAULT nextval('public.users_id_seq'::regclass),
	email character varying(255) NOT NULL,
	username character varying(255) NOT NULL,
	password character varying(72) NOT NULL,
	refresh_token character varying NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT users_pk PRIMARY KEY (id),
	CONSTRAINT users_email_unq UNIQUE (email),
	CONSTRAINT users_username_unq UNIQUE (username)
);
-- ddl-end --
ALTER TABLE public.users OWNER TO postgres;
-- ddl-end --

-- object: public.roles_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.roles_id_seq CASCADE;
CREATE SEQUENCE public.roles_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.roles | type: TABLE --
-- DROP TABLE IF EXISTS public.roles CASCADE;
CREATE TABLE public.roles (
	id integer NOT NULL DEFAULT nextval('public.roles_id_seq'::regclass),
	name character varying(50) NOT NULL,
	description character varying(255),
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT roles_pk PRIMARY KEY (id),
	CONSTRAINT roles_name_unq UNIQUE (name)
);
-- ddl-end --
ALTER TABLE public.roles OWNER TO postgres;
-- ddl-end --

-- object: public.permissions_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.permissions_id_seq CASCADE;
CREATE SEQUENCE public.permissions_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.permissions_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.permissions | type: TABLE --
-- DROP TABLE IF EXISTS public.permissions CASCADE;
CREATE TABLE public.permissions (
	id integer NOT NULL DEFAULT nextval('public.permissions_id_seq'::regclass),
	name character varying(50) NOT NULL,
	description character varying(255),
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT permissions_pk PRIMARY KEY (id),
	CONSTRAINT permissions_name_unq UNIQUE (name)
);
-- ddl-end --
ALTER TABLE public.permissions OWNER TO postgres;
-- ddl-end --

-- object: public.users_roles | type: TABLE --
-- DROP TABLE IF EXISTS public.users_roles CASCADE;
CREATE TABLE public.users_roles (
	id_roles integer NOT NULL,
	id_users integer NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT users_roles_pk PRIMARY KEY (id_users,id_roles)
);
-- ddl-end --
ALTER TABLE public.users_roles OWNER TO postgres;
-- ddl-end --

-- object: public.roles_permissions | type: TABLE --
-- DROP TABLE IF EXISTS public.roles_permissions CASCADE;
CREATE TABLE public.roles_permissions (
	id_permissions integer NOT NULL,
	id_roles integer NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT roles_permissions_pk PRIMARY KEY (id_roles,id_permissions)
);
-- ddl-end --
ALTER TABLE public.roles_permissions OWNER TO postgres;
-- ddl-end --

-- object: public.update_updated_at_column | type: FUNCTION --
-- DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;
CREATE OR REPLACE FUNCTION public.update_updated_at_column ()
	RETURNS trigger
	LANGUAGE plpgsql
	VOLATILE 
	CALLED ON NULL INPUT
	SECURITY INVOKER
	PARALLEL UNSAFE
	COST 100
	AS 
$function$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$function$;
-- ddl-end --
ALTER FUNCTION public.update_updated_at_column() OWNER TO postgres;
-- ddl-end --

-- object: update_users_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_users_updated_at ON public.users CASCADE;
CREATE OR REPLACE TRIGGER update_users_updated_at
	BEFORE UPDATE
	ON public.users
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_roles_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_roles_updated_at ON public.roles CASCADE;
CREATE OR REPLACE TRIGGER update_roles_updated_at
	BEFORE UPDATE
	ON public.roles
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_permissions_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_permissions_updated_at ON public.permissions CASCADE;
CREATE OR REPLACE TRIGGER update_permissions_updated_at
	BEFORE UPDATE
	ON public.permissions
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_user_roles_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_user_roles_updated_at ON public.users_roles CASCADE;
CREATE OR REPLACE TRIGGER update_user_roles_updated_at
	BEFORE UPDATE
	ON public.users_roles
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_role_permissions_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_role_permissions_updated_at ON public.roles_permissions CASCADE;
CREATE OR REPLACE TRIGGER update_role_permissions_updated_at
	BEFORE UPDATE
	ON public.roles_permissions
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: idx_users_email | type: INDEX --
-- DROP INDEX IF EXISTS public.idx_users_email CASCADE;
CREATE INDEX idx_users_email ON public.users
USING btree
(
	email
)
WITH (FILLFACTOR = 90);
-- ddl-end --

-- object: idx_roles_name | type: INDEX --
-- DROP INDEX IF EXISTS public.idx_roles_name CASCADE;
CREATE INDEX idx_roles_name ON public.roles
USING btree
(
	name
)
WITH (FILLFACTOR = 90);
-- ddl-end --

-- object: idx_permissions_name | type: INDEX --
-- DROP INDEX IF EXISTS public.idx_permissions_name CASCADE;
CREATE INDEX idx_permissions_name ON public.permissions
USING btree
(
	name
)
WITH (FILLFACTOR = 90);
-- ddl-end --

-- object: idx_users_updated_at | type: INDEX --
-- DROP INDEX IF EXISTS public.idx_users_updated_at CASCADE;
CREATE INDEX idx_users_updated_at ON public.users
USING btree
(
	updated_at
)
WITH (FILLFACTOR = 90);
-- ddl-end --

-- object: idx_roles_updated_at | type: INDEX --
-- DROP INDEX IF EXISTS public.idx_roles_updated_at CASCADE;
CREATE INDEX idx_roles_updated_at ON public.roles
USING btree
(
	updated_at
)
WITH (FILLFACTOR = 90);
-- ddl-end --

-- object: idx_permissions_updated_at | type: INDEX --
-- DROP INDEX IF EXISTS public.idx_permissions_updated_at CASCADE;
CREATE INDEX idx_permissions_updated_at ON public.permissions
USING btree
(
	updated_at
)
WITH (FILLFACTOR = 90);
-- ddl-end --

-- object: public.employees_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.employees_id_seq CASCADE;
CREATE SEQUENCE public.employees_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.employees_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.employees | type: TABLE --
-- DROP TABLE IF EXISTS public.employees CASCADE;
CREATE TABLE public.employees (
	id integer NOT NULL DEFAULT nextval('public.employees_id_seq'::regclass),
	id_identity_document_types integer NOT NULL,
	id_gender integer NOT NULL,
	id_position integer NOT NULL,
	id_users integer,
	id_department integer NOT NULL,
	first_name character varying(50) NOT NULL,
	f_lastname character varying(50) NOT NULL,
	m_lastname character varying(50) NOT NULL,
	birthdate date NOT NULL,
	document_number character varying(20) NOT NULL,
	phone_number character varying(15),
	affiliation_date date NOT NULL,
	termination_date date NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT employees_pk PRIMARY KEY (id),
	CONSTRAINT employees_document_number_unq UNIQUE (document_number)
);
-- ddl-end --
ALTER TABLE public.employees OWNER TO postgres;
-- ddl-end --

-- object: public.buying_stations_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.buying_stations_id_seq CASCADE;
CREATE SEQUENCE public.buying_stations_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.buying_stations_id_seq OWNER TO postgres;
-- ddl-end --

-- object: users_fk | type: CONSTRAINT --
-- ALTER TABLE public.employees DROP CONSTRAINT IF EXISTS users_fk CASCADE;
ALTER TABLE public.employees ADD CONSTRAINT users_fk FOREIGN KEY (id_users)
REFERENCES public.users (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: employees_uq | type: CONSTRAINT --
-- ALTER TABLE public.employees DROP CONSTRAINT IF EXISTS employees_uq CASCADE;
ALTER TABLE public.employees ADD CONSTRAINT employees_uq UNIQUE (id_users);
-- ddl-end --

-- object: public.buying_stations | type: TABLE --
-- DROP TABLE IF EXISTS public.buying_stations CASCADE;
CREATE TABLE public.buying_stations (
	id integer NOT NULL DEFAULT nextval('public.buying_stations_id_seq'::regclass),
	id_ubigeos integer NOT NULL,
	name character varying(50) NOT NULL,
	address text NOT NULL,
	is_principal boolean NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT buying_station_pk PRIMARY KEY (id),
	CONSTRAINT buying_stations_name_unq UNIQUE (name)
);
-- ddl-end --
ALTER TABLE public.buying_stations OWNER TO postgres;
-- ddl-end --

-- object: public.employees_buying_stations | type: TABLE --
-- DROP TABLE IF EXISTS public.employees_buying_stations CASCADE;
CREATE TABLE public.employees_buying_stations (
	id_employees integer NOT NULL,
	id_buying_stations integer NOT NULL,
	effective_date date NOT NULL,
	termination_date date,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT employees_buying_stations_pk PRIMARY KEY (id_employees,id_buying_stations)
);
-- ddl-end --
ALTER TABLE public.employees_buying_stations OWNER TO postgres;
-- ddl-end --

-- object: employees_fk | type: CONSTRAINT --
-- ALTER TABLE public.employees_buying_stations DROP CONSTRAINT IF EXISTS employees_fk CASCADE;
ALTER TABLE public.employees_buying_stations ADD CONSTRAINT employees_fk FOREIGN KEY (id_employees)
REFERENCES public.employees (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: buying_stations_fk | type: CONSTRAINT --
-- ALTER TABLE public.employees_buying_stations DROP CONSTRAINT IF EXISTS buying_stations_fk CASCADE;
ALTER TABLE public.employees_buying_stations ADD CONSTRAINT buying_stations_fk FOREIGN KEY (id_buying_stations)
REFERENCES public.buying_stations (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: public.ubigeos_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.ubigeos_id_seq CASCADE;
CREATE SEQUENCE public.ubigeos_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.ubigeos_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.ubigeos | type: TABLE --
-- DROP TABLE IF EXISTS public.ubigeos CASCADE;
CREATE TABLE public.ubigeos (
	id integer NOT NULL DEFAULT nextval('public.ubigeos_id_seq'::regclass),
	code character(6) NOT NULL,
	region_code character(2) NOT NULL,
	region character varying(20) NOT NULL,
	province_code character(2) NOT NULL,
	province character varying(30) NOT NULL,
	district_code character(2) NOT NULL,
	district character varying(50) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT ubigeos_pk PRIMARY KEY (id),
	CONSTRAINT ubigeo_code_unq UNIQUE (code)
);
-- ddl-end --
ALTER TABLE public.ubigeos OWNER TO postgres;
-- ddl-end --

-- object: public.scale_tickets_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.scale_tickets_id_seq CASCADE;
CREATE SEQUENCE public.scale_tickets_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.scale_tickets_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.scale_ticket_details_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.scale_ticket_details_id_seq CASCADE;
CREATE SEQUENCE public.scale_ticket_details_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.scale_ticket_details_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.packaging_types_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.packaging_types_id_seq CASCADE;
CREATE SEQUENCE public.packaging_types_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.packaging_types_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.scale_tickets_details_packaging_types_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.scale_tickets_details_packaging_types_id_seq CASCADE;
CREATE SEQUENCE public.scale_tickets_details_packaging_types_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.scale_tickets_details_packaging_types_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.document_types_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.document_types_id_seq CASCADE;
CREATE SEQUENCE public.document_types_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.document_types_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.scale_tickets_document_types_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.scale_tickets_document_types_id_seq CASCADE;
CREATE SEQUENCE public.scale_tickets_document_types_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.scale_tickets_document_types_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.packaging_types | type: TABLE --
-- DROP TABLE IF EXISTS public.packaging_types CASCADE;
CREATE TABLE public.packaging_types (
	id integer NOT NULL DEFAULT nextval('public.packaging_types_id_seq'::regclass),
	code character(3) NOT NULL,
	name character varying(100) NOT NULL,
	description character varying(255) NOT NULL,
	unit_tare_weight decimal(10,2) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT packaging_types_pk PRIMARY KEY (id),
	CONSTRAINT packaging_types_name_unq UNIQUE (name),
	CONSTRAINT packaging_types_code_unq UNIQUE (code)
);
-- ddl-end --
ALTER TABLE public.packaging_types OWNER TO postgres;
-- ddl-end --

-- object: public.document_types | type: TABLE --
-- DROP TABLE IF EXISTS public.document_types CASCADE;
CREATE TABLE public.document_types (
	id integer NOT NULL DEFAULT nextval('public.document_types_id_seq'::regclass),
	code character(2) NOT NULL,
	name character varying(50) NOT NULL,
	description character varying(250) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT document_types_pk PRIMARY KEY (id),
	CONSTRAINT document_types_name_unq UNIQUE (name),
	CONSTRAINT document_types_code_unq UNIQUE (code)
);
-- ddl-end --
ALTER TABLE public.document_types OWNER TO postgres;
-- ddl-end --

-- object: public.scale_tickets_document_types | type: TABLE --
-- DROP TABLE IF EXISTS public.scale_tickets_document_types CASCADE;
CREATE TABLE public.scale_tickets_document_types (
	id integer NOT NULL DEFAULT nextval('public.scale_tickets_document_types_id_seq'::regclass),
	id_document_types integer NOT NULL,
	id_scale_tickets integer NOT NULL,
	id_business_partners integer NOT NULL,
	document_serial character(4) NOT NULL,
	document_number character(8) NOT NULL,
	document_date date NOT NULL,
	document_gross_weight decimal(10,2) NOT NULL,
	document_net_weight decimal(10,2) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT scale_tickets_document_types_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.scale_tickets_document_types OWNER TO postgres;
-- ddl-end --

-- object: public.products_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.products_id_seq CASCADE;
CREATE SEQUENCE public.products_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.products_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.business_partners_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.business_partners_id_seq CASCADE;
CREATE SEQUENCE public.business_partners_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.business_partners_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.business_partners | type: TABLE --
-- DROP TABLE IF EXISTS public.business_partners CASCADE;
CREATE TABLE public.business_partners (
	id integer NOT NULL DEFAULT nextval('public.business_partners_id_seq'::regclass),
	id_identity_document_types integer NOT NULL,
	id_ubigeos integer NOT NULL,
	document_number character varying(20) NOT NULL,
	name character varying(50) NOT NULL,
	f_lastname character varying(50) NOT NULL,
	m_lastname character varying(50) NOT NULL,
	company_name character varying(200) NOT NULL,
	email character varying(255),
	phone_number character varying(15),
	address text NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT business_partners_pk PRIMARY KEY (id),
	CONSTRAINT business_partners_document_number_unq UNIQUE (document_number),
	CONSTRAINT business_partners_company_name_unq UNIQUE (company_name)
);
-- ddl-end --
ALTER TABLE public.business_partners OWNER TO postgres;
-- ddl-end --

-- object: public.trucks_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.trucks_id_seq CASCADE;
CREATE SEQUENCE public.trucks_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.trucks_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.suppliers | type: TABLE --
-- DROP TABLE IF EXISTS public.suppliers CASCADE;
CREATE TABLE public.suppliers (
	id_business_partners integer NOT NULL,
	is_producer boolean NOT NULL DEFAULT FALSE,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT suppliers_pk PRIMARY KEY (id_business_partners)
);
-- ddl-end --
ALTER TABLE public.suppliers OWNER TO postgres;
-- ddl-end --

-- object: public.operations_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.operations_id_seq CASCADE;
CREATE SEQUENCE public.operations_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.operations_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.scales_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.scales_id_seq CASCADE;
CREATE SEQUENCE public.scales_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.scales_id_seq OWNER TO postgres;
-- ddl-end --

-- object: ubigeos_fk | type: CONSTRAINT --
-- ALTER TABLE public.buying_stations DROP CONSTRAINT IF EXISTS ubigeos_fk CASCADE;
ALTER TABLE public.buying_stations ADD CONSTRAINT ubigeos_fk FOREIGN KEY (id_ubigeos)
REFERENCES public.ubigeos (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.identity_document_types_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.identity_document_types_id_seq CASCADE;
CREATE SEQUENCE public.identity_document_types_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.identity_document_types_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.identity_document_types | type: TABLE --
-- DROP TABLE IF EXISTS public.identity_document_types CASCADE;
CREATE TABLE public.identity_document_types (
	id integer NOT NULL DEFAULT nextval('public.identity_document_types_id_seq'::regclass),
	name character varying(50) NOT NULL,
	code character varying(10) NOT NULL,
	description character varying(250) NOT NULL,
	length integer NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT identity_document_types_pk PRIMARY KEY (id),
	CONSTRAINT identity_document_types_name_unq UNIQUE (name),
	CONSTRAINT identity_document_types_code_unq UNIQUE (code)
);
-- ddl-end --
ALTER TABLE public.identity_document_types OWNER TO postgres;
-- ddl-end --

-- object: update_identity_document_types_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_identity_document_types_updated_at ON public.identity_document_types CASCADE;
CREATE OR REPLACE TRIGGER update_identity_document_types_updated_at
	BEFORE UPDATE
	ON public.identity_document_types
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: public.department_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.department_id_seq CASCADE;
CREATE SEQUENCE public.department_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.department_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.position_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.position_id_seq CASCADE;
CREATE SEQUENCE public.position_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.position_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.department | type: TABLE --
-- DROP TABLE IF EXISTS public.department CASCADE;
CREATE TABLE public.department (
	id integer NOT NULL DEFAULT nextval('public.department_id_seq'::regclass),
	name character varying(100) NOT NULL,
	description character varying(255) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT department_pk PRIMARY KEY (id),
	CONSTRAINT department_name_unq UNIQUE (name)
);
-- ddl-end --
ALTER TABLE public.department OWNER TO postgres;
-- ddl-end --

-- object: public."position" | type: TABLE --
-- DROP TABLE IF EXISTS public."position" CASCADE;
CREATE TABLE public."position" (
	id integer NOT NULL DEFAULT nextval('public.position_id_seq'::regclass),
	name character varying(100) NOT NULL,
	description character varying(255) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT position_pk PRIMARY KEY (id),
	CONSTRAINT position_name_unq UNIQUE (name)
);
-- ddl-end --
ALTER TABLE public."position" OWNER TO postgres;
-- ddl-end --

-- object: update_department_update_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_department_update_at ON public.department CASCADE;
CREATE OR REPLACE TRIGGER update_department_update_at
	BEFORE UPDATE
	ON public.department
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: public.gender_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.gender_id_seq CASCADE;
CREATE SEQUENCE public.gender_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.gender_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.gender | type: TABLE --
-- DROP TABLE IF EXISTS public.gender CASCADE;
CREATE TABLE public.gender (
	id integer NOT NULL DEFAULT nextval('public.gender_id_seq'::regclass),
	name character varying(50) NOT NULL,
	description character varying(255) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT gender_pk PRIMARY KEY (id),
	CONSTRAINT gender_name_unq UNIQUE (name)
);
-- ddl-end --
ALTER TABLE public.gender OWNER TO postgres;
-- ddl-end --

-- object: update_gender_update_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_gender_update_at ON public.gender CASCADE;
CREATE OR REPLACE TRIGGER update_gender_update_at
	BEFORE UPDATE
	ON public.gender
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: position_fk | type: CONSTRAINT --
-- ALTER TABLE public.employees DROP CONSTRAINT IF EXISTS position_fk CASCADE;
ALTER TABLE public.employees ADD CONSTRAINT position_fk FOREIGN KEY (id_position)
REFERENCES public."position" (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: department_fk | type: CONSTRAINT --
-- ALTER TABLE public.employees DROP CONSTRAINT IF EXISTS department_fk CASCADE;
ALTER TABLE public.employees ADD CONSTRAINT department_fk FOREIGN KEY (id_department)
REFERENCES public.department (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: gender_fk | type: CONSTRAINT --
-- ALTER TABLE public.employees DROP CONSTRAINT IF EXISTS gender_fk CASCADE;
ALTER TABLE public.employees ADD CONSTRAINT gender_fk FOREIGN KEY (id_gender)
REFERENCES public.gender (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: identity_document_types_fk | type: CONSTRAINT --
-- ALTER TABLE public.employees DROP CONSTRAINT IF EXISTS identity_document_types_fk CASCADE;
ALTER TABLE public.employees ADD CONSTRAINT identity_document_types_fk FOREIGN KEY (id_identity_document_types)
REFERENCES public.identity_document_types (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.product_types_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.product_types_id_seq CASCADE;
CREATE SEQUENCE public.product_types_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.product_types_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.product_types | type: TABLE --
-- DROP TABLE IF EXISTS public.product_types CASCADE;
CREATE TABLE public.product_types (
	id integer NOT NULL DEFAULT nextval('public.product_types_id_seq'::regclass),
	name character varying(50) NOT NULL,
	description character varying(255) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT product_types_pk PRIMARY KEY (id),
	CONSTRAINT product_types_name_unq UNIQUE (name)
);
-- ddl-end --
ALTER TABLE public.product_types OWNER TO postgres;
-- ddl-end --

-- object: public.products | type: TABLE --
-- DROP TABLE IF EXISTS public.products CASCADE;
CREATE TABLE public.products (
	id integer NOT NULL DEFAULT nextval('public.products_id_seq'::regclass),
	id_product_types integer NOT NULL,
	code char(9) NOT NULL,
	name character varying(250) NOT NULL,
	description text NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT products_pk PRIMARY KEY (id),
	CONSTRAINT products_code_unq UNIQUE (code),
	CONSTRAINT products_name_unq UNIQUE (name)
);
-- ddl-end --
ALTER TABLE public.products OWNER TO postgres;
-- ddl-end --

-- object: public.operations_product_types | type: TABLE --
-- DROP TABLE IF EXISTS public.operations_product_types CASCADE;
CREATE TABLE public.operations_product_types (
	id_operations integer NOT NULL,
	id_product_types integer NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT operations_product_types_pk PRIMARY KEY (id_product_types,id_operations)
);
-- ddl-end --
ALTER TABLE public.operations_product_types OWNER TO postgres;
-- ddl-end --

-- object: product_types_fk | type: CONSTRAINT --
-- ALTER TABLE public.operations_product_types DROP CONSTRAINT IF EXISTS product_types_fk CASCADE;
ALTER TABLE public.operations_product_types ADD CONSTRAINT product_types_fk FOREIGN KEY (id_product_types)
REFERENCES public.product_types (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: update_employees_buying_stations_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_employees_buying_stations_updated_at ON public.employees_buying_stations CASCADE;
CREATE OR REPLACE TRIGGER update_employees_buying_stations_updated_at
	BEFORE UPDATE
	ON public.employees_buying_stations
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: public.scale_types_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.scale_types_id_seq CASCADE;
CREATE SEQUENCE public.scale_types_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.scale_types_id_seq OWNER TO postgres;
-- ddl-end --

-- object: users_fk | type: CONSTRAINT --
-- ALTER TABLE public.users_roles DROP CONSTRAINT IF EXISTS users_fk CASCADE;
ALTER TABLE public.users_roles ADD CONSTRAINT users_fk FOREIGN KEY (id_users)
REFERENCES public.users (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: roles_fk | type: CONSTRAINT --
-- ALTER TABLE public.users_roles DROP CONSTRAINT IF EXISTS roles_fk CASCADE;
ALTER TABLE public.users_roles ADD CONSTRAINT roles_fk FOREIGN KEY (id_roles)
REFERENCES public.roles (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: roles_fk | type: CONSTRAINT --
-- ALTER TABLE public.roles_permissions DROP CONSTRAINT IF EXISTS roles_fk CASCADE;
ALTER TABLE public.roles_permissions ADD CONSTRAINT roles_fk FOREIGN KEY (id_roles)
REFERENCES public.roles (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: permissions_fk | type: CONSTRAINT --
-- ALTER TABLE public.roles_permissions DROP CONSTRAINT IF EXISTS permissions_fk CASCADE;
ALTER TABLE public.roles_permissions ADD CONSTRAINT permissions_fk FOREIGN KEY (id_permissions)
REFERENCES public.permissions (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: public.scale_status_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.scale_status_id_seq CASCADE;
CREATE SEQUENCE public.scale_status_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.scale_status_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.scales | type: TABLE --
-- DROP TABLE IF EXISTS public.scales CASCADE;
CREATE TABLE public.scales (
	id integer NOT NULL DEFAULT nextval('public.scales_id_seq'::regclass),
	id_buying_stations integer NOT NULL,
	id_scale_types integer NOT NULL,
	id_scale_status integer NOT NULL,
	brand character varying(50) NOT NULL,
	model character varying(50) NOT NULL,
	serial_number character varying(50) NOT NULL,
	max_capacity decimal(8,2) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT scales_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.scales OWNER TO postgres;
-- ddl-end --

-- object: public.scale_types | type: TABLE --
-- DROP TABLE IF EXISTS public.scale_types CASCADE;
CREATE TABLE public.scale_types (
	id integer NOT NULL DEFAULT nextval('public.scale_types_id_seq'::regclass),
	name character varying(20) NOT NULL,
	description character varying(255) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT scale_types_pk PRIMARY KEY (id),
	CONSTRAINT scale_types_name_unq UNIQUE (name)
);
-- ddl-end --
ALTER TABLE public.scale_types OWNER TO postgres;
-- ddl-end --

-- object: update_scales_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_scales_updated_at ON public.scales CASCADE;
CREATE OR REPLACE TRIGGER update_scales_updated_at
	BEFORE UPDATE
	ON public.scales
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_scale_types_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_scale_types_updated_at ON public.scale_types CASCADE;
CREATE OR REPLACE TRIGGER update_scale_types_updated_at
	BEFORE UPDATE
	ON public.scale_types
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: buying_stations_fk | type: CONSTRAINT --
-- ALTER TABLE public.scales DROP CONSTRAINT IF EXISTS buying_stations_fk CASCADE;
ALTER TABLE public.scales ADD CONSTRAINT buying_stations_fk FOREIGN KEY (id_buying_stations)
REFERENCES public.buying_stations (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: scale_types_fk | type: CONSTRAINT --
-- ALTER TABLE public.scales DROP CONSTRAINT IF EXISTS scale_types_fk CASCADE;
ALTER TABLE public.scales ADD CONSTRAINT scale_types_fk FOREIGN KEY (id_scale_types)
REFERENCES public.scale_types (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.scale_status | type: TABLE --
-- DROP TABLE IF EXISTS public.scale_status CASCADE;
CREATE TABLE public.scale_status (
	id integer NOT NULL DEFAULT nextval('public.scale_status_id_seq'::regclass),
	name character varying(20) NOT NULL,
	description character varying(255) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT scale_status_pk PRIMARY KEY (id),
	CONSTRAINT scale_status_name_unq UNIQUE (name)
);
-- ddl-end --
ALTER TABLE public.scale_status OWNER TO postgres;
-- ddl-end --

-- object: scale_status_fk | type: CONSTRAINT --
-- ALTER TABLE public.scales DROP CONSTRAINT IF EXISTS scale_status_fk CASCADE;
ALTER TABLE public.scales ADD CONSTRAINT scale_status_fk FOREIGN KEY (id_scale_status)
REFERENCES public.scale_status (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: update_scale_status_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_scale_status_updated_at ON public.scale_status CASCADE;
CREATE OR REPLACE TRIGGER update_scale_status_updated_at
	BEFORE UPDATE
	ON public.scale_status
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_buying_stations_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_buying_stations_updated_at ON public.buying_stations CASCADE;
CREATE OR REPLACE TRIGGER update_buying_stations_updated_at
	BEFORE UPDATE
	ON public.buying_stations
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_packaging_types_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_packaging_types_updated_at ON public.packaging_types CASCADE;
CREATE OR REPLACE TRIGGER update_packaging_types_updated_at
	BEFORE UPDATE
	ON public.packaging_types
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_product_types_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_product_types_updated_at ON public.product_types CASCADE;
CREATE OR REPLACE TRIGGER update_product_types_updated_at
	BEFORE UPDATE
	ON public.product_types
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: product_types_fk | type: CONSTRAINT --
-- ALTER TABLE public.products DROP CONSTRAINT IF EXISTS product_types_fk CASCADE;
ALTER TABLE public.products ADD CONSTRAINT product_types_fk FOREIGN KEY (id_product_types)
REFERENCES public.product_types (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.scale_ticket_details | type: TABLE --
-- DROP TABLE IF EXISTS public.scale_ticket_details CASCADE;
CREATE TABLE public.scale_ticket_details (
	id integer NOT NULL DEFAULT nextval('public.scale_ticket_details_id_seq'::regclass),
	id_scale_tickets integer NOT NULL,
	id_products integer NOT NULL,
	id_scales integer NOT NULL,
	gross_weight decimal(10,2) NOT NULL,
	tare_weight decimal(10,2) NOT NULL,
	net_weight decimal(10,2) NOT NULL,
	observations text NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT scale_ticket_details_pk PRIMARY KEY (id,id_products,id_scale_tickets)
);
-- ddl-end --
ALTER TABLE public.scale_ticket_details OWNER TO postgres;
-- ddl-end --

-- object: public.bp_roles_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.bp_roles_id_seq CASCADE;
CREATE SEQUENCE public.bp_roles_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.bp_roles_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.operations | type: TABLE --
-- DROP TABLE IF EXISTS public.operations CASCADE;
CREATE TABLE public.operations (
	id integer NOT NULL DEFAULT nextval('public.operations_id_seq'::regclass),
	name character varying(50) NOT NULL,
	code character(3) NOT NULL,
	description character varying(250) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL,
	CONSTRAINT operations_pk PRIMARY KEY (id),
	CONSTRAINT operations_name_unq UNIQUE (name),
	CONSTRAINT operations_code_unq UNIQUE (code)
);
-- ddl-end --
ALTER TABLE public.operations OWNER TO postgres;
-- ddl-end --

-- object: public.bp_roles_operations | type: TABLE --
-- DROP TABLE IF EXISTS public.bp_roles_operations CASCADE;
CREATE TABLE public.bp_roles_operations (
	id_operations integer NOT NULL,
	id_bp_roles integer NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT bp_roles_operations_pk PRIMARY KEY (id_bp_roles,id_operations)
);
-- ddl-end --
ALTER TABLE public.bp_roles_operations OWNER TO postgres;
-- ddl-end --

-- object: public.business_partners_bp_roles | type: TABLE --
-- DROP TABLE IF EXISTS public.business_partners_bp_roles CASCADE;
CREATE TABLE public.business_partners_bp_roles (
	id_business_partners integer NOT NULL,
	id_bp_roles integer NOT NULL,
	effective_date date NOT NULL,
	termination_date date,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT business_partners_bp_roles_pk PRIMARY KEY (id_business_partners,id_bp_roles)
);
-- ddl-end --
ALTER TABLE public.business_partners_bp_roles OWNER TO postgres;
-- ddl-end --

-- object: public.bp_roles | type: TABLE --
-- DROP TABLE IF EXISTS public.bp_roles CASCADE;
CREATE TABLE public.bp_roles (
	id integer NOT NULL DEFAULT nextval('public.bp_roles_id_seq'::regclass),
	name character varying(50) NOT NULL,
	description character varying(250) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT business_partner_roles_pk PRIMARY KEY (id),
	CONSTRAINT bp_roles_name_unq UNIQUE (name)
);
-- ddl-end --
ALTER TABLE public.bp_roles OWNER TO postgres;
-- ddl-end --

-- object: public.carriers | type: TABLE --
-- DROP TABLE IF EXISTS public.carriers CASCADE;
CREATE TABLE public.carriers (
	id_business_partners integer NOT NULL,
	registration_number character varying(20) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT carriers_pk PRIMARY KEY (id_business_partners),
	CONSTRAINT carriers_registration_number_unq UNIQUE (registration_number)
);
-- ddl-end --
ALTER TABLE public.carriers OWNER TO postgres;
-- ddl-end --

-- object: public.drivers_carriers | type: TABLE --
-- DROP TABLE IF EXISTS public.drivers_carriers CASCADE;
CREATE TABLE public.drivers_carriers (
	id_business_partners_drivers integer NOT NULL,
	id_business_partners_carriers integer NOT NULL,
	effective_date date NOT NULL,
	termination_date date,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT drivers_carriers_pk PRIMARY KEY (id_business_partners_drivers,id_business_partners_carriers)
);
-- ddl-end --
ALTER TABLE public.drivers_carriers OWNER TO postgres;
-- ddl-end --

-- object: public.trucks | type: TABLE --
-- DROP TABLE IF EXISTS public.trucks CASCADE;
CREATE TABLE public.trucks (
	id integer NOT NULL DEFAULT nextval('public.trucks_id_seq'::regclass),
	id_business_partners_carriers integer NOT NULL,
	license_plate character(6) NOT NULL,
	payload_capacity decimal(10,2) NOT NULL,
	configuration character(3),
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT trucks_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.trucks OWNER TO postgres;
-- ddl-end --

-- object: public.buying_stations_suppliers | type: TABLE --
-- DROP TABLE IF EXISTS public.buying_stations_suppliers CASCADE;
CREATE TABLE public.buying_stations_suppliers (
	id_buying_stations integer NOT NULL,
	id_business_partners_suppliers integer NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT buying_stations_suppliers_pk PRIMARY KEY (id_buying_stations,id_business_partners_suppliers)
);
-- ddl-end --
ALTER TABLE public.buying_stations_suppliers OWNER TO postgres;
-- ddl-end --

-- object: buying_stations_fk | type: CONSTRAINT --
-- ALTER TABLE public.buying_stations_suppliers DROP CONSTRAINT IF EXISTS buying_stations_fk CASCADE;
ALTER TABLE public.buying_stations_suppliers ADD CONSTRAINT buying_stations_fk FOREIGN KEY (id_buying_stations)
REFERENCES public.buying_stations (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: public.drivers | type: TABLE --
-- DROP TABLE IF EXISTS public.drivers CASCADE;
CREATE TABLE public.drivers (
	id_business_partners integer NOT NULL,
	id_license_types integer NOT NULL,
	license character varying(20) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT drivers_pk PRIMARY KEY (id_business_partners),
	CONSTRAINT drivers_license_unq UNIQUE (license)
);
-- ddl-end --
ALTER TABLE public.drivers OWNER TO postgres;
-- ddl-end --

-- object: public.clients | type: TABLE --
-- DROP TABLE IF EXISTS public.clients CASCADE;
CREATE TABLE public.clients (
	id_business_partners integer NOT NULL,
	is_international boolean NOT NULL DEFAULT TRUE,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT clients_pk PRIMARY KEY (id_business_partners)
);
-- ddl-end --
ALTER TABLE public.clients OWNER TO postgres;
-- ddl-end --

-- object: public.trailers_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.trailers_id_seq CASCADE;
CREATE SEQUENCE public.trailers_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.trailers_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.trailers | type: TABLE --
-- DROP TABLE IF EXISTS public.trailers CASCADE;
CREATE TABLE public.trailers (
	id integer NOT NULL DEFAULT nextval('public.trailers_id_seq'::regclass),
	id_business_partners_carriers integer NOT NULL,
	license_plate char(6) NOT NULL,
	payload_capacity decimal(10,2) NOT NULL,
	axle_count integer,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT trailers_pk PRIMARY KEY (id),
	CONSTRAINT trailers_license_plate_unq UNIQUE (license_plate)
);
-- ddl-end --
ALTER TABLE public.trailers OWNER TO postgres;
-- ddl-end --

-- object: update_business_partners_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_business_partners_updated_at ON public.business_partners CASCADE;
CREATE OR REPLACE TRIGGER update_business_partners_updated_at
	BEFORE UPDATE
	ON public.business_partners
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: ubigeos_fk | type: CONSTRAINT --
-- ALTER TABLE public.business_partners DROP CONSTRAINT IF EXISTS ubigeos_fk CASCADE;
ALTER TABLE public.business_partners ADD CONSTRAINT ubigeos_fk FOREIGN KEY (id_ubigeos)
REFERENCES public.ubigeos (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: update_business_partners_bp_roles_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_business_partners_bp_roles_updated_at ON public.business_partners_bp_roles CASCADE;
CREATE OR REPLACE TRIGGER update_business_partners_bp_roles_updated_at
	BEFORE UPDATE
	ON public.business_partners_bp_roles
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: business_partners_fk | type: CONSTRAINT --
-- ALTER TABLE public.business_partners_bp_roles DROP CONSTRAINT IF EXISTS business_partners_fk CASCADE;
ALTER TABLE public.business_partners_bp_roles ADD CONSTRAINT business_partners_fk FOREIGN KEY (id_business_partners)
REFERENCES public.business_partners (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: identity_document_types_fk | type: CONSTRAINT --
-- ALTER TABLE public.business_partners DROP CONSTRAINT IF EXISTS identity_document_types_fk CASCADE;
ALTER TABLE public.business_partners ADD CONSTRAINT identity_document_types_fk FOREIGN KEY (id_identity_document_types)
REFERENCES public.identity_document_types (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: business_partners_fk | type: CONSTRAINT --
-- ALTER TABLE public.drivers DROP CONSTRAINT IF EXISTS business_partners_fk CASCADE;
ALTER TABLE public.drivers ADD CONSTRAINT business_partners_fk FOREIGN KEY (id_business_partners)
REFERENCES public.business_partners (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: drivers_fk | type: CONSTRAINT --
-- ALTER TABLE public.drivers_carriers DROP CONSTRAINT IF EXISTS drivers_fk CASCADE;
ALTER TABLE public.drivers_carriers ADD CONSTRAINT drivers_fk FOREIGN KEY (id_business_partners_drivers)
REFERENCES public.drivers (id_business_partners) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: business_partners_fk | type: CONSTRAINT --
-- ALTER TABLE public.carriers DROP CONSTRAINT IF EXISTS business_partners_fk CASCADE;
ALTER TABLE public.carriers ADD CONSTRAINT business_partners_fk FOREIGN KEY (id_business_partners)
REFERENCES public.business_partners (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: business_partners_fk | type: CONSTRAINT --
-- ALTER TABLE public.suppliers DROP CONSTRAINT IF EXISTS business_partners_fk CASCADE;
ALTER TABLE public.suppliers ADD CONSTRAINT business_partners_fk FOREIGN KEY (id_business_partners)
REFERENCES public.business_partners (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: carriers_fk | type: CONSTRAINT --
-- ALTER TABLE public.drivers_carriers DROP CONSTRAINT IF EXISTS carriers_fk CASCADE;
ALTER TABLE public.drivers_carriers ADD CONSTRAINT carriers_fk FOREIGN KEY (id_business_partners_carriers)
REFERENCES public.carriers (id_business_partners) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: suppliers_fk | type: CONSTRAINT --
-- ALTER TABLE public.buying_stations_suppliers DROP CONSTRAINT IF EXISTS suppliers_fk CASCADE;
ALTER TABLE public.buying_stations_suppliers ADD CONSTRAINT suppliers_fk FOREIGN KEY (id_business_partners_suppliers)
REFERENCES public.suppliers (id_business_partners) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: business_partners_fk | type: CONSTRAINT --
-- ALTER TABLE public.clients DROP CONSTRAINT IF EXISTS business_partners_fk CASCADE;
ALTER TABLE public.clients ADD CONSTRAINT business_partners_fk FOREIGN KEY (id_business_partners)
REFERENCES public.business_partners (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: update_bp_roles_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_bp_roles_updated_at ON public.bp_roles CASCADE;
CREATE OR REPLACE TRIGGER update_bp_roles_updated_at
	BEFORE UPDATE
	ON public.bp_roles
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: public.scale_tickets_details_packaging_types | type: TABLE --
-- DROP TABLE IF EXISTS public.scale_tickets_details_packaging_types CASCADE;
CREATE TABLE public.scale_tickets_details_packaging_types (
	id integer NOT NULL DEFAULT nextval('public.scale_tickets_details_packaging_types_id_seq'::regclass),
	id_scale_ticket_details integer,
	id_packaging_types integer,
	id_scale_tickets_scale_ticket_details integer,
	id_products_scale_ticket_details integer,
	package_quantity integer NOT NULL,
	registered_unit_tare_weight decimal(10,2) NOT NULL,
	subtotal_tare_weight decimal(10,2) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT scale_tickets_details_packaging_types_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.scale_tickets_details_packaging_types OWNER TO postgres;
-- ddl-end --

-- object: bp_roles_fk | type: CONSTRAINT --
-- ALTER TABLE public.business_partners_bp_roles DROP CONSTRAINT IF EXISTS bp_roles_fk CASCADE;
ALTER TABLE public.business_partners_bp_roles ADD CONSTRAINT bp_roles_fk FOREIGN KEY (id_bp_roles)
REFERENCES public.bp_roles (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: bp_roles_fk | type: CONSTRAINT --
-- ALTER TABLE public.bp_roles_operations DROP CONSTRAINT IF EXISTS bp_roles_fk CASCADE;
ALTER TABLE public.bp_roles_operations ADD CONSTRAINT bp_roles_fk FOREIGN KEY (id_bp_roles)
REFERENCES public.bp_roles (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: update_suppliers_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_suppliers_updated_at ON public.suppliers CASCADE;
CREATE OR REPLACE TRIGGER update_suppliers_updated_at
	BEFORE UPDATE
	ON public.suppliers
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_buying_stations_suppliers_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_buying_stations_suppliers_updated_at ON public.buying_stations_suppliers CASCADE;
CREATE OR REPLACE TRIGGER update_buying_stations_suppliers_updated_at
	BEFORE UPDATE
	ON public.buying_stations_suppliers
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_clients_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_clients_updated_at ON public.clients CASCADE;
CREATE OR REPLACE TRIGGER update_clients_updated_at
	BEFORE UPDATE
	ON public.clients
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_drivers_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_drivers_updated_at ON public.drivers CASCADE;
CREATE OR REPLACE TRIGGER update_drivers_updated_at
	BEFORE UPDATE
	ON public.drivers
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_drivers_carriers_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_drivers_carriers_updated_at ON public.drivers_carriers CASCADE;
CREATE OR REPLACE TRIGGER update_drivers_carriers_updated_at
	BEFORE UPDATE
	ON public.drivers_carriers
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_carriers_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_carriers_updated_at ON public.carriers CASCADE;
CREATE OR REPLACE TRIGGER update_carriers_updated_at
	BEFORE UPDATE
	ON public.carriers
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_bp_roles_operations_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_bp_roles_operations_updated_at ON public.bp_roles_operations CASCADE;
CREATE OR REPLACE TRIGGER update_bp_roles_operations_updated_at
	BEFORE UPDATE
	ON public.bp_roles_operations
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_trucks_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_trucks_updated_at ON public.trucks CASCADE;
CREATE OR REPLACE TRIGGER update_trucks_updated_at
	BEFORE UPDATE
	ON public.trucks
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: public.license_types_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.license_types_id_seq CASCADE;
CREATE SEQUENCE public.license_types_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.license_types_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.license_types | type: TABLE --
-- DROP TABLE IF EXISTS public.license_types CASCADE;
CREATE TABLE public.license_types (
	id integer NOT NULL DEFAULT nextval('public.license_types_id_seq'::regclass),
	name character varying(6) NOT NULL,
	description character varying(100) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT license_types_pk PRIMARY KEY (id),
	CONSTRAINT license_types_name_unq UNIQUE (name)
);
-- ddl-end --
ALTER TABLE public.license_types OWNER TO postgres;
-- ddl-end --

-- object: license_types_fk | type: CONSTRAINT --
-- ALTER TABLE public.drivers DROP CONSTRAINT IF EXISTS license_types_fk CASCADE;
ALTER TABLE public.drivers ADD CONSTRAINT license_types_fk FOREIGN KEY (id_license_types)
REFERENCES public.license_types (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: update_trailers_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_trailers_updated_at ON public.trailers CASCADE;
CREATE OR REPLACE TRIGGER update_trailers_updated_at
	BEFORE UPDATE
	ON public.trailers
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_operations_product_types_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_operations_product_types_updated_at ON public.operations_product_types CASCADE;
CREATE OR REPLACE TRIGGER update_operations_product_types_updated_at
	BEFORE UPDATE
	ON public.operations_product_types
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: operations_fk | type: CONSTRAINT --
-- ALTER TABLE public.bp_roles_operations DROP CONSTRAINT IF EXISTS operations_fk CASCADE;
ALTER TABLE public.bp_roles_operations ADD CONSTRAINT operations_fk FOREIGN KEY (id_operations)
REFERENCES public.operations (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: update_operations_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_operations_updated_at ON public.operations CASCADE;
CREATE OR REPLACE TRIGGER update_operations_updated_at
	BEFORE UPDATE
	ON public.operations
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: operations_fk | type: CONSTRAINT --
-- ALTER TABLE public.operations_product_types DROP CONSTRAINT IF EXISTS operations_fk CASCADE;
ALTER TABLE public.operations_product_types ADD CONSTRAINT operations_fk FOREIGN KEY (id_operations)
REFERENCES public.operations (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: update_document_types_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_document_types_updated_at ON public.document_types CASCADE;
CREATE OR REPLACE TRIGGER update_document_types_updated_at
	BEFORE UPDATE
	ON public.document_types
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: document_types_fk | type: CONSTRAINT --
-- ALTER TABLE public.scale_tickets_document_types DROP CONSTRAINT IF EXISTS document_types_fk CASCADE;
ALTER TABLE public.scale_tickets_document_types ADD CONSTRAINT document_types_fk FOREIGN KEY (id_document_types)
REFERENCES public.document_types (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: business_partners_fk | type: CONSTRAINT --
-- ALTER TABLE public.scale_tickets_document_types DROP CONSTRAINT IF EXISTS business_partners_fk CASCADE;
ALTER TABLE public.scale_tickets_document_types ADD CONSTRAINT business_partners_fk FOREIGN KEY (id_business_partners)
REFERENCES public.business_partners (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.scale_ticket_status_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS public.scale_ticket_status_id_seq CASCADE;
CREATE SEQUENCE public.scale_ticket_status_id_seq
	INCREMENT BY 1
	MINVALUE 0
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE public.scale_ticket_status_id_seq OWNER TO postgres;
-- ddl-end --

-- object: public.scale_tickets | type: TABLE --
-- DROP TABLE IF EXISTS public.scale_tickets CASCADE;
CREATE TABLE public.scale_tickets (
	id integer NOT NULL DEFAULT nextval('public.scale_tickets_id_seq'::regclass),
	id_buying_stations integer NOT NULL,
	id_buying_stations_origin integer,
	id_buying_stations_destination integer,
	id_employees integer NOT NULL,
	id_operations integer NOT NULL,
	id_business_partners_carriers integer,
	id_business_partners_drivers integer,
	id_business_partners_clients integer,
	id_business_partners_suppliers integer,
	id_trucks integer NOT NULL,
	id_trailers integer,
	id_scale_ticket_status integer NOT NULL,
	creation_date date NOT NULL,
	total_gross_weight decimal(10,2) NOT NULL,
	total_tare_weight decimal(10,2) NOT NULL,
	total_net_weigth decimal(10,2) NOT NULL,
	total_tare_adjustment decimal(10,2) NOT NULL DEFAULT 0,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT scale_tickets_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.scale_tickets OWNER TO postgres;
-- ddl-end --

-- object: update_scale_tickets_document_types_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_scale_tickets_document_types_updated_at ON public.scale_tickets_document_types CASCADE;
CREATE OR REPLACE TRIGGER update_scale_tickets_document_types_updated_at
	BEFORE UPDATE
	ON public.scale_tickets_document_types
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_products_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_products_updated_at ON public.products CASCADE;
CREATE OR REPLACE TRIGGER update_products_updated_at
	BEFORE UPDATE
	ON public.products
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: scale_tickets_fk | type: CONSTRAINT --
-- ALTER TABLE public.scale_tickets_document_types DROP CONSTRAINT IF EXISTS scale_tickets_fk CASCADE;
ALTER TABLE public.scale_tickets_document_types ADD CONSTRAINT scale_tickets_fk FOREIGN KEY (id_scale_tickets)
REFERENCES public.scale_tickets (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.scale_ticket_status | type: TABLE --
-- DROP TABLE IF EXISTS public.scale_ticket_status CASCADE;
CREATE TABLE public.scale_ticket_status (
	id integer NOT NULL DEFAULT nextval('public.scale_ticket_status_id_seq'::regclass),
	code character(3) NOT NULL,
	name character varying(50) NOT NULL,
	description character varying(250) NOT NULL,
	created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_by integer NOT NULL,
	updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_by integer NOT NULL,
	is_active boolean NOT NULL DEFAULT TRUE,
	CONSTRAINT scale_ticket_status_pk PRIMARY KEY (id),
	CONSTRAINT scale_ticket_status_code_unq UNIQUE (code),
	CONSTRAINT scale_ticket_status_name_unq UNIQUE (name)
);
-- ddl-end --
ALTER TABLE public.scale_ticket_status OWNER TO postgres;
-- ddl-end --

-- object: scale_tickets_document_types_id_unq | type: CONSTRAINT --
-- ALTER TABLE public.scale_tickets_document_types DROP CONSTRAINT IF EXISTS scale_tickets_document_types_id_unq CASCADE;
ALTER TABLE public.scale_tickets_document_types ADD CONSTRAINT scale_tickets_document_types_id_unq UNIQUE (id_document_types,id_business_partners,id_scale_tickets);
-- ddl-end --

-- object: carriers_fk | type: CONSTRAINT --
-- ALTER TABLE public.trucks DROP CONSTRAINT IF EXISTS carriers_fk CASCADE;
ALTER TABLE public.trucks ADD CONSTRAINT carriers_fk FOREIGN KEY (id_business_partners_carriers)
REFERENCES public.carriers (id_business_partners) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: carriers_fk | type: CONSTRAINT --
-- ALTER TABLE public.trailers DROP CONSTRAINT IF EXISTS carriers_fk CASCADE;
ALTER TABLE public.trailers ADD CONSTRAINT carriers_fk FOREIGN KEY (id_business_partners_carriers)
REFERENCES public.carriers (id_business_partners) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: scale_ticket_status_fk | type: CONSTRAINT --
-- ALTER TABLE public.scale_tickets DROP CONSTRAINT IF EXISTS scale_ticket_status_fk CASCADE;
ALTER TABLE public.scale_tickets ADD CONSTRAINT scale_ticket_status_fk FOREIGN KEY (id_scale_ticket_status)
REFERENCES public.scale_ticket_status (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: products_fk | type: CONSTRAINT --
-- ALTER TABLE public.scale_ticket_details DROP CONSTRAINT IF EXISTS products_fk CASCADE;
ALTER TABLE public.scale_ticket_details ADD CONSTRAINT products_fk FOREIGN KEY (id_products)
REFERENCES public.products (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: scale_tickets_fk | type: CONSTRAINT --
-- ALTER TABLE public.scale_ticket_details DROP CONSTRAINT IF EXISTS scale_tickets_fk CASCADE;
ALTER TABLE public.scale_ticket_details ADD CONSTRAINT scale_tickets_fk FOREIGN KEY (id_scale_tickets)
REFERENCES public.scale_tickets (id) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --

-- object: buying_stations_fk | type: CONSTRAINT --
-- ALTER TABLE public.scale_tickets DROP CONSTRAINT IF EXISTS buying_stations_fk CASCADE;
ALTER TABLE public.scale_tickets ADD CONSTRAINT buying_stations_fk FOREIGN KEY (id_buying_stations)
REFERENCES public.buying_stations (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: buying_stations_fk1 | type: CONSTRAINT --
-- ALTER TABLE public.scale_tickets DROP CONSTRAINT IF EXISTS buying_stations_fk1 CASCADE;
ALTER TABLE public.scale_tickets ADD CONSTRAINT buying_stations_fk1 FOREIGN KEY (id_buying_stations_origin)
REFERENCES public.buying_stations (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: employees_fk | type: CONSTRAINT --
-- ALTER TABLE public.scale_tickets DROP CONSTRAINT IF EXISTS employees_fk CASCADE;
ALTER TABLE public.scale_tickets ADD CONSTRAINT employees_fk FOREIGN KEY (id_employees)
REFERENCES public.employees (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: operations_fk | type: CONSTRAINT --
-- ALTER TABLE public.scale_tickets DROP CONSTRAINT IF EXISTS operations_fk CASCADE;
ALTER TABLE public.scale_tickets ADD CONSTRAINT operations_fk FOREIGN KEY (id_operations)
REFERENCES public.operations (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: carriers_fk | type: CONSTRAINT --
-- ALTER TABLE public.scale_tickets DROP CONSTRAINT IF EXISTS carriers_fk CASCADE;
ALTER TABLE public.scale_tickets ADD CONSTRAINT carriers_fk FOREIGN KEY (id_business_partners_carriers)
REFERENCES public.carriers (id_business_partners) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: drivers_fk | type: CONSTRAINT --
-- ALTER TABLE public.scale_tickets DROP CONSTRAINT IF EXISTS drivers_fk CASCADE;
ALTER TABLE public.scale_tickets ADD CONSTRAINT drivers_fk FOREIGN KEY (id_business_partners_drivers)
REFERENCES public.drivers (id_business_partners) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: clients_fk | type: CONSTRAINT --
-- ALTER TABLE public.scale_tickets DROP CONSTRAINT IF EXISTS clients_fk CASCADE;
ALTER TABLE public.scale_tickets ADD CONSTRAINT clients_fk FOREIGN KEY (id_business_partners_clients)
REFERENCES public.clients (id_business_partners) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: suppliers_fk | type: CONSTRAINT --
-- ALTER TABLE public.scale_tickets DROP CONSTRAINT IF EXISTS suppliers_fk CASCADE;
ALTER TABLE public.scale_tickets ADD CONSTRAINT suppliers_fk FOREIGN KEY (id_business_partners_suppliers)
REFERENCES public.suppliers (id_business_partners) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: trucks_fk | type: CONSTRAINT --
-- ALTER TABLE public.scale_tickets DROP CONSTRAINT IF EXISTS trucks_fk CASCADE;
ALTER TABLE public.scale_tickets ADD CONSTRAINT trucks_fk FOREIGN KEY (id_trucks)
REFERENCES public.trucks (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: trailers_fk | type: CONSTRAINT --
-- ALTER TABLE public.scale_tickets DROP CONSTRAINT IF EXISTS trailers_fk CASCADE;
ALTER TABLE public.scale_tickets ADD CONSTRAINT trailers_fk FOREIGN KEY (id_trailers)
REFERENCES public.trailers (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: buying_stations_fk2 | type: CONSTRAINT --
-- ALTER TABLE public.scale_tickets DROP CONSTRAINT IF EXISTS buying_stations_fk2 CASCADE;
ALTER TABLE public.scale_tickets ADD CONSTRAINT buying_stations_fk2 FOREIGN KEY (id_buying_stations_destination)
REFERENCES public.buying_stations (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: scale_ticket_details_fk | type: CONSTRAINT --
-- ALTER TABLE public.scale_tickets_details_packaging_types DROP CONSTRAINT IF EXISTS scale_ticket_details_fk CASCADE;
ALTER TABLE public.scale_tickets_details_packaging_types ADD CONSTRAINT scale_ticket_details_fk FOREIGN KEY (id_scale_ticket_details,id_products_scale_ticket_details,id_scale_tickets_scale_ticket_details)
REFERENCES public.scale_ticket_details (id,id_products,id_scale_tickets) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: scales_fk | type: CONSTRAINT --
-- ALTER TABLE public.scale_ticket_details DROP CONSTRAINT IF EXISTS scales_fk CASCADE;
ALTER TABLE public.scale_ticket_details ADD CONSTRAINT scales_fk FOREIGN KEY (id_scales)
REFERENCES public.scales (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: update_scale_tickets_details_packaging_types_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_scale_tickets_details_packaging_types_updated_at ON public.scale_tickets_details_packaging_types CASCADE;
CREATE OR REPLACE TRIGGER update_scale_tickets_details_packaging_types_updated_at
	BEFORE UPDATE
	ON public.scale_tickets_details_packaging_types
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_scale_ticket_details_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_scale_ticket_details_updated_at ON public.scale_ticket_details CASCADE;
CREATE OR REPLACE TRIGGER update_scale_ticket_details_updated_at
	BEFORE UPDATE
	ON public.scale_ticket_details
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: packaging_types_fk | type: CONSTRAINT --
-- ALTER TABLE public.scale_tickets_details_packaging_types DROP CONSTRAINT IF EXISTS packaging_types_fk CASCADE;
ALTER TABLE public.scale_tickets_details_packaging_types ADD CONSTRAINT packaging_types_fk FOREIGN KEY (id_packaging_types)
REFERENCES public.packaging_types (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: scale_tickets_details_packaging_types_id_unq | type: CONSTRAINT --
-- ALTER TABLE public.scale_tickets_details_packaging_types DROP CONSTRAINT IF EXISTS scale_tickets_details_packaging_types_id_unq CASCADE;
ALTER TABLE public.scale_tickets_details_packaging_types ADD CONSTRAINT scale_tickets_details_packaging_types_id_unq UNIQUE (id_scale_ticket_details,id_packaging_types);
-- ddl-end --

-- object: update_employees_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_employees_updated_at ON public.employees CASCADE;
CREATE OR REPLACE TRIGGER update_employees_updated_at
	BEFORE UPDATE
	ON public.employees
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_license_types_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_license_types_updated_at ON public.license_types CASCADE;
CREATE OR REPLACE TRIGGER update_license_types_updated_at
	BEFORE UPDATE
	ON public.license_types
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_scale_tickets_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_scale_tickets_updated_at ON public.scale_tickets CASCADE;
CREATE OR REPLACE TRIGGER update_scale_tickets_updated_at
	BEFORE UPDATE
	ON public.scale_tickets
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --

-- object: update_scale_ticket_status_updated_at | type: TRIGGER --
-- DROP TRIGGER IF EXISTS update_scale_ticket_status_updated_at ON public.scale_ticket_status CASCADE;
CREATE OR REPLACE TRIGGER update_scale_ticket_status_updated_at
	BEFORE UPDATE
	ON public.scale_ticket_status
	FOR EACH ROW
	EXECUTE PROCEDURE public.update_updated_at_column();
-- ddl-end --


