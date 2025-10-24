import Link from 'next/link'; // Import the Link component

const Footer = () => {
  const footerLinks = [
    "Plans", "Laws & Acts", "Latest Judgements", "Disclosure", 
    "Privacy Policy", "Terms and Conditions", "Cookie Policy", "Refunds Policy"
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-t border-stone-200 dark:border-zinc-800 z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-center gap-x-4 sm:gap-x-6">
          {footerLinks.map((link) => (
            // Replace the <a> tag with the <Link> component
            <Link 
              key={link} 
              href="/coming-soon" // Set the href to our new page
              className="text-xs text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;