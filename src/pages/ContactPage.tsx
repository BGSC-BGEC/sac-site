import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
  return (
    <section className="min-h-screen bg-[#050816] py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white">
            Contact SAC
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Reach out to the Sports Activities Centre for
            facility queries, event information, and general
            assistance.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-2xl border border-white/10 bg-[#09111f] p-8">
            <h2 className="mb-6 text-2xl font-semibold text-white">
              Send a Message
            </h2>

            <div className="space-y-4">
              <Input
                placeholder="Your Name"
                className="border-white/10 bg-[#050816] text-white"
              />

              <Input
                placeholder="Your Email"
                className="border-white/10 bg-[#050816] text-white"
              />

              <Textarea
                placeholder="Your Message"
                className="min-h-32 border-white/10 bg-[#050816] text-white"
              />

              <Button className="w-full">
                Send Message
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="rounded-2xl border border-white/10 bg-[#09111f] p-8">
            <h2 className="mb-6 text-2xl font-semibold text-white">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 text-cyan-400" />

                <div>
                  <h3 className="font-medium text-white">
                    Address
                  </h3>

                  <p className="text-slate-400">
                    Sports Activities Centre
                    <br />
                    BITS Pilani, Goa Campus
                    <br />
                    Zuarinagar, Goa
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="mt-1 h-5 w-5 text-cyan-400" />

                <div>
                  <h3 className="font-medium text-white">
                    Phone
                  </h3>

                  <p className="text-slate-400">
                    +91 832 258 0000
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-1 h-5 w-5 text-cyan-400" />

                <div>
                  <h3 className="font-medium text-white">
                    Email
                  </h3>

                  <p className="text-slate-400">
                    sac@goa.bits-pilani.ac.in
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <h3 className="mb-4 font-medium text-white">
                Social Links
              </h3>

              <div className="flex gap-4 text-cyan-400">
                <a href="#">Instagram</a>
                <a href="#">Facebook</a>
                <a href="#">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;