"use client";

import React, { ChangeEvent, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";

export type QrState = {
  value: string;
  fgColor: string;
  bgColor: string;
  size: number;
  level: "L" | "M" | "Q" | "H";
  logoImage: string | null;
  logoSize: number;
  logoRounded: boolean;
  qrPadding: number;
  qrBorderRadius: number;
};

interface ControlsProps {
  state: QrState;
  onChange: (updates: Partial<QrState>) => void;
}

export function Controls({ state, onChange }: ControlsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({ 
          logoImage: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    onChange({ logoImage: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="space-y-2">
        <Label htmlFor="qr-content">Content (Text or URL)</Label>
        <Input
          id="qr-content"
          placeholder="https://example.com"
          value={state.value}
          onChange={(e) => onChange({ value: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Colors */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fgColor" className="flex items-center justify-between">
              Foreground Color
              <span className="text-xs text-muted-foreground">{state.fgColor}</span>
            </Label>
            <div className="flex gap-2">
              <input
                type="color"
                id="fgColor"
                className="w-10 h-10 rounded border border-gray-200 cursor-pointer"
                value={state.fgColor}
                onChange={(e) => onChange({ fgColor: e.target.value })}
              />
              <Input
                value={state.fgColor}
                onChange={(e) => onChange({ fgColor: e.target.value })}
                className="font-mono text-sm uppercase"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bgColor" className="flex items-center justify-between">
              Background Color
              <span className="text-xs text-muted-foreground">{state.bgColor}</span>
            </Label>
            <div className="flex gap-2">
              <input
                type="color"
                id="bgColor"
                className="w-10 h-10 rounded border border-gray-200 cursor-pointer"
                value={state.bgColor}
                onChange={(e) => onChange({ bgColor: e.target.value })}
              />
              <Input
                value={state.bgColor}
                onChange={(e) => onChange({ bgColor: e.target.value })}
                className="font-mono text-sm uppercase"
              />
            </div>
          </div>
        </div>

        {/* Size and Error Correction */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="size" className="flex justify-between">
              <span>Size (px)</span>
              <span className="text-xs text-muted-foreground">{state.size}px</span>
            </Label>
            <input
              type="range"
              id="size"
              min="100"
              max="600"
              step="10"
              value={state.size}
              onChange={(e) => onChange({ size: Number(e.target.value) })}
              className="w-full accent-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="level" className="flex justify-between">
              <span>Error Correction</span>
            </Label>
            <select
              id="level"
              value={state.level}
              onChange={(e) => onChange({ level: e.target.value as any })}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="L">Low (7%)</option>
              <option value="M">Medium (15%)</option>
              <option value="Q">Quartile (25%)</option>
              <option value="H">High (30%)</option>
            </select>
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="qrPadding" className="flex justify-between">
                <span>Padding</span>
                <span className="text-xs text-muted-foreground">{state.qrPadding}px</span>
              </Label>
              <input
                type="range"
                id="qrPadding"
                min="0"
                max="100"
                step="4"
                value={state.qrPadding}
                onChange={(e) => onChange({ qrPadding: Number(e.target.value) })}
                className="w-full accent-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="qrBorderRadius" className="flex justify-between">
                <span>Rounded Corners</span>
                <span className="text-xs text-muted-foreground">{state.qrBorderRadius}px</span>
              </Label>
              <input
                type="range"
                id="qrBorderRadius"
                min="0"
                max="100"
                step="4"
                value={state.qrBorderRadius}
                onChange={(e) => onChange({ qrBorderRadius: Number(e.target.value) })}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logo Upload */}
      <div className="space-y-4 pt-4 border-t border-border">
        <h3 className="text-sm font-medium">Center Logo (Optional)</h3>
        
        <div className="flex items-center gap-4">
          {!state.logoImage ? (
            <div className="flex-1">
              <Label
                htmlFor="logo-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> logo
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, SVG (Max 2MB)</p>
                </div>
                <input
                  id="logo-upload"
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/svg+xml"
                  onChange={handleLogoUpload}
                />
              </Label>
            </div>
          ) : (
            <div className="flex items-center w-full gap-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={state.logoImage} alt="Logo preview" className="w-16 h-16 object-contain rounded-md bg-white border" />
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="logoSize" className="flex justify-between">
                    <span>Logo Size</span>
                    <span className="text-xs text-muted-foreground">{state.logoSize}%</span>
                  </Label>
                  <input
                    type="range"
                    id="logoSize"
                    min="5"
                    max="30"
                    step="1"
                    value={state.logoSize}
                    onChange={(e) => onChange({ logoSize: Number(e.target.value) })}
                    className="w-full accent-primary"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="logoRounded"
                    checked={state.logoRounded}
                    onChange={(e) => onChange({ logoRounded: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                  />
                  <Label htmlFor="logoRounded" className="cursor-pointer">Round Logo</Label>
                </div>
              </div>
              <Button variant="destructive" size="icon" onClick={removeLogo} title="Remove Logo">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
