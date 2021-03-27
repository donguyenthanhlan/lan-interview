
import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    ValidationPipe,
    UsePipes,
    Query,
    Put,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
  import { AuthService } from './auth.service';
import { PostSignInRequest, PostSignInResponse } from './models/sign-in.model';
  
  @Controller('auth')
  @ApiTags('authentication')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @ApiOperation({summary: 'Sign in'})
    @Post('signin')
    async signIn(@Body() request: PostSignInRequest): Promise<PostSignInResponse> {
      return await this.authService.signIn(request);
    }
  
  }
  