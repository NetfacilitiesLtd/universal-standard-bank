import Link from "next/link";

interface SecondaryButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function SecondaryButton({
  href,
  children,
}: SecondaryButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-4 rounded-lg transition duration-300"
    >
      {children}
    </Link>
  );
}