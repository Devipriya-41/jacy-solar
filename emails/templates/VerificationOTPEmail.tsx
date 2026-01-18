import {
    Html,
    Body,
    Container,
    Section,
    Text,
    Preview,
    Hr,
} from '@react-email/components';
import { EmailTemplateProps } from '@/lib/types';

export default function VerificationOTPEmail({ otp, type }: EmailTemplateProps['VerificationOTP']) {
    const getSubjectByType = () => {
        switch (type) {
            case 'signup':
                return 'Complete your registration';
            case 'login':
                return 'Login verification code';
            case 'reset-password':
                return 'Reset your password';
            default:
                return 'Verification code';
        }
    };

    return (
        <Html>
            <Preview>{getSubjectByType()}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={content}>
                        <Text style={heading}>{getSubjectByType()}</Text>
                        <Text style={paragraph}>
                            Your verification code is:
                        </Text>
                        <Text style={otpStyle}>{otp}</Text>
                        <Text style={paragraph}>
                            This code will expire in 10 minutes. If you didn&apos;t request this code, you can safely ignore this email.
                        </Text>
                    </Section>
                    <Hr style={hr} />
                    <Text style={footer}>
                        © {new Date().getFullYear()} Your Company. All rights reserved.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
    maxWidth: '600px',
};

const content = {
    padding: '0 48px',
};

const heading = {
    fontSize: '24px',
    letterSpacing: '-0.5px',
    lineHeight: '1.3',
    fontWeight: '400',
    color: '#484848',
    padding: '17px 0 0',
};

const paragraph = {
    margin: '0 0 15px',
    fontSize: '15px',
    lineHeight: '1.4',
    color: '#3c4149',
};

const otpStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#5850ec',
    letterSpacing: '0.5em',
    textAlign: 'center' as const,
    padding: '20px 0',
};

const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 0',
};

const footer = {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center' as const,
};