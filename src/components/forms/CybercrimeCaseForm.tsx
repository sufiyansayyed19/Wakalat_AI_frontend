'use client';

import { NestedInputField, NestedTextareaField } from './FormFields';

const CybercrimeCaseForm = () => {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-3 text-stone-800 dark:text-stone-200 border-b border-stone-300 dark:border-zinc-600 pb-2">
        C. Cybercrime Case Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <NestedInputField
          parent="cybercrimeDetails"
          name="natureOfCyberOffence"
          label="Nature of Cyber Offence"
          placeholder="e.g., Phishing & Financial Fraud"
          isRequired
        />
        <NestedInputField
          parent="cybercrimeDetails"
          name="platformInvolved"
          label="Affected Platforms / Services"
          placeholder="e.g., Gmail, PhonePe, Axis Bank"
        />
        <NestedInputField
          parent="cybercrimeDetails"
          name="modeOfOperation"
          label="Mode of Operation"
          placeholder="e.g., Fake bank link sent via email"
        />
        <NestedInputField
          parent="cybercrimeDetails"
          name="lossDetails"
          label="Monetary or Data Loss"
          placeholder="e.g., ₹93,30,000 lost"
        />
      </div>
      <NestedTextareaField
        parent="cybercrimeDetails"
        name="technicalDetails"
        label="Additional Technical Information"
        placeholder="Provide other details like Date Range, Complainant's technical info (User ID, mobile, email), any known Accused Details, and available Digital Evidence."
      />
    </section>
  );
};

export default CybercrimeCaseForm;