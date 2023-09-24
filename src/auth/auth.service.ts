import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserLoginDto } from './dto/user-login.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { ALREADY_REGISTERED_ERROR } from './auth.constants';
import { ICreateUser } from './types/create-user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async login(dto: UserLoginDto) {
        const user = await this.validateUser(dto);
        return this.generateToken(user.email);
    }

    async registration(dto: ICreateUser) {
        const candidate = await this.userService.getUserByEmail(dto.email);
        if (candidate) {
            throw new BadRequestException(ALREADY_REGISTERED_ERROR);
        }
        const salt = await genSalt(10);
        const { password, ...restDto } = dto;
        const passwordHash = await hash(password, salt);
        const user = await this.userService.createUser({ ...restDto, passwordHash });
        return this.generateToken(user.email);
    }

    private async generateToken(email: string) {
        const payload = { email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    private async validateUser(userDto: UserLoginDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await compare(userDto.password, user.passwordHash);
        if (passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({ message: 'Некорректный емайл или пароль' });
    }
}
