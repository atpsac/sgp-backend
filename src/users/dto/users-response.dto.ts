import { BuyingStationsResponseDto } from "src/buying-stations/dto/buying-stations-response.dto";

export class EmployeeStationsResponseDto {
    userId: number;
    username: string;
    employeeId: number;
    employeeFullName: string;
    stations: BuyingStationsResponseDto[];
}

