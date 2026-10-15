import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="grid lg:grid-cols-2 min-h-[calc(100vh-4.5rem)]">
      <div className="relative hidden lg:block overflow-hidden text-white">
        <Image
          src="/images/hero-worship.jpg"
          alt=""
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink/90 via-primary/80 to-secondary/60" />
        <div className="relative h-full flex flex-col justify-end p-12">
          <p className="font-display italic text-3xl leading-snug mb-4">
            &ldquo;How good and pleasant it is when God&rsquo;s people live together in unity!&rdquo;
          </p>
          <p className="text-accent font-semibold tracking-wide">Psalm 133:1</p>
          <div className="mt-8 h-0.5 w-16 bg-accent" />
          <p className="mt-4 text-white/80">ZAOGA FIF Mabelreign Kingdom District</p>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-12 bg-gray-50">
        <div className="w-full max-w-md animate-fade-up">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors mb-6">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-ink mb-2">{title}</h1>
          <p className="text-gray-600 mb-8">{subtitle}</p>
          <div className="card p-8 shadow-xl shadow-primary/5">{children}</div>
        </div>
      </div>
    </div>
  );
}
