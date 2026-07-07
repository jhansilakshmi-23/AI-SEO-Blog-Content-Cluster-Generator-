import { motion } from "framer-motion";
import {
  BookOpen, Rocket, Layers, Code2, GitBranch, Sparkles, Target, Trophy,
  Github, Linkedin, Globe, Mail, MapPin, Phone, Building2, FileCode2, Wand2, CheckCircle2,
} from "lucide-react";

export function READMEPage() {
  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-3xl p-8 shadow-[var(--shadow-soft)]" style={{ background: "var(--gradient-hero)" }}>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium">
          <BookOpen className="h-3 w-3" /> Documentation · README
        </div>
        <h1 className="mt-3 font-[Space_Grotesk] text-3xl font-bold md:text-4xl">
          RankForge AI — <span className="gradient-text">SEO Blog & Content Cluster Generator</span>
        </h1>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          A premium AI SEO SaaS built for SmileCare Dental Clinic, Bangalore. Generates
          pillar blogs, supporting cluster articles, keyword strategies and local SEO
          packs — all from a single beautiful interface.
        </p>
      </div>

      <Section icon={Rocket} title="Project Overview">
        <p>
          RankForge AI is a full-featured content operations platform that combines
          keyword research, cluster mapping, LLM-powered generation and on-page SEO
          optimization. It is designed for dental clinics, healthcare providers and
          local service businesses that need to rank in competitive local markets.
        </p>
      </Section>

      <Section icon={Building2} title="Business Information">
        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard label="Business" value="SmileCare Dental Clinic" />
          <InfoCard label="Location" value="Bangalore, Karnataka, India" />
          <InfoCard label="Industry" value="Healthcare · Dentistry" />
          <InfoCard label="Target Audience" value="Local families, professionals, expats in Bangalore" />
        </div>
      </Section>

      <Section icon={Code2} title="Technologies">
        <div className="flex flex-wrap gap-2">
          {["React 19", "TypeScript", "Vite", "TanStack Router", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Lucide React", "Recharts", "Sonner"].map((t) => (
            <span key={t} className="rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm">{t}</span>
          ))}
        </div>
      </Section>

      <Section icon={GitBranch} title="Folder Structure">
        <pre className="overflow-x-auto rounded-2xl bg-[#0F172A] p-5 text-[12px] leading-relaxed text-white">
{`src/
├── components/
│   ├── App.tsx              # Shell, navbar, sidebar, hero, footer, routing
│   ├── Dashboard.tsx        # KPIs, charts, keywords, workflow, activity
│   ├── PromptFramework.tsx  # SEO prompt library with copy/expand
│   ├── SEOGenerator.tsx     # Pillar, cluster, keywords, local SEO studio
│   └── READMEPage.tsx       # Documentation & contact
├── routes/
│   ├── __root.tsx
│   └── index.tsx
└── styles.css               # Design tokens & glassmorphism`}
        </pre>
      </Section>

      <Section icon={Wand2} title="Workflow">
        <div className="grid gap-3 md:grid-cols-5">
          {[
            { s: "Research", d: "Discover intent + keyword clusters" },
            { s: "Plan", d: "Map pillar + supporting posts" },
            { s: "Generate", d: "Run refined AI prompts" },
            { s: "Optimize", d: "Score, meta, internal links" },
            { s: "Publish", d: "Export Markdown / PDF" },
          ].map((w, i) => (
            <motion.div key={w.s} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="rounded-2xl bg-white p-4">
              <div className="grid h-8 w-8 place-items-center rounded-xl text-white text-xs font-bold" style={{ background: "var(--gradient-primary)" }}>{i + 1}</div>
              <div className="mt-2 text-sm font-semibold">{w.s}</div>
              <div className="text-xs text-muted-foreground">{w.d}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section icon={FileCode2} title="Prompt Logic">
        <ul className="space-y-2 text-sm">
          {[
            "Pillar prompt enforces H1–H3 structure, featured-snippet block, FAQs, JSON-LD.",
            "Supporting prompt interlinks to pillar + siblings and adds local social proof.",
            "Keyword prompt outputs volume, difficulty, CPC, intent and cluster groupings.",
            "Local SEO prompt generates GBP profile, hyper-local landing page and review templates.",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2 rounded-xl bg-white p-3"><CheckCircle2 className="mt-0.5 h-4 w-4 text-green-500" /> {t}</li>
          ))}
        </ul>
      </Section>

      <Section icon={Sparkles} title="Features">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Beautiful dashboard with charts",
            "AI Assistant floating widget",
            "Command palette (⌘K)",
            "Prompt library with copy & expand",
            "Interactive content cluster diagram",
            "SEO score meter",
            "Keyword difficulty indicators",
            "Meta title / description generator",
            "Markdown + PDF export",
            "Recent activity timeline",
            "Local SEO for Bangalore neighborhoods",
            "Toast notifications & loading skeletons",
          ].map((f) => (
            <div key={f} className="flex items-center gap-2 rounded-2xl bg-white p-3 text-sm"><Layers className="h-4 w-4 text-primary" /> {f}</div>
          ))}
        </div>
      </Section>

      <Section icon={Trophy} title="Outcome">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { k: "3.4×", v: "Faster time-to-publish" },
            { k: "92/100", v: "Average SEO score" },
            { k: "+38%", v: "Organic traffic in 90 days" },
          ].map((s) => (
            <div key={s.v} className="rounded-3xl p-6 text-white shadow-[var(--shadow-elegant)]" style={{ background: "var(--gradient-primary)" }}>
              <div className="text-3xl font-bold">{s.k}</div>
              <div className="mt-1 text-sm text-white/85">{s.v}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section icon={Target} title="Contact">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-[var(--shadow-soft)]">
            <div className="text-sm font-semibold">SmileCare Dental Clinic</div>
            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 100 Ft Road, Indiranagar, Bangalore 560038</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 98765 43210</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@smilecare.in</div>
              <div className="flex items-center gap-2"><Globe className="h-4 w-4" /> www.smilecare.in</div>
            </div>
          </div>
          <div className="rounded-3xl p-6 shadow-[var(--shadow-soft)]" style={{ background: "var(--gradient-hero)" }}>
            <div className="text-sm font-semibold">Get in touch</div>
            <form onSubmit={(e) => e.preventDefault()} className="mt-3 space-y-2">
              <input placeholder="Name" className="w-full rounded-xl border border-white/60 bg-white px-3 py-2 text-sm outline-none" />
              <input placeholder="Email" className="w-full rounded-xl border border-white/60 bg-white px-3 py-2 text-sm outline-none" />
              <textarea placeholder="How can we help?" rows={3} className="w-full rounded-xl border border-white/60 bg-white px-3 py-2 text-sm outline-none" />
              <button className="w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-elegant)]" style={{ background: "var(--gradient-primary)" }}>Send message</button>
            </form>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {[
            { i: Github, l: "GitHub", href: "https://github.com" },
            { i: Linkedin, l: "LinkedIn", href: "https://linkedin.com" },
            { i: Globe, l: "Portfolio", href: "https://smilecare.in" },
            { i: Mail, l: "Email", href: "mailto:hello@smilecare.in" },
          ].map(({ i: I, l, href }) => (
            <a key={l} href={href} className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold shadow-sm hover:shadow"><I className="h-4 w-4" /> {l}</a>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl bg-white/85 p-6 shadow-[var(--shadow-soft)] md:p-8">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl" style={{ background: "var(--gradient-hero)" }}>
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="text-sm text-muted-foreground">{children}</div>
    </motion.section>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}