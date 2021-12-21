import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  id: number;

  @ApiProperty({
    type: 'string',
    description: `User's name`,
  })
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  created_at: Date;
}
