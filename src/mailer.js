import nodemailer from 'nodemailer';
import NHTT from 'nodemailer-html-to-text';

class Mailer {
  constructor({ from, ...config }) {
    this.transporter = nodemailer.createTransport(config, { from });
    this.transporter.use('compile', NHTT.htmlToText());

    this.close = this.close.bind(this);
    this.send = this.send.bind(this);
    this.verify = this.verify.bind(this);
  }

  close() {
    return this.transporter.close();
  }

  send({
    to, subject, html, cc, bcc,
  }) {
    return this.transporter.sendMail({
      to, subject, html, cc, bcc,
    });
  }

  verify() {
    return this.transporter.verify();
  }
}

export default Mailer;
