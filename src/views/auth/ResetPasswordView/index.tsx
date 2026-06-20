import { Suspense } from "react";
import { AuthCard } from "@/src/components/cards";
import { Container, Reveal } from "@/src/components/layout";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordView() {
  return (
    <Container className="grid min-h-[calc(100dvh-4rem)] place-items-center py-12">
      <Reveal className="w-full max-w-md">
        <AuthCard
          eyebrow="Admin · Password reset"
          title="Set a new password"
          description="Choose a strong password you don't use anywhere else."
          footerPrompt="Remembered it?"
          footerLinkLabel="Back to sign in"
          footerLinkHref="/signin"
        >
          <Suspense fallback={null}>
            <ResetPasswordForm />
          </Suspense>
        </AuthCard>
      </Reveal>
    </Container>
  );
}
