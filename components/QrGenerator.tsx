"use client";

import React, { useState } from "react";
import { Controls, QrState } from "./Controls";
import { Preview } from "./Preview";
import { Card } from "@/components/ui/card";

export function QrGenerator() {
  const [state, setState] = useState<QrState>({
    value: "https://example.com",
    fgColor: "#000000",
    bgColor: "#ffffff",
    size: 512,
    level: "M",
    logoImage: null,
    logoSize: 20,
    logoRounded: false,
    qrPadding: 24,
    qrBorderRadius: 16,
  });

  const handleStateChange = (updates: Partial<QrState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          QR Code Generator
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Create, customize, and download production-ready QR codes in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 xl:col-span-8">
          <Card className="p-6 border shadow-sm">
            <Controls state={state} onChange={handleStateChange} />
          </Card>
        </div>
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-8">
          <Preview state={state} />
        </div>
      </div>
    </div>
  );
}
