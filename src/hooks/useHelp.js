import { useState } from "react";

import { help } from "@/lib/help";

export function useHelp() {
  const [isHelpDisplayed, setIsHelpDisplayed] = useState(false);
  const [helpData, setHelpData] = useState([]);

  const displayHelp = (fieldName) => {
    setHelpData(help[fieldName]);
    setIsHelpDisplayed(true);
  };

  const hideHelp = () => setIsHelpDisplayed(false);

  return {
    helpData,
    displayHelp,
    hideHelp,
    isHelpDisplayed,
  };
}
