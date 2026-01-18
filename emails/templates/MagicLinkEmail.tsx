import { Section, Text, Button, Preview, Hr } from '@react-email/components';
import { EmailTemplateProps } from '@/lib/types';
import EmailLayout from '../components/EmailLayout';
import { emailStyles } from '../styles/email';

export default function MagicLinkEmail({ url }: EmailTemplateProps['MagicLink']) {
    return (
        <EmailLayout>
            <Preview>Sign in to your account</Preview>
            <Section style={emailStyles.content}>
                <Text style={emailStyles.heading}>Sign in to your account</Text>
                <Text style={emailStyles.paragraph}>
                    Click the button below to sign in to your account. This link will expire in 24 hours.
                </Text>
                <Button href={url} style={emailStyles.button}>
                    Sign in
                </Button>
                <Text style={emailStyles.paragraph}>
                    If you didn&apos;t request this email, you can safely ignore it.
                </Text>
            </Section>
            <Hr style={emailStyles.hr} />
            <Text style={emailStyles.footer}>
                © {new Date().getFullYear()} Your Company. All rights reserved.
            </Text>
        </EmailLayout>
    );
}