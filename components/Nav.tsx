"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tooltip } from "react-tooltip";
import { useAuth } from "@/lib/auth-context";
import { authLoginWithToken } from "@/lib/api";
import SearchBar from "./SearchBar";
import { Media } from "@/types";

export default function Nav({ searchPool = [] }: { searchPool?: Media[] }) {
  console.log("search pool", searchPool);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const { currentUser, setCredentials, logOut } = useAuth();
  const router = useRouter();
  const noCurrentUser = !currentUser || Object.keys(currentUser).length === 0;

  // Restore session from localStorage token
  useEffect(() => {
    const localAccessToken = localStorage.getItem("accessToken");
    if (localAccessToken && noCurrentUser) {
      authLoginWithToken(localAccessToken)
        .then((res) => {
          if (res?.email) {
            setCredentials(
              { email: res.email, role: res.role, watched: res.watched },
              localAccessToken
            );
          } else {
            logOut();
          }
        })
        .catch(() => logOut());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Close nav menu on outside click
  useEffect(() => {
    const hideMenu = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).classList.value.includes("fa-bars")) {
        setShowNavMenu(false);
      }
    };
    document.documentElement.addEventListener("click", hideMenu, false);
    return () => document.documentElement.removeEventListener("click", hideMenu, false);
  }, []);

  const handleLogout = () => {
    logOut();
    router.push("/?toast=logout");
  };

  return (
    <div className="relative text-white">
      {/* Desktop nav */}
      <nav className="hidden h-24 items-center justify-between bg-nav-bg px-8 py-2.5 md:flex">
        <div className="flex flex-[2] justify-between">
          <div
            onClick={() => router.push("/")}
            className="logo-badge relative top-3 mr-8 ms-4 cursor-pointer font-avengeance text-2xl"
          >
            <span className="relative z-[1]">TheMcu.fyi</span>
          </div>
          <SearchBar results={searchPool} />
        </div>
        <div className="flex flex-1 justify-end">
          {noCurrentUser ? (
            <Link
              href="/auth"
              className="flex items-center px-6 py-4 no-underline hover:bg-hover-bg"
            >
              <i className="fa-solid fa-user-plus mr-2 text-mcu-red" />
              Login / Register
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-6 py-4 text-left hover:bg-hover-bg"
            >
              <i className="fa-solid fa-user-plus mr-2 text-mcu-red" />
              Logout
            </button>
          )}

          <Link
            href="/feedback"
            className="flex items-center px-6 py-4 no-underline hover:bg-hover-bg"
          >
            <i className="fa-solid fa-comment-dots mr-2 text-mcu-red" />
            Feedback
          </Link>
        </div>
      </nav>

      {/* Mobile nav */}
      <nav className="flex items-center bg-nav-bg px-4 py-2.5 md:hidden">
        <div onClick={() => setShowNavMenu(!showNavMenu)} className="mr-8 cursor-pointer">
          <i className="fa-solid fa-bars text-2xl" />
        </div>
        <SearchBar results={searchPool} />
      </nav>

      {/* Slide-out menu */}
      {showNavMenu && (
        <div className="absolute top-[54px] z-[2] ml-8 max-w-[256px] bg-nav-bg">
          <ul>
            <li onClick={() => router.push("/")} className="cursor-pointer md:hidden">
              <div className="logo-badge relative top-[5px] ml-6 inline-block py-4 font-avengeance text-2xl">
                <span className="relative z-[1]">TheMcu.fyi</span>
              </div>
            </li>

            <li className="cursor-pointer">
              {noCurrentUser ? (
                <Link
                  href="/auth"
                  className="flex items-center px-6 py-4 no-underline hover:bg-hover-bg"
                >
                  <i className="fa-solid fa-user-plus mr-2 text-mcu-red" />
                  Login / Register
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center px-6 py-4 text-left hover:bg-hover-bg"
                >
                  <i className="fa-solid fa-user-plus mr-2 text-mcu-red" />
                  Logout
                </button>
              )}
            </li>

            <li className="cursor-pointer">
              <Link
                href="/feedback"
                className="flex items-center px-6 py-4 no-underline hover:bg-hover-bg"
              >
                <i className="fa-solid fa-comment-dots mr-2 text-mcu-red" />
                Feedback
              </Link>
            </li>

            <li
              className="cursor-pointer"
              data-tooltip-id="donate-tooltip"
              data-tooltip-content="Coming Soon"
              data-tooltip-place="right"
            >
              <Link href="/" className="flex items-center px-6 py-4 no-underline hover:bg-hover-bg">
                <i className="fa-solid fa-coins mr-2 text-mcu-red" />
                Donate
              </Link>
            </li>
          </ul>
        </div>
      )}
      <Tooltip id="donate-tooltip" />
    </div>
  );
}
