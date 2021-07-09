declare module '*/appKeys.json' {
  interface appKeys {
    appKey: string;
    appSecret: string;
  }

  const value: appKeys;
  export = value;
}

declare module '*/redirectUri.json' {
  interface redirectUri {
    "redirectUri": string;
  }

  const value: redirectUri;
  export = value;
}
