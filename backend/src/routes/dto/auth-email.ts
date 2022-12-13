import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAuthDataDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

export class AuthEmailDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsNumber()
  readonly code: number;
}
