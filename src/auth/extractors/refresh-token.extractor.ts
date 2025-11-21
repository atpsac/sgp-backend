export function refreshTokenExtractor(req: any): string | null {
    // 1. Header estándar OAuth2
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.replace('Bearer ', '').trim();
    }
  
    // 2. Cabecera personalizada opcional
    const xToken = req.headers['x-refresh-token'];
    if (xToken) return xToken as string;
  
    return null;
  }