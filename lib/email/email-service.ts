import { render } from '@react-email/render';
import { sendEmail } from './nodemailer';
import { EmailTemplateProps, EmailType } from '@/lib/types/email';
import MagicLinkEmail from '@/emails/templates/MagicLinkEmail';
import WelcomeEmail from '@/emails/templates/WelcomeEmail';
import VerificationOTPEmail from '@/emails/templates/VerificationOTPEmail';
import { createElement } from 'react';

export class EmailService {
    private static async renderAndSend<T extends EmailType>({
        template,
        props,
        email,
        subject
    }: {
        template: React.ComponentType<EmailTemplateProps[T]>;
        props: EmailTemplateProps[T];
        email: string;
        subject: string;
    }) {
        try {
            const emailHtml = await render(createElement(template, props));

            await sendEmail({
                to: email,
                subject,
                html: emailHtml,
            });

            console.log(`${subject} email sent successfully to:`, email);
        } catch (error) {
            console.error(`Failed to send ${subject} email:`, error);
            throw error;
        }
    }

    static async sendMagicLinkEmail({ email, url }: { email: string; url: string }) {
        console.log('Sending magic link to', email);
        console.log('Magic link:', url);
        await this.renderAndSend<'MagicLink'>({
            template: MagicLinkEmail,
            props: { url },
            email,
            subject: 'Sign in to Your Account',
        });
    }

    static async sendWelcomeEmail({ 
        email, 
        username, 
        verificationUrl 
    }: { 
        email: string; 
        username: string; 
        verificationUrl: string;
    }) {
        await this.renderAndSend<'Welcome'>({
            template: WelcomeEmail,
            props: { username, verificationUrl },
            email,
            subject: 'Welcome to Our Platform!',
        });
    }

    static async sendVerificationOTP({ 
        email, 
        otp, 
        type 
    }: EmailTemplateProps['VerificationOTP'] & { email: string }) {
        const subjects = {
            signup: 'Complete your registration',
            login: 'Login verification code',
            'reset-password': 'Reset your password',
        };

        await this.renderAndSend<'VerificationOTP'>({
            template: VerificationOTPEmail,
            props: { email, otp, type },
            email,
            subject: subjects[type],
        });
    }
}