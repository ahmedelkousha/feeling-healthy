"use client";

import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Eraser, PenTool, Type } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SignaturePadProps {
  onSignatureChange: (dataUrl: string, type: "draw" | "type", typedName: string) => void;
  defaultName?: string;
}

const MODES = [
  { key: "draw", label: "Draw", icon: PenTool },
  { key: "type", label: "Type Name", icon: Type },
] as const;

export function SignaturePad({ onSignatureChange, defaultName = "" }: SignaturePadProps) {
  const [mode, setMode] = useState<"draw" | "type">("draw");
  const [typedName, setTypedName] = useState(defaultName);
  const sigCanvasRef = useRef<SignatureCanvas | null>(null);
  const [hasDrawn, setHasDrawn] = useState(false);

  const emitDrawState = () => {
    if (sigCanvasRef.current && !sigCanvasRef.current.isEmpty()) {
      setHasDrawn(true);
      const dataUrl = sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png");
      onSignatureChange(dataUrl, "draw", typedName);
    } else {
      onSignatureChange("", "draw", typedName);
    }
  };

  const clearCanvas = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
    }
    setHasDrawn(false);
    onSignatureChange("", "draw", typedName);
  };

  const handleTypedChange = (val: string) => {
    setTypedName(val);
    onSignatureChange("", "type", val);
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <label className="text-sm font-semibold text-foreground">
          Digital Signature <span className="text-destructive">*</span>
        </label>
        <div className="flex items-center gap-1 rounded-lg bg-muted p-1 text-xs">
          {MODES.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setMode(key);
                if (key === "draw") {
                  emitDrawState();
                } else {
                  onSignatureChange("", "type", typedName);
                }
              }}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 font-medium transition-all ${
                mode === key
                  ? "bg-white text-foreground shadow-xs dark:bg-zinc-800"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="size-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {mode === "draw" ? (
        <div className="relative">
          <SignatureCanvas
            ref={sigCanvasRef}
            penColor="#1e293b"
            velocityFilterWeight={0.7}
            minWidth={1.2}
            maxWidth={3.2}
            onEnd={emitDrawState}
            canvasProps={{
              className:
                "h-32 w-full touch-none rounded-lg border border-dashed border-input bg-white cursor-crosshair dark:bg-zinc-950",
            }}
          />
          <div className="pointer-events-none absolute bottom-3 left-4 text-xs text-muted-foreground">
            {hasDrawn ? "Signature recorded" : "Sign above using mouse or touch"}
          </div>
          {hasDrawn && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={clearCanvas}
              className="absolute right-3 bottom-3 h-7 gap-1 text-xs"
            >
              <Eraser className="size-3.5" />
              Clear
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <input
            type="text"
            value={typedName}
            onChange={(e) => handleTypedChange(e.target.value)}
            placeholder="Type your full legal name here"
            className="w-full rounded-md border border-input bg-background px-3.5 py-2 text-sm focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none"
          />
          {typedName && (
            <div className="rounded-lg border border-border bg-amber-50/50 p-4 text-center dark:bg-zinc-900">
              <span className="text-xs text-muted-foreground block mb-1">Preview Signature:</span>
              <span className="script-accent text-3xl text-ink font-bold tracking-wide italic font-serif">
                {typedName}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
