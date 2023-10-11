import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_NOT_FOUND } from './user.constants';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.createUser(dto);
    }

    @Get(':id')
    async getUserProfile(@Param() id: string) {
        const result = await this.userService.getUserProfile(id);

        if (!result) {
            throw new NotFoundException(USER_NOT_FOUND);
        }

        return result;
    }
}
