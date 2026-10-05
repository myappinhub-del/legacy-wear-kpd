import React from 'react';
import { Bell, X, CheckCircle, Package, Truck, Sparkles } from 'lucide-react';
import { PushNotificationMessage } from '../types';

interface PushNotificationDrawerProps {
  isOpen: boolean;
  notifications: PushNotificationMessage[];
  onClose: () => void;
  onClearAll: () => void;
  onRequestBrowserPermission: () => void;
}

export const PushNotificationDrawer: React.FC<PushNotificationDrawerProps> = ({
  isOpen,
  notifications,
  onClose,
  onClearAll,
  onRequestBrowserPermission
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f1118] border-l border-[#242738] shadow-2xl flex flex-col justify-between text-left">
          
          {/* Header */}
          <div className="p-5 border-b border-[#202330] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#d4af37]" />
              <h3 className="font-cinzel text-lg font-bold text-white">Order Notifications</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-bold">
                {notifications.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Browser Permission Prompt Banner */}
          <div className="bg-[#151722] p-4 border-b border-[#242738] flex items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-semibold text-white">Real-Time Dispatch Alerts</p>
              <p className="text-[11px] text-zinc-400">Enable device push alerts for parcel tracking.</p>
            </div>
            <button
              onClick={onRequestBrowserPermission}
              className="px-3 py-1.5 rounded-lg bg-[#d4af37] text-black text-[11px] font-bold uppercase shrink-0 hover:opacity-90"
            >
              Enable
            </button>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {notifications.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400 space-y-3">
                <Bell className="w-10 h-10 text-zinc-700" />
                <p className="text-sm font-semibold text-white">No notifications yet</p>
                <p className="text-xs text-zinc-500">
                  You will receive real-time push alerts here when your order is placed, confirmed, or dispatched.
                </p>
              </div>
            ) : (
              notifications.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 rounded-2xl bg-[#141620] border border-[#242738] space-y-1.5 hover:border-zinc-700 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#d4af37] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {msg.title}
                    </span>
                    <span className="text-[10px] text-zinc-500">{msg.timestamp}</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">{msg.body}</p>
                  {msg.orderId && (
                    <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                      Order #{msg.orderId}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Bottom Clear */}
          {notifications.length > 0 && (
            <div className="p-4 border-t border-[#202330] bg-[#0c0d12]">
              <button
                onClick={onClearAll}
                className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold uppercase transition"
              >
                Clear All Notifications
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
