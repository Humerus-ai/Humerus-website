/**
 * GCP service stubs.
 *
 * Every function logs `Mocking [Service Call] ...` to the console and returns
 * a resolved promise. No `@google-cloud/*` or `firebase` imports — nothing
 * here touches a billed GCP project.
 *
 * Swap-out path: when billing is enabled, install the real SDK and replace
 * the body of each function. Call sites do not change.
 */

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function logMock(serviceCall: string, payload?: unknown) {
  // eslint-disable-next-line no-console
  console.info(`Mocking [${serviceCall}]`, payload ?? '');
}

/** Production target: `@google-cloud/firestore` Firestore.collection().add() */
export const firestore = {
  async add<T extends Record<string, unknown>>(
    collection: string,
    doc: T
  ): Promise<{ id: string; createdAt: string }> {
    logMock(`Firestore.add(${collection})`, doc);
    await sleep(180);
    return {
      id: `mock_${Math.random().toString(36).slice(2, 10)}`,
      createdAt: new Date().toISOString(),
    };
  },
};

/** Production target: `@google-cloud/functions` callable / HTTPS trigger */
export const cloudFunctions = {
  async invoke<TPayload, TResult = { ok: true }>(
    name: string,
    payload: TPayload
  ): Promise<TResult> {
    logMock(`CloudFunctions.invoke(${name})`, payload);
    await sleep(120);
    return { ok: true } as unknown as TResult;
  },
};

/** Production target: `@google-cloud/storage` bucket.file().save() */
export const cloudStorage = {
  async upload(bucket: string, key: string, file: Blob | string): Promise<{ url: string }> {
    logMock(`CloudStorage.upload(${bucket}/${key})`, {
      sizeBytes: typeof file === 'string' ? file.length : file.size,
    });
    await sleep(150);
    return { url: `https://storage.googleapis.com/${bucket}/${key}` };
  },
};

/** Production target: reCAPTCHA Enterprise `assessments.create` */
export const recaptcha = {
  async verify(token: string): Promise<{ success: boolean; score: number }> {
    logMock('reCAPTCHA.assessments.create', { token: token.slice(0, 8) + '…' });
    await sleep(80);
    return { success: true, score: 0.9 };
  },
};

export interface LeadPayload {
  name: string;
  email: string;
  organization: string;
  role: string;
  phone?: string;
  message?: string;
}

/**
 * Orchestrates the demo-request flow.
 * Production: write to Firestore `leads`, then trigger a Cloud Function
 * (`notifyLead`) that emails sales + posts to Slack via Pub/Sub.
 */
export async function submitLead(
  payload: LeadPayload
): Promise<{ id: string; createdAt: string }> {
  await recaptcha.verify('mock-recaptcha-token');
  const record = await firestore.add('leads', { ...payload, source: 'humerus.ai/landing' });
  await cloudFunctions.invoke('notifyLead', { leadId: record.id, email: payload.email });
  return record;
}
