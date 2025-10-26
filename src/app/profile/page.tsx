import { USER_PROFILE } from '@/lib/user-data';
import { User, Mail, Shield, KeyRound, LogOut, Trash2 } from 'lucide-react';

const ProfileInfoRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-center gap-4 py-3 border-b border-stone-200 dark:border-zinc-700">
    <div className="text-stone-500 dark:text-stone-400">{icon}</div>
    <div className="flex-grow">
      <p className="text-sm text-stone-500 dark:text-stone-400">{label}</p>
      <p className="font-semibold text-stone-800 dark:text-stone-200">{value}</p>
    </div>
  </div>
);

export default function ProfilePage() {
  return (
    <main className="flex-1 overflow-y-auto pt-16 pb-20">
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-amber-600 flex items-center justify-center font-bold text-white text-2xl">
            {USER_PROFILE.initial}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">{USER_PROFILE.name}</h1>
            <p className="text-stone-600 dark:text-stone-400">Manage your account settings and preferences.</p>
          </div>
        </div>

        {/* Account Information Section */}
        <section className="bg-stone-100 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-stone-800 dark:text-stone-200">Account Information</h2>
          <ProfileInfoRow icon={<User size={20} />} label="Full Name" value={USER_PROFILE.name} />
          <ProfileInfoRow icon={<Mail size={20} />} label="Email Address" value={USER_PROFILE.email} />
          <ProfileInfoRow icon={<Shield size={20} />} label="Current Plan" value={USER_PROFILE.plan} />
        </section>

        {/* Security Section */}
        <section className="bg-stone-100 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-stone-800 dark:text-stone-200">Security</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-stone-200 dark:bg-zinc-700 text-stone-800 dark:text-stone-200 rounded-md font-semibold hover:bg-stone-300 dark:hover:bg-zinc-600 transition-colors">
              <KeyRound size={16} /> Change Password
            </button>
            <button className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-800 rounded-md font-semibold hover:bg-stone-900 dark:hover:bg-white transition-colors">
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </section>

         {/* Danger Zone */}
        <section className="border-2 border-dashed border-red-500/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2 text-red-600 dark:text-red-500">Danger Zone</h2>
          <p className="text-stone-600 dark:text-stone-400 mb-4">These actions are permanent and cannot be undone.</p>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition-colors">
            <Trash2 size={16} /> Delete Account
          </button>
        </section>
      </div>
    </main>
  );
}