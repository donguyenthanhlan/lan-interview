import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './posts/post.module';

@Module({
  imports: [
    AuthModule,
    PostModule,
  ],
  exports: [
    AuthModule,
    PostModule
  ],
})
export class FeaturesModule {}
