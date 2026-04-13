"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { authLogin, authRegister } from "@/lib/api";
import Button from "@/components/Button";
import Tabs from "@/components/Tabs";

type ErrorResponseType = {
  message?: string | null;
  status?: number | null;
};

export default function AuthPage() {
  const router = useRouter();
  const { setCredentials } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeTab, setActiveTab] = useState("register");

  const isRegister = activeTab === "register";

  useEffect(() => {
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    if (emailRef.current) emailRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
    if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
  }, [activeTab]);

  useEffect(() => {
    const errors: string[] = [];
    if (isRegister) {
      if (emailRef.current?.value && emailRef.current.validationMessage) {
        errors.push(emailRef.current.validationMessage.split(".")[0]);
      }
      if (confirmPassword && password !== confirmPassword) {
        errors.push("Passwords must match");
      }
      if (passwordRef.current?.value && passwordRef.current.validationMessage) {
        errors.push(passwordRef.current.validationMessage);
      }
    }
    setErrorMessage(errors);
  }, [email, password, confirmPassword, isRegister]);

  const isFormValid = () => {
    if (isRegister) {
      return email && password && password.length > 7 && password === confirmPassword;
    }
    return email && errorMessage.length === 0 && password;
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isFormValid() && isRegister) {
        const userData = await authRegister({ email, password });
        setCredentials(
          { email: userData.email, role: userData.role, watched: userData.watched },
          userData.accessToken
        );
        router.push("/?toast=register");
      } else if (isFormValid() && !isRegister) {
        const userData = await authLogin({ email, password });
        setCredentials(
          { email: userData.email, role: userData.role, watched: userData.watched },
          userData.accessToken
        );
        router.push("/?toast=login");
      }
    } catch (err) {
      const currentError = err as ErrorResponseType;
      if (!currentError.status) {
        setErrorMessage(["No Server Response"]);
      } else if (currentError.status === 400) {
        setErrorMessage(["Missing Email or Password"]);
      } else if (currentError.status === 401) {
        setErrorMessage(["Incorrect Email or Password"]);
      } else {
        setErrorMessage(["Login Failed"]);
      }
    }
    setLoading(false);
  };

  const tabs = ["Register", "Login"].map((tab) => ({
    title: tab,
    value: tab.toLowerCase(),
    active: activeTab === tab.toLowerCase(),
    setTab: () => setActiveTab(tab.toLowerCase()),
  }));

  return (
    <div className="flex h-[calc(100vh-60px)] flex-col items-center justify-center">
      <form onSubmit={submitForm} className="relative -top-20 w-full max-w-[440px] px-8">
        {errorMessage.length > 0 && (
          <div className="mb-12 box-border w-full max-w-[440px] border border-mcu-red/70 p-2">
            <ul className="list-inside list-disc">
              {errorMessage.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <Tabs tabs={tabs} />

        <div className="relative my-8">
          <label className="absolute -top-3 left-3 bg-mcu-bg px-1 text-sm text-gray-400">
            Email
          </label>
          <input
            required
            ref={emailRef}
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="h-16 w-full rounded border border-gray-500 bg-transparent px-3 text-base font-bold leading-8"
          />
        </div>

        <div className="relative my-8">
          <label className="absolute -top-3 left-3 bg-mcu-bg px-1 text-sm text-gray-400">
            Password {isRegister && "(at least 8 characters)"}
          </label>
          <input
            required
            ref={passwordRef}
            name="password"
            type="password"
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
            className="h-16 w-full rounded border border-gray-500 bg-transparent px-3 text-base font-bold leading-8"
          />
        </div>

        {isRegister && (
          <div className="relative my-8">
            <label className="absolute -top-3 left-3 bg-mcu-bg px-1 text-sm text-gray-400">
              Confirm Password
            </label>
            <input
              required
              ref={confirmPasswordRef}
              name="confirm-password"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-16 w-full rounded border border-gray-500 bg-transparent px-3 text-base font-bold leading-8"
            />
          </div>
        )}

        <div className="my-8">
          <Button
            buttonType="submit"
            text={loading ? "Submitting..." : "Submit"}
            textOnly
            disabled={!isFormValid() || loading}
          />
        </div>
        <input type="hidden" name="_captcha" value="false" />
      </form>
    </div>
  );
}
