import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { submitLead, type LeadPayload } from '../lib/gcp-stubs';
import { Section } from './ui/Section';

const schema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Use a valid work email'),
  organization: z.string().min(2, 'Required'),
  role: z.string().min(2, 'Required'),
  phone: z.string().optional(),
  message: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof schema>;

export function DemoForm() {
  const [done, setDone] = useState<{ id: string } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    const payload: LeadPayload = values;
    const record = await submitLead(payload);
    setDone({ id: record.id });
    reset();
  };

  return (
    <Section
      id="demo"
      className="bg-slate-50 dark:bg-slate-900/40"
      eyebrow="Request a demo"
      title="See Humerus on your workflow in 30 minutes."
      subtitle="Tell us about your hospital, lab, pharmacy, or patient programme. Our team will tailor a walkthrough to your stack."
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-6 text-sm text-slate-600 dark:text-slate-300">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">What you'll see</h3>
            <ul className="mt-3 space-y-2">
              <li>• A live tenant with realistic OPD, IPD, lab and pharmacy flows</li>
              <li>• Field-level encryption, audit and break-glass walkthrough</li>
              <li>• ABHA linkage and ABDM HIP/HIU registration path</li>
              <li>• Pricing for your bed / accession / counter footprint</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs uppercase tracking-wider font-semibold text-brand-700 dark:text-brand-300">
              For the developers
            </p>
            <p className="mt-2 text-sm">
              Submission is wired to mocked GCP services
              (<code className="font-mono text-xs">Firestore</code>,
              <code className="font-mono text-xs"> Cloud Functions</code>,
              <code className="font-mono text-xs"> reCAPTCHA</code>). Open DevTools console to
              see the <code className="font-mono text-xs">Mocking […]</code> calls when you submit.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3">
          {done ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-800 dark:bg-emerald-900/30">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                Request received.
              </h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                Reference <span className="font-mono">{done.id}</span>. Our team will reach out
                within one business day.
              </p>
              <button
                type="button"
                className="btn-secondary mt-6"
                onClick={() => setDone(null)}
              >
                Submit another
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card grid grid-cols-1 sm:grid-cols-2 gap-5 dark:border-slate-800 dark:bg-slate-900"
              noValidate
            >
              <Field label="Full name" error={errors.name?.message}>
                <input
                  {...register('name')}
                  className={inputCls}
                  autoComplete="name"
                  placeholder="Dr. Aisha Khan"
                />
              </Field>
              <Field label="Work email" error={errors.email?.message}>
                <input
                  {...register('email')}
                  type="email"
                  className={inputCls}
                  autoComplete="email"
                  placeholder="aisha@hospital.in"
                />
              </Field>
              <Field label="Organization" error={errors.organization?.message}>
                <input
                  {...register('organization')}
                  className={inputCls}
                  autoComplete="organization"
                  placeholder="Apollo Indraprastha"
                />
              </Field>
              <Field label="Role" error={errors.role?.message}>
                <input
                  {...register('role')}
                  className={inputCls}
                  placeholder="CIO / Medical Director / Lab Head"
                />
              </Field>
              <Field label="Phone (optional)" error={errors.phone?.message}>
                <input
                  {...register('phone')}
                  type="tel"
                  className={inputCls}
                  autoComplete="tel"
                  placeholder="+91 ..."
                />
              </Field>
              <Field label="Beds / counters / accessions" error={undefined}>
                <input
                  {...register('message')}
                  className={inputCls}
                  placeholder="e.g. 250 beds + 1 lab"
                />
              </Field>

              <div className="sm:col-span-2 flex items-center justify-between gap-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  By submitting, you agree to be contacted about Humerus. We follow DPDP
                  Act 2023 norms.
                </p>
                <button
                  type="submit"
                  className="btn-primary shrink-0"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                    </>
                  ) : (
                    <>
                      Request demo <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

const inputCls =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-brand-400 dark:focus:ring-brand-700/40';

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1 block text-xs text-rose-600 dark:text-rose-400">{error}</span>
      )}
    </label>
  );
}
