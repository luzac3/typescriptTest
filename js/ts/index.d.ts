declare module '*/appKeys.json' {
  interface appKeys {
    appKey: string;
    appSecret: string;
  }
  
  const value: appKeys;
  export = value;
}