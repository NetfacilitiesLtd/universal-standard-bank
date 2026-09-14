"use client";

type DeclarationProps = {
  formData: {
    agreedToTerms: boolean;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function Declaration({
  formData,
  setFormData,
}: DeclarationProps) {
  return (
    <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">
          Declaration
        </h2>

        <p className="text-slate-500 mt-2">
          Please read and confirm the following before submitting your application.
        </p>
      </div>

      <div className="space-y-5">

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={formData.agreedToTerms}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                agreedToTerms: e.target.checked,
              }))
            }
            className="mt-1 h-5 w-5 accent-red-600"
          />

          <span className="text-slate-700 leading-relaxed">
            I declare that all information provided in this application is true,
            complete and accurate to the best of my knowledge.
          </span>
        </label>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 accent-red-600"
          />

          <span className="text-slate-700 leading-relaxed">
            I authorize Universal Standard Bank to verify my identity and any
            information provided as part of this application.
          </span>
        </label>

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 accent-red-600"
          />

          <span className="text-slate-700 leading-relaxed">
            I agree to the Bank's Terms & Conditions and Privacy Policy.
          </span>
        </label>

      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">

        <button
          type="button"
          className="rounded-xl border border-slate-300 px-8 py-3 font-semibold hover:bg-slate-100 transition"
        >
          Save for Later
        </button>

        <button
          type="submit"
          className="rounded-xl bg-red-600 px-8 py-3 font-semibold text-white hover:bg-red-700 transition"
        >
          Submit Application
        </button>

      </div>

    </section>
  );
}