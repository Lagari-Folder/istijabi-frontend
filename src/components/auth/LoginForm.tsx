import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GoogleSignInButton from "./GoogleSignInButton";
import { motion } from "framer-motion";

type LoginFormProps = {
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGoogleSignIn: () => void;
  onSwitchToRegister: () => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onGoogleSignIn,
  onSwitchToRegister,
  onSubmit,
}: LoginFormProps) {
  return (
    <motion.form
      key="login"
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      onSubmit={onSubmit}
    >
      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          البريد الإلكتروني
        </label>
        <Input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={onEmailChange}
          className="text-right"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          كلمة المرور
        </label>
        <Input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={onPasswordChange}
          className="text-right"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-secondary hover:bg-secondary/90 text-white text-lg py-2 rounded-md transition-all duration-300"
      >
        دخول
      </Button>

      <GoogleSignInButton onClick={onGoogleSignIn} />

      <div className="mt-6 text-center text-sm text-gray-500">
        ليس لديك حساب؟{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-primary hover:underline cursor-pointer"
        >
          سجّل الآن
        </button>
      </div>
    </motion.form>
  );
}
