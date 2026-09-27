import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rankSuggestions, DEFAULT_SUGGESTIONS } from '../src/lib/chat/suggestions.ts';
import type { ChatRecord } from '../src/lib/chat/model.ts';
function chat(questions: string[]): ChatRecord {
  return { id: 'chat', title: 'private title', createdAt: 1, updatedAt: 1, turns: Object.fromEntries(questions.map((question, i) => [String(i), { id: String(i), question, createdAt: i, status: 'complete', sources: [{ id: 'source', title: 'Public evidence', section: 'Work', documentType: 'project' }] }])) };
}
test('no history returns exactly three defaults', () => {
  assert.deepEqual(rankSuggestions([]), { questions: DEFAULT_SUGGESTIONS, basedOnHistory: false });
});
test('ranks equivalent English and Arabic topics across conversations', () => {
  const result = rankSuggestions([chat(['Sanad?', 'Tell me about سند', 'ما هوايات صهيب؟']), chat(['SANAD project?', 'Which hobbies?', 'What technical skills?'])]);
  assert.deepEqual(result.questions, ['Tell me about Suhaib’s work on Sanad.', 'What does Suhaib enjoy outside work?', 'What are Suhaib’s main technical skills?']);
  assert.equal(result.basedOnHistory, true);
});
test('never publishes visitor wording or private details and fills missing slots', () => {
  const result = rankSuggestions([chat(['My email is private@example.com. Tell me about Deloitte.'])]);
  assert.equal(result.questions[0], 'What was Suhaib’s role at Deloitte?');
  assert.equal(result.questions.length, 3);
  assert.equal(new Set(result.questions).size, 3);
  assert.doesNotMatch(JSON.stringify(result), /private|@|chat/);
});
test('ignores unsuccessful answers and unsupported topics', () => {
  const record = chat(['Sanad?', 'skills?', 'hobbies?', 'My name is Jane']);
  record.turns!['0'].status = 'failed';
  record.turns!['1'].status = 'pending';
  record.turns!['2'].sources = [];
  assert.deepEqual(rankSuggestions([record]), { questions: DEFAULT_SUGGESTIONS, basedOnHistory: false });
});
