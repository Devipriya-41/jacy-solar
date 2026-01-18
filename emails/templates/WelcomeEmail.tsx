// src/emails/templates/WelcomeEmail.tsx
import {
  Html,
  Body,
  Container,
  Section,
  Text,
  Button,
  Preview,
  Hr,
  Img,
} from '@react-email/components';
import { EmailTemplateProps } from '@/lib/types';

export default function WelcomeEmail({ username, verificationUrl }: EmailTemplateProps['Welcome']) {
  return (
    <Html>
      <Preview>Welcome to our platform, {username}!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img
              src="https://your-logo.com/logo.png"
              width="40"
              height="40"
              alt="Logo"
            />
          </Section>
          <Section style={content}>
            <Text style={heading}>Welcome, {username}!</Text>
            <Text style={paragraph}>
              We&apos;re excited to have you on board. Please verify your email to get started.
            </Text>
            <Button
              href={verificationUrl}
              style={button}
            >
              Verify Email
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            © 2024 Your Company. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Responsive styles
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

const logo = {
  padding: '32px 20px',
  textAlign: 'center' as const,
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

const button = {
  backgroundColor: '#5850ec',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '15px',
  fontWeight: '500',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
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