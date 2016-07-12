declare module 'react-color' {
  export let SketchPicker: any;
  export let ChromePicker: any;
}

declare let require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};