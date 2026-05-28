import AuthCard from "@/src/components/cards/AuthCard";
import Container from "@/src/components/layout/Container";
import Reveal from "@/src/components/layout/Reveal";
import SignInForm from "./SignInForm";

export default function SignInView() {
  return (
    <Container className="grid min-h-[calc(100dvh-4rem)] place-items-center py-12">
      <Reveal className="w-full max-w-md">
        <AuthCard
          eyebrow="Admin · Sign in"
          title="Welcome back"
          description="Sign in to manage your catalog, banners, and pricing."
          footerPrompt="New to GameVault?"
          footerLinkLabel="Create an account"
          footerLinkHref="/signup"
        >
          <SignInForm />
        </AuthCard>
      </Reveal>
    </Container>
  );
}
