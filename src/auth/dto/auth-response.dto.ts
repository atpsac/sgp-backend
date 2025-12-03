export class AuthResponseDto {
    id: number;
    email: string;
    username: string;
    access_token: string;
    refresh_token: string;
}

export class LogoutResponseDto {
    id: number;
    email: string;
    username: string;
    updatedAt: string;
  }