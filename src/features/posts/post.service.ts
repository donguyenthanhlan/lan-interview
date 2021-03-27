
import {
    HttpService,
    HttpStatus,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
import { GetAllPostsResponse } from './models/get-all-posts.model';
import { Post } from 'src/domains/post';
import { EndpointConstant } from 'src/shared/constants/uri.constant';
import { GetPostResponse } from './models/get-post.model';

  @Injectable()
  export class PostService {
    constructor(
        private readonly httpService: HttpService,
    ) {}
  
    async getAll(): Promise<GetAllPostsResponse> {
        const result= await this.httpService.get(EndpointConstant.SEED + '/posts').toPromise();
        const response = { posts : result.data.map(x => Post.fromJson(x))};
        return response;
    }

    async get(id : number): Promise<GetPostResponse> {
        const result = await this.httpService.get(EndpointConstant.SEED + '/posts/' + id)
        .toPromise()
        .then(response => {return response.data;})
        .catch(obj => {
            if (obj.response.data.data.status == HttpStatus.NOT_FOUND)
            throw new NotFoundException();
        });
        return Post.fromJson(result);
    }
  }
  