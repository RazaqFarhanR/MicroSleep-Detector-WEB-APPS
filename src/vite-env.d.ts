declare module '*.svg' {
    import * as React from 'react'
  
    export const ReactComponent: React.FunctionComponent<
      React.ComponentProps<'svg'> & { title?: string }
    >
    export default ReactComponent
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="vite/client" />