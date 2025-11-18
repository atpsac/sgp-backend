import { relations } from "drizzle-orm/relations";
import { users, employees, position, department, gender, identityDocumentTypes, ubigeos, buyingStations, scales, scaleTypes, scaleStatus, productTypes, products, businessPartners, drivers, licenseTypes, carriers, suppliers, clients, trucks, trailers, documentTypes, scaleTicketsDocumentTypes, scaleTickets, scaleTicketStatus, operations, scaleTicketDetails, scaleTicketsDetailsPackagingTypes, packagingTypes, usersRoles, roles, rolesPermissions, permissions, operationsProductTypes, buyingStationsSuppliers, bpRoles, bpRolesOperations, employeesBuyingStations, businessPartnersBpRoles, driversCarriers } from "./schema";

export const employeesRelations = relations(employees, ({one, many}) => ({
	user: one(users, {
		fields: [employees.idUsers],
		references: [users.id]
	}),
	position: one(position, {
		fields: [employees.idPosition],
		references: [position.id]
	}),
	department: one(department, {
		fields: [employees.idDepartment],
		references: [department.id]
	}),
	gender: one(gender, {
		fields: [employees.idGender],
		references: [gender.id]
	}),
	identityDocumentType: one(identityDocumentTypes, {
		fields: [employees.idIdentityDocumentTypes],
		references: [identityDocumentTypes.id]
	}),
	scaleTickets: many(scaleTickets),
	employeesBuyingStations: many(employeesBuyingStations),
}));

export const usersRelations = relations(users, ({many}) => ({
	employees: many(employees),
	usersRoles: many(usersRoles),
}));

export const positionRelations = relations(position, ({many}) => ({
	employees: many(employees),
}));

export const departmentRelations = relations(department, ({many}) => ({
	employees: many(employees),
}));

export const genderRelations = relations(gender, ({many}) => ({
	employees: many(employees),
}));

export const identityDocumentTypesRelations = relations(identityDocumentTypes, ({many}) => ({
	employees: many(employees),
	businessPartners: many(businessPartners),
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
	scaleType: one(scaleTypes, {
		fields: [scales.idScaleTypes],
		references: [scaleTypes.id]
	}),
	scaleStatus: one(scaleStatus, {
		fields: [scales.idScaleStatus],
		references: [scaleStatus.id]
	}),
	scaleTicketDetails: many(scaleTicketDetails),
}));

export const scaleTypesRelations = relations(scaleTypes, ({many}) => ({
	scales: many(scales),
}));

