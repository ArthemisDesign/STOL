import Image from "next/image";
import type { Metadata } from "next";
import { Pencil, Hammer, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Lusano",
  description:
    "Lusano designs heirloom-quality furniture in Los Angeles. Handcrafted, made to order, and built to last a lifetime.",
};

/* ─── Data ────────────────────────────────────────────────────────────────── */
const HERO_IMG =
  "https://cdn.sanity.io/images/ld3h3xvm/production/08c5b2f0c55459cccfd20a364b4c2e31c490ef2e-2962x2962.jpg";

const PROCESS_STEPS = [
  {
    icon: Pencil,
    label: "Design",
    body: "Every piece begins as a sketch in our Los Angeles studio, refined through material samples and scale models until each proportion is resolved and nothing is arbitrary.",
  },
  {
    icon: Hammer,
    label: "Craft",
    body: "Our makers use traditional joinery — mortise and tenon, hand-cut dovetails — alongside modern precision. The result is furniture that won't rack, loosen, or apologize.",
  },
  {
    icon: Truck,
    label: "Deliver",
    body: "Each piece is built to order and white-glove delivered to your home, placed exactly where you want it. Lead time is 12–16 weeks. Some things are worth waiting for.",
  },
];

const MATERIALS = [
  {
    name: "White Oak",
    description: "Tight grain, warm honey tone, and outstanding hardness.",
    swatch: "#C8A97A",
  },
  {
    name: "Solid Walnut",
    description: "Rich chocolate tones that deepen beautifully with age.",
    swatch: "#5C3D2E",
  },
  {
    name: "Bouclé",
    description: "Belgian-woven, springy, durable, and irresistibly tactile.",
    swatch: "#E8DDD0",
  },
  {
    name: "Hand-Forged Brass",
    description: "Unlacquered solid brass that develops a living patina over time.",
    swatch: "#B8963E",
  },
];

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <main className="bg-background">

      {/* ════════════════════════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative h-[85vh] min-h-[500px] w-full overflow-hidden">
        <Image
          src={HERO_IMG}
          alt="Lusano workshop — craftspeople at work"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Warm-toned gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-8 h-px bg-white/40 mb-8" />
          <h1
            className="font-heading font-light text-white leading-tight tracking-tight"
            style={{ fontSize: "clamp(36px, 5.5vw, 76px)" }}
          >
            Designed in Los Angeles.
            <br />
            Built to Last a Lifetime.
          </h1>
          <div className="w-8 h-px bg-white/40 mt-8" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. STORY
      ════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left heading */}
          <div className="md:sticky md:top-28">
            <p className="font-body text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
              The Studio
            </p>
            <h2
              className="font-heading font-light text-text-primary leading-tight"
              style={{ fontSize: "clamp(36px, 4vw, 56px)" }}
            >
              Our Story
            </h2>
          </div>

          {/* Right copy */}
          <div className="flex flex-col gap-6 font-body text-[15px] leading-[1.8] text-text-secondary">
            <p>
              Lusano was founded on a single premise: that the objects we live with
              should be worthy of the lives we live. We design each piece in our
              Los Angeles studio, guided by the conviction that great furniture is
              neither trend nor transaction — it is inheritance. Something to be
              chosen carefully and kept forever.
            </p>
            <p>
              Every Lusano piece is made to order, built by a small network of
              craftspeople in California who share our obsession with material
              honesty and structural integrity. We work in solid hardwoods, natural
              textiles, and hand-forged metals — nothing veneer, nothing composite,
              nothing that pretends to be something it isn&apos;t. The craftsmanship is
              visible in the joinery, in the hand-applied finish, in the way a
              drawer slides closed with barely a sound.
            </p>
            <p>
              We measure success not in collections, but in decades. A Grant Bed
              passed down from a parent to a child. A Marmont table that wears its
              scratches the way a good book wears its dog-eared pages — as proof
              of a life well lived. Furniture that, twenty years from now, you will
              be glad you chose.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. PROCESS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-accent/20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-accent text-center mb-3">
            How It&apos;s Made
          </p>
          <h2
            className="font-heading font-light text-text-primary text-center mb-16"
            style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
          >
            The Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {PROCESS_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex flex-col items-center text-center gap-5">
                  {/* Step number + icon */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full border border-accent/40 flex items-center justify-center">
                      <Icon size={20} strokeWidth={1.25} className="text-accent" />
                    </div>
                    <span className="absolute -top-2 -right-2 font-heading text-[11px] font-light text-accent/60">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="font-heading text-[22px] font-light text-text-primary">
                    {step.label}
                  </h3>

                  {/* Separator */}
                  <div className="w-6 h-px bg-accent/50" />

                  <p className="font-body text-[13px] leading-[1.75] text-text-secondary max-w-xs">
                    {step.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. MATERIALS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F5F0EB] border-t border-accent/20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-20 md:py-28">
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-accent text-center mb-3">
            Sourced with Intention
          </p>
          <h2
            className="font-heading font-light text-text-primary text-center mb-14"
            style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
          >
            Materials We Love
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {MATERIALS.map((mat) => (
              <div key={mat.name} className="flex flex-col gap-4">
                {/* Swatch placeholder — replace with real material photography */}
                <div
                  className="w-full aspect-[3/4]"
                  style={{ backgroundColor: mat.swatch }}
                  aria-label={`${mat.name} material swatch`}
                />
                <div>
                  <h3 className="font-heading text-[18px] font-light text-text-primary mb-1">
                    {mat.name}
                  </h3>
                  <p className="font-body text-[12px] text-text-secondary leading-relaxed">
                    {mat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. QUOTE / VALUES
      ════════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-accent/20">
        <div className="max-w-2xl mx-auto px-6 md:px-10 py-24 md:py-36 flex flex-col items-center text-center gap-8">
          {/* Decorative line above */}
          <div className="flex items-center gap-4 w-full justify-center">
            <div className="flex-1 max-w-[80px] h-px bg-accent/40" />
            <div className="w-1 h-1 rounded-full bg-accent" />
            <div className="flex-1 max-w-[80px] h-px bg-accent/40" />
          </div>

          <blockquote>
            <p
              className="font-heading font-light italic text-text-primary leading-snug tracking-tight"
              style={{ fontSize: "clamp(24px, 3.5vw, 42px)" }}
            >
              &ldquo;We believe furniture should outlive trends — and outlast
              generations.&rdquo;
            </p>
          </blockquote>

          {/* Decorative line below */}
          <div className="flex items-center gap-4 w-full justify-center">
            <div className="flex-1 max-w-[80px] h-px bg-accent/40" />
            <div className="w-1 h-1 rounded-full bg-accent" />
            <div className="flex-1 max-w-[80px] h-px bg-accent/40" />
          </div>

          <p className="font-body text-[11px] uppercase tracking-[0.25em] text-text-secondary/60">
            Lusano Studio, Los Angeles
          </p>
        </div>
      </section>

    </main>
  );
}
