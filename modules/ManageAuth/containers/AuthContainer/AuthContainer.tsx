'use client';

import { RegisterForm } from "../../components/registerForm";
import RightSide from "../../components/rightSide";

export default function AuthContainer() {
  return (
    <main className="flex min-h-screen">
      <div className="max-w-7xl flex-1 px-8">
        <RegisterForm />
      </div>
      <RightSide />
    </main>
  );
}
