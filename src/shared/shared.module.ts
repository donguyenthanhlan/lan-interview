import { Module } from '@nestjs/common';
import { IsEmailExistValidator } from './validators/is-email-exist.validator';

@Module({
  imports: [],
  providers: [
    IsEmailExistValidator,
  ],
})
export class SharedModule {}
