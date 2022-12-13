import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAuthDataDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
