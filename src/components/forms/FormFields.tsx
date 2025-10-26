'use client';

import { useFormStore, FormState } from '../../store/formStore';

// --- Type definitions (no changes needed here, your version is perfect) ---
type NestedFields = 'criminalDetails' | 'civilDetails' | 'cybercrimeDetails' | 'familyDetails';

interface FieldProps {
  name: keyof Omit<FormState, 'updateField' | 'updateNestedField' | 'criminalDetails' | 'civilDetails' | 'cybercrimeDetails' | 'familyDetails'>;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
}

interface NestedFieldProps<P extends NestedFields> {
  parent: P;
  name: keyof FormState[P];
  label: string;
  placeholder?: string;
  isRequired?: boolean;
}

// --- Reusable InputField Component ---
export const InputField = ({ name, label, placeholder, isRequired = false }: FieldProps) => {
  // --- THIS IS THE FIX ---
  const value = useFormStore(state => state[name]); // Select ONLY the data
  const updateField = useFormStore(state => state.updateField); // Select the action separately

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium mb-1 text-stone-700 dark:text-stone-300">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        value={value as string || ''}
        onChange={(e) => updateField(name, e.target.value)}
        placeholder={placeholder || ''}
        className="w-full p-2 bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500/30 transition-all duration-200"
      />
    </div>
  );
};

// --- Reusable TextareaField Component ---
export const TextareaField = ({ name, label, placeholder, isRequired = false }: FieldProps) => {
    // --- THIS IS THE FIX ---
    const value = useFormStore(state => state[name]);
    const updateField = useFormStore(state => state.updateField);
      
    return (
        <div className="mb-4">
          <label htmlFor={name} className="block text-sm font-medium mb-1 text-stone-700 dark:text-stone-300">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </label>
          <textarea
            id={name}
            name={name}
            value={value as string || ''}
            onChange={(e) => updateField(name, e.target.value)}
            placeholder={placeholder || ''}
            rows={3}
            className="w-full p-2 bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500/30 transition-all duration-200 resize-y"
          />
        </div>
    );
};

// --- Reusable SelectField Component ---
interface SelectFieldProps extends FieldProps {
  options: { value: string; label: string }[];
}

export const SelectField = ({ name, label, options, isRequired = false }: SelectFieldProps) => {
    // --- THIS IS THE FIX ---
    const value = useFormStore(state => state[name]);
    const updateField = useFormStore(state => state.updateField);

    return (
        <div className="mb-4">
          <label htmlFor={name} className="block text-sm font-medium mb-1 text-stone-700 dark:text-stone-300">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </label>
          <select
            id={name}
            name={name}
            value={value as string || ''}
            onChange={(e) => updateField(name, e.target.value)}
            className="w-full p-2 bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500/30 transition-all duration-200"
          >
            <option value="" disabled>-- Select an option --</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
    );
};

// --- Reusable NestedInputField Component ---
export const NestedInputField = <P extends NestedFields>({ parent, name, label, placeholder, isRequired = false }: NestedFieldProps<P>) => {
  // --- THIS IS THE FIX ---
  const value = useFormStore(state => state[parent][name]);
  const updateNestedField = useFormStore(state => state.updateNestedField);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNestedField(parent, name, e.target.value as FormState[P][keyof FormState[P]]);
  };

  return (
    <div className="mb-4">
      <label htmlFor={`${parent}.${String(name)}`} className="block text-sm font-medium mb-1 text-stone-700 dark:text-stone-300">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        id={`${parent}.${String(name)}`}
        name={`${parent}.${String(name)}`}
        type="text"
        value={typeof value === 'string' ? value : Array.isArray(value) ? value.join(', ') : ''}
        onChange={handleChange}
        placeholder={placeholder || ''}
        className="w-full p-2 bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500/30 transition-all duration-200"
      />
    </div>
  );
};

// --- Reusable NestedTextareaField Component ---
export const NestedTextareaField = <P extends NestedFields>({ parent, name, label, placeholder, isRequired = false }: NestedFieldProps<P>) => {
  // --- THIS IS THE FIX ---
  const value = useFormStore(state => state[parent][name]);
  const updateNestedField = useFormStore(state => state.updateNestedField);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNestedField(parent, name, e.target.value as FormState[P][keyof FormState[P]]);
  };

  return (
    <div className="mb-4">
      <label htmlFor={`${parent}.${String(name)}`} className="block text-sm font-medium mb-1 text-stone-700 dark:text-stone-300">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={`${parent}.${String(name)}`}
        name={`${parent}.${String(name)}`}
        value={typeof value === 'string' ? value : ''}
        onChange={handleChange}
        placeholder={placeholder || ''}
        rows={4}
        className="w-full p-2 bg-white dark:bg-zinc-900 border border-stone-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500/30 transition-all duration-200 resize-y"
      />
    </div>
  );
};