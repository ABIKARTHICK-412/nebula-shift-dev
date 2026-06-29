import * as React from "react";
import * as Icons from "lucide-react";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { portfolio } from "@/data/portfolio";
import { SectionHead } from "./projects";
import { getGithubStats } from "@/lib/github";
import { emailConfig, isEmailConfigured } from "@/config/email";
import { asset } from "@/lib/asset";

type LucideIcon = React.ComponentType<{ className?: string }>;
const lucide = Icons as unknown as Record<string, LucideIcon>;

// ─── Released Games (vertical Steam-library panel) ───────────────────────────

export function RecentlyDeveloped() {
  const released = portfolio.projects.filter(
    (p) => p.metrics.status === "Completed",
  );
  return (
    <div className="rounded-sm border border-white/8 bg-[#2B2E35]/80 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
        <div className="font-display text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
          Released Games
        </div>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {released.length} titles
        </span>
      </div>
      <div className="scroll-row max-h-[460px] overflow-y-auto px-2 py-2">
        <ul className="flex flex-col gap-1.5">
          {released.map((p) => (
            <li key={p.id}>
              <a
                href="#library"
                className="card-lift group flex items-center gap-3 rounded-sm border border-transparent bg-[#32353D]/30 p-2 hover:border-primary/30 hover:bg-[#32353D]/60"
              >
                <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-sm border border-white/8 bg-gradient-to-br from-[#32353D] via-[#2B2E35] to-[#1B1B1F]">
                  <div className="absolute inset-0 grid-bg opacity-30" />
                  {p.media?.banner ? (
                    <img
                      src={asset(p.media.banner)}
                      alt={p.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center">
                      <Icons.Gamepad2 className="h-4 w-4 text-foreground/30" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-display text-sm font-semibold text-foreground">
                    {p.title}
                  </div>
                  <div className="truncate text-[10px] uppercase tracking-widest text-muted-foreground">
                    {p.metrics.engine} · {p.category}
                  </div>
                </div>
                <Icons.ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-accent" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Development Toolkit (was: Skills) ──────────────────────────────────────

export function Skills() {
  return (
    <section
      id="toolkit"
      className="relative isolate mx-auto mt-20 max-w-7xl overflow-hidden px-4 sm:px-6"
    >
      <div
        className="section-bg"
        style={{ ['--section-bg-image' as never]: `url(${asset('bg/skills.jpg')})` }}
      />
      <SectionHead eyebrow="Skills" title="Technical Skills" />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.skillGroups.map((g) => {
          const Icon = lucide[g.icon] ?? Icons.Sparkles;
          return (
            <div
              key={g.id}
              className="card-lift rounded-sm border border-white/8 bg-[#2B2E35] p-5"
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-sm bg-primary/15 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="font-display text-sm font-bold uppercase tracking-wider">
                  {g.title}
                </h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <span
                    key={s.name}
                    className="rounded-sm border border-white/8 bg-[#32353D]/50 px-2.5 py-1 text-[11px] font-medium text-foreground/90"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── About (Steam developer profile) ────────────────────────────────────────

export function About() {
  return (
    <section
      id="about"
      className="relative isolate mx-auto mt-20 max-w-7xl overflow-hidden px-4 sm:px-6"
    >
      <div
        className="section-bg"
        style={{ ['--section-bg-image' as never]: `url(${asset('bg/about.jpg')})` }}
      />
      <SectionHead eyebrow="Developer Profile" title="About The Developer" />

      <div className="mt-6 grid gap-5 lg:grid-cols-[300px_1fr]">
        {/* Profile card */}
        <div className="rounded-sm border border-white/8 bg-[#2B2E35] p-5">
          <div className="mx-auto grid h-28 w-28 place-items-center overflow-hidden rounded-full border-2 border-primary/40 bg-[#32353D]">
            <img
              src={asset(portfolio.profile.photo)}
              alt={portfolio.profile.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <Icons.User className="absolute h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-center font-display text-lg font-bold">
            {portfolio.profile.name}
          </h3>
          <p className="text-center text-xs text-muted-foreground">
            {portfolio.profile.tagline}
          </p>

          <div className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-sm border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Online
          </div>

          <div className="mt-4 space-y-2 text-xs">
            <Row
              icon={<Icons.MapPin className="h-3.5 w-3.5" />}
              label={portfolio.profile.location}
            />
            <Row
              icon={<Icons.Cpu className="h-3.5 w-3.5" />}
              label={`Engine: ${portfolio.quickView.primaryEngine}`}
            />
            <Row
              icon={<Icons.Code2 className="h-3.5 w-3.5" />}
              label={portfolio.quickView.languages.join(" · ")}
            />
            <Row
              icon={<Icons.Briefcase className="h-3.5 w-3.5" />}
              label={portfolio.quickView.experience}
            />
          </div>

          <div className="mt-4 flex justify-center gap-1.5">
            <a
              href={portfolio.profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid h-8 w-8 place-items-center rounded-sm border border-white/8 bg-white/5 text-foreground/80 hover:text-accent"
            >
              <Icons.Github className="h-4 w-4" />
            </a>
            <a
              href={portfolio.profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-8 w-8 place-items-center rounded-sm border border-white/8 bg-white/5 text-foreground/80 hover:text-accent"
            >
              <Icons.Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${portfolio.profile.email}`}
              aria-label="Email"
              className="grid h-8 w-8 place-items-center rounded-sm border border-white/8 bg-white/5 text-foreground/80 hover:text-accent"
            >
              <Icons.Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid gap-4">
          <InfoCard icon={<Icons.User className="h-4 w-4" />} title="Bio">
            <p className="text-sm leading-relaxed text-foreground/90">
              {portfolio.about.bio}
            </p>
          </InfoCard>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard
              icon={<Icons.GraduationCap className="h-4 w-4" />}
              title="Education"
            >
              <div className="space-y-2">
                {portfolio.about.education.map((e) => (
                  <div
                    key={e.degree}
                    className="rounded-sm border border-white/5 bg-[#32353D]/40 p-2.5"
                  >
                    <div className="font-display text-xs font-semibold text-foreground">
                      {e.degree}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {e.school}
                    </div>
                    {e.detail ? (
                      <div className="mt-0.5 text-[11px] text-primary">
                        {e.detail}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </InfoCard>

            <InfoCard
              icon={<Icons.Construction className="h-4 w-4" />}
              title="Current Focus"
            >
              <div className="font-display text-base font-bold">
                {portfolio.currentlyBuilding.title}
              </div>
              <div className="text-xs text-muted-foreground">
                {portfolio.currentlyBuilding.subtitle}
              </div>
              <p className="mt-2 text-xs text-foreground/85">
                {portfolio.currentlyBuilding.description}
              </p>
              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider">
                  <span className="text-muted-foreground">
                    {portfolio.currentlyBuilding.status}
                  </span>
                  <span className="font-semibold text-primary">
                    {portfolio.currentlyBuilding.progress}%
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${portfolio.currentlyBuilding.progress}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            </InfoCard>
          </div>

          <InfoCard
            icon={<Icons.Activity className="h-4 w-4" />}
            title="Recent Activity"
          >
            <div className="grid gap-2 sm:grid-cols-3">
              {portfolio.timeline.map((t) => (
                <div
                  key={t.year}
                  className="rounded-sm border border-white/5 bg-[#32353D]/40 p-2.5"
                >
                  <div className="font-display text-xs font-bold text-primary">
                    {t.year}
                  </div>
                  <div className="mt-0.5 font-display text-xs font-semibold">
                    {t.title}
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">
                    {t.description}
                  </div>
                </div>
              ))}
            </div>
          </InfoCard>
        </div>
      </div>
    </section>
  );
}

function Row({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <span className="text-primary">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-sm border border-white/8 bg-[#2B2E35] p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-sm bg-primary/15 text-primary">
          {icon}
        </span>
        <h4 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-foreground">
          {title}
        </h4>
      </div>
      {children}
    </div>
  );
}

// ─── Development Activity (was: GitHub) ─────────────────────────────────────

export function GithubBlock() {
  const q = useQuery({
    queryKey: ["github", portfolio.github.username],
    queryFn: () => getGithubStats(portfolio.github.username),
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  const languages = React.useMemo(() => {
    if (!q.data?.ok) return [];
    const counts = new Map<string, number>();
    for (const r of q.data.recent) {
      if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [q.data]);

  return (
    <section
      id="activity"
      className="relative isolate mx-auto mt-20 max-w-7xl overflow-hidden px-4 sm:px-6"
    >
      <div
        className="section-bg"
        style={{ ['--section-bg-image' as never]: `url(${asset('bg/activity.jpg')})` }}
      />
      <SectionHead
        eyebrow="Development Activity"
        title={`@${portfolio.github.username}`}
      />


      <div className="mt-6 space-y-4">
        {q.isLoading ? (
          <div className="rounded-sm border border-white/8 bg-[#2B2E35] p-5 text-sm text-muted-foreground">
            Loading GitHub activity…
          </div>
        ) : q.data?.ok ? (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Widget
                icon={<Icons.Database className="h-4 w-4" />}
                label="Public Repositories"
                value={String(q.data.publicRepos)}
              />
              <Widget
                icon={<Icons.Wrench className="h-4 w-4" />}
                label="Currently Maintained"
                value={String(q.data.recent.length)}
              />
              <Widget
                icon={<Icons.Code2 className="h-4 w-4" />}
                label="Languages Used"
                value={String(languages.length)}
              />
              <Widget
                icon={<Icons.GitBranch className="h-4 w-4" />}
                label="Recent Development"
                value={String(q.data.recent.length)}
              />
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
              <div className="rounded-sm border border-white/8 bg-[#2B2E35] p-5">
                <h4 className="mb-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Recent Projects
                </h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {q.data.recent.map((r) => (
                    <a
                      key={r.name}
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="card-lift block rounded-sm border border-white/5 bg-[#32353D]/40 p-3 hover:border-primary/30"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-display text-sm font-semibold text-foreground">
                          {r.name}
                        </div>
                        <div className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Icons.Star className="h-3 w-3" /> {r.stars}
                        </div>
                      </div>
                      {r.description ? (
                        <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                          {r.description}
                        </div>
                      ) : null}
                      {r.language ? (
                        <div className="mt-2 inline-flex rounded-sm border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                          {r.language}
                        </div>
                      ) : null}
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-sm border border-white/8 bg-[#2B2E35] p-5">
                <h4 className="mb-3 font-display text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Languages
                </h4>
                {languages.length ? (
                  <div className="space-y-2">
                    {languages.map(([lang, count]) => {
                      const max = Math.max(...languages.map(([, c]) => c));
                      const pct = (count / max) * 100;
                      return (
                        <div key={lang}>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-medium text-foreground">
                              {lang}
                            </span>
                            <span className="text-muted-foreground">
                              {count}
                            </span>
                          </div>
                          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground">
                    No language data available.
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-sm border border-white/8 bg-[#2B2E35] p-5 text-sm text-muted-foreground">
            Live GitHub data unavailable right now. Visit{" "}
            <a
              className="text-primary underline"
              href={`https://github.com/${portfolio.github.username}`}
            >
              github.com/{portfolio.github.username}
            </a>
            .
          </div>
        )}
      </div>
    </section>
  );
}

function Widget({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="card-lift rounded-sm border border-white/8 bg-[#2B2E35] p-4">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
        <span className="text-primary">{icon}</span> {label}
      </div>
      <div className="mt-2 font-display text-2xl font-extrabold text-foreground">
        {value}
      </div>
    </div>
  );
}

// ─── Developer Support (was: Contact) ───────────────────────────────────────

const contactSchema = z.object({
  name: z.string().trim().min(1, "Required").max(80, "Too long"),
  email: z.string().trim().email("Invalid email").max(160),
  subject: z.string().trim().min(1, "Required").max(120, "Too long"),
  message: z.string().trim().min(1, "Required").max(2000, "Too long"),
});
type ContactValues = z.infer<typeof contactSchema>;

export function Contact() {
  const [sending, setSending] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(values: ContactValues) {
    setSending(true);
    try {
      if (isEmailConfigured()) {
        await emailjs.send(
          emailConfig.serviceId,
          emailConfig.templateId,
          {
            name: values.name,
            email: values.email,
            subject: values.subject,
            message: values.message,
            to_email: portfolio.profile.email,
          },
          { publicKey: emailConfig.publicKey },
        );
        toast.success("Request sent — thanks for reaching out!");
        reset();
      } else {
        const subject = encodeURIComponent(
          values.subject || `Portfolio Contact — ${values.name}`,
        );
        const body = encodeURIComponent(
          `${values.message}\n\n— ${values.name} (${values.email})`,
        );
        window.location.href = `mailto:${portfolio.profile.email}?subject=${subject}&body=${body}`;
        toast.message("Opening your mail client…");
        reset();
      }
    } catch (err) {
      console.error("[contact] send failed", err);
      toast.error("Couldn't send right now. Please email me directly.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      id="support"
      className="relative isolate mx-auto mt-20 max-w-7xl overflow-hidden px-4 sm:px-6"
    >
      <div
        className="section-bg"
        style={{ ['--section-bg-image' as never]: `url(${asset('bg/contact.jpg')})` }}
      />
      <SectionHead
        eyebrow="Get In Touch"
        title="Let's Build Something Together"
        sub="Open a conversation about roles, collaborations, or game projects."
      />

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 rounded-sm border border-white/8 bg-[#2B2E35] p-5"
          noValidate
        >
          <div className="mb-1 flex items-center gap-2 border-b border-white/5 pb-3">
            <Icons.Mail className="h-4 w-4 text-primary" />
            <span className="font-display text-xs font-bold uppercase tracking-[0.18em]">
              Send A Message
            </span>
          </div>

          {import.meta.env.DEV && !isEmailConfigured() ? (
            <div className="rounded-sm border border-amber-400/30 bg-amber-400/5 px-3 py-2 text-[11px] text-amber-200">
              EmailJS not configured — form will fall back to{" "}
              <code>mailto:</code>. Set <code className="mx-1">VITE_EMAIL_*</code>
              in <code>.env.local</code>.
            </div>
          ) : null}

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Name" error={errors.name?.message} {...register("name")} />
            <Field
              label="Email"
              type="email"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
          <Field
            label="Subject"
            error={errors.subject?.message}
            {...register("subject")}
          />
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Your message
            </label>
            <textarea
              rows={6}
              maxLength={2000}
              {...register("message")}
              className="mt-1.5 w-full rounded-sm border border-white/10 bg-[#1B1B1F] px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
            {errors.message ? (
              <p className="mt-1 text-[11px] text-destructive">
                {errors.message.message}
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={sending}
            className="btn-steam inline-flex w-full items-center justify-center gap-2 rounded-sm px-4 py-2.5 text-sm font-semibold uppercase tracking-wider disabled:cursor-not-allowed disabled:opacity-60"
          >
            {sending ? (
              <>
                <Icons.Loader2 className="h-4 w-4 animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Icons.Send className="h-4 w-4" /> Send Message
              </>
            )}
          </button>
        </form>

        <div className="space-y-4">
          <div className="rounded-sm border border-white/8 bg-[#2B2E35] p-5">
            <div className="mb-3 flex items-center gap-2 border-b border-white/5 pb-3">
              <Icons.MessageSquare className="h-4 w-4 text-primary" />
              <span className="font-display text-xs font-bold uppercase tracking-[0.18em]">
                Direct Contact
              </span>
            </div>
            <div className="space-y-2.5 text-sm">
              <a
                className="flex items-center gap-2 hover:text-accent"
                href={`mailto:${portfolio.profile.email}`}
              >
                <Icons.Mail className="h-4 w-4 text-primary" />{" "}
                {portfolio.profile.email}
              </a>
              <a
                className="flex items-center gap-2 hover:text-accent"
                href={portfolio.profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Icons.Linkedin className="h-4 w-4 text-primary" /> LinkedIn
              </a>
              <a
                className="flex items-center gap-2 hover:text-accent"
                href={portfolio.profile.github}
                target="_blank"
                rel="noreferrer"
              >
                <Icons.Github className="h-4 w-4 text-primary" /> GitHub
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icons.MapPin className="h-4 w-4 text-primary" />{" "}
                {portfolio.profile.location}
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-white/8 bg-[#2B2E35] p-5">
            <div className="mb-3 flex items-center gap-2 border-b border-white/5 pb-3">
              <Icons.Download className="h-4 w-4 text-primary" />
              <span className="font-display text-xs font-bold uppercase tracking-[0.18em]">
                Resume
              </span>
            </div>
            <a
              href={asset(portfolio.resume)}
              download
              className="inline-flex w-full items-center justify-between rounded-sm border border-white/8 bg-[#32353D]/40 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider hover:border-primary/30 hover:bg-[#32353D]/70"
            >
              Download Resume
              <Icons.Download className="h-3.5 w-3.5 text-primary" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
const Field = React.forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, error, type = "text", ...rest },
  ref,
) {
  return (
    <div>
      <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        ref={ref}
        type={type}
        {...rest}
        className="mt-1.5 w-full rounded-sm border border-white/10 bg-[#1B1B1F] px-3 py-2 text-sm outline-none focus:border-primary"
      />
      {error ? (
        <p className="mt-1 text-[11px] text-destructive">{error}</p>
      ) : null}
    </div>
  );
});

// ─── Footer (minimal) ────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-[#1B1B1F]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6">
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {portfolio.profile.name}
        </div>
        <div className="flex items-center gap-2">
          <a
            href={portfolio.profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-8 w-8 place-items-center rounded-sm border border-white/8 bg-white/5 text-foreground/70 hover:text-accent"
          >
            <Icons.Github className="h-4 w-4" />
          </a>
          <a
            href={portfolio.profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-8 w-8 place-items-center rounded-sm border border-white/8 bg-white/5 text-foreground/70 hover:text-accent"
          >
            <Icons.Linkedin className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${portfolio.profile.email}`}
            aria-label="Email"
            className="grid h-8 w-8 place-items-center rounded-sm border border-white/8 bg-white/5 text-foreground/70 hover:text-accent"
          >
            <Icons.Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Loading screen ──────────────────────────────────────────────────────────

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const elapsed = t - start;
      const p = Math.min(100, (elapsed / 900) * 100);
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 200);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  if (done) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1B1B1F]">
      <div className="w-[280px] text-center">
        <div className="font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
          Loading Library…
        </div>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full bg-primary"
            style={{ width: `${progress}%`, transition: "width 80ms linear" }}
          />
        </div>
        <div className="mt-2 font-display text-[10px] tracking-widest text-muted-foreground">
          {Math.floor(progress)}%
        </div>
      </div>
    </div>
  );
}

// ─── Legacy exports kept for compatibility (not rendered on Home) ───────────

export function CurrentlyBuilding() {
  const c = portfolio.currentlyBuilding;
  return (
    <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6">
      <div className="rounded-sm border border-white/8 bg-[#2B2E35] p-5">
        <div className="font-display text-xs font-bold uppercase tracking-wider text-accent">
          Currently Building
        </div>
        <h3 className="mt-1 font-display text-2xl font-bold">{c.title}</h3>
        <p className="text-sm text-muted-foreground">{c.subtitle}</p>
        <p className="mt-2 text-sm">{c.description}</p>
      </div>
    </section>
  );
}

export function Showcase() {
  return null;
}
export function Learning() {
  return null;
}
export function Process() {
  return null;
}
export function CareerInterests() {
  return null;
}
