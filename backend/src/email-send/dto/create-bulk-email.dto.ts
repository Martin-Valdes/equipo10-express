// create-bulk-email.dto.ts
export class CreateBulkEmailDto {
  recipients: string[]; // lista de correos
  subject: string;
  content: string;
}
