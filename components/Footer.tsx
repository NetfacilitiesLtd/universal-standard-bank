import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-16 lg:gap-20">

          {/* Company */}

          <div>

            <p className="uppercase tracking-[4px] text-red-500 text-sm font-semibold mb-4">
              Universal Standard Bank
            </p>

            <Image
              src="/logo.png"
              alt="Universal Standard Bank"
              width={180}
              height={60}
              className="bg-white rounded-xl p-2 w-auto"
            />

            <p className="mt-6 text-slate-400 leading-8 max-w-sm">
              Delivering secure, innovative and trusted banking
              solutions for individuals, businesses and
              international clients worldwide.
            </p>

          </div>

          {/* Banking */}

          <div>

            <h3 className="text-lg font-semibold mb-6">
              Banking
            </h3>

            <div className="flex flex-col gap-4 text-slate-400">

              <Link
                href="/personal-banking"
                className="hover:text-white transition"
              >
                Personal Banking
              </Link>

              <Link
                href="/business-banking"
                className="hover:text-white transition"
              >
                Business Banking
              </Link>

              <Link
                href="/international"
                className="hover:text-white transition"
              >
                International Banking
              </Link>

              <Link
                href="/cards"
                className="hover:text-white transition"
              >
                Cards & Payments
              </Link>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-lg font-semibold mb-6">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4 text-slate-400">

              <Link
                href="/apply"
                className="hover:text-white transition"
              >
                Open an Account
              </Link>

              <Link
                href="/login"
                className="hover:text-white transition"
              >
                Internet Banking
              </Link>

              <Link
                href="/security"
                className="hover:text-white transition"
              >
                Security Center
              </Link>

              <Link
                href="/contact"
                className="hover:text-white transition"
              >
                Contact Us
              </Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-lg font-semibold mb-6">
              Contact
            </h3>

            <div className="space-y-5 text-slate-400">

              <div className="flex items-start gap-3">

                <MapPin
                  size={18}
                  className="text-red-500 mt-1 flex-shrink-0"
                />

                <span>
                  33 St James's Square<br />
                  St James's<br />
                  London SW1Y 4JS<br />
                  England
                </span>

              </div>

              <div className="flex items-center gap-3">

                <Phone
                  size={18}
                  className="text-red-500 flex-shrink-0"
                />

                <span>
                  +44 79 536 23468<br />
                  +44 73 554 53466
                </span>

              </div>

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-red-500 flex-shrink-0"
                />

                <span>
                  info@universalstanb.com
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-slate-800 mt-16 pt-8">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Universal Standard Bank. All Rights Reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-sm">

              <Link
                href="/privacy"
                className="text-slate-500 hover:text-white transition"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-slate-500 hover:text-white transition"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/security"
                className="text-slate-500 hover:text-white transition"
              >
                Security
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}