"use client"

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#144449] to-[#BF9B30] py-20 sm:py-24 md:py-32 lg:py-40 min-h-[60vh] flex items-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8">Terms and Conditions</h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed px-2">
            Please review our terms of service before using our platform.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 p-8 sm:p-10 rounded-lg shadow-lg">
            <div className="prose prose-lg max-w-none">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                Welcome to Launchpad.Expert. By accessing or using our platform, you agree to the following terms:
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#144449] mb-3">1. Account Registration</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Users must create an account and complete registration to access tasks and categories.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#144449] mb-3">2. Payment and Access</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Each category on Launchpad.Expert may require a one-time payment. This payment grants lifetime access to that specific category and its associated tasks.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#144449] mb-3">3. Payment Processing</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Payments are processed via PhonePe or other trusted gateways. Launchpad.Expert is not responsible for failures caused by third-party payment processors.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#144449] mb-3">4. Account Security</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Users are responsible for maintaining the confidentiality of their login credentials.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#144449] mb-3">5. Content Protection</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Unauthorized reproduction, distribution, or sharing of category content or tasks is strictly prohibited.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#144449] mb-3">6. Platform Modifications</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Launchpad.Expert reserves the right to modify, suspend, or terminate access to any part of the platform with or without notice in case of misuse or violation of terms.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#144449] mb-3">7. Governing Law</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Disputes arising from these terms shall be governed by the laws of India.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#144449]/10 rounded-lg border-l-4 border-[#144449]">
                <p className="text-base sm:text-lg text-gray-700">
                  <strong>Important:</strong> If you do not agree with any of these terms, please do not proceed with registration or payment. For questions, contact us at <a href="mailto:team@launchpad.expert" className="text-[#BF9B30] hover:underline font-semibold">team@launchpad.expert</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

