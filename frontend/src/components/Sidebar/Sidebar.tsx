"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear(); // Limpiar sesión simulada
    router.push("/"); // Redirigir al Home
  };

  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-6">
      <div className="text-orange-500 font-bold text-sm">emAIl</div>
      <nav className="flex flex-col space-y-4 justify-between flex-1">
        <div>
          <div className="hover:bg-orange-500 rounded-lg">
            <Link href="/dashboard">
              <Image
                src="profile-icon.svg"
                alt="Profile"
                width={80}
                height={80}
              />
            </Link>
          </div>

          <div className="hover:bg-orange-500 rounded-lg">
            <Link href="/dashboard ">
              <Image
                src="/dashboard-icon1.svg"
                alt="Dashboard"
                width={80}
                height={80}
              />
            </Link>
          </div>
          <div className="hover:bg-orange-500  rounded-lg">
            <Link href="/saved-emails">
              <Image
                src="star-icon.svg"
                alt="Saved Emails"
                width={80}
                height={80}
              />
            </Link>
          </div>
          <div className="hover:bg-orange-500  rounded-lg">
            <Link href="/emails-sent">
              <Image src="email-icon.svg" alt="sent emails" width={80} height={80} />
            </Link>
          </div>
        </div>

        {/* Bottom logout icon */}

        <button onClick={handleLogout} className="rounded-lg hover:bg-orange-500 ">
          <Image src="logout-icon-1.svg" alt="Logout" width={80} height={80} />
        </button>
      </nav>
    </div>
  );
}
