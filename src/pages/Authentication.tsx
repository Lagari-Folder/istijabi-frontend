import { useState } from "react";
import AuthTabs from "@/components/auth/AuthTabs";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { AnimatePresence } from "framer-motion";

export default function Authentication() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  const handleGoogleSignIn = () => {
    alert("Google Sign-In clicked");
  };

  return (
    <div className="flex items-center justify-center px-4 py-12" dir="rtl">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Form Section */}
        <div className="p-8 sm:p-12 md:p-16 lg:p-20">
          <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <AnimatePresence mode="wait" initial={false}>
            {activeTab === "login" ? (
              <LoginForm
                email={loginEmail}
                password={loginPassword}
                onEmailChange={(e) => setLoginEmail(e.target.value)}
                onPasswordChange={(e) => setLoginPassword(e.target.value)}
                onGoogleSignIn={handleGoogleSignIn}
                onSwitchToRegister={() => setActiveTab("register")}
                onSubmit={(e) => {
                  e.preventDefault();
                  // Handle login
                }}
              />
            ) : (
              <RegisterForm
                name={registerName}
                email={registerEmail}
                password={registerPassword}
                confirmPassword={registerConfirmPassword}
                onChange={(field, value) => {
                  if (field === "name") setRegisterName(value);
                  if (field === "email") setRegisterEmail(value);
                  if (field === "password") setRegisterPassword(value);
                  if (field === "confirmPassword")
                    setRegisterConfirmPassword(value);
                }}
                onGoogleSignIn={handleGoogleSignIn}
                onSwitchToLogin={() => setActiveTab("login")}
                onSubmit={(e) => {
                  e.preventDefault();
                  // Handle registration
                }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Image Section */}
        <div
          className="h-full w-full hidden md:flex bg-[url('/images/login-bg.jpg')] bg-cover bg-center"
          aria-hidden="true"
        >
          <div className="h-full w-full flex items-center justify-center bg-primary/90">
            <img
              src="/images/logo.png"
              alt="الشعار"
              className="h-24 sm:h-32 md:h-40 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
