"use client";

import Modal from "./Modal";

const termsContent = (
  <article className="space-y-5 text-sm text-brand-700">
    <p className="text-brand-500">
      Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
    </p>
    <section>
      <h3 className="mb-1.5 font-semibold text-brand-900">1. Acceptance of Terms</h3>
      <p className="leading-relaxed">
        By accessing or using the Classic Biomedical Laboratory website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services. We reserve the right to update these terms; continued use after changes constitutes acceptance.
      </p>
    </section>
    <section>
      <h3 className="mb-1.5 font-semibold text-brand-900">2. Services</h3>
      <p className="leading-relaxed">
        Classic Biomedical Laboratory provides clinical and diagnostic laboratory services, including molecular diagnostics, blood chemistry, biostatistics, and related testing. Services are offered subject to availability, regulatory compliance, and your adherence to these terms.
      </p>
    </section>
    <section>
      <h3 className="mb-1.5 font-semibold text-brand-900">3. Use of Services and Account</h3>
      <p className="leading-relaxed">
        You agree to use our services only for lawful purposes. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. You must provide accurate information and notify us promptly of any unauthorized use.
      </p>
    </section>
    <section>
      <h3 className="mb-1.5 font-semibold text-brand-900">4. Results and Reports</h3>
      <p className="leading-relaxed">
        Laboratory results and reports are provided for informational and clinical use. They are not a substitute for professional medical advice. Interpretation and treatment decisions should be made in consultation with a qualified healthcare provider.
      </p>
    </section>
    <section>
      <h3 className="mb-1.5 font-semibold text-brand-900">5. Limitation of Liability</h3>
      <p className="leading-relaxed">
        To the fullest extent permitted by law, Classic Biomedical Laboratory shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services or reliance on results.
      </p>
    </section>
    <section>
      <h3 className="mb-1.5 font-semibold text-brand-900">6. Contact</h3>
      <p className="leading-relaxed">
        For questions, contact us at{" "}
        <a href="mailto:info@classicbiomedlab.com" className="font-medium text-brand-400 underline hover:text-brand-600">
          info@classicbiomedlab.com
        </a>.
      </p>
    </section>
  </article>
);

const privacyContent = (
  <article className="space-y-5 text-sm text-brand-700">
    <p className="text-brand-500">
      Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
    </p>
    <section>
      <h3 className="mb-1.5 font-semibold text-brand-900">1. Information We Collect</h3>
      <p className="leading-relaxed">
        We collect information you provide when registering, booking tests, or contacting us, including name, email, phone number, and health-related information necessary for laboratory services. We may also collect usage data and cookies when you use our website.
      </p>
    </section>
    <section>
      <h3 className="mb-1.5 font-semibold text-brand-900">2. How We Use Your Information</h3>
      <p className="leading-relaxed">
        We use your information to provide laboratory services, process results, communicate with you, improve our services, and comply with legal and regulatory requirements. We do not sell your personal information to third parties.
      </p>
    </section>
    <section>
      <h3 className="mb-1.5 font-semibold text-brand-900">3. Data Security and Retention</h3>
      <p className="leading-relaxed">
        We implement appropriate technical and organizational measures to protect your personal and health information. Data is retained only as long as necessary for the purposes described or as required by law.
      </p>
    </section>
    <section>
      <h3 className="mb-1.5 font-semibold text-brand-900">4. Your Rights</h3>
      <p className="leading-relaxed">
        You may request access to, correction of, or deletion of your personal data where applicable by law. You may also withdraw consent or object to certain processing. Contact us at{" "}
        <a href="mailto:info@classicbiomedlab.com" className="font-medium text-brand-400 underline hover:text-brand-600">
          info@classicbiomedlab.com
        </a>{" "}
        to exercise these rights.
      </p>
    </section>
    <section>
      <h3 className="mb-1.5 font-semibold text-brand-900">5. Contact</h3>
      <p className="leading-relaxed">
        For privacy-related questions, contact us at{" "}
        <a href="mailto:info@classicbiomedlab.com" className="font-medium text-brand-400 underline hover:text-brand-600">
          info@classicbiomedlab.com
        </a>.
      </p>
    </section>
  </article>
);

type TermsModalProps = { open: boolean; onClose: () => void };
type PrivacyModalProps = { open: boolean; onClose: () => void };

export function TermsModal({ open, onClose }: TermsModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Terms of Service">
      {termsContent}
    </Modal>
  );
}

export function PrivacyModal({ open, onClose }: PrivacyModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Privacy Policy">
      {privacyContent}
    </Modal>
  );
}
