import { InputField } from './FormFields';

const MetadataForm = () => {
  return (
    <section>
      <h3 className="text-lg font-semibold mb-3 text-stone-800 dark:text-stone-200 border-b border-stone-300 dark:border-zinc-600 pb-2">
        A. Basic Case Metadata
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        <InputField
          name="firNo"
          label="Case / FIR / Petition No."
          placeholder="e.g., C.R. No. 45/2025"
        />
        <InputField
          name="jurisdiction"
          label="Jurisdiction / Police Station"
          placeholder="e.g., Cyber Police Station, Bandra"
        />
        <InputField
          name="dateOfIncident"
          label="Date of Filing / Incident"
          placeholder="Enter date"
          isRequired
        />
        <InputField
          name="location"
          label="Place of Incident"
          placeholder="Enter location"
        />
      </div>
    </section>
  );
};

export default MetadataForm;