export default function Layout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <main className="font-work-sans">{children}</main>;
}
