

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
    Param,
    BadRequestException,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/shared/guard/role.guard';
import { GetAllPostsResponse } from './models/get-all-posts.model';
import { GetPostResponse } from './models/get-post.model';
import { PostService } from './post.service';
  
  @Controller('posts')
  @ApiTags('posts')
  export class PostController {
    constructor(private readonly postService: PostService) {}
  
    @ApiOperation({summary: 'Get all'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get()
    async getAll(): Promise<GetAllPostsResponse> {
      return await this.postService.getAll();
    }
  
    @ApiOperation({summary: 'Get'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get(':id')
    async get(@Param() params): Promise<GetPostResponse> {
      const { id }= params;
      return await this.postService.get(id);
    }
  }
  