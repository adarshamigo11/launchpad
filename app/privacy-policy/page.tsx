"use client"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#144449] to-[#BF9B30] py-20 sm:py-24 md:py-32 lg:py-40 min-h-[60vh] flex items-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 sm:mb-8">Privacy Policy</h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed px-2">
            Your privacy matters to us. Learn how we protect your personal information.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 p-8 sm:p-10 rounded-lg shadow-lg">
            <div className="prose prose-lg max-w-none">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6">
                At Launchpad.Expert, your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#144449] mb-3">1. Information We Collect</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    We collect information such as name, email address, phone number, and payment details to process registrations and provide access to purchased categories.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#144449] mb-3">2. Payment Security</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    All transactions are securely processed through our authorized payment gateway, PhonePe. We do not store your card or banking information.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#144449] mb-3">3. Cookies and Analytics</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    We use cookies and analytics tools to improve user experience and track website performance.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#144449] mb-3">4. Data Protection</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Your personal data will never be sold, traded, or rented. It is used solely for service delivery, support, and legal compliance.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#144449] mb-3">5. Security Measures</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Launchpad.Expert implements strict security measures to prevent unauthorized access, alteration, or disclosure of your data.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#144449] mb-3">6. Agreement to Policy</h3>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    By using our website, you agree to the collection and use of information as described in this policy.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#144449]/10 rounded-lg border-l-4 border-[#144449]">
                <p className="text-base sm:text-lg text-gray-700">
                  <strong>Questions or Concerns?</strong> For any concerns or data requests, contact us at <a href="mailto:team@launchpad.expert" className="text-[#BF9B30] hover:underline font-semibold">team@launchpad.expert</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

