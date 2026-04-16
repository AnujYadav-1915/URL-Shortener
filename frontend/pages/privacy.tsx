import Section from '../components/Section';

export default function Privacy() {
  return (
    <Section title="Privacy Policy">
      <div className="max-w-2xl mx-auto text-gray-200">
        <p className="mb-4">We value your privacy. NeonShort does not sell your data and complies with GDPR and other privacy regulations. All analytics are anonymized and you can delete your account at any time.</p>
        <ul className="list-disc list-inside mb-4">
          <li>We only collect data necessary for link analytics and account management.</li>
          <li>Your data is encrypted and never shared with third parties.</li>
          <li>You can export or delete your data from your account page.</li>
        </ul>
        <p>Contact <a href="mailto:privacy@neonshort.com" className="underline">privacy@neonshort.com</a> for any privacy-related questions.</p>
      </div>
    </Section>
  );
}
