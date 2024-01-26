"use client";

import { useEffect } from "react";
import tocbot from "tocbot";

export function Toc() {
  useEffect(() => {
    tocbot.init({
      tocSelector: ".js-toc",
      contentSelector: ".js-toc-content",
      headingSelector: "h2",
      orderedList: false,
    });
    return () => tocbot.destroy();
  }, []);

  return (
    <div className="pt-12 pb-2">
      <strong>Table des matières</strong>
      <div className="js-toc"></div>
    </div>
  );
}
