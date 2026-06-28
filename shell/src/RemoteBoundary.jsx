import React, { Component, Suspense } from 'react';

class RemoteErrorBoundary extends Component {
  state = { hasError: false, message: '' };

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Failed to load module' };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mfe-error" role="alert">
          <strong>{this.props.label}</strong> could not be loaded.
          <br />
          <code>{this.state.message}</code>
          <br />
          <small>Run <code>npm run dev</code> from the project root so all remotes are up.</small>
        </div>
      );
    }
    return this.props.children;
  }
}

export function RemoteBoundary({ label, children, fallback = null }) {
  return (
    <RemoteErrorBoundary label={label}>
      <Suspense fallback={fallback ?? <div className="mfe-loading">Loading {label}…</div>}>
        {children}
      </Suspense>
    </RemoteErrorBoundary>
  );
}
