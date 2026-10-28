import { createHash } from "node:crypto";

export type KnowledgeChunk = {
  id: string;
  documentId: string;
  documentType: string;
  title: string;
  section: string;
  content: string;
  metadata: Record<string, unknown>;
};
export type StoredChunk = KnowledgeChunk & { hash: string; score?: number };
export type Source = {
  id: string;
  title: string;
  section: string;
  documentType: string;
  url?: string;
  sourcePath?: string;
  score?: number;
};
export type Draft = { answer: string; sourceIds: string[] };
export const FALLBACK =
  "Sorry, I can't confirm that from the information I have about Suhaib. You can ask about his experience, projects, or skills, or reach him directly at +962-788-424-973, on LinkedIn (https://linkedin.com/in/SuhaibAhmadAi/), or through his site (https://suhaib.dev/).";
const ARABIC_FALLBACK =
  "آسف، ما عندي معلومات كافية لأؤكد ذلك عن صهيب. يمكنك سؤالي عن خبراته أو مشاريعه أو مهاراته، أو التواصل معه عبر +962-788-424-973 أو LinkedIn (https://linkedin.com/in/SuhaibAhmadAi/) أو موقعه (https://suhaib.dev/).";
const fallbackFor = (question: string) =>
  /[\u0600-\u06ff]/u.test(question) ? ARABIC_FALLBACK : FALLBACK;

const object = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);
const nonempty = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export function parseChunks(jsonl: string): KnowledgeChunk[] {
  const ids = new Set<string>();
  return jsonl
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line, index) => {
      let value: unknown;
      try {
        value = JSON.parse(line);
      } catch {
        throw new Error(`Invalid JSON at line ${index + 1}`);
      }
      if (
        !object(value) ||
        ![
          "id",
          "documentId",
          "documentType",
          "title",
          "section",
          "content",
        ].every((key) => nonempty(value[key])) ||
        !object(value.metadata)
      ) {
        throw new Error(`Invalid chunk at line ${index + 1}`);
      }
      const chunk = value as KnowledgeChunk;
      if (ids.has(chunk.id)) throw new Error(`Duplicate chunk ID: ${chunk.id}`);
      if (chunk.content.length > 10000)
        throw new Error(`Chunk too long: ${chunk.id}`);
      ids.add(chunk.id);
      return chunk;
    });
}

