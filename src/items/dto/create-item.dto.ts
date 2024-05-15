import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from "class-validator";

export class CreateItemDto {
    // 文字列かどうかのバリデーション
    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    name: string;

    @IsInt()
    @Min(1)
    // リクエストは文字列で渡ってくることがあるため、
    // class-transformerのTypeデコレーターを使ってプロパティをnumber型だと認識されるようにする
    @Type(() => Number)
    price: number;

    @IsString()
    @IsNotEmpty()
    description: string;
}