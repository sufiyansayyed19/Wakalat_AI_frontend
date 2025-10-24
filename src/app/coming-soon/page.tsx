import Link from 'next/link';
import { Wrench } from 'lucide-react';

export default function ComingSoonPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-stone-50 dark:bg-zinc-900 p-4 text-center">
      <div className="max-w-md">
        <Wrench className="mx-auto h-16 w-16 text-amber-600 dark:text-amber-500" />
        
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100 sm:text-4xl">
          Feature Coming Soon
        </h1>
        
        <p className="mt-4 text-base text-stone-600 dark:text-stone-400">
          We are currently working on this feature and will have it ready for you shortly. Thank you for your patience!
        </p>
        
        <Link 
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-md border border-transparent bg-stone-800 dark:bg-stone-200 px-5 py-3 text-base font-medium text-white dark:text-stone-800 hover:bg-stone-900 dark:hover:bg-white transition-colors"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}