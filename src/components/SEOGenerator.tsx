import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Layers, Search, MapPin, Sparkles, Download, FileDown, Loader2,
  Link as LinkIcon, ListTree, Gauge, Clock, Target, ChevronRight, Copy, Check,
} from "lucide-react";
import { toast } from "sonner";

type Tab = "pillar" | "cluster" | "keywords" | "local";

const TABS: { key: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "pillar", label: "Pillar Blog", icon: FileText },
  { key: "cluster", label: "Content Cluster", icon: Layers },
  { key: "keywords", label: "Keyword Strategy", icon: Search },
  { key: "local", label: "Local SEO", icon: MapPin },
];

export function SEOGenerator() {
  const [tab, setTab] = useState<Tab>("pillar");
  const [topic, setTopic] = useState("Cosmetic Dentistry in Bangalore");
  const [keyword, setKeyword] = useState("cosmetic dentist bangalore");
  const [intent, setIntent] = useState("Commercial");
  const [neighborhood, setNeighborhood] = useState("Indiranagar");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setLoading(true);
    setGenerated(false);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
      toast.success("Content generated successfully");
    }, 1200);
  };

  const exportAs = (kind: "md" | "pdf") => {
    toast.success(`Exported as ${kind.toUpperCase()}`);
  };

  const copyResult = async () => {
    await navigator.clipboard.writeText(sampleContent(topic, keyword));
    setCopied(true);
    toast.success("Content copied");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-3xl p-8 shadow-[var(--shadow-soft)]" style={{ background: "var(--gradient-hero)" }}>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium">
          <Sparkles className="h-3 w-3" /> SEO Generator Studio
        </div>
        <h1 className="mt-3 font-[Space_Grotesk] text-3xl font-bold md:text-4xl">Ship SEO content that ranks</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">Generate pillar blogs, content clusters, keyword strategies and local SEO packs — beautifully structured and export-ready.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 rounded-3xl bg-white/70 p-2 shadow-[var(--shadow-soft)]">
        {TABS.map((t) => {
          const active = tab === t.key;
          const Icon = t.icon;
          return (
            <button key={t.key} onClick={() => { setTab(t.key); setGenerated(false); }}
              className={`flex flex-1 min-w-[140px] items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all ${
                active ? "text-white shadow-[var(--shadow-elegant)]" : "text-muted-foreground hover:bg-white"
              }`}
              style={active ? { background: "var(--gradient-primary)" } : undefined}
            >
              <Icon className="h-4 w-4" /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Controls */}
        <div className="rounded-3xl bg-white/85 p-6 shadow-[var(--shadow-soft)] lg:col-span-2">
          <div className="mb-4 text-sm font-semibold">Configure</div>
          <div className="space-y-4">
            {(tab === "pillar" || tab === "cluster") && (
              <>
                <Field label="Topic"><input value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full rounded-xl border border-input bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" /></Field>
                <Field label="Primary keyword"><input value={keyword} onChange={(e) => setKeyword(e.target.value)} className="w-full rounded-xl border border-input bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" /></Field>
              </>
            )}
            {tab === "keywords" && (
              <Field label="Seed keyword"><input value={keyword} onChange={(e) => setKeyword(e.target.value)} className="w-full rounded-xl border border-input bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" /></Field>
            )}
            {tab === "local" && (
              <Field label="Neighborhood"><input value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} className="w-full rounded-xl border border-input bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" /></Field>
            )}

            <Field label="Search intent">
              <div className="grid grid-cols-2 gap-2">
                {["Informational", "Commercial", "Transactional", "Navigational"].map((i) => (
                  <button key={i} onClick={() => setIntent(i)} className={`rounded-xl border px-3 py-2 text-xs font-medium ${intent === i ? "border-primary bg-primary/10 text-primary" : "border-input bg-white text-muted-foreground"}`}>{i}</button>
                ))}
              </div>
            </Field>

            <Field label="Tone">
              <div className="flex flex-wrap gap-2">
                {["Trustworthy", "Warm", "Expert", "Playful"].map((t) => (
                  <span key={t} className="rounded-full bg-muted px-3 py-1 text-xs">{t}</span>
                ))}
              </div>
            </Field>

            <button onClick={generate} disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-[var(--shadow-elegant)] disabled:opacity-60"
              style={{ background: "var(--gradient-primary)" }}>
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</> : <><Sparkles className="h-4 w-4" /> Generate</>}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2">
            <button onClick={() => exportAs("md")} className="inline-flex items-center justify-center gap-1 rounded-xl bg-white px-3 py-2 text-xs font-semibold shadow-sm"><Download className="h-3.5 w-3.5" /> MD</button>
            <button onClick={() => exportAs("pdf")} className="inline-flex items-center justify-center gap-1 rounded-xl bg-white px-3 py-2 text-xs font-semibold shadow-sm"><FileDown className="h-3.5 w-3.5" /> PDF</button>
            <button onClick={copyResult} className="inline-flex items-center justify-center gap-1 rounded-xl bg-white px-3 py-2 text-xs font-semibold shadow-sm">{copied ? <><Check className="h-3.5 w-3.5 text-green-500" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}</button>
          </div>
        </div>

        {/* Output */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3 rounded-3xl bg-white/85 p-6 shadow-[var(--shadow-soft)]">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="animate-pulse space-y-2">
                    <div className="h-4 w-1/2 rounded bg-muted" />
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-4/5 rounded bg-muted" />
                  </div>
                ))}
              </motion.div>
            ) : !generated ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid place-items-center rounded-3xl bg-white/85 p-10 text-center shadow-[var(--shadow-soft)]">
                <div className="grid h-16 w-16 place-items-center rounded-2xl" style={{ background: "var(--gradient-hero)" }}>
                  <Sparkles className="h-7 w-7" />
                </div>
                <div className="mt-4 text-lg font-semibold">Nothing generated yet</div>
                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                  Configure your inputs on the left and click Generate to see your SEO content, cluster maps and analysis appear here.
                </p>
              </motion.div>
            ) : (
              <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="space-y-4">
                {tab === "pillar" && <PillarResult topic={topic} keyword={keyword} intent={intent} />}
                {tab === "cluster" && <ClusterResult topic={topic} />}
                {tab === "keywords" && <KeywordResult seed={keyword} />}
                {tab === "local" && <LocalResult neighborhood={neighborhood} />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
      {children}
    </label>
  );
}

