import { Controller, Post, Body, UsePipes, ValidationPipe, HttpCode} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @Post('/login')
    login(@Body() userDto: UserLoginDto) {
        return this.authService.login(userDto)
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
