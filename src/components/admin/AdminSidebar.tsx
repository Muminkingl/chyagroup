"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { logout } from '@/app/admin/actions';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: 'solar:widget-5-linear',
    exact: true
  },
  {
    title: 'Create Post',
    href: '/admin/create-post',
    icon: 'solar:pen-new-square-linear',
  },
  {
    title: 'Edit Post',
    href: '/admin/edit-post',
    icon: 'solar:document-text-linear',
  },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
  };

  const SidebarContent = (
    <aside className="w-64 flex-shrink-0 border-r border-white/5 bg-[#09090b] flex flex-col h-full z-20">
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-sm tracking-widest uppercase">
            <span className="text-[#ff4d4d]">Chya</span>{" "}
            <span className="text-[#60a5fa]">Group</span>
          </span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact 
              ? pathname === item.href 
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-zinc-800 text-zinc-50 shadow-lg shadow-black/20"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-50"
                )}
              >
                <iconify-icon icon={item.icon} class={cn("text-xl", isActive ? "text-zinc-50" : "text-zinc-500")}></iconify-icon>
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/5 bg-zinc-950/50">
        <div className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl border border-white/5 bg-zinc-900/40">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10 flex-shrink-0">
              <iconify-icon icon="solar:user-linear" class="text-zinc-400"></iconify-icon>
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-medium text-zinc-50 truncate">Admin User</span>
              <span className="text-[9px] text-zinc-500 uppercase tracking-wider truncate">muminrtx@gmail.com</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-rose-500/20 hover:text-rose-500 text-zinc-400 transition-all flex-shrink-0"
            title="Logout"
          >
            <iconify-icon icon="solar:logout-linear" class="text-lg"></iconify-icon>
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full">
        {SidebarContent}
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 z-[70] md:hidden"
            >
              {SidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
