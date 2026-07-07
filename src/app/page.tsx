import Link from 'next/link';
import Image from 'next/image';
import {
  Check,
  ChevronRight,
  Heart,
  Lock,
  LogIn,
  Play,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const steps = [
  {
    title: 'Attach the tag',
    description: "Add the MewMate QR tag to your cat's collar.",
    visual: 'tag',
  },
  {
    title: 'Scan the QR',
    description: 'A kind finder scans the tag with their phone.',
    visual: 'phone',
  },
  {
    title: "You’re reunited",
    description: 'They contact you securely and your cat gets home.',
    visual: 'message',
  },
];

const trustItems = [
  {
    title: 'Privacy first',
    description: 'Your info is private. Shared only when needed.',
    icon: Shield,
  },
  {
    title: 'Secure contacts',
    description: 'Finders contact you without seeing your personal details.',
    icon: Lock,
  },
  {
    title: 'Always accessible',
    description: 'QR works 24/7, no app required to scan.',
    icon: Check,
  },
  {
    title: 'Made for cats',
    description: 'Lightweight tags, built for comfort and safety.',
    icon: Heart,
  },
];

const heroImageSrc = '/images/hero.svg';
const calmImageSrc = '/images/Footer.svg';

function QrPattern({ className = '' }: { className?: string }) {
  const filled = [0, 1, 2, 4, 6, 8, 10, 12, 13, 15, 16, 18, 20, 21, 22, 24];

  return (
    <div className={`grid grid-cols-5 gap-1 ${className}`} aria-hidden="true">
      {Array.from({ length: 25 }).map((_, index) => (
        <span
          key={index}
          className={`rounded-[3px] ${filled.includes(index) ? 'bg-[var(--color-brand-primary)]' : 'bg-transparent'}`}
        />
      ))}
    </div>
  );
}

function ProductCard({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-[24px] border border-[var(--color-border-soft)] bg-[var(--color-bg-card)] p-3 shadow-[var(--shadow-md)] ${className}`}>
      <div className="rounded-t-[18px] bg-[var(--color-brand-primary)] px-4 pb-5 pt-4 text-center text-[var(--color-text-inverse)]">
        <Image src="/logos/1.svg" alt="" aria-hidden="true" width={64} height={42} unoptimized style={{ width: 'auto' }} className="mx-auto h-10 w-auto bg-transparent" />
        <div className="font-display text-xl font-bold">MewMate</div>
      </div>
      <QrPattern className="mx-auto h-20 w-20 rounded-lg bg-[var(--color-bg-elevated)] p-2" />
      <div className="mt-3 rounded-b-[16px] bg-[var(--color-brand-primary)] px-3 py-2 text-center text-xs font-bold text-[var(--color-brand-accent)]">
        Safe. Simple. Secure.
      </div>
    </div>
  );
}

function PhonePreview({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-[30px] border-[7px] border-[#1f1f1f] bg-[var(--color-bg-card)] p-3 shadow-[var(--shadow-lg)] ${className}`}>
      <div className="mx-auto mb-3 h-2.5 w-14 rounded-full bg-[#1f1f1f]" />
      <Image src="/logos/2.svg" alt="" aria-hidden="true" width={108} height={30} unoptimized style={{ width: 'auto' }} className="mx-auto h-7 w-auto bg-transparent" />
      <div className="mt-5 text-center font-display text-xl font-black text-[var(--color-brand-primary)]">
        Luna <span className="text-[var(--color-terracotta)]">♥</span>
      </div>
      <p className="mt-1 text-center text-xs font-semibold text-[var(--color-text-secondary)]">Domestic Shorthair</p>
      <div className="mt-3 rounded-2xl bg-[var(--color-bg-soft)] px-3 py-2.5 text-center text-xs leading-snug text-[var(--color-text-primary)]">
        I’m loved and missed. Please contact my human.
      </div>
      <div className="mt-3 rounded-full bg-[var(--color-brand-primary)] px-4 py-2.5 text-center text-xs font-bold text-[var(--color-text-inverse)]">
        Contact Owner
      </div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative isolate mx-auto min-h-[410px] w-full max-w-[560px] overflow-visible sm:min-h-[540px] lg:min-h-[640px]" aria-hidden="true">
      <div className="absolute bottom-0 right-[-56px] z-0 h-[360px] w-[360px] rounded-full bg-[#f8dfc8] sm:h-[500px] sm:w-[500px]" />
      <Image
        src={heroImageSrc}
        alt=""
        fill
        priority
        unoptimized
        sizes="(max-width: 768px) 90vw, 560px"
        className="z-10 bg-transparent object-contain object-bottom drop-shadow-[0_22px_36px_rgba(43,43,43,0.16)]"
      />
      <ProductCard className="absolute bottom-5 left-0 z-20 hidden w-[184px] rotate-[-1deg] sm:block lg:left-4" />
      <PhonePreview className="absolute bottom-5 right-1 z-30 hidden w-[160px] rotate-[3deg] md:block" />
    </div>
  );
}

