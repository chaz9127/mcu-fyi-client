"use client";

import { useAuth } from "@/lib/auth-context";
import { patchUser } from "@/lib/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Tooltip } from "react-tooltip";

type HasWatchedProps = {
  name: string;
  slug: string;
};

export default function HasWatched({ name, slug }: HasWatchedProps) {
  const { currentUser, token, updateUser } = useAuth();
  const router = useRouter();
  const hasUser = !!(currentUser && Object.keys(currentUser).length > 0);
  const hasWatched = !!currentUser?.watched?.includes(slug);

  const toggleWatch = async () => {
    if (!currentUser || !token) return;
    const { email, role, watched } = currentUser;
    let newWatched = [...watched];
    let toastMessage = "";

    if (hasWatched) {
      newWatched = newWatched.filter((s) => s !== slug);
      toastMessage = `Removed ${name} from your Watched List`;
    } else {
      newWatched.push(slug);
      toastMessage = `Added ${name} to your Watched List`;
    }

    const res = await patchUser(token, { watched: newWatched, email, role });
    if (res.status === 201) {
      updateUser({ email, role, watched: newWatched });
      toast(toastMessage);
    } else {
      toast.error("Failed to update watched list");
    }
  };

  const tooltipId = `${slug}-watched-icon`;

  if (hasUser) {
    return (
      <>
        <div
          className="absolute right-[5px] top-[5px] cursor-pointer bg-mcu-red"
          onClick={toggleWatch}
        >
          {hasWatched ? (
            <i
              className="fa-solid fa-check"
              data-tooltip-id={tooltipId}
              data-tooltip-content="Remove from watched"
              data-tooltip-place="top"
            />
          ) : (
            <i
              className="fa-regular fa-eye-slash"
              data-tooltip-id={tooltipId}
              data-tooltip-content="Add to watched"
              data-tooltip-place="top"
            />
          )}
        </div>
        <Tooltip id={tooltipId} />
      </>
    );
  }

  return (
    <>
      <div
        className="absolute right-[5px] top-[5px] flex cursor-pointer items-center justify-center text-white"
        onClick={() => router.push("/auth")}
      >
        <i
          className="fa-regular fa-eye-slash"
          data-tooltip-id={tooltipId}
          data-tooltip-content="Login or Register to Add"
          data-tooltip-place="top"
        />
      </div>
      <Tooltip id={tooltipId} />
    </>
  );
}
