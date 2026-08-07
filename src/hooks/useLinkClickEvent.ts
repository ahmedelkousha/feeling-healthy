"use client";

import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";

/**
 * Custom hook that returns a navigation handler for links.
 * If the link points to the current active route, it scrolls smoothly to the top of the page.
 * Otherwise, it navigates to the new route, executing an optional close/exit animation callback first.
 */
export function useLinkClickEvent() {
  const pathname = usePathname();
  const router = useRouter();

  return (e: MouseEvent<any>, href: string, handleClose?: (callback?: () => void) => void) => {
    e.preventDefault();

    const navigate = () => {
      const currentPath = (pathname || "/").split("?")[0].split("#")[0] || "/";
      const targetPath = (href || "/").split("?")[0].split("#")[0] || "/";

      if (currentPath === targetPath) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setTimeout(() => {
          
          router.push(href);
        }, 50);
      }
    };

    if (handleClose) {
      handleClose(navigate);
    } else {
      navigate();
    }
  };
}
