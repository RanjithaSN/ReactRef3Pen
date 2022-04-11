
declare module 'hash-files' {
  interface Options {
    files: string[];
    algorithm: 'md5' | 'sha' | 'sha1' | 'sha224' | 'sha256' | 'sha384';
  }
  export function sync(Options): string;
}