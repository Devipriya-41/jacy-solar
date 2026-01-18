export const emailStyles = {
    main: {
        backgroundColor: '#f6f9fc',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    container: {
        backgroundColor: '#ffffff',
        margin: '0 auto',
        padding: '20px 0 48px',
        marginBottom: '64px',
        maxWidth: '600px',
    },
    content: {
        padding: '0 48px',
    },
    heading: {
        fontSize: '24px',
        letterSpacing: '-0.5px',
        lineHeight: '1.3',
        fontWeight: '400',
        color: '#484848',
        padding: '17px 0 0',
    },
    paragraph: {
        margin: '0 0 15px',
        fontSize: '15px',
        lineHeight: '1.4',
        color: '#3c4149',
    },
    button: {
        backgroundColor: '#5850ec',
        borderRadius: '5px',
        color: '#fff',
        fontSize: '15px',
        fontWeight: '500',
        textDecoration: 'none',
        textAlign: 'center' as const,
        display: 'block',
        padding: '12px',
    },
    hr: {
        borderColor: '#e6ebf1',
        margin: '20px 0',
    },
    footer: {
        color: '#8898aa',
        fontSize: '12px',
        lineHeight: '16px',
        textAlign: 'center' as const,
    },
    logo: {
        padding: '32px 20px',
        textAlign: 'center' as const,
    },
    otpStyle: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#5850ec',
        letterSpacing: '0.5em',
        textAlign: 'center' as const,
        padding: '20px 0',
    }
} as const; 