import Login from "@/components/common/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ورود به حساب کاربری",
};

export default function LoginPage() {
  return (
    <main>
      <h1>ورود به حساب</h1>
      <Login></Login>
    </main>
  );
}
