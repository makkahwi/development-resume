'use client';

import { useState, useRef, useLayoutEffect, useEffect, type ReactNode } from 'react';

type Source = { id: string; title: string; section: string; url?: string };
type Message = { role: 'user' | 'assistant'; content: string; sources?: Source[]; failed?: boolean };
const MAX_LENGTH = 1200;

const suggestions = ['What projects has Suhaib worked on?', 'What are his main technical skills?', 'Tell me about his work on Sanad.'];

export function AskBox({ intro }: { intro: ReactNode }) {
  const [started, setStarted] = useState(false);
  const introRef = useRef<HTMLDivElement>(null);
  const introBefore = useRef<DOMRect | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sendingRef = useRef(false);
  const [retryQuestion, setRetryQuestion] = useState('');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  useLayoutEffect(() => {
    const element = introRef.current;
    const before = introBefore.current;
    if (!started || !element || !before || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const after = element.getBoundingClientRect();
    if (typeof element.animate !== 'function') return;
    element.animate([
      { transform: `translate(${before.left - after.left}px, ${before.top - after.top}px)` },
      { transform: 'translate(0, 0)' },
    ], { duration: 500, easing: 'cubic-bezier(.22,1,.36,1)' });
  }, [started]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, pending]);

  async function sendQuestion(value: string, retry = false) {
    const current = value.trim();
    if (!current || sendingRef.current) return;
    sendingRef.current = true;
    if (!started) {
      introBefore.current = introRef.current?.getBoundingClientRect() || null;
      setStarted(true);
    }
    const previous = messages.filter(message => !message.failed);
    setMessages([...previous, { role: 'user', content: current }]);
    if (!retry) setQuestion('');
    setRetryQuestion('');
    setError('');
    setPending(true);
    try {
      const response = await fetch('/api/dev/answer', {
        method: 'POST',
        signal: AbortSignal.timeout(60000),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: current, conversation: previous.map(({ role, content }) => ({ role, content })).slice(-8) }),
      });
      if (response.status === 404) throw new Error('This chat preview is available on the development server. Open the site started with npm run dev.');
      const data: unknown = await response.json().catch(() => { throw new Error('The chat service could not respond. Please try again.'); });
      if (!data || typeof data !== 'object') throw new Error('Makkahwi AI could not answer right now. Please try again.');
      if (!response.ok) throw new Error('error' in data && typeof data.error === 'string' ? data.error : 'Makkahwi AI could not answer right now. Please try again.');
      if (!('answer' in data) || typeof data.answer !== 'string') throw new Error('Makkahwi AI returned an incomplete answer. Please try again.');
      const sources = 'sources' in data && Array.isArray(data.sources) ? data.sources.filter((source): source is Source => !!source && typeof source.id === 'string' && typeof source.title === 'string' && typeof source.section === 'string') : [];
      setMessages(items => [...items, { role: 'assistant', content: data.answer as string, sources }]);
    } catch (caught) {
      setMessages([...previous, { role: 'user', content: current, failed: true }]);
      setRetryQuestion(current);
      setError(caught instanceof Error && caught.name === 'TimeoutError' ? 'The answer took too long. Please try again.' : caught instanceof Error ? caught.message : 'Makkahwi AI could not answer right now. Please try again.');
    } finally {
      sendingRef.current = false;
      setPending(false);
    }
  }

  return (
    <section className={`hero chatLayout${started ? ' chatStarted' : ''}`} aria-labelledby="hero-title">
      <div className="chatIntro" ref={introRef}>{intro}</div>
      <div className="askExperience">
        <div ref={logRef} className="conversation" role="log" aria-label="Conversation" aria-live="polite">
          {messages.length === 0 && (
            <article className="welcomeMessage">
              <span className="messageLabel">Makkahwi AI</span>
              <h2>Hi, welcome in 👋</h2>
              <p>You can tell me your name, or jump straight into a question. Ask me about Suhaib’s work, projects, experience, or ideas.</p>
              <div className="questionSuggestions" aria-label="Suggested questions">
                {suggestions.map(suggestion => <button type="button" key={suggestion} disabled={pending} onClick={() => void sendQuestion(suggestion)}>{suggestion}<span aria-hidden="true">↗</span></button>)}
              </div>
            </article>
          )}
          {messages.map((message, index) => (
            <article className={`message message-${message.role}`} key={index}>
              <span className="messageLabel">{message.role === 'user' ? 'You' : 'Makkahwi AI'}</span>
              <p>{message.content}</p>
              {!!message.sources?.length && <div className="messageSources" aria-label="Sources">Sources: {message.sources.map(source => source.url ? <a key={source.id} href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a> : <span key={source.id}>{source.title}</span>)}</div>}
            </article>
          ))}
          {pending && <p className="answerPending">Finding a grounded answer…</p>}
        </div>
      <form className="promptPreview" onSubmit={event => { event.preventDefault(); void sendQuestion(String(new FormData(event.currentTarget).get('question') || '')); }}>
        <label className="srOnly" htmlFor="question">Ask about Suhaib&apos;s work, projects, or experience</label>
        <input ref={inputRef} id="question" name="question" type="text" value={question} onChange={event => setQuestion(event.target.value)} onInput={event => setQuestion(event.currentTarget.value)} required placeholder="Ask about my work, projects, experience..." maxLength={MAX_LENGTH} autoComplete="off" disabled={pending} />
        <button className="arrow" type="submit" aria-label="Send question" disabled={pending}>↗</button>
      </form>
      {error && <div className="answerError" role="alert"><p>{error}</p>{retryQuestion && <button type="button" className="retryAnswer" disabled={pending} onClick={() => void sendQuestion(retryQuestion, true)}>Retry answer</button>}</div>}
        <p className="phaseNote">Answers grounded in Suhaib’s public knowledge. Chats aren’t saved yet.</p>
      </div>
    </section>
  );
}
