import Register from "@/components/common/register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ساخت حساب کاربری",
};

export default function RegisterPage() {
  return (
    <main>
      <h1>ساخت حساب کاربری</h1>
      <Register></Register>
    </main>
  );
}
