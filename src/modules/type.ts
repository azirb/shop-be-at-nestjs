import { ApiProperty } from "@nestjs/swagger";

export class NotFoundResponse {
    @ApiProperty()
    response : string; 
    @ApiProperty()
    statusCode : number;
    @ApiProperty()
    message : string; 
}