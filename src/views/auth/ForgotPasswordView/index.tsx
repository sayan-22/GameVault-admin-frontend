import AuthCard from "@/src/components/cards/AuthCard";
import Container from "@/src/components/layout/Container";
import Reveal from "@/src/components/layout/Reveal";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPasswordView() {
  return (
    <Container className="grid min-h-[calc(100dvh-4rem)] place-items-center py-12">
      <Reveal className="w-full max-w-md">
        <AuthCard
          eyebrow="Admin · Password reset"
          title="Forgot your password?"
          description="Enter the email tied to your GameVault account and we'll send you a secure link to reset it."
          footerPrompt="Remembered it?"
          footerLinkLabel="Back to sign in"
          footerLinkHref="/signin"
        >
          <ForgotPasswordForm />
        </AuthCard>
      </Reveal>
    </Container>
  );
}