function FinalScene() {
  return (
    <div className="relative isolate min-h-[292px] overflow-hidden bg-[linear-gradient(135deg,#fffaf0_0%,#f1d9bb_100%)]" aria-hidden="true">
      <Image
        src={calmImageSrc}
        alt=""
        fill
        unoptimized
        sizes="(max-width: 1024px) 100vw, 540px"
        className="bg-transparent object-cover object-[60%_35%]"
      />
      <div className="absolute inset-y-0 left-0 z-10 w-1/2 bg-[linear-gradient(90deg,#fffaf0_0%,rgba(255,250,240,0.78)_55%,rgba(255,250,240,0)_100%)]" />
    </div>
  );
}

function StepVisual({ visual }: { visual: string }) {
  if (visual === 'tag') {
    return (
      <div className="relative grid h-32 w-32 place-items-center rounded-[32px] bg-[var(--color-bg-elevated)] shadow-[var(--shadow-warm-sm)]">
        <div className="absolute top-5 h-7 w-7 rounded-full border-[5px] border-[var(--color-brand-primary)] bg-[var(--color-bg-elevated)]" />
        <div className="mt-5 grid h-[82px] w-[62px] place-items-center rounded-[20px] bg-[var(--color-brand-accent)] shadow-[var(--shadow-sm)]">
          <div className="grid h-12 w-12 place-items-center rounded-[12px] bg-[var(--color-bg-card)]">
            <QrPattern className="h-8 w-8" />
          </div>
        </div>
        <div className="absolute bottom-5 h-1.5 w-8 rounded-full bg-[rgba(31,77,52,0.24)]" />
        <div className="absolute right-5 top-7 h-3 w-3 rounded-full bg-[var(--color-terracotta)]" />
        <div className="absolute right-7 top-11 h-2 w-2 rounded-full bg-[var(--color-blush)]" />
      </div>
    );
  }

  if (visual === 'phone') {
    return (
      <div className="relative grid h-32 w-32 place-items-center rounded-[32px] bg-[var(--color-bg-elevated)] shadow-[var(--shadow-warm-sm)]">
        <div className="relative grid h-[102px] w-[68px] place-items-center rounded-[22px] border-[5px] border-[var(--color-brand-primary)] bg-[var(--color-bg-card)] shadow-[var(--shadow-sm)]">
          <div className="absolute top-2 h-1.5 w-7 rounded-full bg-[rgba(31,77,52,0.32)]" />
          <div className="relative mt-2 grid h-12 w-12 place-items-center rounded-[12px] bg-[var(--color-bg-elevated)]">
            <span className="absolute left-1 top-1 h-3 w-3 rounded-tl-[8px] border-l-[3px] border-t-[3px] border-[var(--color-brand-accent)]" />
            <span className="absolute right-1 top-1 h-3 w-3 rounded-tr-[8px] border-r-[3px] border-t-[3px] border-[var(--color-brand-accent)]" />
            <span className="absolute bottom-1 left-1 h-3 w-3 rounded-bl-[8px] border-b-[3px] border-l-[3px] border-[var(--color-brand-accent)]" />
            <span className="absolute bottom-1 right-1 h-3 w-3 rounded-br-[8px] border-b-[3px] border-r-[3px] border-[var(--color-brand-accent)]" />
            <QrPattern className="h-7 w-7" />
          </div>
          <div className="absolute bottom-4 h-2 w-9 rounded-full bg-[var(--color-mint)]" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative grid h-32 w-32 place-items-center rounded-[32px] bg-[var(--color-bg-elevated)] shadow-[var(--shadow-warm-sm)]">
      <div className="relative h-[82px] w-[94px] rounded-[22px] bg-[var(--color-bg-card)] px-4 py-3 shadow-[var(--shadow-sm)] ring-1 ring-[var(--color-border-soft)]">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--color-hazel-peach)] text-xs font-black text-[var(--color-brand-primary)]">
            M
          </span>
          <span className="h-2.5 w-9 rounded-full bg-[var(--color-brand-primary)]" />
        </div>
        <div className="mt-3 h-2 w-14 rounded-full bg-[var(--color-border-soft)]" />
        <div className="mt-2 h-2 w-10 rounded-full bg-[var(--color-border-soft)]" />
      </div>
      <span className="absolute bottom-5 right-5 grid h-10 w-10 place-items-center rounded-full bg-[var(--color-forest-600)] text-[var(--color-text-inverse)] shadow-[var(--shadow-sm)] ring-4 ring-[var(--color-bg-elevated)]">
        <Check className="h-6 w-6" />
      </span>
      <span className="absolute left-5 top-5 h-3 w-3 rounded-full bg-[var(--color-mint)]" />
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-card)] px-[clamp(16px,3vw,32px)] py-5 text-[var(--color-text-primary)] sm:py-6">
      <section className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[28px] bg-[linear-gradient(115deg,#fffdf7_0%,#fff9ef_56%,#f8dfc8_100%)]">
        <header className="relative z-30 flex h-[72px] items-center justify-between px-[clamp(20px,4vw,48px)] sm:h-20">
          <Link href="/" aria-label="MewMate home" className="inline-flex items-center">
            <Image src="/logos/1.svg" alt="MewMate" width={220} height={60} priority unoptimized style={{ width: 'auto' }} className="h-12 w-auto bg-transparent sm:h-14" />
          </Link>
          <Button asChild size="lg" className="rounded-2xl">
            <Link href="/home">Sign in</Link>
          </Button>
        </header>

        <div className="relative grid items-center gap-8 px-[clamp(24px,5vw,56px)] pb-[clamp(28px,5vw,52px)] pt-6 sm:gap-10 lg:min-h-[650px] lg:grid-cols-[0.9fr_1fr] lg:gap-8 lg:pb-0 lg:pt-0">
          <div className="relative z-20 max-w-[500px]">
            <h1 className="font-display text-[52px] font-black leading-[0.94] tracking-[-0.02em] text-[var(--color-brand-primary)] sm:text-[66px] lg:text-[76px]">
              A safer way home for every cat
            </h1>
            <p className="mt-6 max-w-[430px] text-lg leading-[1.6] text-[var(--color-text-primary)] sm:text-[20px]">
              MewMate QR safety tags help kind finders contact you quickly and get your cat safely home.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-2xl">
                <Link href="/home">
                  <LogIn data-icon="inline-start" />
                  Sign in
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="rounded-2xl">
                <a href="#how-it-works">
                  <Play data-icon="inline-start" className="fill-current" />
                  See how it works
                </a>
              </Button>
            </div>
          </div>

          <div className="relative z-10">
            <HeroVisual />
          </div>

          <div className="pointer-events-none absolute bottom-9 left-[-20px] z-0 hidden text-[var(--color-sage)] opacity-70 md:block">
            <div className="h-28 w-20 rounded-full border-l-[10px] border-t-[10px] border-current" />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="relative mx-auto max-w-[1180px] px-[clamp(20px,4vw,48px)] pb-14 pt-10 sm:pb-16">
        <h2 className="text-center font-display text-[38px] font-black leading-tight text-[var(--color-brand-primary)] sm:text-[44px]">
          How it works
        </h2>
        <div className="relative mt-9 grid gap-10 md:grid-cols-3 md:gap-8">
          <div className="absolute left-[18%] right-[18%] top-16 hidden border-t-4 border-dotted border-[var(--color-brand-accent)] opacity-35 md:block" />
          {steps.map((step, index) => (
            <article key={step.title} className="relative z-10 flex flex-col items-center text-center">
              <div className="relative grid h-32 w-32 place-items-center">
                <StepVisual visual={step.visual} />
              </div>
              <div className="mt-4 grid h-11 w-11 place-items-center rounded-full bg-[var(--color-brand-primary)] text-lg font-black text-[var(--color-text-inverse)] shadow-[var(--shadow-sm)] ring-4 ring-[var(--color-bg-card)]">
                {index + 1}
              </div>
              <h3 className="mt-4 text-[22px] font-black leading-tight text-[var(--color-brand-primary)]">{step.title}</h3>
              <p className="mt-3 max-w-[245px] text-[15px] leading-[1.45] text-[var(--color-text-primary)]">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-[clamp(20px,4vw,48px)] pb-16 sm:pb-20">
        <div className="grid overflow-hidden rounded-[24px] bg-[rgba(255,247,235,0.78)] ring-1 ring-[rgba(203,191,167,0.55)] sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className={`px-7 py-8 text-center ${index > 0 ? 'border-t border-[var(--color-border-soft)] sm:border-l sm:border-t-0' : ''} ${index === 2 ? 'sm:border-t lg:border-t-0' : ''}`}
              >
                <Icon className="mx-auto h-9 w-9 text-[var(--color-brand-primary)]" />
                <h3 className="mt-4 text-[17px] font-black text-[var(--color-brand-primary)]">{item.title}</h3>
                <p className="mx-auto mt-2 max-w-[190px] text-[14px] leading-[1.45] text-[var(--color-text-primary)]">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-[clamp(20px,4vw,48px)] pb-8">
        <div className="grid overflow-hidden rounded-[28px] bg-[rgba(255,253,247,0.86)] ring-1 ring-[var(--color-border-soft)] lg:grid-cols-[0.82fr_1fr]">
          <div className="relative z-10 px-[clamp(28px,5vw,56px)] py-[clamp(36px,6vw,64px)]">
            <h2 className="font-display text-[37px] font-black leading-[1.03] text-[var(--color-brand-primary)] sm:text-[44px]">
              One small tag. A huge peace of mind.
            </h2>
            <p className="mt-4 max-w-[390px] text-[16px] leading-[1.55] text-[var(--color-text-primary)]">
              Join thousands of cat parents who choose MewMate for safer days and happier reunions.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="rounded-2xl">
                <Link href="/home">
                  <LogIn data-icon="inline-start" />
                  Sign in
                </Link>
              </Button>
              <Button asChild variant="ghost" size="md" className="rounded-2xl">
                <a href="#how-it-works">
                  See how it works
                  <ChevronRight data-icon="inline-end" />
                </a>
              </Button>
            </div>
          </div>
          <FinalScene />
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1180px] flex-col gap-5 rounded-[28px] bg-[var(--color-brand-primary)] px-[clamp(24px,4vw,48px)] py-7 text-[var(--color-text-inverse)] lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <span className="inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-[var(--color-cream)]">
            <Image src="/logos/1.svg" alt="MewMate" width={48} height={52} unoptimized style={{ width: 'auto' }} className="h-10 w-auto bg-transparent" />
          </span>
          <div className="hidden h-10 w-px bg-[rgba(255,247,235,0.35)] sm:block" />
          <p className="max-w-[270px] text-sm leading-[1.45] text-[var(--color-cream)]">
            Helping cats get home and families stay together.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm font-semibold text-[var(--color-cream)]">
          <span className="inline-flex items-center gap-2"><Shield className="h-5 w-5 text-[var(--color-brand-accent)]" />Safe</span>
          <span className="inline-flex items-center gap-2"><Lock className="h-5 w-5 text-[var(--color-brand-accent)]" />Secure</span>
          <span className="inline-flex items-center gap-2"><Heart className="h-5 w-5 text-[var(--color-brand-accent)]" />Loved</span>
        </div>
      </footer>
    </main>
  );
}
