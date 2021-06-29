import React from "react";
import { useQRCode } from "react-qrcodes";

const QrCodeImage = () => {
  const [inputRef] = useQRCode({
    text: localStorage.getItem("infoId"),
    options: {
      level: "H",
      margin: 3,
      scale: 1,
      width: 200,
    },
  });

  return <canvas ref={inputRef} className="mt-8" />;
};

export default QrCodeImage;
