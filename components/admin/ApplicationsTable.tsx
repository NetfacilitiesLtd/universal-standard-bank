import Link from "next/link";

type Application = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
  preferredCurrency: string;
  status: string;
};

interface ApplicationsTableProps {
  applications: Application[];
}

export default function ApplicationsTable({
  applications,
}: ApplicationsTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-xl font-semibold">
          Recent Applications
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-6 py-4">Applicant</th>
              <th className="text-left px-6 py-4">Email</th>
              <th className="text-left px-6 py-4">Account</th>
              <th className="text-left px-6 py-4">Currency</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-8 text-slate-500"
                >
                  No applications found.
                </td>
              </tr>
            ) : (
              applications.map((application) => (
                <tr
                  key={application.id}
                  className="border-t border-slate-100"
                >
                  <td className="px-6 py-4">
                    {application.firstName} {application.lastName}
                  </td>

                  <td className="px-6 py-4">
                    {application.email}
                  </td>

                  <td className="px-6 py-4">
                    {application.accountType}
                  </td>

                  <td className="px-6 py-4">
                    {application.preferredCurrency}
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                      {application.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/applications/${application.id}`}
                      className="text-red-600 hover:underline font-medium"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}