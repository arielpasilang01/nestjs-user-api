import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ status: number; message: string; data: string }> {
    const user = await this.usersService.findUserByUserName(username);

    if (user?.password !== pass) {
      // throw new UnauthorizedException();
      return {
        status: 400,
        message: 'Incorrect Password',
        data: '',
      };
    }
    const payload = { sub: user.id, username: user.username };
    return {
      status: 200,
      message: 'Successful Login',
      data: await this.jwtService.signAsync(payload),
    };
  }
}

// status
// message
// data
