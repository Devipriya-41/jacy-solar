// app/(auth)/login/layout.tsx
import RecaptchaProvider from "@/components/recaptcha-provider";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecaptchaProvider>
      <div className="login-container">{children}</div>
    </RecaptchaProvider>
  );
}
