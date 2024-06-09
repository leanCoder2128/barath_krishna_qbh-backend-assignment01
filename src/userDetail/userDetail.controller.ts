import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDetailService } from './userDetail.service';
import { UserDetail } from './userDetail.entity';
import { userDetailDto } from 'src/model';

@Controller('user')
export class UserController {
  constructor(private readonly userSvc: UserDetailService) {}

  @Get()
  async findAllUser(): Promise<userDetailDto[]> {
    return this.userSvc.findAllUser();
  }

  @Post()
  async CreateuserDetail(@Body() user: UserDetail): Promise<userDetailDto[]> {
    return this.userSvc.createUser(user);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: UserDetail): Promise<userDetailDto> {
    return this.userSvc.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<userDetailDto> {
    return this.userSvc.delete(id);
  }
}
