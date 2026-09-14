import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { approveApplication, rejectApplication } from "../../actions";
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ApplicationDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const application = await prisma.application.findUnique({
    where: {
      id,
    },
  });

  if (!application) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h1 className="text-3xl font-bold mb-2">
          Customer Application
        </h1>

        <p className="text-slate-500">
          Review the submitted application.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-lg mb-4">
            Personal Information
          </h2>

          <p><strong>Name:</strong> {application.firstName} {application.lastName}</p>
          <p><strong>Email:</strong> {application.email}</p>
          <p><strong>Phone:</strong> {application.phoneNumber}</p>
          <p><strong>Gender:</strong> {application.gender}</p>
          <p><strong>Nationality:</strong> {application.nationality}</p>
          <p><strong>Date of Birth:</strong> {application.dateOfBirth.toLocaleDateString()}</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-lg mb-4">
            Address
          </h2>

          <p><strong>Address:</strong> {application.residentialAddress}</p>
          <p><strong>City:</strong> {application.city}</p>
          <p><strong>State:</strong> {application.state}</p>
          <p><strong>Country:</strong> {application.country}</p>
          <p><strong>Postal Code:</strong> {application.postalCode}</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-lg mb-4">
            Identification
          </h2>

          <p><strong>ID Type:</strong> {application.idType}</p>
          <p><strong>ID Number:</strong> {application.idNumber}</p>
          <p><strong>ID Expiry:</strong> {application.idExpiryDate.toLocaleDateString()}</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-lg mb-4">
            Banking Details
          </h2>

          <p><strong>Account Type:</strong> {application.accountType}</p>
          <p><strong>Currency:</strong> {application.preferredCurrency}</p>
          <p><strong>Occupation:</strong> {application.occupation}</p>
          <p><strong>Employer:</strong> {application.employer || "N/A"}</p>
          <p><strong>Status:</strong> {application.status}</p>
        </div>
      </div>
<div className="bg-white rounded-2xl border border-slate-200 p-6">
  <h2 className="font-bold text-lg mb-4">
    Supporting Documents
  </h2>

  <div className="grid md:grid-cols-2 gap-6">
    <div>
      <p className="font-medium mb-2">
        Passport Photograph
      </p>

      {application.passportPhoto ? (
  <a
    href={`/api/admin/applications/passport-photo?applicationId=${application.id}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src={`/api/admin/applications/passport-photo?applicationId=${application.id}`}
      alt="Passport Photo"
      className="w-40 h-48 object-cover rounded-xl border border-slate-300 hover:opacity-90 transition"
    />
  </a>
) : (
  <p className="text-red-500">
    No passport photo uploaded.
  </p>
)}
    </div>

    <div>
      <p className="font-medium mb-2">
        Government ID
      </p>

      {application.governmentId ? (
  <a
    href={application.governmentId}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src={application.governmentId}
      alt="Government ID"
      className="w-64 h-40 object-cover rounded-xl border border-slate-300 hover:opacity-90 transition"
    />
  </a>
) : (
  <p className="text-red-500">
    No government ID uploaded.
  </p>
)}
    </div>
  </div>
</div>
      <div className="flex gap-4">
        <form
          action={async () => {
            "use server";
            await approveApplication(application.id);
          }}
        >
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Approve Application
          </button>
        </form>

        <form
  action={async () => {
    "use server";
    await rejectApplication(application.id);
  }}
>
  <button
    type="submit"
    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
  >
    Reject Application
  </button>
</form>
      </div>
    </div>
  );
}