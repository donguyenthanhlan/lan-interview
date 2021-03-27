
import { HttpModule, Module } from '@nestjs/common';

import { SharedModule } from 'src/shared/shared.module';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    SharedModule,
    HttpModule.register({
        timeout: 5000,
        maxRedirects: 5,
      }),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
