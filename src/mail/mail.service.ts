import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: CreateUserDto, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <karenfigueroar.0119@gmail.com>', // override default from
      subject: 'Recover password',
      template: './recovery', // `.hbs` extension is appended automatically
      context: {
        name: user.name,
        url,
      },
    });
  }
}
