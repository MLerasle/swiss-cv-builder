import { BaseSkeleton } from "@/components/UI/BaseSkeleton";

export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <BaseSkeleton />
      <BaseSkeleton />
      <BaseSkeleton />
      <BaseSkeleton />
    </div>
  );
}
