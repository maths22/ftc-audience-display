/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.wav' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}


interface SvgrComponent extends React.FunctionComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const svgUrl: string;
  const svgComponent: SvgrComponent;
  export default svgUrl;
  export { svgComponent as ReactComponent }
}

interface PersistentWebSocket extends WebSocket {
  open: () => void
}

declare module 'persistent-websocket' {
  const PersistentWebsocket: new(url: string, protocols?: string | string[]) => PersistentWebSocket
}

interface TimesyncConfig {
  server: string,
  interval: number
}

interface Timesync {
  now: () => number,
  destroy: () => void
}

declare module 'timesync' {
  const create: (config : TimesyncConfig) => Timesync
}
