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
    <div className="w-16 px-2 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-6">
      <Link
        href="/"
        className="text-orange-500 font-bold text-lg rounded bg-orange-600/15 p-2 hover:bg-orange-600/25 cursor-pointer transition-colors"
      >
        EIA
      </Link>
      <nav className="flex flex-col space-y-4 justify-between flex-1">
        <div>
          <div className="hover:bg-orange-600/15 p-1 rounded">
            <Link href="/dashboard">
              <Image
                src="profile-icon.svg"
                alt="Profile"
                width={100}
                height={100}
              />
            </Link>
          </div>

          <div className="hover:bg-orange-600/15 p-1 rounded">
            <Link href="/dashboard ">
              <Image
                src="/dashboard-icon1.svg"
                alt="Dashboard"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <div className="hover:bg-orange-600/15 p-1 rounded">
            <Link href="/saved-emails">
              <Image
                src="star-icon.svg"
                alt="Saved Emails"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <div className="hover:bg-orange-600/15 p-1 rounded">
            <Link href="/emails-sent">
              <Image
                src="email-icon.svg"
                alt="sent emails"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <div className="hover:bg-orange-600/15 p-1 rounded flex items-center justify-center">
            <Link href="/contacts" className="flex items-center justify-center">
              <Image
                src="contacts-icon2.svg"
                alt="contacts"
                width={25}
                height={25}
              />
            </Link>
          </div>
        </div>

        {/* Bottom logout icon */}

        <button
          onClick={handleLogout}
          className="rounded-lg hover:bg-orange-500 "
        >
          <Image
            src="logout-icon-1.svg"
            alt="Logout"
            width={100}
            height={100}
          />
        </button>
      </nav>
    </div>
  );
}
