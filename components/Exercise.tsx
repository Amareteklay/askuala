export default function Exercise({
  title = "Your turn",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-8 rounded-lg border border-dashed border-amber-400 bg-amber-50 p-5">
      <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-wide text-amber-700">
        {title}
      </p>
      {children}
    </div>
  );
}
