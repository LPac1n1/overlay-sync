import { AnimatePresence } from "framer-motion";

import AccountSection from "./sections/AccountSection";
import AppearanceSection from "./sections/AppearanceSection";
import PasswordSection from "./sections/PasswordSection";
import OverlaysSection from "./sections/OverlaysSection";

function AccountMain({ selectedSection }) {
  const renderSection = () => {
    switch (selectedSection) {
      case "account":
        return <AccountSection key="account" />;
      case "appearance":
        return <AppearanceSection key="appearance" />;
      case "password":
        return <PasswordSection key="password" />;
      case "overlays":
        return <OverlaysSection key="overlays" />;
    }
  };

  return (
    <main className="w-full h-full text-zinc-300">
      <AnimatePresence mode="wait">{renderSection()}</AnimatePresence>
    </main>
  );
}

export default AccountMain;
