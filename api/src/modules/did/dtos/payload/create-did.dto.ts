import { ApiProperty } from '@nestjs/swagger';

export class CreateDidDto {
  @ApiProperty({
    description: 'schema type. project | creditBatch',
    required: true,
    example: 'creditBatch',
  })
  type: string;
  @ApiProperty({
    description: 'schema data as JSON object',
    required: true,
    example:
      '{"project": "did:ebf:80f81fbf42d7d4922eb700ae460948fdd96b20c3b52e4cd66ce06a3967fc8590", "methodology": "ACM0002"}',
  })
  data: object;
  @ApiProperty({
    description: 'schema URL that define structure of the schema data',
    required: true,
    example:
      'https://raw.githubusercontent.com/Aldeia-IT/didz-schema/main/credit-batches/0.1/credit-batch.schema.json',
  })
  schemaUrl: string;
}
