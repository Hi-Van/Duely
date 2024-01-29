import { ProfileForm } from "@/components/ui/profile-form";

export default function Page() {
  return (
    <div className="flex items-center w-full min-h-screen">
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to Duely.</h1>
        <p className="text-lg text-center mb-24 text-slate-400">
          Get the things that matter, done right.
        </p>
        <ProfileForm login={true} />
      </div>
    </div>
  );
}
