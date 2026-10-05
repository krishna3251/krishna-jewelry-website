import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Krishna Jewelry application error.", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="grid min-h-screen place-items-center bg-theme-dark px-6 text-theme-light">
        <section className="w-full max-w-xl border border-white/10 p-8 sm:p-12">
          <p className="section-kicker">Krishna Jewelry / Error</p>
          <h1 className="mt-5 font-serif text-5xl leading-none sm:text-6xl">Something went wrong.</h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-white/55">This page hit an unexpected error. Please reload the collection and try again.</p>
          <button type="button" onClick={() => window.location.reload()} className="mt-8 rounded-full border border-theme-accent px-6 py-3 text-[10px] uppercase tracking-[.22em] text-theme-light transition-colors hover:bg-theme-accent hover:text-theme-dark">Reload site</button>
        </section>
      </main>
    );
  }
}