"use client";

import Link from "next/link";
import { Media as MediaType } from "@/types";
import HasWatched from "./HasWatched";
import { Tooltip } from "react-tooltip";

type MediaProps = {
  media: MediaType;
};

export default function Media({ media }: MediaProps) {
  const { name, slug, poster, season, type, releaseDate } = media;
  const isFuture = Date.now() - releaseDate < 0;

  return (
    <div title={name} className="group relative rounded">
      <Link
        href={`/media/${slug}`}
        className="flex max-w-[200px] flex-col no-underline visited:max-[480px]:max-w-[160px]"
      >
        <img
          alt={`${name} poster`}
          className="w-[200px] max-[480px]:w-[160px]"
          style={{ aspectRatio: "27/40" }}
          src={poster}
        />
        <span className="mt-2.5 overflow-hidden truncate text-ellipsis whitespace-nowrap font-bold">
          {name}
        </span>
        <div className="leading-5/50 mt-2 flex h-6 justify-between text-xs leading-5">
          <span className="rounded-[5px] border-2 border-mcu-border/50 px-[3px]">
            {type || "Movie"}
          </span>
          <span className="text-base">{season ? `Season ${season}` : ""}</span>
        </div>
      </Link>
      {/* Hover inner shadow overlay */}
      <div className="pointer-events-none absolute left-0 top-0 h-[calc(100%-66px)] w-full group-hover:shadow-[inset_0_0_16px_black]" />
      {!isFuture && <HasWatched slug={slug} name={name} />}
      <Tooltip id={`${slug}-watched-icon`} />
    </div>
  );
}
