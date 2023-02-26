import { Auth } from './entities/auth.entity';
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async signIn(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;
    const user = await this.authRepository.findOneBy({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email };

      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

  async create(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    const user = this.authRepository.create({
      email,
      password: hashedPassword,
    });
    try {
      return await this.authRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing Email');
      } else {
        throw new InternalServerErrorException();
      }
    }
    // return 'This action adds a new auth';
  }

  async findAll() {
    return await this.authRepository.find();
    // return `This action returns all auth`;
  }
  async findOneByEmail(email: string) {
    return await this.authRepository.findOneByOrFail({ email });
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
