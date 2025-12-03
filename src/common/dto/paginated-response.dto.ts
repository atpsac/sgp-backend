export class PaginatedData<T> {
    items: T[];
    total: number;        // Total de elementos sin paginar
    page: number;         // Página actual
    pageSize: number;     // Tamaño de página
  
    constructor(items: T[], total: number, page: number, pageSize: number) {
      this.items = items;
      this.total = total;
      this.page = page;
      this.pageSize = pageSize;
    }
  }