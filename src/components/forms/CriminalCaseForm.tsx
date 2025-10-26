'use client';

import { NestedInputField, NestedTextareaField } from './FormFields';

const CriminalCaseForm = () => {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-3 text-stone-800 dark:text-stone-200 border-b border-stone-300 dark:border-zinc-600 pb-2">
        C. Criminal Case Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <NestedInputField
          parent="criminalDetails"
          name="natureOfOffence"
          label="Nature of Offence"
          placeholder="e.g., Theft / Assault / Cheating"
          isRequired
        />
        <NestedInputField
          parent="criminalDetails"
          name="sections"
          label="Sections Applicable"
          placeholder="e.g., Section 420, 302"
        />
      </div>
      <NestedTextareaField
        parent="criminalDetails"
        name="briefDescription"
        label="Brief Description & Other Details"
        placeholder="Provide all relevant details such as FIR/Complaint info, Accused & Victim details, any Weapons/Means used, Witnesses, and available Evidence."
        isRequired
      />
    </section>
  );
};

export default CriminalCaseForm;