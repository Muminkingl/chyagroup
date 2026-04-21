"use client";

import { useState } from "react";
import { login } from "@/app/admin/actions";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    
    const success = await login(formData);
    
    if (success) {
      router.push("/admin");
      router.refresh(); // Refresh to update middleware state
    } else {
      setError("Invalid email or password");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-500">
        {/* Logo and Branding */}
        <div className="flex flex-col items-center gap-6 mb-8">
          <div className="w-24 h-24 relative">
            <Image 
              src="/logo.svg" 
              alt="Chya Group Logo" 
              fill 
              className="object-contain"
              priority
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-white mb-1">Admin Portal</h1>
            <p className="text-sm text-zinc-500">Secure access for Chya Group management</p>
          </div>
        </div>

        <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-lg">Authentication</CardTitle>
            <CardDescription>Enter your administrative credentials below.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="admin@example.com"
                  className="w-full h-11 bg-zinc-950 border border-white/5 rounded-xl px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full h-11 bg-zinc-950 border border-white/5 rounded-xl px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium animate-in slide-in-from-top-1 duration-300">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-11 bg-white text-black hover:bg-zinc-200 transition-colors font-medium mt-4"
              >
                {loading ? "Authenticating..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-[10px] text-zinc-600 uppercase tracking-widest font-medium">
          © {new Date().getFullYear()} Chya Group • Digital Infrastructure
        </p>
      </div>
    </div>
  );
}
