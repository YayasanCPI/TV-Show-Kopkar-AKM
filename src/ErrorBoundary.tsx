import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
 children?: ReactNode;
}

interface State {
 hasError: boolean;
 error: Error | null;
 errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
 public state: State = {
 hasError: false,
 error: null,
 errorInfo: null
 };

 public static getDerivedStateFromError(error: Error): State {
 return { hasError: true, error, errorInfo: null };
 }

 public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
 console.error("Uncaught error:", error, errorInfo);
 this.setState({ errorInfo });
 }

 public render() {
 if (this.state.hasError) {
 return (
 <div style={{ padding: '20px', backgroundColor: '#111', color: '#ff5555', minHeight: '100vh', fontFamily: 'monospace' }}>
 <h1 style={{ color: 'white' }}>Something went wrong.</h1>
 <h3 style={{ marginTop: '20px' }}>{this.state.error?.message}</h3>
 <pre style={{ overflowX: 'auto', padding: '10px', background: '#222', marginTop: '20px' }}>
 {this.state.error?.stack}
 </pre>
 <pre style={{ overflowX: 'auto', padding: '10px', background: '#222', marginTop: '20px', color: '#aaa' }}>
 {this.state.errorInfo?.componentStack}
 </pre>
 </div>
 );
 }

 return this.props.children;
 }
}
