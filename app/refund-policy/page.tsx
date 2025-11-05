"use client"

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#144449] to-[#BF9B30] py-20 sm:py-24 md:py-32 lg:py-40 min-h-[60vh] flex items-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8">Refund Policy</h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed px-2">
            Your satisfaction is our priority. Learn about our refund policy.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 p-8 sm:p-10 rounded-lg shadow-lg">
            <div className="prose prose-lg max-w-none">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                At Launchpad.Expert, we strive to provide seamless access to premium categories and tasks upon successful payment. Please read our refund policy carefully before completing your purchase.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#144449] mb-3">1. Non-Refundable Payments</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    All payments made on Launchpad.Expert are one-time and non-refundable, as they grant lifetime access to the selected category and its tasks.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#144449] mb-3">2. No Refunds for Change of Mind</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Refunds will not be issued for any reason, including change of mind or accidental purchase.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#144449] mb-3">3. Technical Issues</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    If a user experiences a technical issue during payment processing (such as duplicated transactions or failed payments), they should contact our support team immediately at <a href="mailto:team@launchpad.expert" className="text-[#BF9B30] hover:underline font-semibold">team@launchpad.expert</a> with payment details.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#144449] mb-3">4. Review Process</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Verified technical errors will be reviewed within 7–10 business days, and eligible refunds will be initiated through the original payment method.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#144449] mb-3">5. Policy Updates</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Launchpad.Expert reserves the right to modify or update this refund policy without prior notice.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#144449]/10 rounded-lg border-l-4 border-[#144449]">
                <p className="text-base sm:text-lg text-gray-700">
                  <strong>Need Help?</strong> If you have any questions about our refund policy, please contact us at <a href="mailto:team@launchpad.expert" className="text-[#BF9B30] hover:underline font-semibold">team@launchpad.expert</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

