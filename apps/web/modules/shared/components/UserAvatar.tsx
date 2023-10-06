import { Avatar, AvatarFallback, AvatarImage } from "@ui/components";
import { forwardRef, useMemo } from "react";

export const UserAvatar = forwardRef<
  HTMLSpanElement,
  {
    name: string;
    avatarUrl?: string | null;
  }
>(({ name, avatarUrl }, ref) => {
  const initials = useMemo(
    () =>
      name
        .split(" ")
        .map((n) => n[0])
        .join(""),
    [name],
  );

  return (
    <Avatar ref={ref}>
      <AvatarImage src={avatarUrl ?? undefined} />
      <AvatarFallback className="bg-primary/10 text-primary">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
});
