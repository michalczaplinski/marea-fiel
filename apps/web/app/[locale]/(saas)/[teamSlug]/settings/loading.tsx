import { Icon } from "@ui/components";

export default function Loading() {
  return (
    <div className="flex items-center justify-center py-8">
      <Icon.spinner className="text-primary-400 h-4 w-4 animate-spin text-3xl" />
    </div>
  );
}
