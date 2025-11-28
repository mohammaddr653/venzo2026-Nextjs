import Register from "@/features/auth/components/register";

export default function RegisterPage() {
  return (
    <main>
      <div className="registerPage-container min-h-[100vh] flex flex-col items-center justify-center px-5 md:px-20 py-20">
        <Register></Register>
      </div>
    </main>
  );
}
