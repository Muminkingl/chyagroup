import { LoaderThree } from "@/components/loader";

export default function Loading() {
  return (
    <div className="fixed inset-0 min-h-screen z-[100] flex items-center justify-center bg-black">
      <LoaderThree />
    </div>
  );
}
