import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  readonly reason: string;

  @IsNotEmpty()
  @IsNumber()
  readonly defendantUserId: number;
}
