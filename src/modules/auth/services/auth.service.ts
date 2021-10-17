import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { UsersService } from '@/modules/users/services/users.service';

export type LoginPayload = {
  login: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ login, password }: LoginPayload): Promise<any> {
    const user = await this.userService.findByEmail(login);

    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
