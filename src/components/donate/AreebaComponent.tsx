import { useEffect, useRef } from "react";

type AreebaComponentProps = {
  checkoutSessionId: string;
  receiptPageUrl: string;
};

declare global {
  interface Window {
    Checkout?: any;
    errorCallback?: (error: any) => void;
    cancelCallback?: () => void;
  }
}

const AreebaComponent = ({
  checkoutSessionId,
  receiptPageUrl,
}: AreebaComponentProps) => {
  const embedTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://epayment.areeba.com/static/checkout/checkout.min.js";
    script.async = true;
    script.setAttribute("data-error", "errorCallback");
    script.setAttribute("data-cancel", "cancelCallback");
    script.setAttribute("data-complete", receiptPageUrl);

    document.head.appendChild(script);

    window.errorCallback = (error) => {
      console.error("Areeba Payment Error:", JSON.stringify(error));
    };

    window.cancelCallback = () => {
      console.log("Payment cancelled");
    };

    script.onload = () => {
      if (window.Checkout) {
        window.Checkout.configure({
          session: {
            id: checkoutSessionId,
          },
        });

        // Trigger embedded payment page
        window.Checkout.showEmbeddedPage("#embed-target");
      } else {
        console.error("Checkout object not found on window");
      }
    };

    return () => {
      document.head.removeChild(script);
      delete window.errorCallback;
      delete window.cancelCallback;
      if (window.Checkout) delete window.Checkout;
    };
  }, [checkoutSessionId, receiptPageUrl]);

  return (
    <div className="space-y-4" style={{ direction: "rtl" }}>
      <div id="embed-target" ref={embedTargetRef} />
    </div>
  );
};

export default AreebaComponent;
