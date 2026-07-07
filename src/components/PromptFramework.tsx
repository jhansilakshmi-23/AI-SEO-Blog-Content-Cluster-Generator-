import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ChevronDown, ChevronUp, FileCode2, MapPin, Search, Layers, Sparkles, History, Star } from "lucide-react";
import { toast } from "sonner";

type Prompt = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  tint: string;
  content: string;
};

const PROMPTS: Prompt[] = [
  {
    id: "pillar",
    title: "SEO Pillar Blog Prompt",
    icon: FileCode2,
    category: "Pillar Content",
    tint: "var(--gradient-sky)",
    content: `You are an expert SEO strategist writing for SmileCare Dental Clinic, Bangalore.

GOAL: Write a 3000-word SEO pillar blog for the topic: "{{TOPIC}}".

REQUIREMENTS:
1. Target primary keyword: "{{PRIMARY_KEYWORD}}"
2. Include 8–12 semantic LSI keywords: {{LSI_KEYWORDS}}
3. Search intent: {{INTENT}} (informational | commercial | transactional)
4. Add H1, H2, H3 structure with 6–10 sections
5. First 100 words: hook + primary keyword + benefit
6. Add a "Quick Answer" featured-snippet block (40–55 words)
7. Add a FAQ section with 6 People-Also-Ask questions
8. Add an internal linking plan referencing 5 supporting cluster posts
9. Meta title (≤60 chars) + meta description (≤155 chars)
10. Suggest 3 image alt-texts and 1 schema.org Article JSON-LD block

TONE: Trustworthy, warm, medically accurate.
LOCATION CUES: Bangalore, Indiranagar, Koramangala where relevant.
OUTPUT: Markdown.`,
  },
  {
    id: "supporting",
    title: "Supporting Blog Prompt",
    icon: Layers,
    category: "Cluster Support",
    tint: "var(--gradient-peach)",
    content: `Act as a senior SEO writer for SmileCare Dental Clinic, Bangalore.

GOAL: Write a 1200–1500 word supporting cluster blog for pillar: "{{PILLAR_TITLE}}".

SPEC:
- Focus keyword: "{{FOCUS_KEYWORD}}" (long-tail)
- Search intent: {{INTENT}}
- Include a comparison table or step-by-step list
- Interlink to the pillar and 2 sibling cluster posts
- Add 3 FAQs, meta title, meta description
- Add local proof (Bangalore case study, patient testimonial)
- Suggest 2 CTAs (book consultation, WhatsApp)

OUTPUT: Markdown with front-matter (title, slug, description, tags).`,
  },
  {
    id: "keyword",
    title: "Keyword Research Prompt",
    icon: Search,
    category: "Research",
    tint: "var(--gradient-sky)",
    content: `You are an SEO researcher. Generate a keyword strategy for SmileCare Dental Clinic, Bangalore.

INPUT SEED: "{{SEED_KEYWORD}}"

RETURN A TABLE WITH COLUMNS:
| Keyword | Search Volume | Difficulty (0-100) | CPC | Intent | Cluster |

RULES:
- 25 long-tail keywords minimum
- Group into 4 clusters (pillar candidates)
- Flag 5 "quick wins" (difficulty < 30, volume > 500)
- Add 5 "People Also Ask" questions per cluster
- Suggest 3 competitor URLs to analyze

OUTPUT: Markdown table + JSON summary.`,
  },
  {
    id: "local",
    title: "Local SEO Prompt",
    icon: MapPin,
    category: "Local SEO",
    tint: "var(--gradient-peach)",
    content: `You are a local SEO specialist writing for SmileCare Dental Clinic, Bangalore.

GOAL: Produce a Local SEO content pack for "{{NEIGHBORHOOD}}".

DELIVER:
1. Google Business Profile description (750 chars)
2. 5 GBP posts (250 chars each) — offers, tips, updates
3. Location landing page outline targeting: "dentist in {{NEIGHBORHOOD}}"
4. 10 hyper-local keywords with volume estimates
5. NAP schema JSON-LD (Name, Address, Phone)
6. 5 review-response templates (positive, neutral, negative)
7. Citation checklist (top 15 Indian directories)

TONE: Local, warm, community-focused. Mention landmarks.`,
  },
];

