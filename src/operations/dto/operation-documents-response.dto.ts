export class OperationDocumentsResponseDto {
    operationId: number;
    operationName: string;
    documents: DocumentItemDto[];
  }
  
  export class DocumentItemDto {
    id: number;
    code: string;
    name: string;
  }

  export class OperationsBuyingStationResponseDto {
    id: number;
    name: string;
    code: string;
    description: string;
  }