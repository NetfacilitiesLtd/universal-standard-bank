import Link from "next/link";

interface PrimaryButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function PrimaryButton({
  href,
  children,
}: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg transition duration-300"
    >
      {children}
    </Link>
  );
}