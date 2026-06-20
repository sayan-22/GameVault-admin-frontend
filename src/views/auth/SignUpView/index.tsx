import { AuthCard } from "@/src/components/cards";
import { Container, Reveal } from "@/src/components/layout";
import SignUpForm from "./SignUpForm";

export default function SignUpView() {
  return (
    <Container className="grid min-h-[calc(100dvh-4rem)] place-items-center py-12">
      <Reveal className="w-full max-w-md">
        <AuthCard
          eyebrow="Admin · Create account"
          title="Join GameVault"
          description="Spin up your admin workspace and start publishing games in minutes."
          footerPrompt="Already have an account?"
          footerLinkLabel="Sign in"
          footerLinkHref="/signin"
        >
          <SignUpForm />
        </AuthCard>
      </Reveal>
    </Container>
  );
}
