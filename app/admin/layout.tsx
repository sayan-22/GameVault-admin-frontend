import { AdminGuard } from "@/src/components/auth";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AdminGuard>{children}</AdminGuard>;
}
