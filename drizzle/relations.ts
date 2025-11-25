import { relations } from "drizzle-orm/relations";
import { departments, employees, genders, identityDocumentTypes, positions, users, ubigeos, buyingStations, scales, scaleStatus, scaleTypes, productTypes, products, businessPartners, drivers, licenseTypes, carriers, suppliers, clients, trucks, trailers, scaleTicketsDocumentTypes, documentTypes, scaleTickets, operations, scaleTicketStatus, packagingTypes, scaleTicketsDetailsPackagingTypes, scaleTicketDetails, roles, usersRoles, permissions, rolesPermissions, operationsProductTypes, buyingStationsSuppliers, bpRoles, bpRolesOperations, operationsBuyingStations, operationsDocumentTypes, employeesBuyingStations, businessPartnersBpRoles, driversCarriers } from "./schema";

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
	bpRolesOperations: many(bpRolesOperations),
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

export const bpRolesOperationsRelations = relations(bpRolesOperations, ({one}) => ({
	bpRole: one(bpRoles, {
		fields: [bpRolesOperations.idBpRoles],
		references: [bpRoles.id]
	}),
	operation: one(operations, {
		fields: [bpRolesOperations.idOperations],
		references: [operations.id]
	}),
}));

export const bpRolesRelations = relations(bpRoles, ({many}) => ({
	bpRolesOperations: many(bpRolesOperations),
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