'use client';

import { InputField, TextareaField, NestedInputField } from './FormFields';
import { useFormStore } from '../../store/formStore';

const PartiesForm = () => {
  // We need to check the caseType to conditionally show a field
  const caseType = useFormStore(state => state.caseType);

  return (
    <section>
      <h3 className="text-lg font-semibold mb-3 text-stone-800 dark:text-stone-200 border-b border-stone-300 dark:border-zinc-600 pb-2">
        B. Parties Involved
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <InputField
          name="complainantName"
          label="Complainant / Plaintiff / Petitioner"
          placeholder="Enter full name"
          isRequired
        />
        <InputField
          name="complainantAge"
          label="Age / Occupation"
          placeholder="e.g., 32, Teacher"
          isRequired
        />
        <InputField
          name="respondentName"
          label="Defendant / Respondent / Accused"
          placeholder="Enter full name"
          isRequired
        />
        <InputField
          name="respondentAddress"
          label="Respondent's Address"
          placeholder="Enter address"
        />
      </div>
      <InputField
          name="complainantAddress"
          label="Complainant's Address"
          placeholder="Enter address"
          isRequired
        />
      
      {/* This field will only appear for Family cases */}
      {caseType === 'Family' && (
        <NestedInputField
          parent="familyDetails"
          name="relationshipInvolved"
          label="Relation Between Parties"
          placeholder="e.g., Husband-Wife"
        />
      )}

      {/* This needs a larger text area */}
       <TextareaField
          name="respondentAddress" // You might want to add a coAccused field to the store
          label="Co-Accused / Additional Parties"
          placeholder="Describe any other parties involved"
        />
    </section>
  );
};

export default PartiesForm;