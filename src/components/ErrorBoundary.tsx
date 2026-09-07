import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: 'white', background: '#050505', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <h1 style={{ color: '#ff4444' }}>Error Memuat 3D Model</h1>
          <p style={{ marginTop: '1rem', maxWidth: '600px' }}>
            {this.state.error?.message}
          </p>
          <p style={{ marginTop: '2rem', opacity: 0.7 }}>
            Pastikan file <b>Earth_1_12756.glb</b> sudah berada di dalam folder <b>public/models/</b>
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
