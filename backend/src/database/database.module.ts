import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService): MysqlConnectionOptions => ({
        type: 'mysql',
        host: configService.getOrThrow<string>('DB_HOST'),
        port: parseInt(configService.getOrThrow<string>('DB_PORT')),
        username: configService.getOrThrow<string>('DB_USERNAME'),
        password: configService.getOrThrow<string>('DB_PASSWORD'),
        database: configService.getOrThrow<string>('DB_NAME'),
        entities: [Task],
        synchronize: true, // IMPORTANT: disable once production data is present
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
