import React from "react";
import "./Footer.css";

function Footer() {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div
      className="footer"
      onClick={() => openInNewTab("https://forms.gle/9RwVaNkyZouSxF336")}
    >
      Made by the Woof team. Click this text to submit feedback/bugs, thanks!
    </div>
  );
}

export default Footer;
