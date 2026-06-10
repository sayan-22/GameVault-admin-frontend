import AdminGuard from "@/src/components/auth/AdminGuard";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AdminGuard>{children}</AdminGuard>;
}
