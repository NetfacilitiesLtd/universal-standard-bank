import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShieldCheck,
  Lock,
  Smartphone,
  TriangleAlert,
} from "lucide-react";

export default function SecurityPage() {
  return (
    <>
      <Navbar showLogo={false} />

      <main className="bg-slate-50 min-h-screen">

        {/* Hero */}

        <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-red-900 text-white">

          <div className="max-w-7xl mx-auto px-6 py-24">

            <h1 className="text-5xl font-bold mb-6">
              Security Center
            </h1>

            <p className="text-slate-300 max-w-2xl text-lg leading-8">
              Your security is our highest priority. Learn how to
              protect your accounts and recognize fraudulent
              activities while banking online.
            </p>

          </div>

        </section>

        {/* Security Tips */}

        <section className="max-w-7xl mx-auto px-6 py-20">

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

              <ShieldCheck className="text-red-600 mb-5" size={40} />

              <h2 className="text-2xl font-bold mb-4">
                Protect Your Account
              </h2>

              <p className="text-slate-600 leading-8">
                Never share your password, PIN or online banking
                verification codes with anyone. Universal Standard Bank
                will never ask for this information by phone,
                email or text message.
              </p>

            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

              <Lock className="text-red-600 mb-5" size={40} />

              <h2 className="text-2xl font-bold mb-4">
                Use Strong Passwords
              </h2>

              <p className="text-slate-600 leading-8">
                Create strong passwords using a combination of
                uppercase letters, lowercase letters, numbers and
                special characters. Change them regularly.
              </p>

            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

              <Smartphone className="text-red-600 mb-5" size={40} />

              <h2 className="text-2xl font-bold mb-4">
                Secure Your Devices
              </h2>

              <p className="text-slate-600 leading-8">
                Keep your mobile devices and computers updated with
                the latest security patches and always use trusted
                internet connections when accessing online banking.
              </p>

            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

              <TriangleAlert className="text-red-600 mb-5" size={40} />

              <h2 className="text-2xl font-bold mb-4">
                Report Suspicious Activity
              </h2>

              <p className="text-slate-600 leading-8">
                If you notice any suspicious transactions or believe
                your account has been compromised, contact Standard
                Union Bank immediately using the contact details on
                our Contact Us page.
              </p>

            </div>

          </div>

        </section>

            </main>

      <Footer />
    </>
  );
}