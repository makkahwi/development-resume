import { test } from 'node:test';
import assert from 'node:assert/strict';
import { claimTurn, chatMessages, completeTurn, priorConversation, validId } from '../src/lib/chat/model.ts';

test('browser identities reject database path injection', () => {
  assert.equal(validId('50000000-0000-4000-8000-000000000001'), true);
  for (const id of ['', '../other', 'a/b', null]) assert.equal(validId(id), false);
});
test('turn claims serialize generation and completed retries are idempotent', () => {
  const chat = claimTurn(null, 'chat', 'one', 'Sanad?', 'token', 100);
  assert.throws(() => claimTurn(chat, 'chat', 'two', 'More?', 'other', 101), /still being prepared/);
  const completed = { ...chat, turns: { one: { ...chat.turns!.one, status: 'complete' as const, answer: 'A project.' } } };
  assert.equal(claimTurn(completed, 'chat', 'one', 'Sanad?', 'retry', 102), completed);
  assert.throws(() => claimTurn(completed, 'chat', 'one', 'Different?', 'retry', 102), /already been used/);
});
test('interrupted answers become retryable without duplicating the question', () => {
  const chat = claimTurn(null, 'chat', 'one', 'Sanad?', 'token', 1);
  assert.equal(chatMessages(chat)[0].status, 'failed');
  const retried = claimTurn(chat, 'chat', 'one', 'Sanad?', 'new-token', 130000);
  assert.equal(Object.keys(retried.turns!).length, 1);
  assert.equal(retried.turns!.one.createdAt, 1);
});
test('saved context contains only completed message content', () => {
  const chat = claimTurn(null, 'chat', 'pending', 'Unfinished', 'secret-token', Date.now());
  chat.turns!.done = { id: 'done', question: 'Sanad?', answer: 'A project.', createdAt: 1, status: 'complete' };
  assert.deepEqual(priorConversation(chat, 'pending'), [{ role: 'user', content: 'Sanad?' }, { role: 'assistant', content: 'A project.' }]);
});
test('completion saves the answer and clears the lease only for its owner', () => {
  const chat = claimTurn(null, 'chat', 'one', 'Sanad?', 'owner-token', 1);
  assert.equal(completeTurn(null, 'one', 'owner-token', 2), undefined);
  assert.equal(completeTurn(chat, 'one', 'another-token', 2), undefined);
  const completed = completeTurn(chat, 'one', 'owner-token', 2, { answer: 'A public project.', sources: [] });
  assert.equal(completed?.lease, undefined);
  assert.equal(completed?.turns?.one.status, 'complete');
  assert.equal(chatMessages(completed!)[1].content, 'A public project.');
});
