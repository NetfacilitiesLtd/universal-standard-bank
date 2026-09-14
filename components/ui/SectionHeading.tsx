interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-20">

      <p className="text-red-600 text-lg font-bold uppercase tracking-[6px] mb-4">
        {eyebrow}
      </p>

      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
        {title}
      </h2>

      <p className="text-lg text-gray-600 leading-8">
        {description}
      </p>

    </div>
  );
}