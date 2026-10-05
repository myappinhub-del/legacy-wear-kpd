import React, { useState } from 'react';
import { ShieldCheck, Lock, User, KeyRound, Eye, EyeOff, X } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId.trim() === 'legacywear@kpd' && password.trim() === '987654321') {
      onLoginSuccess();
      setAdminId('');
      setPassword('');
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-[#0f1118] border border-[#2e3347] rounded-3xl p-6 sm:p-8 text-left shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Secret badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2.5 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37]">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#d4af37]">
              Confidential Access
            </span>
            <h3 className="font-cinzel text-xl font-bold text-white">Administrator Portal</h3>
          </div>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed">
          Authorized personnel only. Please enter your administrator credentials to manage inventory, sales reports, and site settings.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Admin ID Field */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Admin ID
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
              <input
                type="text"
                value={adminId}
                onChange={(e) => {
                  setAdminId(e.target.value);
                  setError(false);
                }}
                placeholder="Enter Admin ID"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-mono focus:border-[#d4af37] focus:outline-none"
                autoFocus
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter Password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-xs font-mono focus:border-[#d4af37] focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-2.5 text-zinc-500 hover:text-white"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-medium">
              Invalid Admin ID or Password. Access denied.
            </div>
          )}

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#eab308] text-black text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-lg flex items-center justify-center gap-2 transition"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