export function PromptFramework() {
  const [expanded, setExpanded] = useState<string | null>("pillar");
  const [copied, setCopied] = useState<string | null>(null);
  const [history, setHistory] = useState<{ id: string; at: string }[]>([]);
  const [search, setSearch] = useState("");

  const copy = async (p: Prompt) => {
    await navigator.clipboard.writeText(p.content);
    setCopied(p.id);
    setHistory((h) => [{ id: p.title, at: new Date().toLocaleTimeString() }, ...h].slice(0, 6));
    toast.success(`${p.title} copied`);
    setTimeout(() => setCopied(null), 1400);
  };

  const filtered = PROMPTS.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-3xl p-8 shadow-[var(--shadow-soft)]" style={{ background: "var(--gradient-hero)" }}>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium">
          <Sparkles className="h-3 w-3" /> Prompt Framework
        </div>
        <h1 className="mt-3 font-[Space_Grotesk] text-3xl font-bold md:text-4xl">Battle-tested SEO prompts</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Copy-paste prompts refined on 12,000+ real SEO briefs. Plug into any LLM (GPT, Claude, Gemini)
          to generate pillar content, clusters, and local SEO packs.
        </p>
        <div className="mt-4 flex max-w-md items-center gap-2 rounded-2xl bg-white p-2">
          <Search className="ml-2 h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search prompts…" className="flex-1 bg-transparent px-2 py-1 text-sm outline-none" />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {filtered.map((p, i) => {
            const isOpen = expanded === p.id;
            const Icon = p.icon;
            return (
              <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="overflow-hidden rounded-3xl bg-white/85 shadow-[var(--shadow-soft)]">
                <div className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: p.tint }}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{p.category}</div>
                      <div className="text-base font-semibold">{p.title}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => copy(p)} className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-semibold shadow-sm hover:shadow">
                      {copied === p.id ? <><Check className="h-3.5 w-3.5 text-green-500" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy</>}
                    </button>
                    <button onClick={() => setExpanded(isOpen ? null : p.id)} className="inline-flex items-center gap-1 rounded-xl bg-muted px-3 py-2 text-xs font-semibold">
                      {isOpen ? <><ChevronUp className="h-3.5 w-3.5" /> Collapse</> : <><ChevronDown className="h-3.5 w-3.5" /> Expand</>}
                    </button>
                  </div>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <CodeBlock code={p.content} />
                    </motion.div>
                  )}
                </AnimatePresence>
                {!isOpen && (
                  <div className="border-t bg-white/60 px-5 py-3 text-xs text-muted-foreground line-clamp-2">
                    {p.content.split("\n").slice(0, 2).join(" · ")}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl bg-white/85 p-6 shadow-[var(--shadow-soft)]">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><History className="h-4 w-4" /> Prompt History</div>
            {history.length === 0 ? (
              <div className="rounded-2xl border border-dashed p-6 text-center">
                <Sparkles className="mx-auto h-5 w-5 text-muted-foreground" />
                <div className="mt-2 text-sm font-medium">No prompts copied yet</div>
                <div className="text-xs text-muted-foreground">Copy a prompt to see it appear here.</div>
              </div>
            ) : (
              <ul className="space-y-2 text-sm">
                {history.map((h, i) => (
                  <li key={i} className="flex items-center justify-between rounded-xl bg-white px-3 py-2">
                    <span className="truncate">{h.id}</span>
                    <span className="text-xs text-muted-foreground">{h.at}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded-3xl p-6 text-white shadow-[var(--shadow-elegant)]" style={{ background: "var(--gradient-primary)" }}>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-80"><Star className="h-3.5 w-3.5" /> Pro tip</div>
            <div className="mt-2 text-lg font-semibold">Chain prompts for compounding results</div>
            <p className="mt-1 text-sm text-white/85">
              Run Keyword Research → feed clusters into Pillar Prompt → generate Supporting posts. That's how top agencies scale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const lines = code.split("\n");
  return (
    <div className="border-t bg-[#0F172A] p-0">
      <div className="flex items-center justify-between px-5 py-2 text-[10px] uppercase tracking-widest text-white/60">
        <span>prompt.md</span>
        <span className="flex gap-1"><span className="h-2 w-2 rounded-full bg-red-400/70" /><span className="h-2 w-2 rounded-full bg-yellow-300/70" /><span className="h-2 w-2 rounded-full bg-green-400/70" /></span>
      </div>
      <pre className="overflow-x-auto px-5 pb-5 text-[13px] leading-relaxed">
        {lines.map((l, i) => (
          <div key={i} className="flex">
            <span className="mr-4 w-6 shrink-0 text-right text-white/30 select-none">{i + 1}</span>
            <code className={highlight(l)}>{l || " "}</code>
          </div>
        ))}
      </pre>
    </div>
  );
}

function highlight(line: string) {
  if (/^#|^GOAL|^REQUIREMENTS|^SPEC|^DELIVER|^RULES|^TONE|^OUTPUT|^INPUT/.test(line)) return "text-cyan-300 font-semibold";
  if (/\{\{.+?\}\}/.test(line)) return "text-orange-300";
  if (/^\d+\./.test(line.trim())) return "text-emerald-300";
  if (line.startsWith("-")) return "text-white/80";
  return "text-white/90";
}