function SEOScore({ score }: { score: number }) {
  const stroke = 12;
  const r = 42;
  const c = 2 * Math.PI * r;
  const off = c - (score / 100) * c;
  const color = score >= 90 ? "#10B981" : score >= 70 ? "#F59E0B" : "#EF4444";
  return (
    <div className="relative grid h-28 w-28 place-items-center">
      <svg width="112" height="112" className="-rotate-90">
        <circle cx="56" cy="56" r={r} strokeWidth={stroke} className="fill-none stroke-muted" />
        <circle cx="56" cy="56" r={r} strokeWidth={stroke} strokeLinecap="round" className="fill-none transition-all"
          style={{ stroke: color, strokeDasharray: c, strokeDashoffset: off }} />
      </svg>
      <div className="absolute grid place-items-center">
        <div className="text-2xl font-bold" style={{ color }}>{score}</div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">SEO Score</div>
      </div>
    </div>
  );
}

function PillarResult({ topic, keyword, intent }: { topic: string; keyword: string; intent: string }) {
  const meta = useMemo(() => ({
    title: `${topic}: The Complete 2026 Guide | SmileCare Bangalore`.slice(0, 60),
    desc: `Learn everything about ${topic.toLowerCase()}. Expert-reviewed by SmileCare Dental, Bangalore. Cost, treatments, aftercare & more.`.slice(0, 155),
    words: 3120, readTime: 12, score: 94,
  }), [topic]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-white/85 p-5 shadow-[var(--shadow-soft)]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><Gauge className="h-3.5 w-3.5" /> SEO Score</div>
          <div className="mt-2 flex items-center justify-between"><SEOScore score={meta.score} /><div className="text-xs text-muted-foreground">Keyword density, structure, readability, internal links — all healthy.</div></div>
        </div>
        <div className="rounded-3xl bg-white/85 p-5 shadow-[var(--shadow-soft)]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><Clock className="h-3.5 w-3.5" /> Reading Time</div>
          <div className="mt-3 text-3xl font-bold">{meta.readTime} min</div>
          <div className="text-xs text-muted-foreground">{meta.words.toLocaleString()} words</div>
        </div>
        <div className="rounded-3xl bg-white/85 p-5 shadow-[var(--shadow-soft)]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><Target className="h-3.5 w-3.5" /> Intent</div>
          <div className="mt-3 text-lg font-semibold">{intent}</div>
          <div className="text-xs text-muted-foreground">Primary: <b className="text-foreground">{keyword}</b></div>
        </div>
      </div>

      <div className="rounded-3xl bg-white/85 p-6 shadow-[var(--shadow-soft)]">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><ListTree className="h-4 w-4" /> Content Structure</div>
        <ol className="space-y-2 text-sm">
          {[
            "H1 — " + topic + ": The Complete Guide",
            "H2 — What is " + topic.split(" ")[0] + "? (Featured snippet)",
            "H2 — Types of Treatments Available",
            "H3 — Procedure, Cost & Duration",
            "H2 — Why SmileCare Bangalore?",
            "H2 — Real Patient Case Studies",
            "H2 — FAQs (6 People-Also-Ask)",
          ].map((h, i) => (
            <li key={i} className="flex items-center gap-3 rounded-xl bg-white px-3 py-2">
              <span className="grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold text-white" style={{ background: "var(--gradient-primary)" }}>{i + 1}</span>
              {h}
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-white/85 p-6 shadow-[var(--shadow-soft)]">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><LinkIcon className="h-4 w-4" /> Internal Linking Plan</div>
          <ul className="space-y-2 text-sm">
            {[
              "→ Teeth Whitening in Bangalore: Cost Guide",
              "→ Invisalign vs Braces: Which is right?",
              "→ Root Canal Treatment: What to expect",
              "→ Dental Implants: 2026 Price List",
              "→ Kids Dentistry at SmileCare",
            ].map((l) => (
              <li key={l} className="flex items-center justify-between rounded-xl bg-white px-3 py-2">
                <span className="truncate">{l}</span><ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-white/85 p-6 shadow-[var(--shadow-soft)]">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><FileText className="h-4 w-4" /> Meta Generator</div>
          <div className="space-y-3 text-sm">
            <div className="rounded-xl bg-[#0F172A] p-3 text-white">
              <div className="text-[10px] uppercase tracking-widest text-white/50">Title · {meta.title.length}/60</div>
              <div className="mt-1">{meta.title}</div>
            </div>
            <div className="rounded-xl bg-[#0F172A] p-3 text-white">
              <div className="text-[10px] uppercase tracking-widest text-white/50">Description · {meta.desc.length}/155</div>
              <div className="mt-1">{meta.desc}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ClusterResult({ topic }: { topic: string }) {
  const supporting = [
    "Cost of Cosmetic Dentistry in Bangalore",
    "Veneers vs. Bonding: What to choose",
    "Teeth Whitening Aftercare Guide",
    "Smile Makeover Timeline",
    "Invisalign Reviews from Indiranagar Patients",
    "How to choose a cosmetic dentist",
  ];
  return (
    <div className="rounded-3xl bg-white/85 p-6 shadow-[var(--shadow-soft)]">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold"><Layers className="h-4 w-4" /> Interactive Content Cluster</div>
      <div className="relative grid place-items-center py-10">
        <div className="relative grid h-32 w-64 place-items-center rounded-3xl text-white shadow-[var(--shadow-elegant)]" style={{ background: "var(--gradient-primary)" }}>
          <div className="text-xs uppercase tracking-widest opacity-80">Pillar</div>
          <div className="text-center text-sm font-semibold">{topic}</div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {supporting.map((s, i) => (
            <motion.div key={s} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
              className="relative rounded-2xl bg-white p-4 text-sm shadow-sm hover:shadow-md">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Supporting</div>
              <div className="mt-1 font-medium">{s}</div>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <LinkIcon className="h-3 w-3" /> links to pillar
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KeywordResult({ seed }: { seed: string }) {
  const rows = [
    { k: `${seed} cost`, v: 4400, d: 38, cpc: 3.1, intent: "Commercial" },
    { k: `best ${seed}`, v: 2900, d: 45, cpc: 2.8, intent: "Commercial" },
    { k: `${seed} near me`, v: 8100, d: 52, cpc: 3.9, intent: "Transactional" },
    { k: `${seed} reviews`, v: 1800, d: 28, cpc: 2.1, intent: "Informational" },
    { k: `top ${seed} 2026`, v: 1200, d: 22, cpc: 1.9, intent: "Informational" },
    { k: `${seed} bangalore price`, v: 3300, d: 41, cpc: 4.2, intent: "Commercial" },
  ];
  return (
    <div className="overflow-hidden rounded-3xl bg-white/85 shadow-[var(--shadow-soft)]">
      <div className="border-b p-6 text-sm font-semibold flex items-center gap-2"><Search className="h-4 w-4" /> Keyword Strategy for "{seed}"</div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted text-xs uppercase tracking-widest text-muted-foreground">
            <tr><th className="p-3 text-left">Keyword</th><th className="p-3">Volume</th><th className="p-3">Difficulty</th><th className="p-3">CPC</th><th className="p-3">Intent</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.k} className="border-t">
                <td className="p-3 font-medium">{r.k}</td>
                <td className="p-3 text-center">{r.v.toLocaleString()}</td>
                <td className="p-3">
                  <div className="mx-auto flex w-32 items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full" style={{ width: `${r.d}%`, background: r.d > 55 ? "#F87171" : r.d > 35 ? "#FBBF24" : "#34D399" }} />
                    </div>
                    <span className="text-xs font-semibold">{r.d}</span>
                  </div>
                </td>
                <td className="p-3 text-center">${r.cpc}</td>
                <td className="p-3 text-center"><span className="rounded-full bg-muted px-2 py-0.5 text-xs">{r.intent}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LocalResult({ neighborhood }: { neighborhood: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-3xl bg-white/85 p-6 shadow-[var(--shadow-soft)]">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><MapPin className="h-4 w-4" /> GBP Description</div>
        <p className="rounded-xl bg-white p-4 text-sm leading-relaxed">
          SmileCare Dental Clinic in {neighborhood}, Bangalore offers world-class cosmetic
          dentistry, invisalign, dental implants, root canals, and pediatric care. Our
          award-winning team blends 20+ years of expertise with cutting-edge technology to
          deliver painless, precise treatments. Walk-ins welcome. Book online for same-day
          consultations.
        </p>
      </div>
      <div className="rounded-3xl bg-white/85 p-6 shadow-[var(--shadow-soft)]">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><Search className="h-4 w-4" /> Hyper-Local Keywords</div>
        <ul className="grid grid-cols-2 gap-2 text-sm">
          {[
            `dentist in ${neighborhood}`,
            `invisalign ${neighborhood}`,
            `teeth cleaning ${neighborhood}`,
            `emergency dentist ${neighborhood}`,
            `kids dentist ${neighborhood}`,
            `dental implants ${neighborhood}`,
          ].map((k) => (
            <li key={k} className="rounded-xl bg-white px-3 py-2 text-xs font-medium">{k}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-3xl bg-white/85 p-6 shadow-[var(--shadow-soft)] md:col-span-2">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><FileText className="h-4 w-4" /> GBP Posts</div>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            "🎉 New Year offer: 20% off teeth whitening this January!",
            "Meet Dr. Priya — Invisalign-certified with 500+ smiles delivered in " + neighborhood + ".",
            "Free dental checkup camp this Sunday. Walk-in between 10AM–2PM.",
          ].map((p, i) => (
            <div key={i} className="rounded-2xl border p-3 text-sm">{p}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function sampleContent(topic: string, keyword: string) {
  return `# ${topic}\n\nThis pillar article targets "${keyword}" for SmileCare Dental Clinic, Bangalore.\n\n## Quick Answer\n${topic} refers to a family of dental procedures designed to improve the appearance of teeth, gums and bite.\n\n## Sections\n- What is ${topic}?\n- Types of treatments\n- Cost in Bangalore\n- Why SmileCare\n- FAQs\n`;
}