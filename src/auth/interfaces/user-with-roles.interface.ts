export interface UserWithRolesResult {
    id: number;
    username: string;
    email: string;
    roles: Array<{
      name: string;
      permissions: string[];
    }>;
    [key: string]: unknown;
  }