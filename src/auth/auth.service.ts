import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly INITIAL_ADMIN_TOKEN = `${process.env.INITIAL_ADMIN_TOKEN}` || 'initial-secret';
  private isInitialUserCreated = false;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: any, adminToken?: string) {
    if (this.isInitialUserCreated && adminToken !== this.INITIAL_ADMIN_TOKEN) {
      throw new UnauthorizedException('Invalid admin token');
    }

    userData.password = await bcrypt.hash(userData.password, 10);
    const user = await this.usersService.create(userData);
    
    if (!this.isInitialUserCreated) {
      this.isInitialUserCreated = true;
    }
    
    return user;
  }

  async createInitialUser() {
    const adminExists = await this.usersService.findByUsername('admin');
    if (!adminExists) {
      await this.register({
        username: `${process.env.INITIAL_ADMIN_USERNAME || 'admin'}`,
        password: `${process.env.INITIAL_ADMIN_PASSWORD || 'admin123'}`,
      }, this.INITIAL_ADMIN_TOKEN);
      console.log('Initial admin user created');
    }
  }
}