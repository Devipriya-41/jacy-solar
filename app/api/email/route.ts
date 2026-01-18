import { NextResponse } from 'next/server';
import { EmailService } from '@/lib/email/email-service';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, ...data } = body;

        switch (type) {
            case 'welcome':
                await EmailService.sendWelcomeEmail(data);
                break;
            case 'magic-link':
                await EmailService.sendMagicLinkEmail(data);
                break;
            default:
                throw new Error(`Unknown email type: ${type}`);
        }

        return NextResponse.json(
            { message: 'Email sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Failed to send email:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}