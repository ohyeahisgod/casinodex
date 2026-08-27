"use client";

import { useState, useSyncExternalStore } from "react";
import { site } from "@/lib/site";

const STORAGE_KEY = "casinodex-age-ok";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) === "1";
}

function getServerSnapshot() {
  return false;
}

export function AgeGate() {
  const storedOk = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [acceptedHere, setAcceptedHere] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const allowed = storedOk || acceptedHere;

  if (allowed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-4 sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-gate-title"
        className="w-full max-w-lg rounded-3xl border border-line bg-bg-2 p-6 shadow-2xl"
      >
        <p className="text-xs font-semibold tracking-[0.18em] text-warn uppercase">
          18+ 限定
        </p>
        {blocked ? (
          <>
            <h2 id="age-gate-title" className="mt-3 font-display text-2xl">
              本站僅供 {site.ageMinimum} 歲以上使用
            </h2>
            <p className="mt-3 text-sm leading-6 text-mute">
              CasinoDex 是持牌博弈平台名錄，含成人內容。未滿法定年齡請離開。
            </p>
            <a
              href="https://www.begambleaware.org/"
              className="mt-5 inline-block text-sm text-paper underline"
            >
              負責任博彩資源
            </a>
          </>
        ) : (
          <>
            <h2 id="age-gate-title" className="mt-3 font-display text-2xl">
              你是否已滿 {site.ageMinimum} 歲？
            </h2>
            <p className="mt-3 text-sm leading-6 text-mute">
              CasinoDex 只列出第三方持牌平台並出售廣告檔位。我們不營運賭場、不接受投注。進入前請確認你已達法定年齡。
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="rounded-full bg-paper px-4 py-3 text-sm font-semibold text-bg"
                onClick={() => {
                  window.localStorage.setItem(STORAGE_KEY, "1");
                  setAcceptedHere(true);
                }}
              >
                我已滿 {site.ageMinimum} 歲
              </button>
              <button
                type="button"
                className="rounded-full border border-line px-4 py-3 text-sm text-paper"
                onClick={() => setBlocked(true)}
              >
                我未滿 {site.ageMinimum} 歲
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
