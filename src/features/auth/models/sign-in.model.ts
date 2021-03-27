import { ApiProperty  } from '@nestjs/swagger';
import { IsEmail, Matches } from 'class-validator';
import { IsEmailExist } from 'src/shared/validators/is-email-exist.validator';

export class PostSignInRequest {
  @ApiProperty()
  @IsEmail(
    {},
    {
      message:
        'Please enter a valid email address, for example lan.do@b13technology.com',
    },
  )
  @IsEmailExist({
    message: 'Email $value does not exists.',
  })
  readonly email: string;

  @ApiProperty()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'Password contains only digit and word',
  })
  readonly password: string;
}

export class PostSignInResponse {
    token: string;
    expiredIn: number;
  }
  
