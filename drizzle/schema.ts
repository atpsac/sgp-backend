import { pgTable, unique, integer, varchar, timestamp, boolean, foreignKey, numeric, index, text, char, date, primaryKey, pgSequence } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"


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
export const departmentIdSeq = pgSequence("department_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const positionIdSeq = pgSequence("position_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const genderIdSeq = pgSequence("gender_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const productTypesIdSeq = pgSequence("product_types_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const scaleTypesIdSeq = pgSequence("scale_types_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const scaleStatusIdSeq = pgSequence("scale_status_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const bpRolesIdSeq = pgSequence("bp_roles_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const trailersIdSeq = pgSequence("trailers_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const licenseTypesIdSeq = pgSequence("license_types_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })
export const scaleTicketStatusIdSeq = pgSequence("scale_ticket_status_id_seq", {  startWith: "1", increment: "1", minValue: "0", maxValue: "2147483647", cache: "1", cycle: false })

export const identityDocumentTypes = pgTable("identity_document_types", {
	id: integer().default(sql`nextval('identity_document_types_id_seq'::regclass)`).primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	code: varchar({ length: 10 }).notNull(),
	description: varchar({ length: 250 }).notNull(),
	length: integer().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	unique("identity_document_types_name_unq").on(table.name),
	unique("identity_document_types_code_unq").on(table.code),
]);

export const department = pgTable("department", {
	id: integer().default(sql`nextval('department_id_seq'::regclass)`).primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	unique("department_name_unq").on(table.name),
]);

export const gender = pgTable("gender", {
	id: integer().default(sql`nextval('gender_id_seq'::regclass)`).primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	unique("gender_name_unq").on(table.name),
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
			columns: [table.idScaleTypes],
			foreignColumns: [scaleTypes.id],
			name: "scale_types_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.idScaleStatus],
			foreignColumns: [scaleStatus.id],
			name: "scale_status_fk"
		}).onUpdate("cascade").onDelete("restrict"),
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
]);

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
	unique("business_partners_document_number_unq").on(table.documentNumber),
	unique("business_partners_company_name_unq").on(table.companyName),
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
	isActive: boolean("is_active").notNull(),
}, (table) => [
	unique("operations_name_unq").on(table.name),
	unique("operations_code_unq").on(table.code),
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
			columns: [table.idDocumentTypes],
			foreignColumns: [documentTypes.id],
			name: "document_types_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.idScaleTickets],
			foreignColumns: [scaleTickets.id],
			name: "scale_tickets_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.idBusinessPartners],
			foreignColumns: [businessPartners.id],
			name: "business_partners_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	unique("scale_tickets_document_types_id_unq").on(table.idDocumentTypes, table.idScaleTickets, table.idBusinessPartners),
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
			columns: [table.idScaleTicketDetails, table.idScaleTicketsScaleTicketDetails, table.idProductsScaleTicketDetails],
			foreignColumns: [scaleTicketDetails.id, scaleTicketDetails.idScaleTickets, scaleTicketDetails.idProducts],
			name: "scale_ticket_details_fk"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.idPackagingTypes],
			foreignColumns: [packagingTypes.id],
			name: "packaging_types_fk"
		}).onUpdate("cascade").onDelete("set null"),
	unique("scale_tickets_details_packaging_types_id_unq").on(table.idScaleTicketDetails, table.idPackagingTypes),
]);

