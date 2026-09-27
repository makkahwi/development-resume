import type { ChatRecord } from './model.ts';

// Public wording only: never publish text copied from a visitor's conversation.
const topics = [
  { id: 'sanad', question: 'Tell me about Suhaib’s work on Sanad.', match: /\bsanad\b|سند/iu },
  { id: 'mustaheq', question: 'What did Suhaib build for Mustaheq?', match: /\bmusta(?:h[aei]q|heq)\b|مستحق/iu },
  { id: 'deloitte', question: 'What was Suhaib’s role at Deloitte?', match: /\bdeloitte\b|ديلويت/iu },
  { id: 'several-brands', question: 'Tell me about Suhaib’s work at Several Brands.', match: /\bseveral brands\b|\bsb\b|سيفرال/iu },
  { id: 'modee', question: 'What was Suhaib’s work with Jordan’s MoDEE?', match: /\bmodee\b|digital economy|الاقتصاد الرقمي/iu },
  { id: 'skills', question: 'What are Suhaib’s main technical skills?', match: /\b(skill\w*|technolog\w*|tech stack|framework\w*|react(?:js)?|next\.?js|nestjs|programming|typescript|javascript)\b|مهارات|تقنيات|تقنيه|تقنية|برمجة/iu },
  { id: 'experience', question: 'Tell me about Suhaib’s work experience.', match: /\b(experience|career|employ\w*|work history|worked at|years|months|companies)\b|خبر[ةه]|خبرات|مسير[ةه]|شركات/iu },
  { id: 'projects', question: 'What projects has Suhaib worked on?', match: /\b(project\w*|portfolio|built|build|apps?|applications?)\b|مشاريع|مشروعات|تطبيقات/iu },
  { id: 'education', question: 'What is Suhaib’s educational background?', match: /\b(educat\w*|stud\w*|university|degree|certificat\w*)\b|دراس|تعليم|جامعة|شهاد/iu },
  { id: 'movies', question: 'What movies does Suhaib like?', match: /\b(movie\w*|films?|cinema)\b|أفلام|افلام|سينما/iu },
  { id: 'hobbies', question: 'What does Suhaib enjoy outside work?', match: /\b(hobb\w*|chess|cook\w*|motorcycl\w*|outside work|free time|interests?)\b|هوايات|هواية|شطرنج|طبخ|دراجات|وقت الفراغ/iu },
  { id: 'contact', question: 'How can I get in touch with Suhaib?', match: /\b(contact|reach|hire|hiring|email|collaborat\w*|get in touch)\b|تواصل|توظيف|بريد/iu },
] as const;
export const DEFAULT_SUGGESTIONS = [topics[7].question, topics[5].question, topics[0].question];
export type SuggestionResult = { questions: string[]; basedOnHistory: boolean };

export function rankSuggestions(records: Iterable<ChatRecord>): SuggestionResult {
  const counts = new Map<string, number>();
  for (const chat of records) {
    // A saved turn is counted once, regardless of answer retries. Ignore unfinished
    // or ungrounded answers so unsupported subjects aren't promoted as starters.
    for (const turn of Object.values(chat.turns || {})) {
      if (turn.status !== 'complete' || !turn.sources?.length) continue;
      const question = turn.question.normalize('NFKC').replace(/[\u064B-\u065F\u0670\u0640]/g, '');
      const topic = topics.find(topic => topic.match.test(question));
      if (topic) counts.set(topic.id, (counts.get(topic.id) || 0) + 1);
    }
  }
  const ranked = topics.filter(topic => counts.has(topic.id)).sort((a, b) => (counts.get(b.id)! - counts.get(a.id)!) || a.id.localeCompare(b.id));
  const questions = [...new Set([...ranked.map(topic => topic.question), ...DEFAULT_SUGGESTIONS])].slice(0, 3);
  return { questions, basedOnHistory: ranked.length > 0 };
}
