"use client";

import { useUserStore } from "@/store";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function BlogsPage() {
  const { user } = useUserStore();
  return (
    <div>
      <h1>مدیریت مقالات</h1>
      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
}