export const scaleStatusRelations = relations(scaleStatus, ({many}) => ({
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
	ubigeo: one(ubigeos, {
		fields: [businessPartners.idUbigeos],
		references: [ubigeos.id]
	}),
	identityDocumentType: one(identityDocumentTypes, {
		fields: [businessPartners.idIdentityDocumentTypes],
		references: [identityDocumentTypes.id]
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
	documentType: one(documentTypes, {
		fields: [scaleTicketsDocumentTypes.idDocumentTypes],
		references: [documentTypes.id]
	}),
	businessPartner: one(businessPartners, {
		fields: [scaleTicketsDocumentTypes.idBusinessPartners],
		references: [businessPartners.id]
	}),
	scaleTicket: one(scaleTickets, {
		fields: [scaleTicketsDocumentTypes.idScaleTickets],
		references: [scaleTickets.id]
	}),
}));

export const documentTypesRelations = relations(documentTypes, ({many}) => ({
	scaleTicketsDocumentTypes: many(scaleTicketsDocumentTypes),
}));

export const scaleTicketsRelations = relations(scaleTickets, ({one, many}) => ({
	scaleTicketsDocumentTypes: many(scaleTicketsDocumentTypes),
	scaleTicketStatus: one(scaleTicketStatus, {
		fields: [scaleTickets.idScaleTicketStatus],
		references: [scaleTicketStatus.id]
	}),
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
	employee: one(employees, {
		fields: [scaleTickets.idEmployees],
		references: [employees.id]
	}),
	operation: one(operations, {
		fields: [scaleTickets.idOperations],
		references: [operations.id]
	}),
	carrier: one(carriers, {
		fields: [scaleTickets.idBusinessPartnersCarriers],
		references: [carriers.idBusinessPartners]
	}),
	driver: one(drivers, {
		fields: [scaleTickets.idBusinessPartnersDrivers],
		references: [drivers.idBusinessPartners]
	}),
	client: one(clients, {
		fields: [scaleTickets.idBusinessPartnersClients],
		references: [clients.idBusinessPartners]
	}),
	supplier: one(suppliers, {
		fields: [scaleTickets.idBusinessPartnersSuppliers],
		references: [suppliers.idBusinessPartners]
	}),
	truck: one(trucks, {
		fields: [scaleTickets.idTrucks],
		references: [trucks.id]
	}),
	trailer: one(trailers, {
		fields: [scaleTickets.idTrailers],
		references: [trailers.id]
	}),
	buyingStation_idBuyingStationsDestination: one(buyingStations, {
		fields: [scaleTickets.idBuyingStationsDestination],
		references: [buyingStations.id],
		relationName: "scaleTickets_idBuyingStationsDestination_buyingStations_id"
	}),
	scaleTicketDetails: many(scaleTicketDetails),
}));

export const scaleTicketStatusRelations = relations(scaleTicketStatus, ({many}) => ({
	scaleTickets: many(scaleTickets),
}));

export const operationsRelations = relations(operations, ({many}) => ({
	scaleTickets: many(scaleTickets),
	operationsProductTypes: many(operationsProductTypes),
	bpRolesOperations: many(bpRolesOperations),
}));

export const scaleTicketsDetailsPackagingTypesRelations = relations(scaleTicketsDetailsPackagingTypes, ({one}) => ({
	scaleTicketDetail: one(scaleTicketDetails, {
		fields: [scaleTicketsDetailsPackagingTypes.idScaleTicketDetails],
		references: [scaleTicketDetails.id]
	}),
	packagingType: one(packagingTypes, {
		fields: [scaleTicketsDetailsPackagingTypes.idPackagingTypes],
		references: [packagingTypes.id]
	}),
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

export const packagingTypesRelations = relations(packagingTypes, ({many}) => ({
	scaleTicketsDetailsPackagingTypes: many(scaleTicketsDetailsPackagingTypes),
}));

export const usersRolesRelations = relations(usersRoles, ({one}) => ({
	user: one(users, {
		fields: [usersRoles.idUsers],
		references: [users.id]
	}),
	role: one(roles, {
		fields: [usersRoles.idRoles],
		references: [roles.id]
	}),
}));

export const rolesRelations = relations(roles, ({many}) => ({
	usersRoles: many(usersRoles),
	rolesPermissions: many(rolesPermissions),
}));

export const rolesPermissionsRelations = relations(rolesPermissions, ({one}) => ({
	role: one(roles, {
		fields: [rolesPermissions.idRoles],
		references: [roles.id]
	}),
	permission: one(permissions, {
		fields: [rolesPermissions.idPermissions],
		references: [permissions.id]
	}),
}));

export const permissionsRelations = relations(permissions, ({many}) => ({
	rolesPermissions: many(rolesPermissions),
}));

export const operationsProductTypesRelations = relations(operationsProductTypes, ({one}) => ({
	productType: one(productTypes, {
		fields: [operationsProductTypes.idProductTypes],
		references: [productTypes.id]
	}),
	operation: one(operations, {
		fields: [operationsProductTypes.idOperations],
		references: [operations.id]
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

export const employeesBuyingStationsRelations = relations(employeesBuyingStations, ({one}) => ({
	employee: one(employees, {
		fields: [employeesBuyingStations.idEmployees],
		references: [employees.id]
	}),
	buyingStation: one(buyingStations, {
		fields: [employeesBuyingStations.idBuyingStations],
		references: [buyingStations.id]
	}),
}));

export const businessPartnersBpRolesRelations = relations(businessPartnersBpRoles, ({one}) => ({
	businessPartner: one(businessPartners, {
		fields: [businessPartnersBpRoles.idBusinessPartners],
		references: [businessPartners.id]
	}),
	bpRole: one(bpRoles, {
		fields: [businessPartnersBpRoles.idBpRoles],
		references: [bpRoles.id]
	}),
}));

export const driversCarriersRelations = relations(driversCarriers, ({one}) => ({
	driver: one(drivers, {
		fields: [driversCarriers.idBusinessPartnersDrivers],
		references: [drivers.idBusinessPartners]
	}),
	carrier: one(carriers, {
		fields: [driversCarriers.idBusinessPartnersCarriers],
		references: [carriers.idBusinessPartners]
	}),
}));