export class AuthService {
  getStatus() {
    return { feature: 'auth', status: 'ready' };
  }
}
