import { Controller, Post, Body, UseGuards, Request, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth, ApiHeader, ApiOperation } from '@nestjs/swagger';

class RegisterDto {
  username: string;
  password: string;
}

class LoginDto {
  username: string;
  password: string;
}

class ProfileResponse {
  id: number;
  username: string;
}

class LoginResponse {
  access_token: string;
}

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ 
    summary: 'Register new user', 
    description: 'Register a new user. First registration doesn\'t require admin token. Subsequent registrations require valid x-admin-token header.' 
  })
  @ApiHeader({
    name: 'x-admin-token',
    description: 'Admin token required for registration after first user is created',
    required: false,
  })
  @ApiBody({ 
    type: RegisterDto,
    examples: {
      example1: {
        value: {
          username: 'newuser',
          password: 'securePassword123'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'User successfully registered',
    type: ProfileResponse
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Invalid admin token or unauthorized' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request (invalid data format)' 
  })
  async register(
    @Body() userData: RegisterDto,
    @Headers('x-admin-token') adminToken: string,
  ) {
    return this.authService.register(userData, adminToken);
  }

  @Post('login')
  @ApiOperation({ 
    summary: 'User login', 
    description: 'Authenticate user and return JWT token' 
  })
  @ApiBody({ 
    type: LoginDto,
    examples: {
      example1: {
        value: {
          username: 'admin',
          password: 'admin'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Successful login',
    type: LoginResponse
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Invalid credentials' 
  })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    return this.authService.login(user);
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ 
    summary: 'Get user profile', 
    description: 'Get current user profile (requires valid JWT)' 
  })
  @ApiResponse({
    status: 200,
    description: 'User profile data',
    type: ProfileResponse
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized (invalid/missing token)' 
  })
  async getProfile(@Request() req) {
    return req.user;
  }
}