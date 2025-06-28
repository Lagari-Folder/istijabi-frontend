// global.d.ts
export {}; // To make it a module and avoid global scope pollution

declare global {
  interface Window {
    errorCallback?: (error: any) => void;
    cancelCallback?: () => void;
    Checkout?: {
      configure: (config: { session: { id: string } }) => void;
      showEmbeddedPage: (selector: string) => void;
      showPaymentPage: () => void;
    };
  }
}
