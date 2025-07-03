import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestComponentModule } from './test-component/test-component.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TestComponentModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
