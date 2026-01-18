export interface EmailTemplateProps {
    MagicLink: {
        url: string;
    };
    Welcome: {
        username: string;
        verificationUrl: string;
    };
    VerificationOTP: {
        email: string;
        otp: string;
        type: 'signup' | 'login' | 'reset-password';
    };
}

export type EmailType = keyof EmailTemplateProps;

export interface EmailPayload {
    to: string;
    subject: string;
    html: string;
}

export interface EmailTemplate {
    to: string;
    subject: string;
    props: Record<string, unknown>;
}