export const employees = pgTable("employees", {
	id: integer().default(sql`nextval('employees_id_seq'::regclass)`).primaryKey().notNull(),
	idIdentityDocumentTypes: integer("id_identity_document_types").notNull(),
	idGender: integer("id_gender").notNull(),
	idPosition: integer("id_position").notNull(),
	idUsers: integer("id_users"),
	idDepartment: integer("id_department").notNull(),
	firstName: varchar("first_name", { length: 50 }).notNull(),
	fLastname: varchar("f_lastname", { length: 50 }).notNull(),
	mLastname: varchar("m_lastname", { length: 50 }).notNull(),
	birthdate: date().notNull(),
	documentNumber: varchar("document_number", { length: 20 }).notNull(),
	phoneNumber: varchar("phone_number", { length: 15 }),
	affiliationDate: date("affiliation_date").notNull(),
	terminationDate: date("termination_date").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.idUsers],
			foreignColumns: [users.id],
			name: "users_fk"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.idPosition],
			foreignColumns: [position.id],
			name: "position_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.idDepartment],
			foreignColumns: [department.id],
			name: "department_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.idGender],
			foreignColumns: [gender.id],
			name: "gender_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.idIdentityDocumentTypes],
			foreignColumns: [identityDocumentTypes.id],
			name: "identity_document_types_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	unique("employees_uq").on(table.idUsers),
	unique("employees_document_number_unq").on(table.documentNumber),
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
	idTrucks: integer("id_trucks"),
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
			columns: [table.idBusinessPartnersCarriers],
			foreignColumns: [carriers.idBusinessPartners],
			name: "carriers_fk"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.idBusinessPartnersDrivers],
			foreignColumns: [drivers.idBusinessPartners],
			name: "drivers_fk"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.idBusinessPartnersClients],
			foreignColumns: [clients.idBusinessPartners],
			name: "clients_fk"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.idBusinessPartnersSuppliers],
			foreignColumns: [suppliers.idBusinessPartners],
			name: "suppliers_fk"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.idTrucks],
			foreignColumns: [trucks.id],
			name: "trucks_fk"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.idTrailers],
			foreignColumns: [trailers.id],
			name: "trailers_fk"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.idBuyingStationsDestination],
			foreignColumns: [buyingStations.id],
			name: "buying_stations_fk2"
		}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
			columns: [table.idScaleTicketStatus],
			foreignColumns: [scaleTicketStatus.id],
			name: "scale_ticket_status_fk"
		}).onUpdate("cascade").onDelete("restrict"),
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
]);

export const position = pgTable("position", {
	id: integer().default(sql`nextval('position_id_seq'::regclass)`).primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	unique("position_name_unq").on(table.name),
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
			columns: [table.idUsers],
			foreignColumns: [users.id],
			name: "users_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.idRoles],
			foreignColumns: [roles.id],
			name: "roles_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.idRoles, table.idUsers], name: "users_roles_pk"}),
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
			columns: [table.idRoles],
			foreignColumns: [roles.id],
			name: "roles_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.idPermissions],
			foreignColumns: [permissions.id],
			name: "permissions_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.idPermissions, table.idRoles], name: "roles_permissions_pk"}),
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
	primaryKey({ columns: [table.idBuyingStations, table.idBusinessPartnersSuppliers], name: "buying_stations_suppliers_pk"}),
]);

export const bpRolesOperations = pgTable("bp_roles_operations", {
	idOperations: integer("id_operations").notNull(),
	idBpRoles: integer("id_bp_roles").notNull(),
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
			columns: [table.idBpRoles],
			foreignColumns: [bpRoles.id],
			name: "bp_roles_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.idOperations, table.idBpRoles], name: "bp_roles_operations_pk"}),
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
			columns: [table.idEmployees],
			foreignColumns: [employees.id],
			name: "employees_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.idBuyingStations],
			foreignColumns: [buyingStations.id],
			name: "buying_stations_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.idEmployees, table.idBuyingStations], name: "employees_buying_stations_pk"}),
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
			columns: [table.idBusinessPartners],
			foreignColumns: [businessPartners.id],
			name: "business_partners_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.idBpRoles],
			foreignColumns: [bpRoles.id],
			name: "bp_roles_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.idBusinessPartners, table.idBpRoles], name: "business_partners_bp_roles_pk"}),
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
	primaryKey({ columns: [table.idBusinessPartnersDrivers, table.idBusinessPartnersCarriers], name: "drivers_carriers_pk"}),
]);

export const scaleTicketDetails = pgTable("scale_ticket_details", {
	id: integer().default(sql`nextval('scale_ticket_details_id_seq'::regclass)`).notNull(),
	idScaleTickets: integer("id_scale_tickets").notNull(),
	idProducts: integer("id_products").notNull(),
	idScales: integer("id_scales").notNull(),
	grossWeight: numeric("gross_weight", { precision: 10, scale:  2 }).notNull(),
	tareWeight: numeric("tare_weight", { precision: 10, scale:  2 }).notNull(),
	netWeight: numeric("net_weight", { precision: 10, scale:  2 }).notNull(),
	observations: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdBy: integer("created_by").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedBy: integer("updated_by").notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
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
	foreignKey({
			columns: [table.idProducts],
			foreignColumns: [products.id],
			name: "products_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.id, table.idScaleTickets, table.idProducts], name: "scale_ticket_details_pk"}),
]);
