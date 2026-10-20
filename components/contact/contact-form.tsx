"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { contact, whatsappLink } from "@/content/site";
import { cn } from "@/lib/cn";
import {
  contactSchema,
  contactSummary,
  type ContactData,
  type ContactInput,
} from "@/lib/contact-schema";
import { ease } from "@/lib/motion";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; name: string }
  | { kind: "fallback"; reason: "unavailable" | "failed" | "rate"; href: string };

const f = contact.fields;

const inputBase =
  "w-full rounded-input border bg-surface-2 px-4 text-base text-fg outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-fg-muted/80 " +
  "focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent)_25%,transparent)] focus-visible:outline-none";

function Field({
  id,
  label,
  required,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: FieldError;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && (
          <>
            <span aria-hidden className="text-accent-text">
              {" "}
              *
            </span>
            <span className="sr-only"> ({f.required})</span>
          </>
        )}
      </label>
      {children}
      {error?.message && (
        <motion.p
          id={`${id}-error`}
          className="text-accent-text text-sm"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error.message}
        </motion.p>
      )}
    </div>
  );
}

/** Contact form (§6.13): validate on blur, sending state, success, WhatsApp fallback. */
export function ContactForm() {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const statusRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ContactInput, unknown, ContactData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched", // validate on blur, then live while correcting
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "",
      budget: "",
      message: "",
      consent: false,
      website: "",
    },
  });

  // Move focus to the result so screen readers announce it
  useEffect(() => {
    if (status.kind === "success" || status.kind === "fallback") statusRef.current?.focus();
  }, [status]);

  const onSubmit = async (data: ContactData) => {
    setStatus({ kind: "sending" });
    const href = whatsappLink(contactSummary(data));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        fields?: Record<string, string[]>;
      };
      if (res.ok && json.ok) {
        setStatus({ kind: "success", name: data.name.split(" ")[0] });
        return;
      }
      if (res.status === 400 && json.fields) {
        for (const [k, msgs] of Object.entries(json.fields)) {
          if (msgs?.[0])
            setError(k as keyof ContactInput, { message: msgs[0] }, { shouldFocus: true });
        }
        setStatus({ kind: "idle" });
        return;
      }
      setStatus({
        kind: "fallback",
        reason:
          json.code === "email_unavailable"
            ? "unavailable"
            : res.status === 429
              ? "rate"
              : "failed",
        href,
      });
    } catch {
      setStatus({ kind: "fallback", reason: "failed", href });
    }
  };

  const describedBy = (name: keyof ContactInput) =>
    errors[name] ? `${id(name)}-error` : undefined;
  const borderFor = (name: keyof ContactInput) =>
    errors[name] ? "border-accent" : "border-border";

  if (status.kind === "success") {
    return (
      <motion.div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex min-h-[28rem] flex-col items-start justify-center gap-5 outline-none"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: ease.out }}
      >
        <span className="bg-accent text-on-accent grid size-14 place-items-center rounded-full">
          <Check size={26} aria-hidden />
        </span>
        <h3 className="text-h3">{contact.success.title}</h3>
        <p className="text-body-l text-fg-muted max-w-[36ch]">
          {contact.success.body(status.name)}
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            setStatus({ kind: "idle" });
          }}
          className="text-fg mt-2 min-h-11 font-medium underline underline-offset-4"
        >
          {contact.success.again}
        </button>
      </motion.div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-busy={sending}
      className="relative grid gap-5 md:grid-cols-2 md:gap-x-5 md:gap-y-6"
    >
      <Field id={id("name")} label={f.name.label} required error={errors.name}>
        <input
          id={id("name")}
          autoComplete="name"
          placeholder={f.name.placeholder}
          aria-invalid={!!errors.name}
          aria-describedby={describedBy("name")}
          className={cn(inputBase, "h-12", borderFor("name"))}
          {...register("name")}
        />
      </Field>
      <Field id={id("company")} label={f.company.label}>
        <input
          id={id("company")}
          autoComplete="organization"
          placeholder={f.company.placeholder}
          className={cn(inputBase, "border-border h-12")}
          {...register("company")}
        />
      </Field>
      <Field id={id("email")} label={f.email.label} required error={errors.email}>
        <input
          id={id("email")}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={f.email.placeholder}
          aria-invalid={!!errors.email}
          aria-describedby={describedBy("email")}
          className={cn(inputBase, "h-12", borderFor("email"))}
          {...register("email")}
        />
      </Field>
      <Field id={id("phone")} label={f.phone.label} required error={errors.phone}>
        <input
          id={id("phone")}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={f.phone.placeholder}
          aria-invalid={!!errors.phone}
          aria-describedby={describedBy("phone")}
          className={cn(inputBase, "h-12", borderFor("phone"))}
          {...register("phone")}
        />
      </Field>
      <Field id={id("service")} label={f.service.label}>
        <div className="relative">
          <select
            id={id("service")}
            className={cn(inputBase, "border-border h-12 appearance-none pr-11")}
            {...register("service")}
          >
            <option value="">{f.service.placeholder}</option>
            {contact.serviceOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            size={18}
            className="text-fg-muted pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
          />
        </div>
      </Field>
      <Field id={id("budget")} label={f.budget.label}>
        <div className="relative">
          <select
            id={id("budget")}
            className={cn(inputBase, "border-border h-12 appearance-none pr-11")}
            {...register("budget")}
          >
            <option value="">{f.budget.placeholder}</option>
            {contact.budgetOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            size={18}
            className="text-fg-muted pointer-events-none absolute top-1/2 right-4 -translate-y-1/2"
          />
        </div>
      </Field>
      <Field
        id={id("message")}
        label={f.message.label}
        required
        error={errors.message}
        className="md:col-span-2"
      >
        <textarea
          id={id("message")}
          rows={5}
          placeholder={f.message.placeholder}
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message")}
          className={cn(inputBase, "min-h-36 resize-y py-3", borderFor("message"))}
          {...register("message")}
        />
      </Field>

      {/* Honeypot — off-screen, hidden from assistive tech, skipped by Tab */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <div className="flex items-start gap-3">
          <input
            id={id("consent")}
            type="checkbox"
            aria-invalid={!!errors.consent}
            aria-describedby={describedBy("consent")}
            className="accent-accent mt-0.5 size-5 shrink-0 cursor-pointer"
            {...register("consent")}
          />
          <label htmlFor={id("consent")} className="text-fg-muted text-[15px] leading-snug">
            {f.consent.before}{" "}
            <Link href="/privacy" className="text-fg underline underline-offset-4">
              {f.consent.link}
            </Link>
            {f.consent.after}
            <span aria-hidden className="text-accent-text">
              {" "}
              *
            </span>
          </label>
        </div>
        {errors.consent?.message && (
          <p id={`${id("consent")}-error`} className="text-accent-text pl-8 text-sm">
            {errors.consent.message}
          </p>
        )}
      </div>

      <AnimatePresence>
        {status.kind === "fallback" && (
          <motion.div
            ref={statusRef}
            tabIndex={-1}
            role="alert"
            className="border-border bg-surface-2 rounded-card flex flex-col gap-4 border p-5 outline-none md:col-span-2 md:p-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-start gap-3">
              <TriangleAlert size={20} aria-hidden className="text-accent-text mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">
                  {status.reason === "unavailable"
                    ? contact.failure.unavailableTitle
                    : contact.failure.title}
                </p>
                <p className="text-fg-muted mt-1">
                  {status.reason === "unavailable"
                    ? contact.failure.unavailableBody
                    : status.reason === "rate"
                      ? contact.failure.rateLimited
                      : contact.failure.body}
                </p>
              </div>
            </div>
            <Button href={status.href} icon={<WhatsAppIcon size={18} />} className="w-fit">
              {contact.failure.cta}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="md:col-span-2">
        <Button
          type="submit"
          size="lg"
          variant={status.kind === "fallback" ? "secondary" : "primary"}
          disabled={sending}
          className="w-full md:w-auto"
          icon={
            sending ? (
              <span
                aria-hidden
                className="border-accent/30 border-t-accent block size-4 animate-spin rounded-full border-2"
              />
            ) : undefined
          }
        >
          {sending
            ? contact.sending
            : status.kind === "fallback"
              ? contact.failure.retry
              : contact.submit}
        </Button>
      </div>
    </form>
  );
}
