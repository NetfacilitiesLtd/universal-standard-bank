import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
} from "lucide-react";

interface CustomerInformationProps {
  customer: {
    application: {
      firstName: string;
      middleName: string | null;
      lastName: string;
      email: string;
      phoneNumber: string;
      country: string;
      state: string;
      city: string;
      residentialAddress: string;
      idType: string;
      idNumber: string;
      accountType: string;
      preferredCurrency: string;
    };
  };
}

export default function CustomerInformation({
  customer,
}: CustomerInformationProps) {
  const app = customer.application;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
          <User
            size={45}
            className="text-red-600"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {app.firstName}{" "}
            {app.middleName ?? ""}{" "}
            {app.lastName}
          </h2>

          <p className="text-slate-500">
            {app.accountType} Account
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div className="flex items-center gap-3">
          <Mail className="text-red-600" />
          <span>{app.email}</span>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="text-red-600" />
          <span>{app.phoneNumber}</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="text-red-600" />
          <span>
            {app.residentialAddress},
            {" "}
            {app.city},
            {" "}
            {app.state},
            {" "}
            {app.country}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <CreditCard className="text-red-600" />
          <span>
            {app.idType}: {app.idNumber}
          </span>
        </div>

      </div>
    </div>
  );
}