import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      // schemaファイルのパスを指定
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // 生成されたschemaを自動でsortされるためのオプションをオンにする
      sortSchema: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
