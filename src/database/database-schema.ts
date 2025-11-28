import { sql } from "drizzle-orm"
import { pgTable, index, unique, check, integer, varchar, timestamp, boolean, foreignKey, date, text, char, numeric, primaryKey, pgSequence } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm/relations";


export const usersIdSeq = pgSequence("users_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const rolesIdSeq = pgSequence("roles_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const permissionsIdSeq = pgSequence("permissions_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const employeesIdSeq = pgSequence("employees_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const buyingStationsIdSeq = pgSequence("buying_stations_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const ubigeosIdSeq = pgSequence("ubigeos_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const scaleTicketsIdSeq = pgSequence("scale_tickets_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const scaleTicketDetailsIdSeq = pgSequence("scale_ticket_details_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const packagingTypesIdSeq = pgSequence("packaging_types_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const scaleTicketsDetailsPackagingTypesIdSeq = pgSequence("scale_tickets_details_packaging_types_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const documentTypesIdSeq = pgSequence("document_types_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const scaleTicketsDocumentTypesIdSeq = pgSequence("scale_tickets_document_types_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const productsIdSeq = pgSequence("products_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const businessPartnersIdSeq = pgSequence("business_partners_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const trucksIdSeq = pgSequence("trucks_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const operationsIdSeq = pgSequence("operations_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const scalesIdSeq = pgSequence("scales_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const identityDocumentTypesIdSeq = pgSequence("identity_document_types_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const departmentsIdSeq = pgSequence("departments_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const positionsIdSeq = pgSequence("positions_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const gendersIdSeq = pgSequence("genders_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const productTypesIdSeq = pgSequence("product_types_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const scaleTypesIdSeq = pgSequence("scale_types_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const scaleStatusIdSeq = pgSequence("scale_status_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const bpRolesIdSeq = pgSequence("bp_roles_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const trailersIdSeq = pgSequence("trailers_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const licenseTypesIdSeq = pgSequence("license_types_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const scaleTicketStatusIdSeq = pgSequence("scale_ticket_status_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })

export const users = pgTable("users", {
	id: integer().default(sql`nextval('users_id_seq'::regclass)`).primaryKey().notNull(),
	email: varchar({ length: 255 }).notNull(),
	username: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 72 }).notNull(),
	refreshToken: varchar("refresh_token").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	index("idx_users_email").using("btree", table.email.asc().nullsLast().op("text_ops")).with({fillfactor: "90"}),
	index("idx_users_updated_at").using("btree", table.updatedAt.asc().nullsLast().op("timestamp_ops")).with({fillfactor: "90"}),
	unique("users_email_unq").on(table.email),
	unique("users_username_unq").on(table.username),
	check("users_created_at_not_null", sql`NOT NULL created_at`),
	check("users_created_by_not_null", sql`NOT NULL created_by`),
	check("users_email_not_null", sql`NOT NULL email`),
	check("users_id_not_null", sql`NOT NULL id`),
	check("users_is_active_not_null", sql`NOT NULL is_active`),
	check("users_password_not_null", sql`NOT NULL password`),
	check("users_refresh_token_not_null", sql`NOT NULL refresh_token`),
	check("users_updated_at_not_null", sql`NOT NULL updated_at`),
	check("users_updated_by_not_null", sql`NOT NULL updated_by`),
	check("users_username_not_null", sql`NOT NULL username`),
]);

export const roles = pgTable("roles", {
	id: integer().default(sql`nextval('roles_id_seq'::regclass)`).primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	description: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	index("idx_roles_name").using("btree", table.name.asc().nullsLast().op("text_ops")).with({fillfactor: "90"}),
	index("idx_roles_updated_at").using("btree", table.updatedAt.asc().nullsLast().op("timestamp_ops")).with({fillfactor: "90"}),
	unique("roles_name_unq").on(table.name),
	check("roles_created_at_not_null", sql`NOT NULL created_at`),
	check("roles_created_by_not_null", sql`NOT NULL created_by`),
	check("roles_id_not_null", sql`NOT NULL id`),
	check("roles_is_active_not_null", sql`NOT NULL is_active`),
	check("roles_name_not_null", sql`NOT NULL name`),
	check("roles_updated_at_not_null", sql`NOT NULL updated_at`),
	check("roles_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const permissions = pgTable("permissions", {
	id: integer().default(sql`nextval('permissions_id_seq'::regclass)`).primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	description: varchar({ length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	index("idx_permissions_name").using("btree", table.name.asc().nullsLast().op("text_ops")).with({fillfactor: "90"}),
	index("idx_permissions_updated_at").using("btree", table.updatedAt.asc().nullsLast().op("timestamp_ops")).with({fillfactor: "90"}),
	unique("permissions_name_unq").on(table.name),
	check("permissions_created_at_not_null", sql`NOT NULL created_at`),
	check("permissions_created_by_not_null", sql`NOT NULL created_by`),
	check("permissions_id_not_null", sql`NOT NULL id`),
	check("permissions_is_active_not_null", sql`NOT NULL is_active`),
	check("permissions_name_not_null", sql`NOT NULL name`),
	check("permissions_updated_at_not_null", sql`NOT NULL updated_at`),
	check("permissions_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const employees = pgTable("employees", {
	id: integer().default(sql`nextval('employees_id_seq'::regclass)`).primaryKey().notNull(),
	idIdentityDocumentTypes: integer("id_identity_document_types").notNull(),
	idGenders: integer("id_genders").notNull(),
	idPositions: integer("id_positions").notNull(),
	idUsers: integer("id_users"),
	idDepartments: integer("id_departments").notNull(),
	firstName: varchar("first_name", { length: 50 }).notNull(),
	fLastname: varchar("f_lastname", { length: 50 }).notNull(),
	mLastname: varchar("m_lastname", { length: 50 }).notNull(),
	birthdate: date().notNull(),
	documentNumber: varchar("document_number", { length: 20 }).notNull(),
	phoneNumber: varchar("phone_number", { length: 15 }),
	affiliationDate: date("affiliation_date").notNull(),
	terminationDate: date("termination_date"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idDepartments],
			foreignColumns: [departments.id],
			name: "departments_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.idGenders],
			foreignColumns: [genders.id],
			name: "genders_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.idIdentityDocumentTypes],
			foreignColumns: [identityDocumentTypes.id],
			name: "identity_document_types_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.idPositions],
			foreignColumns: [positions.id],
			name: "positions_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.idUsers],
			foreignColumns: [users.id],
			name: "users_fk"
		}).onUpdate("cascade").onDelete("set null"),
	unique("employees_document_number_unq").on(table.documentNumber),
	unique("employees_uq").on(table.idUsers),
	check("employees_affiliation_date_not_null", sql`NOT NULL affiliation_date`),
	check("employees_birthdate_not_null", sql`NOT NULL birthdate`),
	check("employees_created_at_not_null", sql`NOT NULL created_at`),
	check("employees_created_by_not_null", sql`NOT NULL created_by`),
	check("employees_document_number_not_null", sql`NOT NULL document_number`),
	check("employees_f_lastname_not_null", sql`NOT NULL f_lastname`),
	check("employees_first_name_not_null", sql`NOT NULL first_name`),
	check("employees_id_department_not_null", sql`NOT NULL id_departments`),
	check("employees_id_gender_not_null", sql`NOT NULL id_genders`),
	check("employees_id_identity_document_types_not_null", sql`NOT NULL id_identity_document_types`),
	check("employees_id_not_null", sql`NOT NULL id`),
	check("employees_id_position_not_null", sql`NOT NULL id_positions`),
	check("employees_is_active_not_null", sql`NOT NULL is_active`),
	check("employees_m_lastname_not_null", sql`NOT NULL m_lastname`),
	check("employees_updated_at_not_null", sql`NOT NULL updated_at`),
	check("employees_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const buyingStations = pgTable("buying_stations", {
	id: integer().default(sql`nextval('buying_stations_id_seq'::regclass)`).primaryKey().notNull(),
	idUbigeos: integer("id_ubigeos").notNull(),
	name: varchar({ length: 50 }).notNull(),
	address: text().notNull(),
	isPrincipal: boolean("is_principal").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idUbigeos],
			foreignColumns: [ubigeos.id],
			name: "ubigeos_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	unique("buying_stations_name_unq").on(table.name),
	check("buying_stations_address_not_null", sql`NOT NULL address`),
	check("buying_stations_created_at_not_null", sql`NOT NULL created_at`),
	check("buying_stations_created_by_not_null", sql`NOT NULL created_by`),
	check("buying_stations_id_not_null", sql`NOT NULL id`),
	check("buying_stations_id_ubigeos_not_null", sql`NOT NULL id_ubigeos`),
	check("buying_stations_is_active_not_null", sql`NOT NULL is_active`),
	check("buying_stations_is_principal_not_null", sql`NOT NULL is_principal`),
	check("buying_stations_name_not_null", sql`NOT NULL name`),
	check("buying_stations_updated_at_not_null", sql`NOT NULL updated_at`),
	check("buying_stations_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const identityDocumentTypes = pgTable("identity_document_types", {
	id: integer().default(sql`nextval('identity_document_types_id_seq'::regclass)`).primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	code: char({ length: 3 }).notNull(),
	description: varchar({ length: 250 }).notNull(),
	length: integer().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	unique("identity_document_types_code_unq").on(table.code),
	unique("identity_document_types_name_unq").on(table.name),
	check("identity_document_types_code_not_null", sql`NOT NULL code`),
	check("identity_document_types_created_at_not_null", sql`NOT NULL created_at`),
	check("identity_document_types_created_by_not_null", sql`NOT NULL created_by`),
	check("identity_document_types_description_not_null", sql`NOT NULL description`),
	check("identity_document_types_id_not_null", sql`NOT NULL id`),
	check("identity_document_types_is_active_not_null", sql`NOT NULL is_active`),
	check("identity_document_types_length_not_null", sql`NOT NULL length`),
	check("identity_document_types_name_not_null", sql`NOT NULL name`),
	check("identity_document_types_updated_at_not_null", sql`NOT NULL updated_at`),
	check("identity_document_types_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const ubigeos = pgTable("ubigeos", {
	id: integer().default(sql`nextval('ubigeos_id_seq'::regclass)`).primaryKey().notNull(),
	code: char({ length: 6 }).notNull(),
	regionCode: char("region_code", { length: 2 }).notNull(),
	region: varchar({ length: 20 }).notNull(),
	provinceCode: char("province_code", { length: 2 }).notNull(),
	province: varchar({ length: 30 }).notNull(),
	districtCode: char("district_code", { length: 2 }).notNull(),
	district: varchar({ length: 50 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	unique("ubigeo_code_unq").on(table.code),
	check("ubigeos_code_not_null", sql`NOT NULL code`),
	check("ubigeos_created_at_not_null", sql`NOT NULL created_at`),
	check("ubigeos_created_by_not_null", sql`NOT NULL created_by`),
	check("ubigeos_district_code_not_null", sql`NOT NULL district_code`),
	check("ubigeos_district_not_null", sql`NOT NULL district`),
	check("ubigeos_id_not_null", sql`NOT NULL id`),
	check("ubigeos_is_active_not_null", sql`NOT NULL is_active`),
	check("ubigeos_province_code_not_null", sql`NOT NULL province_code`),
	check("ubigeos_province_not_null", sql`NOT NULL province`),
	check("ubigeos_region_code_not_null", sql`NOT NULL region_code`),
	check("ubigeos_region_not_null", sql`NOT NULL region`),
	check("ubigeos_updated_at_not_null", sql`NOT NULL updated_at`),
	check("ubigeos_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const departments = pgTable("departments", {
	id: integer().default(sql`nextval('departments_id_seq'::regclass)`).primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	unique("departments_name_unq").on(table.name),
	check("department_created_at_not_null", sql`NOT NULL created_at`),
	check("department_created_by_not_null", sql`NOT NULL created_by`),
	check("department_description_not_null", sql`NOT NULL description`),
	check("department_id_not_null", sql`NOT NULL id`),
	check("department_is_active_not_null", sql`NOT NULL is_active`),
	check("department_name_not_null", sql`NOT NULL name`),
	check("department_updated_at_not_null", sql`NOT NULL updated_at`),
	check("department_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const productTypes = pgTable("product_types", {
	id: integer().default(sql`nextval('product_types_id_seq'::regclass)`).primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	unique("product_types_name_unq").on(table.name),
	check("product_types_created_at_not_null", sql`NOT NULL created_at`),
	check("product_types_created_by_not_null", sql`NOT NULL created_by`),
	check("product_types_description_not_null", sql`NOT NULL description`),
	check("product_types_id_not_null", sql`NOT NULL id`),
	check("product_types_is_active_not_null", sql`NOT NULL is_active`),
	check("product_types_name_not_null", sql`NOT NULL name`),
	check("product_types_updated_at_not_null", sql`NOT NULL updated_at`),
	check("product_types_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const scales = pgTable("scales", {
	id: integer().default(sql`nextval('scales_id_seq'::regclass)`).primaryKey().notNull(),
	idBuyingStations: integer("id_buying_stations").notNull(),
	idScaleTypes: integer("id_scale_types").notNull(),
	idScaleStatus: integer("id_scale_status").notNull(),
	brand: varchar({ length: 50 }).notNull(),
	model: varchar({ length: 50 }).notNull(),
	serialNumber: varchar("serial_number", { length: 50 }).notNull(),
	maxCapacity: numeric("max_capacity", { precision: 8, scale:  2 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idBuyingStations],
			foreignColumns: [buyingStations.id],
			name: "buying_stations_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.idScaleStatus],
			foreignColumns: [scaleStatus.id],
			name: "scale_status_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.idScaleTypes],
			foreignColumns: [scaleTypes.id],
			name: "scale_types_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	check("scales_brand_not_null", sql`NOT NULL brand`),
	check("scales_created_at_not_null", sql`NOT NULL created_at`),
	check("scales_created_by_not_null", sql`NOT NULL created_by`),
	check("scales_id_buying_stations_not_null", sql`NOT NULL id_buying_stations`),
	check("scales_id_not_null", sql`NOT NULL id`),
	check("scales_id_scale_status_not_null", sql`NOT NULL id_scale_status`),
	check("scales_id_scale_types_not_null", sql`NOT NULL id_scale_types`),
	check("scales_is_active_not_null", sql`NOT NULL is_active`),
	check("scales_max_capacity_not_null", sql`NOT NULL max_capacity`),
	check("scales_model_not_null", sql`NOT NULL model`),
	check("scales_serial_number_not_null", sql`NOT NULL serial_number`),
	check("scales_updated_at_not_null", sql`NOT NULL updated_at`),
	check("scales_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const scaleTypes = pgTable("scale_types", {
	id: integer().default(sql`nextval('scale_types_id_seq'::regclass)`).primaryKey().notNull(),
	name: varchar({ length: 20 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	unique("scale_types_name_unq").on(table.name),
	check("scale_types_created_at_not_null", sql`NOT NULL created_at`),
	check("scale_types_created_by_not_null", sql`NOT NULL created_by`),
	check("scale_types_description_not_null", sql`NOT NULL description`),
	check("scale_types_id_not_null", sql`NOT NULL id`),
	check("scale_types_is_active_not_null", sql`NOT NULL is_active`),
	check("scale_types_name_not_null", sql`NOT NULL name`),
	check("scale_types_updated_at_not_null", sql`NOT NULL updated_at`),
	check("scale_types_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const scaleStatus = pgTable("scale_status", {
	id: integer().default(sql`nextval('scale_status_id_seq'::regclass)`).primaryKey().notNull(),
	name: varchar({ length: 20 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	unique("scale_status_name_unq").on(table.name),
	check("scale_status_created_at_not_null", sql`NOT NULL created_at`),
	check("scale_status_created_by_not_null", sql`NOT NULL created_by`),
	check("scale_status_description_not_null", sql`NOT NULL description`),
	check("scale_status_id_not_null", sql`NOT NULL id`),
	check("scale_status_is_active_not_null", sql`NOT NULL is_active`),
	check("scale_status_name_not_null", sql`NOT NULL name`),
	check("scale_status_updated_at_not_null", sql`NOT NULL updated_at`),
	check("scale_status_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const packagingTypes = pgTable("packaging_types", {
	id: integer().default(sql`nextval('packaging_types_id_seq'::regclass)`).primaryKey().notNull(),
	code: char({ length: 3 }).notNull(),
	name: varchar({ length: 100 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	unitTareWeight: numeric("unit_tare_weight", { precision: 10, scale:  2 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	unique("packaging_types_code_unq").on(table.code),
	unique("packaging_types_name_unq").on(table.name),
	check("packaging_types_code_not_null", sql`NOT NULL code`),
	check("packaging_types_created_at_not_null", sql`NOT NULL created_at`),
	check("packaging_types_created_by_not_null", sql`NOT NULL created_by`),
	check("packaging_types_description_not_null", sql`NOT NULL description`),
	check("packaging_types_id_not_null", sql`NOT NULL id`),
	check("packaging_types_is_active_not_null", sql`NOT NULL is_active`),
	check("packaging_types_name_not_null", sql`NOT NULL name`),
	check("packaging_types_unit_tare_weight_not_null", sql`NOT NULL unit_tare_weight`),
	check("packaging_types_updated_at_not_null", sql`NOT NULL updated_at`),
	check("packaging_types_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const products = pgTable("products", {
	id: integer().default(sql`nextval('products_id_seq'::regclass)`).primaryKey().notNull(),
	idProductTypes: integer("id_product_types").notNull(),
	code: char({ length: 9 }).notNull(),
	name: varchar({ length: 250 }).notNull(),
	description: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idProductTypes],
			foreignColumns: [productTypes.id],
			name: "product_types_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	unique("products_code_unq").on(table.code),
	unique("products_name_unq").on(table.name),
	check("products_code_not_null", sql`NOT NULL code`),
	check("products_created_at_not_null", sql`NOT NULL created_at`),
	check("products_created_by_not_null", sql`NOT NULL created_by`),
	check("products_description_not_null", sql`NOT NULL description`),
	check("products_id_not_null", sql`NOT NULL id`),
	check("products_id_product_types_not_null", sql`NOT NULL id_product_types`),
	check("products_is_active_not_null", sql`NOT NULL is_active`),
	check("products_name_not_null", sql`NOT NULL name`),
	check("products_updated_at_not_null", sql`NOT NULL updated_at`),
	check("products_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const businessPartners = pgTable("business_partners", {
	id: integer().default(sql`nextval('business_partners_id_seq'::regclass)`).primaryKey().notNull(),
	idIdentityDocumentTypes: integer("id_identity_document_types").notNull(),
	idUbigeos: integer("id_ubigeos").notNull(),
	documentNumber: varchar("document_number", { length: 20 }).notNull(),
	name: varchar({ length: 50 }).notNull(),
	fLastname: varchar("f_lastname", { length: 50 }).notNull(),
	mLastname: varchar("m_lastname", { length: 50 }).notNull(),
	companyName: varchar("company_name", { length: 200 }).notNull(),
	email: varchar({ length: 255 }),
	phoneNumber: varchar("phone_number", { length: 15 }),
	address: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idIdentityDocumentTypes],
			foreignColumns: [identityDocumentTypes.id],
			name: "identity_document_types_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.idUbigeos],
			foreignColumns: [ubigeos.id],
			name: "ubigeos_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	unique("business_partners_company_name_unq").on(table.companyName),
	unique("business_partners_document_number_unq").on(table.documentNumber),
	check("business_partners_address_not_null", sql`NOT NULL address`),
	check("business_partners_company_name_not_null", sql`NOT NULL company_name`),
	check("business_partners_created_at_not_null", sql`NOT NULL created_at`),
	check("business_partners_created_by_not_null", sql`NOT NULL created_by`),
	check("business_partners_document_number_not_null", sql`NOT NULL document_number`),
	check("business_partners_f_lastname_not_null", sql`NOT NULL f_lastname`),
	check("business_partners_id_identity_document_types_not_null", sql`NOT NULL id_identity_document_types`),
	check("business_partners_id_not_null", sql`NOT NULL id`),
	check("business_partners_id_ubigeos_not_null", sql`NOT NULL id_ubigeos`),
	check("business_partners_is_active_not_null", sql`NOT NULL is_active`),
	check("business_partners_m_lastname_not_null", sql`NOT NULL m_lastname`),
	check("business_partners_name_not_null", sql`NOT NULL name`),
	check("business_partners_updated_at_not_null", sql`NOT NULL updated_at`),
	check("business_partners_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const drivers = pgTable("drivers", {
	idBusinessPartners: integer("id_business_partners").primaryKey().notNull(),
	idLicenseTypes: integer("id_license_types").notNull(),
	license: varchar({ length: 20 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idBusinessPartners],
			foreignColumns: [businessPartners.id],
			name: "business_partners_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.idLicenseTypes],
			foreignColumns: [licenseTypes.id],
			name: "license_types_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	unique("drivers_license_unq").on(table.license),
	check("drivers_created_at_not_null", sql`NOT NULL created_at`),
	check("drivers_created_by_not_null", sql`NOT NULL created_by`),
	check("drivers_id_business_partners_not_null", sql`NOT NULL id_business_partners`),
	check("drivers_id_license_types_not_null", sql`NOT NULL id_license_types`),
	check("drivers_is_active_not_null", sql`NOT NULL is_active`),
	check("drivers_license_not_null", sql`NOT NULL license`),
	check("drivers_updated_at_not_null", sql`NOT NULL updated_at`),
	check("drivers_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const carriers = pgTable("carriers", {
	idBusinessPartners: integer("id_business_partners").primaryKey().notNull(),
	registrationNumber: varchar("registration_number", { length: 20 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idBusinessPartners],
			foreignColumns: [businessPartners.id],
			name: "business_partners_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	unique("carriers_registration_number_unq").on(table.registrationNumber),
	check("carriers_created_at_not_null", sql`NOT NULL created_at`),
	check("carriers_created_by_not_null", sql`NOT NULL created_by`),
	check("carriers_id_business_partners_not_null", sql`NOT NULL id_business_partners`),
	check("carriers_is_active_not_null", sql`NOT NULL is_active`),
	check("carriers_registration_number_not_null", sql`NOT NULL registration_number`),
	check("carriers_updated_at_not_null", sql`NOT NULL updated_at`),
	check("carriers_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const suppliers = pgTable("suppliers", {
	idBusinessPartners: integer("id_business_partners").primaryKey().notNull(),
	isProducer: boolean("is_producer").default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idBusinessPartners],
			foreignColumns: [businessPartners.id],
			name: "business_partners_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	check("suppliers_created_at_not_null", sql`NOT NULL created_at`),
	check("suppliers_created_by_not_null", sql`NOT NULL created_by`),
	check("suppliers_id_business_partners_not_null", sql`NOT NULL id_business_partners`),
	check("suppliers_is_active_not_null", sql`NOT NULL is_active`),
	check("suppliers_is_producer_not_null", sql`NOT NULL is_producer`),
	check("suppliers_updated_at_not_null", sql`NOT NULL updated_at`),
	check("suppliers_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const clients = pgTable("clients", {
	idBusinessPartners: integer("id_business_partners").primaryKey().notNull(),
	isInternational: boolean("is_international").default(true).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idBusinessPartners],
			foreignColumns: [businessPartners.id],
			name: "business_partners_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	check("clients_created_at_not_null", sql`NOT NULL created_at`),
	check("clients_created_by_not_null", sql`NOT NULL created_by`),
	check("clients_id_business_partners_not_null", sql`NOT NULL id_business_partners`),
	check("clients_is_active_not_null", sql`NOT NULL is_active`),
	check("clients_is_international_not_null", sql`NOT NULL is_international`),
	check("clients_updated_at_not_null", sql`NOT NULL updated_at`),
	check("clients_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const bpRoles = pgTable("bp_roles", {
	id: integer().default(sql`nextval('bp_roles_id_seq'::regclass)`).primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	description: varchar({ length: 250 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	unique("bp_roles_name_unq").on(table.name),
	check("bp_roles_created_at_not_null", sql`NOT NULL created_at`),
	check("bp_roles_created_by_not_null", sql`NOT NULL created_by`),
	check("bp_roles_description_not_null", sql`NOT NULL description`),
	check("bp_roles_id_not_null", sql`NOT NULL id`),
	check("bp_roles_is_active_not_null", sql`NOT NULL is_active`),
	check("bp_roles_name_not_null", sql`NOT NULL name`),
	check("bp_roles_updated_at_not_null", sql`NOT NULL updated_at`),
	check("bp_roles_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const trucks = pgTable("trucks", {
	id: integer().default(sql`nextval('trucks_id_seq'::regclass)`).primaryKey().notNull(),
	idBusinessPartnersCarriers: integer("id_business_partners_carriers").notNull(),
	licensePlate: char("license_plate", { length: 6 }).notNull(),
	payloadCapacity: numeric("payload_capacity", { precision: 10, scale:  2 }).notNull(),
	configuration: char({ length: 3 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idBusinessPartnersCarriers],
			foreignColumns: [carriers.idBusinessPartners],
			name: "carriers_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	check("trucks_created_at_not_null", sql`NOT NULL created_at`),
	check("trucks_created_by_not_null", sql`NOT NULL created_by`),
	check("trucks_id_business_partners_carriers_not_null", sql`NOT NULL id_business_partners_carriers`),
	check("trucks_id_not_null", sql`NOT NULL id`),
	check("trucks_is_active_not_null", sql`NOT NULL is_active`),
	check("trucks_license_plate_not_null", sql`NOT NULL license_plate`),
	check("trucks_payload_capacity_not_null", sql`NOT NULL payload_capacity`),
	check("trucks_updated_at_not_null", sql`NOT NULL updated_at`),
	check("trucks_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const licenseTypes = pgTable("license_types", {
	id: integer().default(sql`nextval('license_types_id_seq'::regclass)`).primaryKey().notNull(),
	name: varchar({ length: 6 }).notNull(),
	description: varchar({ length: 100 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	unique("license_types_name_unq").on(table.name),
	check("license_types_created_at_not_null", sql`NOT NULL created_at`),
	check("license_types_created_by_not_null", sql`NOT NULL created_by`),
	check("license_types_description_not_null", sql`NOT NULL description`),
	check("license_types_id_not_null", sql`NOT NULL id`),
	check("license_types_is_active_not_null", sql`NOT NULL is_active`),
	check("license_types_name_not_null", sql`NOT NULL name`),
	check("license_types_updated_at_not_null", sql`NOT NULL updated_at`),
	check("license_types_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const trailers = pgTable("trailers", {
	id: integer().default(sql`nextval('trailers_id_seq'::regclass)`).primaryKey().notNull(),
	idBusinessPartnersCarriers: integer("id_business_partners_carriers").notNull(),
	licensePlate: char("license_plate", { length: 6 }).notNull(),
	payloadCapacity: numeric("payload_capacity", { precision: 10, scale:  2 }).notNull(),
	axleCount: integer("axle_count"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idBusinessPartnersCarriers],
			foreignColumns: [carriers.idBusinessPartners],
			name: "carriers_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	unique("trailers_license_plate_unq").on(table.licensePlate),
	check("trailers_created_at_not_null", sql`NOT NULL created_at`),
	check("trailers_created_by_not_null", sql`NOT NULL created_by`),
	check("trailers_id_business_partners_carriers_not_null", sql`NOT NULL id_business_partners_carriers`),
	check("trailers_id_not_null", sql`NOT NULL id`),
	check("trailers_is_active_not_null", sql`NOT NULL is_active`),
	check("trailers_license_plate_not_null", sql`NOT NULL license_plate`),
	check("trailers_payload_capacity_not_null", sql`NOT NULL payload_capacity`),
	check("trailers_updated_at_not_null", sql`NOT NULL updated_at`),
	check("trailers_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const operations = pgTable("operations", {
	id: integer().default(sql`nextval('operations_id_seq'::regclass)`).primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	code: char({ length: 3 }).notNull(),
	description: varchar({ length: 250 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	unique("operations_code_unq").on(table.code),
	unique("operations_name_unq").on(table.name),
	check("operations_code_not_null", sql`NOT NULL code`),
	check("operations_created_at_not_null", sql`NOT NULL created_at`),
	check("operations_created_by_not_null", sql`NOT NULL created_by`),
	check("operations_description_not_null", sql`NOT NULL description`),
	check("operations_id_not_null", sql`NOT NULL id`),
	check("operations_is_active_not_null", sql`NOT NULL is_active`),
	check("operations_name_not_null", sql`NOT NULL name`),
	check("operations_updated_at_not_null", sql`NOT NULL updated_at`),
	check("operations_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const documentTypes = pgTable("document_types", {
	id: integer().default(sql`nextval('document_types_id_seq'::regclass)`).primaryKey().notNull(),
	code: char({ length: 2 }).notNull(),
	name: varchar({ length: 50 }).notNull(),
	description: varchar({ length: 250 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	unique("document_types_code_unq").on(table.code),
	unique("document_types_name_unq").on(table.name),
	check("document_types_code_not_null", sql`NOT NULL code`),
	check("document_types_created_at_not_null", sql`NOT NULL created_at`),
	check("document_types_created_by_not_null", sql`NOT NULL created_by`),
	check("document_types_description_not_null", sql`NOT NULL description`),
	check("document_types_id_not_null", sql`NOT NULL id`),
	check("document_types_is_active_not_null", sql`NOT NULL is_active`),
	check("document_types_name_not_null", sql`NOT NULL name`),
	check("document_types_updated_at_not_null", sql`NOT NULL updated_at`),
	check("document_types_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const scaleTicketsDocumentTypes = pgTable("scale_tickets_document_types", {
	id: integer().default(sql`nextval('scale_tickets_document_types_id_seq'::regclass)`).primaryKey().notNull(),
	idDocumentTypes: integer("id_document_types").notNull(),
	idScaleTickets: integer("id_scale_tickets").notNull(),
	idBusinessPartners: integer("id_business_partners").notNull(),
	documentSerial: char("document_serial", { length: 4 }).notNull(),
	documentNumber: char("document_number", { length: 8 }).notNull(),
	documentDate: date("document_date").notNull(),
	documentGrossWeight: numeric("document_gross_weight", { precision: 10, scale:  2 }).notNull(),
	documentNetWeight: numeric("document_net_weight", { precision: 10, scale:  2 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idBusinessPartners],
			foreignColumns: [businessPartners.id],
			name: "business_partners_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.idDocumentTypes],
			foreignColumns: [documentTypes.id],
			name: "document_types_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.idScaleTickets],
			foreignColumns: [scaleTickets.id],
			name: "scale_tickets_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	unique("scale_tickets_document_types_id_unq").on(table.idBusinessPartners, table.idDocumentTypes, table.idScaleTickets),
	check("scale_tickets_document_types_created_at_not_null", sql`NOT NULL created_at`),
	check("scale_tickets_document_types_created_by_not_null", sql`NOT NULL created_by`),
	check("scale_tickets_document_types_document_date_not_null", sql`NOT NULL document_date`),
	check("scale_tickets_document_types_document_gross_weight_not_null", sql`NOT NULL document_gross_weight`),
	check("scale_tickets_document_types_document_net_weight_not_null", sql`NOT NULL document_net_weight`),
	check("scale_tickets_document_types_document_number_not_null", sql`NOT NULL document_number`),
	check("scale_tickets_document_types_document_serial_not_null", sql`NOT NULL document_serial`),
	check("scale_tickets_document_types_id_business_partners_not_null", sql`NOT NULL id_business_partners`),
	check("scale_tickets_document_types_id_document_types_not_null", sql`NOT NULL id_document_types`),
	check("scale_tickets_document_types_id_not_null", sql`NOT NULL id`),
	check("scale_tickets_document_types_id_scale_tickets_not_null", sql`NOT NULL id_scale_tickets`),
	check("scale_tickets_document_types_is_active_not_null", sql`NOT NULL is_active`),
	check("scale_tickets_document_types_updated_at_not_null", sql`NOT NULL updated_at`),
	check("scale_tickets_document_types_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const scaleTickets = pgTable("scale_tickets", {
	id: integer().default(sql`nextval('scale_tickets_id_seq'::regclass)`).primaryKey().notNull(),
	idBuyingStations: integer("id_buying_stations").notNull(),
	idBuyingStationsOrigin: integer("id_buying_stations_origin"),
	idBuyingStationsDestination: integer("id_buying_stations_destination"),
	idEmployees: integer("id_employees").notNull(),
	idOperations: integer("id_operations").notNull(),
	idBusinessPartnersCarriers: integer("id_business_partners_carriers"),
	idBusinessPartnersDrivers: integer("id_business_partners_drivers"),
	idBusinessPartnersClients: integer("id_business_partners_clients"),
	idBusinessPartnersSuppliers: integer("id_business_partners_suppliers"),
	idTrucks: integer("id_trucks").notNull(),
	idTrailers: integer("id_trailers"),
	idScaleTicketStatus: integer("id_scale_ticket_status").notNull(),
	creationDate: date("creation_date").notNull(),
	totalGrossWeight: numeric("total_gross_weight", { precision: 10, scale:  2 }).notNull(),
	totalTareWeight: numeric("total_tare_weight", { precision: 10, scale:  2 }).notNull(),
	totalNetWeigth: numeric("total_net_weigth", { precision: 10, scale:  2 }).notNull(),
	totalTareAdjustment: numeric("total_tare_adjustment", { precision: 10, scale:  2 }).default('0').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idBuyingStations],
			foreignColumns: [buyingStations.id],
			name: "buying_stations_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.idBuyingStationsOrigin],
			foreignColumns: [buyingStations.id],
			name: "buying_stations_fk1"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.idBuyingStationsDestination],
			foreignColumns: [buyingStations.id],
			name: "buying_stations_fk2"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.idBusinessPartnersCarriers],
			foreignColumns: [carriers.idBusinessPartners],
			name: "carriers_fk"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.idBusinessPartnersClients],
			foreignColumns: [clients.idBusinessPartners],
			name: "clients_fk"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.idBusinessPartnersDrivers],
			foreignColumns: [drivers.idBusinessPartners],
			name: "drivers_fk"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.idEmployees],
			foreignColumns: [employees.id],
			name: "employees_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.idOperations],
			foreignColumns: [operations.id],
			name: "operations_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.idScaleTicketStatus],
			foreignColumns: [scaleTicketStatus.id],
			name: "scale_ticket_status_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.idBusinessPartnersSuppliers],
			foreignColumns: [suppliers.idBusinessPartners],
			name: "suppliers_fk"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.idTrailers],
			foreignColumns: [trailers.id],
			name: "trailers_fk"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.idTrucks],
			foreignColumns: [trucks.id],
			name: "trucks_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	check("scale_tickets_created_at_not_null", sql`NOT NULL created_at`),
	check("scale_tickets_created_by_not_null", sql`NOT NULL created_by`),
	check("scale_tickets_creation_date_not_null", sql`NOT NULL creation_date`),
	check("scale_tickets_id_buying_stations_not_null", sql`NOT NULL id_buying_stations`),
	check("scale_tickets_id_employees_not_null", sql`NOT NULL id_employees`),
	check("scale_tickets_id_not_null", sql`NOT NULL id`),
	check("scale_tickets_id_operations_not_null", sql`NOT NULL id_operations`),
	check("scale_tickets_id_scale_ticket_status_not_null", sql`NOT NULL id_scale_ticket_status`),
	check("scale_tickets_id_trucks_not_null", sql`NOT NULL id_trucks`),
	check("scale_tickets_is_active_not_null", sql`NOT NULL is_active`),
	check("scale_tickets_total_gross_weight_not_null", sql`NOT NULL total_gross_weight`),
	check("scale_tickets_total_net_weigth_not_null", sql`NOT NULL total_net_weigth`),
	check("scale_tickets_total_tare_adjustment_not_null", sql`NOT NULL total_tare_adjustment`),
	check("scale_tickets_total_tare_weight_not_null", sql`NOT NULL total_tare_weight`),
	check("scale_tickets_updated_at_not_null", sql`NOT NULL updated_at`),
	check("scale_tickets_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const scaleTicketStatus = pgTable("scale_ticket_status", {
	id: integer().default(sql`nextval('scale_ticket_status_id_seq'::regclass)`).primaryKey().notNull(),
	code: char({ length: 3 }).notNull(),
	name: varchar({ length: 50 }).notNull(),
	description: varchar({ length: 250 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	unique("scale_ticket_status_code_unq").on(table.code),
	unique("scale_ticket_status_name_unq").on(table.name),
	check("scale_ticket_status_code_not_null", sql`NOT NULL code`),
	check("scale_ticket_status_created_at_not_null", sql`NOT NULL created_at`),
	check("scale_ticket_status_created_by_not_null", sql`NOT NULL created_by`),
	check("scale_ticket_status_description_not_null", sql`NOT NULL description`),
	check("scale_ticket_status_id_not_null", sql`NOT NULL id`),
	check("scale_ticket_status_is_active_not_null", sql`NOT NULL is_active`),
	check("scale_ticket_status_name_not_null", sql`NOT NULL name`),
	check("scale_ticket_status_updated_at_not_null", sql`NOT NULL updated_at`),
	check("scale_ticket_status_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const scaleTicketsDetailsPackagingTypes = pgTable("scale_tickets_details_packaging_types", {
	id: integer().default(sql`nextval('scale_tickets_details_packaging_types_id_seq'::regclass)`).primaryKey().notNull(),
	idScaleTicketDetails: integer("id_scale_ticket_details"),
	idPackagingTypes: integer("id_packaging_types"),
	idScaleTicketsScaleTicketDetails: integer("id_scale_tickets_scale_ticket_details"),
	idProductsScaleTicketDetails: integer("id_products_scale_ticket_details"),
	packageQuantity: integer("package_quantity").notNull(),
	registeredUnitTareWeight: numeric("registered_unit_tare_weight", { precision: 10, scale:  2 }).notNull(),
	subtotalTareWeight: numeric("subtotal_tare_weight", { precision: 10, scale:  2 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idPackagingTypes],
			foreignColumns: [packagingTypes.id],
			name: "packaging_types_fk"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.idScaleTicketDetails, table.idScaleTicketsScaleTicketDetails, table.idProductsScaleTicketDetails],
			foreignColumns: [scaleTicketDetails.id, scaleTicketDetails.idScaleTickets, scaleTicketDetails.idProducts],
			name: "scale_ticket_details_fk"
		}).onUpdate("cascade").onDelete("set null"),
	unique("scale_tickets_details_packaging_types_id_unq").on(table.idPackagingTypes, table.idScaleTicketDetails),
	check("scale_tickets_details_packa_registered_unit_tare_weigh_not_null", sql`NOT NULL registered_unit_tare_weight`),
	check("scale_tickets_details_packaging_t_subtotal_tare_weight_not_null", sql`NOT NULL subtotal_tare_weight`),
	check("scale_tickets_details_packaging_types_created_at_not_null", sql`NOT NULL created_at`),
	check("scale_tickets_details_packaging_types_created_by_not_null", sql`NOT NULL created_by`),
	check("scale_tickets_details_packaging_types_id_not_null", sql`NOT NULL id`),
	check("scale_tickets_details_packaging_types_is_active_not_null", sql`NOT NULL is_active`),
	check("scale_tickets_details_packaging_types_package_quantity_not_null", sql`NOT NULL package_quantity`),
	check("scale_tickets_details_packaging_types_updated_at_not_null", sql`NOT NULL updated_at`),
	check("scale_tickets_details_packaging_types_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const genders = pgTable("genders", {
	id: integer().default(sql`nextval('genders_id_seq'::regclass)`).primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	unique("genders_name_unq").on(table.name),
	check("gender_created_at_not_null", sql`NOT NULL created_at`),
	check("gender_created_by_not_null", sql`NOT NULL created_by`),
	check("gender_description_not_null", sql`NOT NULL description`),
	check("gender_id_not_null", sql`NOT NULL id`),
	check("gender_is_active_not_null", sql`NOT NULL is_active`),
	check("gender_name_not_null", sql`NOT NULL name`),
	check("gender_updated_at_not_null", sql`NOT NULL updated_at`),
	check("gender_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const positions = pgTable("positions", {
	id: integer().default(sql`nextval('positions_id_seq'::regclass)`).primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	unique("positions_name_unq").on(table.name),
	check("position_created_at_not_null", sql`NOT NULL created_at`),
	check("position_created_by_not_null", sql`NOT NULL created_by`),
	check("position_description_not_null", sql`NOT NULL description`),
	check("position_id_not_null", sql`NOT NULL id`),
	check("position_is_active_not_null", sql`NOT NULL is_active`),
	check("position_name_not_null", sql`NOT NULL name`),
	check("position_updated_at_not_null", sql`NOT NULL updated_at`),
	check("position_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const usersRoles = pgTable("users_roles", {
	idRoles: integer("id_roles").notNull(),
	idUsers: integer("id_users").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idRoles],
			foreignColumns: [roles.id],
			name: "roles_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.idUsers],
			foreignColumns: [users.id],
			name: "users_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.idRoles, table.idUsers], name: "users_roles_pk"}),
	check("users_roles_created_at_not_null", sql`NOT NULL created_at`),
	check("users_roles_created_by_not_null", sql`NOT NULL created_by`),
	check("users_roles_id_roles_not_null", sql`NOT NULL id_roles`),
	check("users_roles_id_users_not_null", sql`NOT NULL id_users`),
	check("users_roles_is_active_not_null", sql`NOT NULL is_active`),
	check("users_roles_updated_at_not_null", sql`NOT NULL updated_at`),
	check("users_roles_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const rolesPermissions = pgTable("roles_permissions", {
	idPermissions: integer("id_permissions").notNull(),
	idRoles: integer("id_roles").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idPermissions],
			foreignColumns: [permissions.id],
			name: "permissions_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.idRoles],
			foreignColumns: [roles.id],
			name: "roles_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.idPermissions, table.idRoles], name: "roles_permissions_pk"}),
	check("roles_permissions_created_at_not_null", sql`NOT NULL created_at`),
	check("roles_permissions_created_by_not_null", sql`NOT NULL created_by`),
	check("roles_permissions_id_permissions_not_null", sql`NOT NULL id_permissions`),
	check("roles_permissions_id_roles_not_null", sql`NOT NULL id_roles`),
	check("roles_permissions_is_active_not_null", sql`NOT NULL is_active`),
	check("roles_permissions_updated_at_not_null", sql`NOT NULL updated_at`),
	check("roles_permissions_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const operationsProductTypes = pgTable("operations_product_types", {
	idOperations: integer("id_operations").notNull(),
	idProductTypes: integer("id_product_types").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idOperations],
			foreignColumns: [operations.id],
			name: "operations_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.idProductTypes],
			foreignColumns: [productTypes.id],
			name: "product_types_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.idOperations, table.idProductTypes], name: "operations_product_types_pk"}),
	check("operations_product_types_created_at_not_null", sql`NOT NULL created_at`),
	check("operations_product_types_created_by_not_null", sql`NOT NULL created_by`),
	check("operations_product_types_id_operations_not_null", sql`NOT NULL id_operations`),
	check("operations_product_types_id_product_types_not_null", sql`NOT NULL id_product_types`),
	check("operations_product_types_is_active_not_null", sql`NOT NULL is_active`),
	check("operations_product_types_updated_at_not_null", sql`NOT NULL updated_at`),
	check("operations_product_types_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const buyingStationsSuppliers = pgTable("buying_stations_suppliers", {
	idBuyingStations: integer("id_buying_stations").notNull(),
	idBusinessPartnersSuppliers: integer("id_business_partners_suppliers").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idBuyingStations],
			foreignColumns: [buyingStations.id],
			name: "buying_stations_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.idBusinessPartnersSuppliers],
			foreignColumns: [suppliers.idBusinessPartners],
			name: "suppliers_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.idBusinessPartnersSuppliers, table.idBuyingStations], name: "buying_stations_suppliers_pk"}),
	check("buying_stations_suppliers_created_at_not_null", sql`NOT NULL created_at`),
	check("buying_stations_suppliers_created_by_not_null", sql`NOT NULL created_by`),
	check("buying_stations_suppliers_id_business_partners_supplie_not_null", sql`NOT NULL id_business_partners_suppliers`),
	check("buying_stations_suppliers_id_buying_stations_not_null", sql`NOT NULL id_buying_stations`),
	check("buying_stations_suppliers_is_active_not_null", sql`NOT NULL is_active`),
	check("buying_stations_suppliers_updated_at_not_null", sql`NOT NULL updated_at`),
	check("buying_stations_suppliers_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const operationsBpRoles = pgTable("operations_bp_roles", {
	idOperations: integer("id_operations").notNull(),
	idBpRoles: integer("id_bp_roles").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idBpRoles],
			foreignColumns: [bpRoles.id],
			name: "bp_roles_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.idOperations],
			foreignColumns: [operations.id],
			name: "operations_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.idBpRoles, table.idOperations], name: "operations_bp_roles_pk"}),
	check("bp_roles_operations_created_at_not_null", sql`NOT NULL created_at`),
	check("bp_roles_operations_created_by_not_null", sql`NOT NULL created_by`),
	check("bp_roles_operations_id_bp_roles_not_null", sql`NOT NULL id_bp_roles`),
	check("bp_roles_operations_id_operations_not_null", sql`NOT NULL id_operations`),
	check("bp_roles_operations_is_active_not_null", sql`NOT NULL is_active`),
	check("bp_roles_operations_updated_at_not_null", sql`NOT NULL updated_at`),
	check("bp_roles_operations_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const operationsBuyingStations = pgTable("operations_buying_stations", {
	idBuyingStations: integer("id_buying_stations").notNull(),
	idOperations: integer("id_operations").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idBuyingStations],
			foreignColumns: [buyingStations.id],
			name: "buying_stations_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.idOperations],
			foreignColumns: [operations.id],
			name: "operations_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.idBuyingStations, table.idOperations], name: "operations_buying_stations_pk"}),
	check("operations_buying_stations_created_at_not_null", sql`NOT NULL created_at`),
	check("operations_buying_stations_created_by_not_null", sql`NOT NULL created_by`),
	check("operations_buying_stations_id_buying_stations_not_null", sql`NOT NULL id_buying_stations`),
	check("operations_buying_stations_id_operations_not_null", sql`NOT NULL id_operations`),
	check("operations_buying_stations_is_active_not_null", sql`NOT NULL is_active`),
	check("operations_buying_stations_updated_at_not_null", sql`NOT NULL updated_at`),
	check("operations_buying_stations_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const operationsDocumentTypes = pgTable("operations_document_types", {
	idDocumentTypes: integer("id_document_types").notNull(),
	idOperations: integer("id_operations").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idDocumentTypes],
			foreignColumns: [documentTypes.id],
			name: "document_types_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.idOperations],
			foreignColumns: [operations.id],
			name: "operations_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.idDocumentTypes, table.idOperations], name: "operations_document_types_pk"}),
	check("operations_document_types_created_at_not_null", sql`NOT NULL created_at`),
	check("operations_document_types_created_by_not_null", sql`NOT NULL created_by`),
	check("operations_document_types_id_document_types_not_null", sql`NOT NULL id_document_types`),
	check("operations_document_types_id_operations_not_null", sql`NOT NULL id_operations`),
	check("operations_document_types_is_active_not_null", sql`NOT NULL is_active`),
	check("operations_document_types_updated_at_not_null", sql`NOT NULL updated_at`),
	check("operations_document_types_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const employeesBuyingStations = pgTable("employees_buying_stations", {
	idEmployees: integer("id_employees").notNull(),
	idBuyingStations: integer("id_buying_stations").notNull(),
	effectiveDate: date("effective_date").notNull(),
	terminationDate: date("termination_date"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idBuyingStations],
			foreignColumns: [buyingStations.id],
			name: "buying_stations_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.idEmployees],
			foreignColumns: [employees.id],
			name: "employees_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.idBuyingStations, table.idEmployees], name: "employees_buying_stations_pk"}),
	check("employees_buying_stations_created_at_not_null", sql`NOT NULL created_at`),
	check("employees_buying_stations_created_by_not_null", sql`NOT NULL created_by`),
	check("employees_buying_stations_effective_date_not_null", sql`NOT NULL effective_date`),
	check("employees_buying_stations_id_buying_stations_not_null", sql`NOT NULL id_buying_stations`),
	check("employees_buying_stations_id_employees_not_null", sql`NOT NULL id_employees`),
	check("employees_buying_stations_is_active_not_null", sql`NOT NULL is_active`),
	check("employees_buying_stations_updated_at_not_null", sql`NOT NULL updated_at`),
	check("employees_buying_stations_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const businessPartnersBpRoles = pgTable("business_partners_bp_roles", {
	idBusinessPartners: integer("id_business_partners").notNull(),
	idBpRoles: integer("id_bp_roles").notNull(),
	effectiveDate: date("effective_date").notNull(),
	terminationDate: date("termination_date"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idBpRoles],
			foreignColumns: [bpRoles.id],
			name: "bp_roles_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.idBusinessPartners],
			foreignColumns: [businessPartners.id],
			name: "business_partners_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.idBpRoles, table.idBusinessPartners], name: "business_partners_bp_roles_pk"}),
	check("business_partners_bp_roles_created_at_not_null", sql`NOT NULL created_at`),
	check("business_partners_bp_roles_created_by_not_null", sql`NOT NULL created_by`),
	check("business_partners_bp_roles_effective_date_not_null", sql`NOT NULL effective_date`),
	check("business_partners_bp_roles_id_bp_roles_not_null", sql`NOT NULL id_bp_roles`),
	check("business_partners_bp_roles_id_business_partners_not_null", sql`NOT NULL id_business_partners`),
	check("business_partners_bp_roles_is_active_not_null", sql`NOT NULL is_active`),
	check("business_partners_bp_roles_updated_at_not_null", sql`NOT NULL updated_at`),
	check("business_partners_bp_roles_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const driversCarriers = pgTable("drivers_carriers", {
	idBusinessPartnersDrivers: integer("id_business_partners_drivers").notNull(),
	idBusinessPartnersCarriers: integer("id_business_partners_carriers").notNull(),
	effectiveDate: date("effective_date").notNull(),
	terminationDate: date("termination_date"),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idBusinessPartnersCarriers],
			foreignColumns: [carriers.idBusinessPartners],
			name: "carriers_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.idBusinessPartnersDrivers],
			foreignColumns: [drivers.idBusinessPartners],
			name: "drivers_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	primaryKey({ columns: [table.idBusinessPartnersCarriers, table.idBusinessPartnersDrivers], name: "drivers_carriers_pk"}),
	check("drivers_carriers_created_at_not_null", sql`NOT NULL created_at`),
	check("drivers_carriers_created_by_not_null", sql`NOT NULL created_by`),
	check("drivers_carriers_effective_date_not_null", sql`NOT NULL effective_date`),
	check("drivers_carriers_id_business_partners_carriers_not_null", sql`NOT NULL id_business_partners_carriers`),
	check("drivers_carriers_id_business_partners_drivers_not_null", sql`NOT NULL id_business_partners_drivers`),
	check("drivers_carriers_is_active_not_null", sql`NOT NULL is_active`),
	check("drivers_carriers_updated_at_not_null", sql`NOT NULL updated_at`),
	check("drivers_carriers_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const scaleTicketDetails = pgTable("scale_ticket_details", {
	id: integer().default(sql`nextval('scale_ticket_details_id_seq'::regclass)`).notNull(),
	idScaleTickets: integer("id_scale_tickets").notNull(),
	idProducts: integer("id_products").notNull(),
	idScales: integer("id_scales").notNull(),
	grossWeight: numeric("gross_weight", { precision: 10, scale:  2 }).notNull(),
	tareWeight: numeric("tare_weight", { precision: 10, scale:  2 }).notNull(),
	netWeight: numeric("net_weight", { precision: 10, scale:  2 }).notNull(),
	observations: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idProducts],
			foreignColumns: [products.id],
			name: "products_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.idScaleTickets],
			foreignColumns: [scaleTickets.id],
			name: "scale_tickets_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.idScales],
			foreignColumns: [scales.id],
			name: "scales_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	primaryKey({ columns: [table.id, table.idProducts, table.idScaleTickets], name: "scale_ticket_details_pk"}),
	check("scale_ticket_details_created_at_not_null", sql`NOT NULL created_at`),
	check("scale_ticket_details_created_by_not_null", sql`NOT NULL created_by`),
	check("scale_ticket_details_gross_weight_not_null", sql`NOT NULL gross_weight`),
	check("scale_ticket_details_id_not_null", sql`NOT NULL id`),
	check("scale_ticket_details_id_products_not_null", sql`NOT NULL id_products`),
	check("scale_ticket_details_id_scale_tickets_not_null", sql`NOT NULL id_scale_tickets`),
	check("scale_ticket_details_id_scales_not_null", sql`NOT NULL id_scales`),
	check("scale_ticket_details_is_active_not_null", sql`NOT NULL is_active`),
	check("scale_ticket_details_net_weight_not_null", sql`NOT NULL net_weight`),
	check("scale_ticket_details_tare_weight_not_null", sql`NOT NULL tare_weight`),
	check("scale_ticket_details_updated_at_not_null", sql`NOT NULL updated_at`),
	check("scale_ticket_details_updated_by_not_null", sql`NOT NULL updated_by`),
]);

export const employeesRelations = relations(employees, ({one, many}) => ({
	department: one(departments, {
		fields: [employees.idDepartments],
		references: [departments.id]
	}),
	gender: one(genders, {
		fields: [employees.idGenders],
		references: [genders.id]
	}),
	identityDocumentType: one(identityDocumentTypes, {
		fields: [employees.idIdentityDocumentTypes],
		references: [identityDocumentTypes.id]
	}),
	position: one(positions, {
		fields: [employees.idPositions],
		references: [positions.id]
	}),
	user: one(users, {
		fields: [employees.idUsers],
		references: [users.id]
	}),
	scaleTickets: many(scaleTickets),
	employeesBuyingStations: many(employeesBuyingStations),
}));

export const departmentsRelations = relations(departments, ({many}) => ({
	employees: many(employees),
}));

export const gendersRelations = relations(genders, ({many}) => ({
	employees: many(employees),
}));

export const identityDocumentTypesRelations = relations(identityDocumentTypes, ({many}) => ({
	employees: many(employees),
	businessPartners: many(businessPartners),
}));

export const positionsRelations = relations(positions, ({many}) => ({
	employees: many(employees),
}));

export const usersRelations = relations(users, ({many}) => ({
	employees: many(employees),
	usersRoles: many(usersRoles),
}));

export const buyingStationsRelations = relations(buyingStations, ({one, many}) => ({
	ubigeo: one(ubigeos, {
		fields: [buyingStations.idUbigeos],
		references: [ubigeos.id]
	}),
	scales: many(scales),
	scaleTickets_idBuyingStations: many(scaleTickets, {
		relationName: "scaleTickets_idBuyingStations_buyingStations_id"
	}),
	scaleTickets_idBuyingStationsOrigin: many(scaleTickets, {
		relationName: "scaleTickets_idBuyingStationsOrigin_buyingStations_id"
	}),
	scaleTickets_idBuyingStationsDestination: many(scaleTickets, {
		relationName: "scaleTickets_idBuyingStationsDestination_buyingStations_id"
	}),
	buyingStationsSuppliers: many(buyingStationsSuppliers),
	operationsBuyingStations: many(operationsBuyingStations),
	employeesBuyingStations: many(employeesBuyingStations),
}));

export const ubigeosRelations = relations(ubigeos, ({many}) => ({
	buyingStations: many(buyingStations),
	businessPartners: many(businessPartners),
}));

export const scalesRelations = relations(scales, ({one, many}) => ({
	buyingStation: one(buyingStations, {
		fields: [scales.idBuyingStations],
		references: [buyingStations.id]
	}),
	scaleStatus: one(scaleStatus, {
		fields: [scales.idScaleStatus],
		references: [scaleStatus.id]
	}),
	scaleType: one(scaleTypes, {
		fields: [scales.idScaleTypes],
		references: [scaleTypes.id]
	}),
	scaleTicketDetails: many(scaleTicketDetails),
}));

export const scaleStatusRelations = relations(scaleStatus, ({many}) => ({
	scales: many(scales),
}));

export const scaleTypesRelations = relations(scaleTypes, ({many}) => ({
	scales: many(scales),
}));

export const productsRelations = relations(products, ({one, many}) => ({
	productType: one(productTypes, {
		fields: [products.idProductTypes],
		references: [productTypes.id]
	}),
	scaleTicketDetails: many(scaleTicketDetails),
}));

export const productTypesRelations = relations(productTypes, ({many}) => ({
	products: many(products),
	operationsProductTypes: many(operationsProductTypes),
}));

export const businessPartnersRelations = relations(businessPartners, ({one, many}) => ({
	identityDocumentType: one(identityDocumentTypes, {
		fields: [businessPartners.idIdentityDocumentTypes],
		references: [identityDocumentTypes.id]
	}),
	ubigeo: one(ubigeos, {
		fields: [businessPartners.idUbigeos],
		references: [ubigeos.id]
	}),
	drivers: many(drivers),
	carriers: many(carriers),
	suppliers: many(suppliers),
	clients: many(clients),
	scaleTicketsDocumentTypes: many(scaleTicketsDocumentTypes),
	businessPartnersBpRoles: many(businessPartnersBpRoles),
}));

export const driversRelations = relations(drivers, ({one, many}) => ({
	businessPartner: one(businessPartners, {
		fields: [drivers.idBusinessPartners],
		references: [businessPartners.id]
	}),
	licenseType: one(licenseTypes, {
		fields: [drivers.idLicenseTypes],
		references: [licenseTypes.id]
	}),
	scaleTickets: many(scaleTickets),
	driversCarriers: many(driversCarriers),
}));

export const licenseTypesRelations = relations(licenseTypes, ({many}) => ({
	drivers: many(drivers),
}));

export const carriersRelations = relations(carriers, ({one, many}) => ({
	businessPartner: one(businessPartners, {
		fields: [carriers.idBusinessPartners],
		references: [businessPartners.id]
	}),
	trucks: many(trucks),
	trailers: many(trailers),
	scaleTickets: many(scaleTickets),
	driversCarriers: many(driversCarriers),
}));

export const suppliersRelations = relations(suppliers, ({one, many}) => ({
	businessPartner: one(businessPartners, {
		fields: [suppliers.idBusinessPartners],
		references: [businessPartners.id]
	}),
	scaleTickets: many(scaleTickets),
	buyingStationsSuppliers: many(buyingStationsSuppliers),
}));

export const clientsRelations = relations(clients, ({one, many}) => ({
	businessPartner: one(businessPartners, {
		fields: [clients.idBusinessPartners],
		references: [businessPartners.id]
	}),
	scaleTickets: many(scaleTickets),
}));

export const trucksRelations = relations(trucks, ({one, many}) => ({
	carrier: one(carriers, {
		fields: [trucks.idBusinessPartnersCarriers],
		references: [carriers.idBusinessPartners]
	}),
	scaleTickets: many(scaleTickets),
}));

export const trailersRelations = relations(trailers, ({one, many}) => ({
	carrier: one(carriers, {
		fields: [trailers.idBusinessPartnersCarriers],
		references: [carriers.idBusinessPartners]
	}),
	scaleTickets: many(scaleTickets),
}));

export const scaleTicketsDocumentTypesRelations = relations(scaleTicketsDocumentTypes, ({one}) => ({
	businessPartner: one(businessPartners, {
		fields: [scaleTicketsDocumentTypes.idBusinessPartners],
		references: [businessPartners.id]
	}),
	documentType: one(documentTypes, {
		fields: [scaleTicketsDocumentTypes.idDocumentTypes],
		references: [documentTypes.id]
	}),
	scaleTicket: one(scaleTickets, {
		fields: [scaleTicketsDocumentTypes.idScaleTickets],
		references: [scaleTickets.id]
	}),
}));

export const documentTypesRelations = relations(documentTypes, ({many}) => ({
	scaleTicketsDocumentTypes: many(scaleTicketsDocumentTypes),
	operationsDocumentTypes: many(operationsDocumentTypes),
}));

export const scaleTicketsRelations = relations(scaleTickets, ({one, many}) => ({
	scaleTicketsDocumentTypes: many(scaleTicketsDocumentTypes),
	buyingStation_idBuyingStations: one(buyingStations, {
		fields: [scaleTickets.idBuyingStations],
		references: [buyingStations.id],
		relationName: "scaleTickets_idBuyingStations_buyingStations_id"
	}),
	buyingStation_idBuyingStationsOrigin: one(buyingStations, {
		fields: [scaleTickets.idBuyingStationsOrigin],
		references: [buyingStations.id],
		relationName: "scaleTickets_idBuyingStationsOrigin_buyingStations_id"
	}),
	buyingStation_idBuyingStationsDestination: one(buyingStations, {
		fields: [scaleTickets.idBuyingStationsDestination],
		references: [buyingStations.id],
		relationName: "scaleTickets_idBuyingStationsDestination_buyingStations_id"
	}),
	carrier: one(carriers, {
		fields: [scaleTickets.idBusinessPartnersCarriers],
		references: [carriers.idBusinessPartners]
	}),
	client: one(clients, {
		fields: [scaleTickets.idBusinessPartnersClients],
		references: [clients.idBusinessPartners]
	}),
	driver: one(drivers, {
		fields: [scaleTickets.idBusinessPartnersDrivers],
		references: [drivers.idBusinessPartners]
	}),
	employee: one(employees, {
		fields: [scaleTickets.idEmployees],
		references: [employees.id]
	}),
	operation: one(operations, {
		fields: [scaleTickets.idOperations],
		references: [operations.id]
	}),
	scaleTicketStatus: one(scaleTicketStatus, {
		fields: [scaleTickets.idScaleTicketStatus],
		references: [scaleTicketStatus.id]
	}),
	supplier: one(suppliers, {
		fields: [scaleTickets.idBusinessPartnersSuppliers],
		references: [suppliers.idBusinessPartners]
	}),
	trailer: one(trailers, {
		fields: [scaleTickets.idTrailers],
		references: [trailers.id]
	}),
	truck: one(trucks, {
		fields: [scaleTickets.idTrucks],
		references: [trucks.id]
	}),
	scaleTicketDetails: many(scaleTicketDetails),
}));

export const operationsRelations = relations(operations, ({many}) => ({
	scaleTickets: many(scaleTickets),
	operationsProductTypes: many(operationsProductTypes),
	operationsBpRoles: many(operationsBpRoles),
	operationsBuyingStations: many(operationsBuyingStations),
	operationsDocumentTypes: many(operationsDocumentTypes),
}));

export const scaleTicketStatusRelations = relations(scaleTicketStatus, ({many}) => ({
	scaleTickets: many(scaleTickets),
}));

export const scaleTicketsDetailsPackagingTypesRelations = relations(scaleTicketsDetailsPackagingTypes, ({one}) => ({
	packagingType: one(packagingTypes, {
		fields: [scaleTicketsDetailsPackagingTypes.idPackagingTypes],
		references: [packagingTypes.id]
	}),
	scaleTicketDetail: one(scaleTicketDetails, {
		fields: [scaleTicketsDetailsPackagingTypes.idScaleTicketDetails],
		references: [scaleTicketDetails.id]
	}),
}));

export const packagingTypesRelations = relations(packagingTypes, ({many}) => ({
	scaleTicketsDetailsPackagingTypes: many(scaleTicketsDetailsPackagingTypes),
}));

export const scaleTicketDetailsRelations = relations(scaleTicketDetails, ({one, many}) => ({
	scaleTicketsDetailsPackagingTypes: many(scaleTicketsDetailsPackagingTypes),
	product: one(products, {
		fields: [scaleTicketDetails.idProducts],
		references: [products.id]
	}),
	scaleTicket: one(scaleTickets, {
		fields: [scaleTicketDetails.idScaleTickets],
		references: [scaleTickets.id]
	}),
	scale: one(scales, {
		fields: [scaleTicketDetails.idScales],
		references: [scales.id]
	}),
}));

export const usersRolesRelations = relations(usersRoles, ({one}) => ({
	role: one(roles, {
		fields: [usersRoles.idRoles],
		references: [roles.id]
	}),
	user: one(users, {
		fields: [usersRoles.idUsers],
		references: [users.id]
	}),
}));

export const rolesRelations = relations(roles, ({many}) => ({
	usersRoles: many(usersRoles),
	rolesPermissions: many(rolesPermissions),
}));

export const rolesPermissionsRelations = relations(rolesPermissions, ({one}) => ({
	permission: one(permissions, {
		fields: [rolesPermissions.idPermissions],
		references: [permissions.id]
	}),
	role: one(roles, {
		fields: [rolesPermissions.idRoles],
		references: [roles.id]
	}),
}));

export const permissionsRelations = relations(permissions, ({many}) => ({
	rolesPermissions: many(rolesPermissions),
}));

export const operationsProductTypesRelations = relations(operationsProductTypes, ({one}) => ({
	operation: one(operations, {
		fields: [operationsProductTypes.idOperations],
		references: [operations.id]
	}),
	productType: one(productTypes, {
		fields: [operationsProductTypes.idProductTypes],
		references: [productTypes.id]
	}),
}));

export const buyingStationsSuppliersRelations = relations(buyingStationsSuppliers, ({one}) => ({
	buyingStation: one(buyingStations, {
		fields: [buyingStationsSuppliers.idBuyingStations],
		references: [buyingStations.id]
	}),
	supplier: one(suppliers, {
		fields: [buyingStationsSuppliers.idBusinessPartnersSuppliers],
		references: [suppliers.idBusinessPartners]
	}),
}));

export const operationsBpRolesRelations = relations(operationsBpRoles, ({one}) => ({
	bpRole: one(bpRoles, {
		fields: [operationsBpRoles.idBpRoles],
		references: [bpRoles.id]
	}),
	operation: one(operations, {
		fields: [operationsBpRoles.idOperations],
		references: [operations.id]
	}),
}));

export const bpRolesRelations = relations(bpRoles, ({many}) => ({
	operationsBpRoles: many(operationsBpRoles),
	businessPartnersBpRoles: many(businessPartnersBpRoles),
}));

export const operationsBuyingStationsRelations = relations(operationsBuyingStations, ({one}) => ({
	buyingStation: one(buyingStations, {
		fields: [operationsBuyingStations.idBuyingStations],
		references: [buyingStations.id]
	}),
	operation: one(operations, {
		fields: [operationsBuyingStations.idOperations],
		references: [operations.id]
	}),
}));

export const operationsDocumentTypesRelations = relations(operationsDocumentTypes, ({one}) => ({
	documentType: one(documentTypes, {
		fields: [operationsDocumentTypes.idDocumentTypes],
		references: [documentTypes.id]
	}),
	operation: one(operations, {
		fields: [operationsDocumentTypes.idOperations],
		references: [operations.id]
	}),
}));

export const employeesBuyingStationsRelations = relations(employeesBuyingStations, ({one}) => ({
	buyingStation: one(buyingStations, {
		fields: [employeesBuyingStations.idBuyingStations],
		references: [buyingStations.id]
	}),
	employee: one(employees, {
		fields: [employeesBuyingStations.idEmployees],
		references: [employees.id]
	}),
}));

export const businessPartnersBpRolesRelations = relations(businessPartnersBpRoles, ({one}) => ({
	bpRole: one(bpRoles, {
		fields: [businessPartnersBpRoles.idBpRoles],
		references: [bpRoles.id]
	}),
	businessPartner: one(businessPartners, {
		fields: [businessPartnersBpRoles.idBusinessPartners],
		references: [businessPartners.id]
	}),
}));

export const driversCarriersRelations = relations(driversCarriers, ({one}) => ({
	carrier: one(carriers, {
		fields: [driversCarriers.idBusinessPartnersCarriers],
		references: [carriers.idBusinessPartners]
	}),
	driver: one(drivers, {
		fields: [driversCarriers.idBusinessPartnersDrivers],
		references: [drivers.idBusinessPartners]
	}),
}));

export const databaseSchema = {
	users, roles, usersRoles, permissions, rolesPermissions, buyingStations, operations, operationsBuyingStations, employees
};