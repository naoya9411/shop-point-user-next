import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import axios from "axios";
import dynamic from "next/dynamic";

export const MyPage = () => {
  const [ownPoint, setOwnPoint] = useState("");
  const [userName, setUserName] = useState("");
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const getPoint = async () => {
      try {
        const res = await axios.get(
          "https://api.mahjong-wins.com/api/v1/user/info/",
          {
            headers: { Authorization: `JWT ${localStorage.getItem("access")}` },
          }
        );
        if (res.data[0]) {
          setOwnPoint(res.data[0].point);
          localStorage.setItem("infoId", res.data[0].id);
        } else {
          window.location.href = "/reg-profile";
        }
      } catch {
        if (localStorage.getItem("access")) {
          localStorage.removeItem("access");
        }
        window.location.href = "/";
      }
    };

    const getUserName = async () => {
      try {
        await axios
          .get("https://api.mahjong-wins.com/api/v1/user/profile/", {
            headers: { Authorization: `JWT ${localStorage.getItem("access")}` },
          })
          .then((res) =>
            res.data[0]
              ? setUserName(`${res.data[0].last_name}${res.data[0].first_name}`)
              : (window.location.href = "/reg-profile")
          );
      } catch {
        if (localStorage.getItem("access")) {
          localStorage.removeItem("access");
        }
        window.location.href = "/";
      }
    };

    getPoint();
    getUserName();
  });

  const QrCodeCreate = dynamic(() => import("../components/QrCodeImage"), {
    ssr: false,
  });

  const openQR = useCallback((event) => {
    event.preventDefault();
    setIsShow((isShow) => !isShow);
  }, []);

  return (
    <div className="text-center flex items-center justify-center flex-col p-4">
      <p className="text-lg font-bold text-gray-700 mb-10 w-full text-left pl-2 bg-gradient-to-r from-gray-300">
        {userName} 様
      </p>

      <div className="rounded-full h-64 w-64 flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-green-100">
        <div className="rounded-full h-56 w-56  flex flex-col items-center justify-center bg-white">
          <p className="text-2xl font-bold text-green-600 mb-5">
            WIN'Sポイント
          </p>
          <p className="text-5xl font-bold text-yellow-500">
            <span className="animate-pulse">{ownPoint}</span>{" "}
            <span className="text-xl">pt</span>
          </p>
        </div>
      </div>
      <div>
        {isShow && <QrCodeCreate />}
        <button
          onClick={openQR}
          className="bg-green-700 text-white p-2 mt-8 duration-300 rounded-md hover:bg-green-600 text-md"
        >
          {!isShow ? "QRコードを表示" : "閉じる"}
        </button>
      </div>
    </div>
  );
};
