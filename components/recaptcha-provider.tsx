// components/RecaptchaProvider.tsx
import Script from "next/script";

export default function RecaptchaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
      />
      {children}
    </>
  );
}
