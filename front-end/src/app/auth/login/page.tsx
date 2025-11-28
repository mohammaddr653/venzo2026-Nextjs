import Login from "@/features/auth/components/login";

export default function LoginPage() {
  return (
    <main>
      <div className="loginPage-container min-h-[100vh] flex flex-col items-center justify-center px-5 md:px-20 py-20">
        <Login></Login>
      </div>
    </main>
  );
}
