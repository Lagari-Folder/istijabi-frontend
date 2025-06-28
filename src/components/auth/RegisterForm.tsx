import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GoogleSignInButton from "./GoogleSignInButton";
import { motion } from "framer-motion";

type RegisterFormProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  onChange: (field: string, value: string) => void;
  onGoogleSignIn: () => void;
  onSwitchToLogin: () => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function RegisterForm({
  name,
  email,
  password,
  confirmPassword,
  onChange,
  onGoogleSignIn,
  onSwitchToLogin,
  onSubmit,
}: RegisterFormProps) {
  return (
    <motion.form
      key="register"
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      onSubmit={onSubmit}
    >
      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          الاسم الكامل
        </label>
        <Input
          type="text"
          placeholder="الاسم الكامل"
          value={name}
          onChange={(e) => onChange("name", e.target.value)}
          className="text-right"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          البريد الإلكتروني
        </label>
        <Input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
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
          onChange={(e) => onChange("password", e.target.value)}
          className="text-right"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary mb-2">
          تأكيد كلمة المرور
        </label>
        <Input
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => onChange("confirmPassword", e.target.value)}
          className="text-right"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-secondary hover:bg-secondary/90 text-white text-lg py-2 rounded-md transition-all duration-300"
      >
        إنشاء حساب
      </Button>

      <GoogleSignInButton onClick={onGoogleSignIn} />

      <div className="mt-6 text-center text-sm text-gray-500">
        لديك حساب بالفعل؟{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-primary hover:underline cursor-pointer"
        >
          تسجيل الدخول
        </button>
      </div>
    </motion.form>
  );
}
