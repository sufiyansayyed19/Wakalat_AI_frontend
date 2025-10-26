'use client';

import { NestedInputField, NestedTextareaField } from './FormFields';

const FamilyCaseForm = () => {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-3 text-stone-800 dark:text-stone-200 border-b border-stone-300 dark:border-zinc-600 pb-2">
        C. Family Case Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <NestedInputField
          parent="familyDetails"
          name="typeOfFamilyMatter"
          label="Type of Family Matter"
          placeholder="e.g., Divorce, Custody, Maintenance"
          isRequired
        />
        <NestedInputField
          parent="familyDetails"
          name="groundsForPetition"
          label="Grounds for Petition"
          placeholder="e.g., Cruelty, Desertion, Adultery"
          isRequired
        />
        <NestedInputField
          parent="familyDetails"
          name="marriageDetails"
          label="Marriage Details"
          placeholder="Date, Place, Registration No."
        />
        <NestedInputField
          parent="familyDetails"
          name="childrenInfo"
          label="Children / Dependents Information"
          placeholder="e.g., One son, age 5, with mother"
        />
      </div>
      <NestedTextareaField
        parent="familyDetails"
        name="mainIssues"
        label="Incidents, Key Facts & Legal Sections"
        placeholder="Describe the main factual events supporting the petition and list any relevant legal sections or acts."
        isRequired
      />
    </section>
  );
};

export default FamilyCaseForm;