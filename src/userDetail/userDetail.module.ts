import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserDetail } from "./userDetail.entity";
import { UserDetailService } from "./userDetail.service";
import { UserController } from "./userDetail.controller";

@Module({
    imports : [TypeOrmModule.forFeature([UserDetail])],
    providers: [UserDetailService],
    controllers : [UserController]
})
export class UserModule{}