'use client';

import { useState, type FormEvent } from 'react';

type Source = { id: string; title: string; section: string; url?: string };
type Message = { role: 'user' | 'assistant'; content: string; sources?: Source[] };
const MAX_LENGTH = 1200;

export function AskBox() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const current = question.trim();
    if (!current || pending) return;
    const previous = messages;
    setMessages([...previous, { role: 'user', content: current }]);
    setQuestion('');
    setError('');
    setPending(true);
    try {
      const response = await fetch('/api/dev/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: current, conversation: previous.map(({ role, content }) => ({ role, content })).slice(-8) }),
      });
      const data: unknown = await response.json();
      if (!data || typeof data !== 'object') throw new Error('Makkahwi AI could not answer right now. Please try again.');
      if (!response.ok) throw new Error('error' in data && typeof data.error === 'string' ? data.error : 'Makkahwi AI could not answer right now. Please try again.');
      if (!('answer' in data) || typeof data.answer !== 'string') throw new Error('Makkahwi AI returned an incomplete answer. Please try again.');
      const sources = 'sources' in data && Array.isArray(data.sources) ? data.sources.filter((source): source is Source => !!source && typeof source.id === 'string' && typeof source.title === 'string' && typeof source.section === 'string') : [];
      setMessages(items => [...items, { role: 'assistant', content: data.answer as string, sources }]);
    } catch (caught) {
      setMessages(previous);
      setQuestion(current);
      setError(caught instanceof Error ? caught.message : 'Makkahwi AI could not answer right now. Please try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="askExperience">
      {messages.length > 0 && (
        <div className="conversation" role="log" aria-label="Conversation" aria-live="polite">
          {messages.map((message, index) => (
            <article className={`message message-${message.role}`} key={index}>
              <span className="messageLabel">{message.role === 'user' ? 'You' : 'Makkahwi AI'}</span>
              <p>{message.content}</p>
              {!!message.sources?.length && <div className="messageSources" aria-label="Sources">Sources: {message.sources.map(source => source.url ? <a key={source.id} href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a> : <span key={source.id}>{source.title}</span>)}</div>}
            </article>
          ))}
          {pending && <p className="answerPending">Finding a grounded answer…</p>}
        </div>
      )}
      <form className="promptPreview" onSubmit={submit}>
        <label className="srOnly" htmlFor="question">Ask about Suhaib&apos;s work, projects, or experience</label>
        <input id="question" name="question" type="text" value={question} onChange={event => setQuestion(event.target.value)} placeholder="Ask about my work, projects, experience..." maxLength={MAX_LENGTH} autoComplete="off" disabled={pending} />
        <button className="arrow" type="submit" aria-label="Send question" disabled={!question.trim() || pending}>↗</button>
      </form>
      {error && <p className="answerError" role="alert">{error}</p>}
    </div>
  );
}
