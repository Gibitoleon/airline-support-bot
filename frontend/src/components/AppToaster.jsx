import { Toaster } from "react-hot-toast";

const AppToaster = () => (
  <Toaster
    position="top-right"
    gutter={10}
    containerStyle={{
      top: 20,
      right: 20,
    }}
    toastOptions={{
      duration: 4000,
      style: {
        background: "#1A1F28",
        color: "#F5F7FA",
        border: "1px solid #232934",
        borderRadius: "12px",
        padding: "14px 16px",
        fontSize: "14px",
        fontWeight: 500,
        boxShadow:
          "0 1px 0 0 rgb(255 255 255 / 0.03) inset, 0 8px 24px -6px rgb(0 0 0 / 0.5)",
        maxWidth: "420px",
      },
      success: {
        duration: 3000,
        style: {
          background: "#1A1F28",
          color: "#F5F7FA",
          border: "1px solid rgb(52 211 153 / 0.3)",
        },
        iconTheme: {
          primary: "#34D399",
          secondary: "#1A1F28",
        },
      },
      error: {
        duration: 5000,
        style: {
          background: "#1A1F28",
          color: "#F5F7FA",
          border: "1px solid rgb(227 24 55 / 0.4)",
        },
        iconTheme: {
          primary: "#E31837",
          secondary: "#1A1F28",
        },
      },
      loading: {
        style: {
          background: "#1A1F28",
          color: "#F5F7FA",
          border: "1px solid #232934",
        },
        iconTheme: {
          primary: "#E31837",
          secondary: "#1A1F28",
        },
      },
    }}
  />
);

export default AppToaster;
