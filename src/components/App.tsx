import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sparkles,
  LayoutDashboard,
  Wand2,
  FileCode2,
  BookOpen,
  Search,
  Bell,
  Menu,
  X,
  Command,
  Github,
  Linkedin,
  Mail,
  Globe,
  ArrowRight,
  Rocket,
  TrendingUp,
  ShieldCheck,
  Zap,
  MessageCircle,
  Send,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { Dashboard } from "./Dashboard";
import { PromptFramework } from "./PromptFramework";
import { SEOGenerator } from "./SEOGenerator";
import { READMEPage } from "./READMEPage";

export type ViewKey = "dashboard" | "prompts" | "generator" | "readme";

const NAV: { key: ViewKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "prompts", label: "Prompt Framework", icon: FileCode2 },
  { key: "generator", label: "SEO Generator", icon: Wand2 },
  { key: "readme", label: "README", icon: BookOpen },
];

export function App() {
  const [view, setView] = useState<ViewKey>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
      if (e.key === "Escape") setCmdOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (v: ViewKey) => {
    setView(v);
    setSidebarOpen(false);
    setCmdOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen text-foreground">
      <Toaster position="top-right" richColors />

      {/* Sticky Navbar */}
      <header className="sticky top-0 z-40 glass border-b border-white/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <button onClick={() => go("dashboard")} className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-2xl" style={{ background: "var(--gradient-primary)" }}>
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-base font-bold leading-none">RankForge<span className="gradient-text"> AI</span></div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">SEO Content Studio</div>
            </div>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <button
                key={n.key}
                onClick={() => go(n.key)}
                className={`rounded-xl px-3.5 py-2 text-sm font-medium transition-all ${
                  view === n.key ? "bg-white shadow-[var(--shadow-soft)]" : "text-muted-foreground hover:text-foreground hover:bg-white/60"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCmdOpen(true)}
              className="hidden items-center gap-2 rounded-xl border border-white/60 bg-white/60 px-3 py-2 text-xs text-muted-foreground md:flex"
            >
              <Search className="h-3.5 w-3.5" /> Search…
              <kbd className="ml-4 rounded bg-white px-1.5 py-0.5 text-[10px]">⌘K</kbd>
            </button>
            <button
              onClick={() => toast("3 new SEO insights waiting", { description: "Keyword drift detected in 'dental implants'." })}
              className="relative grid h-10 w-10 place-items-center rounded-xl bg-white/70 hover:bg-white"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-400" />
            </button>
            <button
              onClick={() => go("generator")}
              className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-elegant)] sm:inline-flex"
              style={{ background: "var(--gradient-primary)" }}
            >
              Try Free
            </button>
            <button className="grid h-10 w-10 place-items-center rounded-xl bg-white/70 lg:hidden" onClick={() => setSidebarOpen((v) => !v)}>
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 md:px-8">
        {/* Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || typeof window === "undefined" || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              className={`fixed inset-y-0 left-0 z-30 w-72 shrink-0 lg:sticky lg:top-24 lg:z-0 lg:block lg:h-fit lg:w-64 ${
                sidebarOpen ? "block" : "hidden lg:block"
              }`}
            >
              <div className="glass mt-4 h-[calc(100vh-6rem)] overflow-y-auto rounded-3xl p-4 lg:mt-0 lg:h-auto">
                <div className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Workspace</div>
                <nav className="space-y-1">
                  {NAV.map((n) => {
                    const Icon = n.icon;
                    const active = view === n.key;
                    return (
                      <button
                        key={n.key}
                        onClick={() => go(n.key)}
                        className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all ${
                          active
                            ? "text-white shadow-[var(--shadow-elegant)]"
                            : "text-foreground hover:bg-white/70"
                        }`}
                        style={active ? { background: "var(--gradient-primary)" } : undefined}
                      >
                        <Icon className="h-4 w-4" />
                        {n.label}
                      </button>
                    );
                  })}
                </nav>

                <div className="my-4 h-px bg-border" />
                <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Recent Projects</div>
                <ul className="space-y-1 text-sm">
                  {["SmileCare Bangalore Pillar", "Invisalign Cluster", "Local SEO — Indiranagar", "Teeth Whitening Guide"].map((p) => (
                    <li key={p}>
                      <button className="w-full truncate rounded-xl px-3 py-2 text-left text-muted-foreground hover:bg-white/70 hover:text-foreground">
                        {p}
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 rounded-2xl p-4" style={{ background: "var(--gradient-hero)" }}>
                  <div className="flex items-center gap-2 text-xs font-semibold"><Rocket className="h-3.5 w-3.5" /> Pro Plan</div>
                  <p className="mt-2 text-xs text-muted-foreground">Unlock unlimited pillar generations, cluster maps & PDF exports.</p>
                  <button className="mt-3 w-full rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold hover:bg-white">Upgrade</button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main */}
        <main className="min-w-0 flex-1">
          {view === "dashboard" && (
            <>
              <Hero onCTA={() => go("generator")} />
              <Dashboard onNavigate={go} />
            </>
          )}
          {view === "prompts" && <PromptFramework />}
          {view === "generator" && <SEOGenerator />}
          {view === "readme" && <READMEPage />}

          <Footer />
        </main>
      </div>

      {/* Floating Search */}
      <button
        onClick={() => setCmdOpen(true)}
        className="fixed bottom-24 right-6 z-40 hidden h-12 items-center gap-2 rounded-full bg-white px-4 shadow-[var(--shadow-elegant)] sm:inline-flex"
      >
        <Search className="h-4 w-4" /> <span className="text-sm font-medium">Quick search</span>
      </button>

      {/* AI Assistant */}
      <button
        onClick={() => setAssistantOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full text-white shadow-[var(--shadow-elegant)]"
        style={{ background: "var(--gradient-primary)" }}
      >
        <MessageCircle className="h-6 w-6" />
      </button>
      <AnimatePresence>
        {assistantOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="fixed bottom-24 right-6 z-40 flex h-[420px] w-[340px] flex-col overflow-hidden rounded-3xl glass shadow-[var(--shadow-elegant)]"
          >
            <div className="flex items-center justify-between border-b border-white/40 p-4">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-xl text-white" style={{ background: "var(--gradient-primary)" }}>
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Forge Assistant</div>
                  <div className="text-[10px] text-muted-foreground">Online • replies in seconds</div>
                </div>
              </div>
              <button onClick={() => setAssistantOpen(false)}><X className="h-4 w-4" /></button>
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto p-4 text-sm">
              <div className="max-w-[80%] rounded-2xl bg-white p-3 shadow-sm">Hi 👋 Need help drafting a pillar blog for SmileCare?</div>
              <div className="ml-auto max-w-[80%] rounded-2xl px-3 py-2 text-white" style={{ background: "var(--gradient-primary)" }}>
                Give me 5 dental keywords for Bangalore.
              </div>
              <div className="max-w-[80%] rounded-2xl bg-white p-3 shadow-sm">
                Sure — try: dental clinic Bangalore, invisalign Indiranagar, teeth whitening HSR, root canal cost Bangalore, kids dentist Koramangala.
              </div>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); toast.success("Message sent to Forge Assistant"); }}
              className="flex items-center gap-2 border-t border-white/40 p-3"
            >
              <input placeholder="Ask anything…" className="flex-1 rounded-xl bg-white/80 px-3 py-2 text-sm outline-none" />
              <button className="grid h-9 w-9 place-items-center rounded-xl text-white" style={{ background: "var(--gradient-primary)" }}>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Palette */}
      <AnimatePresence>
        {cmdOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-start bg-black/30 pt-24 backdrop-blur-sm"
            onClick={() => setCmdOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, y: -8 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              <div className="flex items-center gap-2 border-b px-4 py-3">
                <Command className="h-4 w-4 text-muted-foreground" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pages, prompts, keywords…"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>
              <div className="max-h-80 overflow-y-auto p-2">
                {NAV.filter((n) => n.label.toLowerCase().includes(query.toLowerCase())).map((n) => (
                  <button
                    key={n.key}
                    onClick={() => go(n.key)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-muted"
                  >
                    <n.icon className="h-4 w-4 text-muted-foreground" /> {n.label}
                  </button>
                ))}
                <div className="mt-2 px-3 pb-2 pt-3 text-[10px] uppercase tracking-widest text-muted-foreground">Suggested</div>
                {["Generate pillar blog", "New keyword cluster", "Export as PDF", "Local SEO — Bangalore"].map((s) => (
                  <button key={s} onClick={() => { toast.success(s); setCmdOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-muted">
                    <Zap className="h-4 w-4 text-muted-foreground" /> {s}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Hero({ onCTA }: { onCTA: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-[32px] p-8 md:p-12" style={{ background: "var(--gradient-hero)" }}>
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium">
          <Sparkles className="h-3 w-3" /> New · AI Content Cluster Maps v2
        </div>
        <h1 className="mt-4 max-w-3xl font-[Space_Grotesk] text-4xl font-bold leading-tight md:text-6xl">
          Rank higher, faster — with <span className="gradient-text">AI-powered SEO clusters</span>.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          Generate SEO pillar blogs, supporting articles, keyword strategies and local SEO
          content in minutes. Purpose-built for growth teams and agencies.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button onClick={onCTA} className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-[var(--shadow-elegant)]" style={{ background: "var(--gradient-primary)" }}>
            Generate your first blog <ArrowRight className="h-4 w-4" />
          </button>
          <button className="inline-flex items-center gap-2 rounded-2xl bg-white/80 px-5 py-3 text-sm font-semibold hover:bg-white">
            Watch 2-min demo
          </button>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: TrendingUp, k: "3.4×", v: "Faster ranking" },
            { icon: ShieldCheck, k: "98%", v: "SEO score avg." },
            { icon: Zap, k: "12k+", v: "Blogs generated" },
            { icon: Rocket, k: "50+", v: "Local markets" },
          ].map((s, i) => (
            <motion.div key={s.v} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="rounded-2xl bg-white/70 p-4">
              <s.icon className="h-4 w-4 text-muted-foreground" />
              <div className="mt-2 text-2xl font-bold">{s.k}</div>
              <div className="text-xs text-muted-foreground">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-16 rounded-3xl glass p-8">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl text-white" style={{ background: "var(--gradient-primary)" }}>
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="font-bold">RankForge AI</div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">The premium AI SEO studio for pillar content, clusters & local search.</p>
        </div>
        {[
          { t: "Product", items: ["Dashboard", "SEO Generator", "Prompt Library", "Cluster Maps"] },
          { t: "Resources", items: ["Docs", "Blog", "SEO Guides", "Changelog"] },
          { t: "Company", items: ["About", "Careers", "Contact", "Privacy"] },
        ].map((c) => (
          <div key={c.t}>
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{c.t}</div>
            <ul className="mt-3 space-y-2 text-sm">
              {c.items.map((i) => (
                <li key={i}><a className="text-muted-foreground hover:text-foreground" href="#">{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/40 pt-6 md:flex-row md:items-center">
        <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} RankForge AI · Built for SmileCare Dental Clinic, Bangalore</div>
        <div className="flex items-center gap-2">
          {[
            { icon: Github, href: "#" },
            { icon: Linkedin, href: "#" },
            { icon: Globe, href: "#" },
            { icon: Mail, href: "#" },
          ].map(({ icon: I, href }, i) => (
            <a key={i} href={href} className="grid h-9 w-9 place-items-center rounded-xl bg-white/70 hover:bg-white">
              <I className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}