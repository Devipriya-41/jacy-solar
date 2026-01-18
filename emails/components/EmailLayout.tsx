import { Html, Body, Container } from '@react-email/components';
import { emailStyles } from '../styles/email';
import { EmailLayoutProps } from '@/lib/types';

export default function EmailLayout({ children }: EmailLayoutProps) {
    return (
        <Html>
            <Body style={emailStyles.main}>
                <Container style={emailStyles.container}>
                    {children}
                </Container>
            </Body>
        </Html>
    );
}