export class ApiResponse<T> {
    status: 'success' | 'error';
    message?: string;
    data: T[]; // Siempre es un arreglo
  
    constructor(data: T[] = [], message?: string, status: 'success' | 'error' = 'success') {
      this.data = data;
      this.message = message;
      this.status = status;
    }
  }