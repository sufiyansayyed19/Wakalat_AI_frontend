export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The layout now only needs to pass the children through.
  // The Header, Footer, and background are all handled by the root layout.
  return <>{children}</>;
}