function stable(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stable);
  if (object(value))
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, stable(value[key])]),
    );
  return value;
}
export function chunkHash(chunk: KnowledgeChunk, model: string): string {
  return createHash("sha256")
    .update(JSON.stringify(stable({ chunk, model })))
    .digest("hex");
}
export function embeddingText(chunk: KnowledgeChunk): string {
  return `title: ${chunk.title} — ${chunk.section} | text: ${chunk.content}`;
}
export function embeddingQuery(question: string): string {
  return `task: question answering | query: ${question}`;
}
export function validQuestion(
  value: unknown,
  maxLength = 1200,
): value is string {
  return nonempty(value) && value.length <= maxLength;
}
export function validateSources(
  draft: Draft,
  retrieved: StoredChunk[],
  fallback = FALLBACK,
): { answer: string; sources: Source[] } {
  const byId = new Map(retrieved.map((chunk) => [chunk.id, chunk]));
  const seen = new Set<string>();
  const sources: Source[] = [];
  for (const id of draft.sourceIds) {
    const chunk = byId.get(id);
    if (!chunk || seen.has(id)) continue;
    seen.add(id);
    const { title, section, documentType, score } = chunk;
    const url =
      typeof chunk.metadata.url === "string" &&
      /^https?:\/\//.test(chunk.metadata.url)
        ? chunk.metadata.url
        : undefined;
    const sourcePath =
      typeof chunk.metadata.sourcePath === "string"
        ? chunk.metadata.sourcePath
        : undefined;
    sources.push({
      id,
      title,
      section,
      documentType,
      ...(url ? { url } : {}),
      ...(sourcePath ? { sourcePath } : {}),
      ...(score === undefined ? {} : { score }),
    });
  }
  if (!draft.answer.trim() || !sources.length)
    return { answer: fallback, sources: [] };
  return { answer: draft.answer.trim(), sources };
}
export type ConversationTurn = { role: "user" | "assistant"; content: string };
export type GenerationInput = {
  question: string;
  context: StoredChunk[];
  conversation: ConversationTurn[];
};
export interface EmbeddingProvider {
  embed(text: string): Promise<number[]>;
}
export interface LlmProvider {
  generate(input: GenerationInput): Promise<Draft>;
}
export interface RetrievalService {
  query(
    vector: number[],
    topK: number,
    filter?: string,
  ): Promise<StoredChunk[]>;
}
export type RagDeps = {
  embeddingProvider: EmbeddingProvider;
  retrievalService: RetrievalService;
  llmProvider: LlmProvider;
};
export function boundConversation(
  value: unknown,
  maxCharacters: number,
): ConversationTurn[] {
  if (!Array.isArray(value) || maxCharacters <= 0) return [];
  const turns: ConversationTurn[] = [];
  let used = 0;
  for (const item of value.slice(-10).reverse()) {
    if (
      !object(item) ||
      (item.role !== "user" && item.role !== "assistant") ||
      !nonempty(item.content)
    )
      continue;
    const content = item.content.slice(0, 600);
    if (used + content.length > maxCharacters) break;
    turns.unshift({ role: item.role, content });
    used += content.length;
  }
  return turns;
}
export function currentEmploymentIntent(question: string): boolean {
  const current =
    /\b(now|currently|current|today|these days|present)\b|الآن|الان|حالي[ًاا]?|الوقت الحالي/u.test(
      question.toLowerCase(),
    );
  const employment =
    /\b(work\w*|employ\w*|job|role|company|companies)\b|يعمل|شغل|وظيف[ةه]|شركة/u.test(
      question.toLowerCase(),
    );
  return current && employment;
}
export function careerSummaryIntent(question: string): boolean {
  const message = question
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
  return (
    /\b(resume|cv|career|professional background)\b|سيرة|مسيرته|خبراته/u.test(
      message,
    ) ||
    (/\b(experience|experiences|expirence|experince)\b|خبرة|خبرات/u.test(
      message,
    ) &&
      /\b(summar\w*|summr\w*|overview|background|tell me|what is|what's)\b|لخص|ملخص|عن/u.test(
        message,
      ))
  );
}
function smallTalkAnswer(question: string): string | undefined {
  const message = question
    .toLowerCase()
    .trim()
    .replace(/[.!?,،؟]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (
    /^(hi|hello|hey|hey there|hi there|hello there|good morning|good afternoon|good evening)( (how are you|how's it going))?$/.test(
      message,
    ) ||
    /^(how are you|how's it going|what's up)$/.test(message)
  ) {
    return "Hey! I'm here and ready to chat. What would you like to know about Suhaib?";
  }
  if (
    /^(thanks|thank you|thanks a lot|thank you so much|awesome|great|cool)$/.test(
      message,
    )
  ) {
    return "You're welcome! Anything else you'd like to know about Suhaib?";
  }
  if (/^(bye|goodbye|see you|see you later|take care)$/.test(message)) {
    return "Take care! Drop by anytime you have more questions about Suhaib.";
  }
  if (
    /^(مرحبا|مرحباً|أهلا|اهلا|أهلاً|هلا|السلام عليكم|كيف حالك)$/.test(message)
  ) {
    return "أهلاً وسهلاً! أنا هنا للدردشة معك. شو حاب تعرف عن صهيب؟";
  }
  if (/^(شكرا|شكراً|شكرًا|شكرا لك|شكراً لك|شكراً جزيلاً)$/.test(message)) {
    return "العفو! في شيء ثاني حاب تعرفه عن صهيب؟";
  }
  if (/^(مع السلامة|إلى اللقاء|الى اللقاء)$/.test(message)) {
    return "مع السلامة! أهلاً فيك بأي وقت عندك أسئلة عن صهيب.";
  }
  return undefined;
}
function assistantQuestion(question: string): boolean {
  const message = question.toLowerCase();
  const aboutChat =
    /\b(this|the|your)\s+(chat|app|assistant|bot|website|site)\b|\b(you|yourself|your)\b|المحادثة|الدردشة|التطبيق|المساعد|أنت|انت/u.test(
      message,
    );
  const asksScope =
    /\b(what|who|why|where|how|can|could|are|do|does|tell|explain|help|purpose|scope|limit|limits|source|sources|know|answer|answers|ask|use|work|about)\b|ماذا|ما |من |كيف|ليش|لماذا|تستطيع|يمكن|تعرف|مصدر|حدود|اسأل/u.test(
      message,
    );
  const asksSuhaibFact =
    /\b(suhaib|his|him|he|resume|cv|career|experience|projects|skills)\b|صهيب|سيرته|خبراته|مشاريعه|مهاراته/u.test(
      message,
    );
  return aboutChat && asksScope && !asksSuhaibFact;
}
function assistantAnswer(question: string): string {
  const message = question.toLowerCase();
  const arabic = /[\u0600-\u06ff]/u.test(message);
  if (
    /\b(limit|limits|private|can't|cannot|don't know|source|sources|information|data|know)\b|حدود|مصدر|معلومات|تعرف/u.test(
      message,
    )
  )
    return arabic
      ? "أعتمد على معلومات صهيب المهنية المنشورة، ويمكنني شرحها أو تلخيصها. لا أستطيع تأكيد تفاصيل خاصة أو أمور لم تُنشر، ولا أتحدث باسم صهيب. إذا احتجت تأكيداً منه، يمكنك التواصل عبر https://suhaib.dev/."
      : "I work from Suhaib's public professional information. I can explain and summarize what's documented, but I can't verify private or unpublished details or speak for him. If you need confirmation from Suhaib, you can reach him through +962-788-424-973, or find more contacts @ https://suhaib.dev/.";
  if (
    /\b(how|use|ask|help|start|questions|question)\b|كيف|استخدم|اسأل|سؤال/u.test(
      message,
    )
  )
    return arabic
      ? "اسألني بطريقتك عن خبرات صهيب أو مشاريعه أو مهاراته، ويمكنك طرح أسئلة متابعة. مثلاً: «ما المشاريع التي عمل عليها؟» أو «لخّص خبرته المهنية»."
      : "Ask me naturally about Suhaib's experience, projects, or skills, then follow up on anything interesting. For example: ‘What did he build?’ or ‘Summarize his career.’";
  return arabic
    ? "هذه محادثة تساعدك تتعرّف على سيرة صهيب أحمد المهنية ومشاريعه ومهاراته من معلوماته المنشورة. اسألني عمّا يهمك، وسأوضح ما هو موثق لدي."
    : "This chat helps you explore Suhaib Ahmad's public resume, projects, experience, and skills. Ask what interests you, and I'll explain what's documented.";
}
export async function answerQuestion(
  question: unknown,
  deps: RagDeps,
  topK = 5,
  maxLength = 1200,
  conversation: unknown = [],
  maxConversationCharacters = 2400,
) {
  if (!validQuestion(question, maxLength)) throw new Error("Invalid question");
  const smallTalk = smallTalkAnswer(question);
  if (smallTalk) return { answer: smallTalk, sources: [] };
  if (assistantQuestion(question))
    return { answer: assistantAnswer(question), sources: [] };
  const bounded = boundConversation(conversation, maxConversationCharacters);
  const previousQuestions = bounded
    .filter((turn) => turn.role === "user")
    .slice(-2)
    .map((turn) => turn.content)
    .join("\n");
  const retrievalQuestion = previousQuestions
    ? `Previous questions: ${previousQuestions}\nCurrent question: ${question.trim()}`
    : question.trim();
  const employmentQuestion = currentEmploymentIntent(question);
  const careerQuestion = !employmentQuestion && careerSummaryIntent(question);
  const vector = await deps.embeddingProvider.embed(
    embeddingQuery(
      employmentQuestion
        ? `Suhaib's current employer, full-time job, and role. ${retrievalQuestion}`
        : careerQuestion
          ? `Summarize Suhaib Ahmad's professional background, work experience, roles, responsibilities, skills, and education. ${retrievalQuestion}`
          : retrievalQuestion,
    ),
  );
  if (!vector?.length) throw new Error("Embedding provider returned no vector");
  const currentRolesFilter =
    "documentType = 'experience' AND (end = 'current' OR end = 'present')";
  let focused = employmentQuestion
    ? await deps.retrievalService.query(vector, topK, currentRolesFilter)
    : [];
  if (careerQuestion) {
    const [experience, profile] = await Promise.all([
      deps.retrievalService.query(
        vector,
        Math.max(topK, 8),
        "documentType = 'experience'",
      ),
      deps.retrievalService.query(
        vector,
        3,
        "documentType = 'profile' AND documentId != 'contacts'",
      ),
    ]);
    focused = [...experience, ...profile];
  }
  const matches = focused.length
    ? focused
    : await deps.retrievalService.query(vector, topK);
  const context: StoredChunk[] = [];
  let characters = 0;
  for (const chunk of matches) {
    if (characters + chunk.content.length > 12000) continue;
    context.push(chunk);
    characters += chunk.content.length;
  }
  if (!context.length) return { answer: fallbackFor(question), sources: [] };
  const input = { question: question.trim(), context, conversation: bounded };
  return validateSources(
    await deps.llmProvider.generate(input),
    context,
    fallbackFor(question),
  );
}
