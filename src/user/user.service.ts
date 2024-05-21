import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async onModuleInit() {
    const MOCK_USER = {
      name: 'huynhdn',
      email: 'huynhdn@vmogroup.com',
      password: 'abcd1234',
    };
    const userCount = await this.userRepository.count({});
    if (userCount === 0) {
      const uModel = new UserEntity();
      uModel.email = MOCK_USER.email;
      uModel.password = await bcrypt.hash(MOCK_USER.password, 12);
      uModel.name = MOCK_USER.name;
      await this.userRepository.save(uModel);
      this.logger.log('added mock user');
    }
  }
}
