import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDetail } from "./userDetail.entity";
import { Repository } from "typeorm";
import { userDetailDto } from "src/model";

@Injectable()
export class UserDetailService{

    constructor(
        @InjectRepository(UserDetail)
        private userRepository : Repository<UserDetail>
    ){}

    async findAllUser(): Promise<userDetailDto[]>{
        return this.userRepository.find();
    }

    async createUser(user : any) : Promise<userDetailDto[]>{
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    async update(id : number , user : userDetailDto): Promise<userDetailDto>{
        delete user.id;
        await this.userRepository.update(id, user);
        return this.userRepository.findOne({ where: { id } });
    }

    async delete(id : number): Promise<any>{
        return this.userRepository.delete(id);
    }
}