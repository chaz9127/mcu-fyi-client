"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/lib/auth-context";
import { Media as MediaType } from "@/types";
import Media from "./Media";

type HomeClientProps = {
  initialMedia: MediaType[];
};

export default function HomeClient({ initialMedia }: HomeClientProps) {
  const { currentUser } = useAuth();
  const hasUser = !!(currentUser && Object.keys(currentUser).length > 0);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [sortByValue, setSortByValue] = useState<string>("releaseDate");
  const [filterByValue, setFilterByValue] = useState<string>("all");

  // Handle toast notifications via query params
  useEffect(() => {
    const toastParam = searchParams.get("toast");
    const submittedFeedback = searchParams.get("submittedFeedback");

    if (toastParam === "login") {
      toast("Welcome back!");
      router.replace("/");
    } else if (toastParam === "register") {
      toast("Welcome!");
      router.replace("/");
    } else if (toastParam === "logout") {
      toast("Successfully logged out.");
      router.replace("/");
    } else if (submittedFeedback) {
      toast("Thanks for the feedback!");
      router.replace("/");
    }
  }, [searchParams, router]);

  const sortByCompare = (a: MediaType, b: MediaType) => {
    if (sortByValue === "name") {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    }
    if (sortByValue === "releaseDate" || sortByValue === "chronologicalOrder") {
      return a[sortByValue] - b[sortByValue];
    }
    return 0;
  };

  const displayMedia = [...initialMedia]
    .filter((item) => {
      if (filterByValue === "watched") return currentUser?.watched?.includes(item.slug);
      if (filterByValue === "unwatched") return !currentUser?.watched?.includes(item.slug);
      return true;
    })
    .sort(sortByCompare);

  return (
    <div className="flex flex-wrap justify-between gap-5 px-4 md:px-8">
      {/* Filter / sort bar */}
      <div className="flex w-full justify-end gap-4">
        <div className="mt-4 flex items-center justify-end">
          <select
            className="h-8 w-[150px] cursor-pointer rounded border border-[#caced1] bg-white text-black"
            onChange={(e) => setSortByValue(e.target.value)}
            value={sortByValue}
          >
            <option value="releaseDate">Release Date</option>
            <option value="chronologicalOrder">Chronologically</option>
            <option value="name">Title</option>
          </select>
        </div>

        {hasUser && (
          <div className="flex items-center max-md:mt-4">
            <label className="mr-3 inline-block text-white/80">Filter By:</label>
            <div className="inline-flex gap-4">
              {(["watched", "unwatched", "all"] as const).map((val) => (
                <label key={val} className="flex cursor-pointer items-center gap-1 text-white">
                  <input
                    type="radio"
                    name="filter-by"
                    value={val}
                    checked={filterByValue === val}
                    onChange={(e) => setFilterByValue(e.target.value)}
                  />
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Media grid */}
      {displayMedia.map((media, idx) => (
        <div key={idx}>
          <Media media={media} />
        </div>
      ))}
    </div>
  );
}
