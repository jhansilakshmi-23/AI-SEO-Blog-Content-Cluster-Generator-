import { motion } from "framer-motion";
import {
  TrendingUp, TrendingDown, Search, FileText, Target, MapPin, BookOpenCheck,
  Filter, Plus, ArrowUpRight, Sparkles, BarChart3, Layers, Globe2, Clock,
  CheckCircle2, Loader2, Wand2, LineChart as LineIcon, PieChart as PieIcon,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { ViewKey } from "./App";

const traffic = [
  { m: "Jan", organic: 4200, direct: 1800 },
  { m: "Feb", organic: 5100, direct: 1950 },
  { m: "Mar", organic: 6400, direct: 2100 },
  { m: "Apr", organic: 7200, direct: 2300 },
  { m: "May", organic: 8600, direct: 2500 },
  { m: "Jun", organic: 10500, direct: 2700 },
  { m: "Jul", organic: 12800, direct: 2950 },
];

const rankings = [
  { d: "Mon", top10: 42 }, { d: "Tue", top10: 46 }, { d: "Wed", top10: 51 },
  { d: "Thu", top10: 55 }, { d: "Fri", top10: 60 }, { d: "Sat", top10: 63 }, { d: "Sun", top10: 68 },
];

const intent = [
  { name: "Informational", value: 46, color: "#7CC7F5" },
  { name: "Commercial", value: 28, color: "#FFB68A" },
  { name: "Transactional", value: 18, color: "#A78BFA" },
  { name: "Navigational", value: 8, color: "#6EE7B7" },
];

const keywords = [
  { k: "dental clinic bangalore", vol: 12100, diff: 42, cpc: 3.2, intent: "Commercial", trend: "up" },
  { k: "invisalign indiranagar", vol: 2900, diff: 31, cpc: 4.6, intent: "Commercial", trend: "up" },
  { k: "teeth whitening cost", vol: 5400, diff: 55, cpc: 2.1, intent: "Informational", trend: "down" },
  { k: "root canal treatment near me", vol: 8100, diff: 48, cpc: 3.9, intent: "Transactional", trend: "up" },
  { k: "kids dentist koramangala", vol: 1600, diff: 22, cpc: 2.7, intent: "Commercial", trend: "up" },
  { k: "dental implants bangalore price", vol: 3300, diff: 60, cpc: 5.4, intent: "Commercial", trend: "up" },
];

const projects = [
  { name: "SmileCare Pillar — Cosmetic Dentistry", score: 94, status: "Published", updated: "2h ago" },
  { name: "Invisalign Cluster (12 posts)", score: 88, status: "In review", updated: "5h ago" },
  { name: "Local SEO — Indiranagar", score: 91, status: "Draft", updated: "1d ago" },
  { name: "Teeth Whitening Ultimate Guide", score: 82, status: "Generating", updated: "just now" },
];

const workflow = [
  { s: "Research", d: "Keyword & SERP analysis", done: true },
  { s: "Cluster", d: "Pillar + supporting map", done: true },
  { s: "Draft", d: "AI content generation", done: true },
  { s: "Optimize", d: "SEO score & meta", done: false },
  { s: "Publish", d: "Export & schedule", done: false },
];

export function Dashboard({ onNavigate }: { onNavigate: (v: ViewKey) => void }) {
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(
    () => keywords.filter((k) => k.k.toLowerCase().includes(filter.toLowerCase())),
    [filter]
  );

  const runQuickAction = (label: string) => {
    setLoading(true);
    toast.loading(`Running: ${label}…`, { id: "qa" });
    setTimeout(() => {
      setLoading(false);
      toast.success(`${label} complete`, { id: "qa" });
    }, 1200);
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Search, label: "Tracked Keywords", value: "1,284", trend: "+12.4%", up: true, tint: "var(--gradient-sky)" },
          { icon: FileText, label: "Blogs Generated", value: "348", trend: "+8.1%", up: true, tint: "var(--gradient-peach)" },
          { icon: Target, label: "Avg. SEO Score", value: "92 / 100", trend: "+3.6%", up: true, tint: "var(--gradient-sky)" },
          { icon: MapPin, label: "Local Rankings", value: "68", trend: "-1.2%", up: false, tint: "var(--gradient-peach)" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="group rounded-3xl bg-white/80 p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)]"
          >
            <div className="flex items-center justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: s.tint }}>
                <s.icon className="h-5 w-5" />
              </div>
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${s.up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}{s.trend}
              </span>
            </div>
            <div className="mt-4 text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl bg-white/80 p-6 shadow-[var(--shadow-soft)] lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold"><BarChart3 className="h-4 w-4" /> Organic Traffic</div>
              <div className="text-xs text-muted-foreground">Last 7 months · smilecare.in</div>
            </div>
            <div className="flex gap-1 rounded-xl bg-muted p-1 text-xs">
              {["7D","30D","6M"].map((r) => <button key={r} className="rounded-lg px-2.5 py-1 hover:bg-white">{r}</button>)}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={traffic}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7CC7F5" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#7CC7F5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFB68A" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#FFB68A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#eef2f7" vertical={false} />
              <XAxis dataKey="m" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }} />
              <Area type="monotone" dataKey="organic" stroke="#3AA8E8" fill="url(#g1)" strokeWidth={2.5} />
              <Area type="monotone" dataKey="direct" stroke="#F58A55" fill="url(#g2)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-3xl bg-white/80 p-6 shadow-[var(--shadow-soft)]">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold"><PieIcon className="h-4 w-4" /> Search Intent Split</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={intent} innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                {intent.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: "none" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {intent.map((i) => (
              <div key={i.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: i.color }} /> {i.name}</span>
                <span className="font-semibold">{i.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature cards + workflow */}
      <div className="grid gap-4 lg:grid-cols-3">
        <FeatureCard onNavigate={onNavigate} icon={FileText} title="Pillar Blog Generator" desc="Generate 3000-word SEO pillar content with H2/H3 structure." tint="var(--gradient-sky)" cta="prompts" />
        <FeatureCard onNavigate={onNavigate} icon={Layers} title="Content Cluster Map" desc="Interactive pillar + supporting article visualizer." tint="var(--gradient-peach)" cta="generator" />
        <FeatureCard onNavigate={onNavigate} icon={Globe2} title="Local SEO Booster" desc="Generate hyper-local content for Bangalore neighborhoods." tint="var(--gradient-sky)" cta="generator" />
      </div>

      {/* Workflow + Recent */}
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="rounded-3xl bg-white/80 p-6 shadow-[var(--shadow-soft)] lg:col-span-3">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold"><Wand2 className="h-4 w-4" /> Prompt Workflow</div>
            <button onClick={() => onNavigate("prompts")} className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-1">View prompts <ArrowUpRight className="h-3 w-3" /></button>
          </div>
          <ol className="grid gap-3 md:grid-cols-5">
            {workflow.map((w, i) => (
              <motion.li key={w.s} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className={`rounded-2xl border p-3 ${w.done ? "border-green-200 bg-green-50/60" : "border-dashed border-border bg-white"}`}>
                <div className="flex items-center gap-2">
                  <div className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${w.done ? "bg-green-500 text-white" : "bg-muted"}`}>
                    {w.done ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  <div className="text-sm font-semibold">{w.s}</div>
                </div>
                <div className="mt-1.5 text-xs text-muted-foreground">{w.d}</div>
              </motion.li>
            ))}
          </ol>

          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><LineIcon className="h-4 w-4" /> Top-10 Rankings This Week</div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={rankings}>
                <CartesianGrid stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="d" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "none" }} />
                <Line type="monotone" dataKey="top10" stroke="#A78BFA" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl bg-white/80 p-6 shadow-[var(--shadow-soft)] lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold"><Clock className="h-4 w-4" /> Recent Projects</div>
            <button className="text-xs font-medium text-primary hover:underline">View all</button>
          </div>
          <ul className="space-y-3">
            {projects.map((p) => (
              <li key={p.name} className="rounded-2xl border border-white/60 bg-white p-3">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.updated}</div>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    p.status === "Published" ? "bg-green-100 text-green-700"
                    : p.status === "Generating" ? "bg-blue-100 text-blue-700"
                    : p.status === "Draft" ? "bg-muted text-muted-foreground"
                    : "bg-orange-100 text-orange-700"}`}>{p.status === "Generating" ? <Loader2 className="mr-1 inline h-3 w-3 animate-spin" /> : null}{p.status}</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full" style={{ width: `${p.score}%`, background: "var(--gradient-primary)" }} />
                  </div>
                  <div className="text-xs font-semibold">{p.score}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Keywords + Quick actions */}
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="rounded-3xl bg-white/80 p-6 shadow-[var(--shadow-soft)] lg:col-span-3">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold"><Target className="h-4 w-4" /> Keyword Opportunities</div>
              <div className="text-xs text-muted-foreground">Curated for SmileCare · Bangalore</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Filter className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Filter keywords…"
                  className="w-52 rounded-xl border border-input bg-white py-2 pl-8 pr-3 text-xs outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button onClick={() => runQuickAction("Add keyword")} className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold text-white" style={{ background: "var(--gradient-primary)" }}>
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {filtered.length === 0 && (
              <div className="col-span-full rounded-2xl border border-dashed p-8 text-center">
                <Sparkles className="mx-auto h-6 w-6 text-muted-foreground" />
                <div className="mt-2 text-sm font-medium">No matching keywords</div>
                <div className="text-xs text-muted-foreground">Try clearing the filter above.</div>
              </div>
            )}
            {filtered.map((k) => (
              <motion.div key={k.k} whileHover={{ y: -2 }} className="rounded-2xl border border-white/60 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <div className="truncate text-sm font-semibold">{k.k}</div>
                  {k.trend === "up" ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Vol <b className="text-foreground">{k.vol.toLocaleString()}</b></span>
                  <span>CPC <b className="text-foreground">${k.cpc}</b></span>
                  <span className="rounded-full bg-muted px-2 py-0.5">{k.intent}</span>
                </div>
                <div className="mt-3">
                  <div className="mb-1 flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
                    <span>Difficulty</span><span>{k.diff}/100</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full" style={{ width: `${k.diff}%`, background: k.diff > 55 ? "#F87171" : k.diff > 35 ? "#FBBF24" : "#34D399" }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-3xl bg-white/80 p-6 shadow-[var(--shadow-soft)]">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4" /> Quick Actions</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { l: "New pillar", i: FileText },
                { l: "Cluster map", i: Layers },
                { l: "Local SEO", i: MapPin },
                { l: "Meta gen", i: BookOpenCheck },
              ].map((a) => (
                <button key={a.l} disabled={loading} onClick={() => runQuickAction(a.l)}
                  className="flex flex-col items-start gap-2 rounded-2xl border border-white/60 bg-white p-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60">
                  <a.i className="h-4 w-4" />
                  <span className="text-xs font-semibold">{a.l}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-3xl p-6 text-white shadow-[var(--shadow-elegant)]" style={{ background: "var(--gradient-primary)" }}>
            <div className="text-xs uppercase tracking-widest opacity-80">Weekly insight</div>
            <div className="mt-2 text-lg font-semibold">Your "invisalign" cluster is +38% this week 🎉</div>
            <p className="mt-1 text-sm text-white/85">Publish 2 more supporting posts to lock top 3 rankings.</p>
            <button onClick={() => onNavigate("generator")} className="mt-4 rounded-xl bg-white/20 px-3 py-2 text-xs font-semibold hover:bg-white/30">Generate posts →</button>
          </div>
          <div className="rounded-3xl bg-white/80 p-6 shadow-[var(--shadow-soft)]">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><Clock className="h-4 w-4" /> Activity Timeline</div>
            <ol className="relative space-y-4 border-l border-border pl-4">
              {[
                { t: "Cluster generated", d: "12 supporting posts for Invisalign", ago: "2m" },
                { t: "Keyword added", d: "'teeth cleaning cost bangalore'", ago: "1h" },
                { t: "Blog published", d: "Cosmetic Dentistry Guide", ago: "4h" },
                { t: "SEO scan complete", d: "Score: 92 (+3)", ago: "1d" },
              ].map((a) => (
                <li key={a.t} className="relative">
                  <span className="absolute -left-[22px] top-1.5 h-2.5 w-2.5 rounded-full" style={{ background: "var(--gradient-primary)" }} />
                  <div className="text-sm font-medium">{a.t}</div>
                  <div className="text-xs text-muted-foreground">{a.d} · {a.ago} ago</div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Skeleton demo (loading) */}
      {loading && (
        <div className="grid gap-3 sm:grid-cols-3">
          {[1,2,3].map((i) => (
            <div key={i} className="animate-pulse rounded-3xl bg-white/70 p-5">
              <div className="h-4 w-1/2 rounded bg-muted" />
              <div className="mt-3 h-8 w-3/4 rounded bg-muted" />
              <div className="mt-6 h-2 w-full rounded bg-muted" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FeatureCard({ onNavigate, icon: Icon, title, desc, tint, cta }: {
  onNavigate: (v: ViewKey) => void; icon: React.ComponentType<{ className?: string }>;
  title: string; desc: string; tint: string; cta: ViewKey;
}) {
  return (
    <motion.div whileHover={{ y: -4 }} className="group overflow-hidden rounded-3xl bg-white/80 p-6 shadow-[var(--shadow-soft)]">
      <div className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: tint }}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="mt-4 text-lg font-semibold">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      <button onClick={() => onNavigate(cta)} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
        Open <ArrowUpRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}