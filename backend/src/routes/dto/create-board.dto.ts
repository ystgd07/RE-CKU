import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsString()
  readonly hashTags: string | null;

  @IsNumber()
  readonly resumeId: number | string | null;
}
