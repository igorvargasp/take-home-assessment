export default function Layout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <main className="font-work-san dark:bg-neutral-900">{children}|</main>;
}
