"use client";

import React, { useRef, useState, useEffect } from "react";
import { QrState } from "./Controls";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download, Copy, Check } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PreviewProps {
  state: QrState;
}

export function Preview({ state }: PreviewProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [processedLogo, setProcessedLogo] = useState<string | null>(null);

  useEffect(() => {
    if (!state.logoImage) {
      setProcessedLogo(null);
      return;
    }
    if (!state.logoRounded) {
      setProcessedLogo(state.logoImage);
      return;
    }
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const cvs = document.createElement("canvas");
      const size = Math.min(img.width, img.height);
      cvs.width = size;
      cvs.height = size;
      const ctx = cvs.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.clip();
        const xOffset = (img.width - size) / 2;
        const yOffset = (img.height - size) / 2;
        ctx.drawImage(img, xOffset, yOffset, size, size, 0, 0, size, size);
        setProcessedLogo(cvs.toDataURL("image/png"));
      }
    };
    img.src = state.logoImage;
  }, [state.logoImage, state.logoRounded]);

  const calculateImageSettings = () => {
    if (!processedLogo) return undefined;
    const proportion = state.logoSize / 100;
    return {
      src: processedLogo,
      height: state.size * proportion,
      width: state.size * proportion,
      excavate: true,
    };
  };

  const handleDownloadPNG = () => {
    // Find the canvas element
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;

    const finalCanvas = document.createElement("canvas");
    const padding = state.qrPadding;
    finalCanvas.width = canvas.width + padding * 2;
    finalCanvas.height = canvas.height + padding * 2;
    const ctx = finalCanvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = state.bgColor;
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(0, 0, finalCanvas.width, finalCanvas.height, state.qrBorderRadius);
      ctx.fill();
    } else {
      ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
    }

    ctx.drawImage(canvas, padding, padding);

    const url = finalCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSVG = () => {
    // Find the svg element
    const svg = svgRef.current?.querySelector("svg");
    if (!svg) return;

    const padding = state.qrPadding;
    const size = state.size;
    const fullSize = size + padding * 2;

    const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    newSvg.setAttribute("width", fullSize.toString());
    newSvg.setAttribute("height", fullSize.toString());
    newSvg.setAttribute("viewBox", `0 0 ${fullSize} ${fullSize}`);

    const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bgRect.setAttribute("width", "100%");
    bgRect.setAttribute("height", "100%");
    bgRect.setAttribute("fill", state.bgColor);
    bgRect.setAttribute("rx", state.qrBorderRadius.toString());
    bgRect.setAttribute("ry", state.qrBorderRadius.toString());
    newSvg.appendChild(bgRect);

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", `translate(${padding}, ${padding})`);
    g.innerHTML = svg.innerHTML;
    newSvg.appendChild(g);

    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(newSvg);

    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

    const link = document.createElement("a");
    link.href = url;
    link.download = `qrcode-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = async () => {
    if (!state.value) return;
    try {
      await navigator.clipboard.writeText(state.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const hasValue = state.value.trim().length > 0;
  const imageSettings = calculateImageSettings();

  const displaySize = Math.min(state.size, 300);
  const scaleRatio = displaySize / state.size;
  const displayPadding = state.qrPadding * scaleRatio;
  const displayBorderRadius = state.qrBorderRadius * scaleRatio;

  return (
    <Card className="p-6 border bg-slate-50/50 dark:bg-slate-900/50 flex flex-col items-center justify-center space-y-6 h-full">
      <div className="relative group w-full flex justify-center items-center min-h-[300px]">
        {hasValue ? (
          <>
            {/* Hidden SVG for download purposes */}
            <div ref={svgRef} className="hidden">
              <QRCodeSVG
                value={state.value}
                size={state.size}
                bgColor={state.bgColor}
                fgColor={state.fgColor}
                level={state.level}
                includeMargin={false}
                imageSettings={imageSettings}
              />
            </div>

            {/* Visible Canvas */}
            <div
              ref={canvasRef}
              className="bg-white shadow-[0_0_15px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-none transition-all duration-300 transform group-hover:scale-[1.02]"
              style={{
                backgroundColor: state.bgColor,
                padding: `${displayPadding}px`,
                borderRadius: `${displayBorderRadius}px`,
              }}
            >
              <QRCodeCanvas
                value={state.value}
                size={displaySize}
                bgColor={state.bgColor}
                fgColor={state.fgColor}
                level={state.level}
                includeMargin={false}
                imageSettings={imageSettings ? {
                  ...imageSettings,
                  height: displaySize * (state.logoSize / 100),
                  width: displaySize * (state.logoSize / 100),
                } : undefined}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '300px'
                }}
              />
            </div>

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full shadow-md"
                onClick={copyToClipboard}
                title="Copy Content"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-48 h-48 mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
              <span className="text-gray-400 block p-4 text-sm font-medium">
                Enter text or URL to generate QR Code
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
        <Button
          className="flex-1"
          disabled={!hasValue}
          onClick={handleDownloadPNG}
        >
          <Download className="w-4 h-4 mr-2" />
          Download PNG
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          disabled={!hasValue}
          onClick={handleDownloadSVG}
        >
          <Download className="w-4 h-4 mr-2" />
          Download SVG
        </Button>
      </div>
    </Card>
  );
}
