import { ApiProperty } from "@nestjs/swagger";


export class AuthEntity {
  @ApiProperty()
  acessTocken: string;
}