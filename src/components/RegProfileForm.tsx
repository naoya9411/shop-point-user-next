import { useState, useCallback } from "react";
import axios from "axios";
import prefectures from "../../public/prefectures.json";
import { Alert } from "./Alert";

export const RegProfileForm = () => {
  const [firstName, setFirstName] = useState(""); // 姓
  const [lastName, setLastName] = useState(""); // 名
  const [birthYear, setBirthYear] = useState(0); // 誕生年
  const [birthMonth, setBirthMonth] = useState(1); // 誕生月
  const [birthDate, setBirthDate] = useState(1); // 誕生日
  const [prefecture, setPrefecture] = useState(prefectures.prefectures[0].name); // 都道府県
  const [city, setCity] = useState(""); // 市区町村
  const [hearFrom, setHearFrom] = useState(""); // 来店きっかけ
  const [introduced, setIntroduced] = useState(""); // 紹介者
  const [phoneNum, setPhoneNum] = useState(""); // 電話番号
  const [alert, setAlert] = useState({ err: false, text: "" }); // アラートオブジェクト

  const firstNameChange = useCallback((event) => {
    setFirstName(event.target.value);
  }, []);

  const lastNameChange = useCallback((event) => {
    setLastName(event.target.value);
  }, []);

  const birthYearChange = useCallback((event) => {
    setBirthYear(event.target.value);
  }, []);

  const birthMonthChange = useCallback((event) => {
    setBirthMonth(event.target.value);
  }, []);

  const birthDateChange = useCallback((event) => {
    setBirthDate(event.target.value);
  }, []);

  const prefectureChange = useCallback((event) => {
    setPrefecture(event.target.value);
  }, []);

  const cityChange = useCallback((event) => {
    setCity(event.target.value);
  }, []);

  const hearFromChange = useCallback((event) => {
    setHearFrom(event.target.value);
  }, []);

  const introducedChange = useCallback((event) => {
    setIntroduced(event.target.value);
  }, []);

  const phoneNumChange = useCallback((event) => {
    setPhoneNum(event.target.value);
  }, []);

  // 登録処理
  const regProfile = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        // profile作成
        "https://api.mahjong-wins.com/api/v1/user/profile/",
        {
          first_name: firstName,
          last_name: lastName,
          birth_date: `${birthYear}-${birthMonth}-${birthDate}`,
          address_prefecture: prefecture,
          address_city: city,
          hear_from: hearFrom,
          introduced: introduced,
          phone_number: phoneNum,
        },
        {
          headers: { Authorization: `JWT ${localStorage.getItem("access")}` },
        }
      );
      await axios.post(
        "https://api.mahjong-wins.com/api/v1/user/info/",
        {},
        {
          headers: { Authorization: `JWT ${localStorage.getItem("access")}` },
        }
      );
      window.location.href = "/mypage";
    } catch (e) {
      switch (e.response.status) {
        case 400:
          console.log("bad request");
          setAlert({
            ...alert,
            err: true,
            text: "入力内容に誤りがあります",
          });
          break;
        case 401:
          window.location.href = "/";
          break;
      }
    }
  };

  // 生年月日項目作成
  const yearList: number[] = [];
  const monthList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const dateList: number[] = [];
  const lastDay = new Date(birthYear, birthMonth, 0).getDate();
  const nowYear = new Date().getFullYear();
  for (let i = nowYear - 120; i <= nowYear; i++) {
    yearList.push(i);
  }
  for (let i = 1; i <= lastDay; i++) {
    dateList.push(i);
  }
  const yearItem = yearList.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));
  const monthItem = monthList.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));
  const dateItem = dateList.map((item) => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  // 都道府県項目作成
  const prefectureItem = prefectures.prefectures.map((item) => (
    <option key={item.code} value={item.name}>
      {item.name}
    </option>
  ));

  // ご紹介のきっかけラジオボタン項目
  const hearFromList = ["facebook", "twitter", "HP", "紹介", "その他"];
  const hearFromItem = hearFromList.map((item) => {
    return (
      <label key={item}>
        <input
          type="radio"
          value={item}
          onChange={hearFromChange}
          checked={hearFrom === item ? true : false}
          className="mt-3 mr-1"
        />
        <span className="mr-4">{item}</span>
      </label>
    );
  });

  return (
    <div className="flex flex-col justify-center lg:h-4/5 items-center px-3 py-14 divide-y divide-gray-200">
      {alert.err && <Alert text={alert.text} />}
      <form className="block px-8 md:px-0">
        <h1 className="font-medium text-3xl mb-6 md:mb-12 text-center tracking-widest">
          お客様情報
        </h1>
        <div className="my-7">
          <label>
            お客様名<span className="text-red-500">*</span>
          </label>
          <div className="flex justify-between">
            <input
              type="text"
              value={lastName}
              onChange={lastNameChange}
              className="w-1/2 rounded-sm px-4 py-2 mt-3 bg-gray-100 border border-gray-300"
              placeholder="姓"
            />
            <input
              value={firstName}
              onChange={firstNameChange}
              className="w-1/2 ml-1 rounded-sm px-4 py-2 mt-3 bg-gray-100 border border-gray-300"
              placeholder="名"
            />
          </div>
        </div>
        <div>
          <label>
            生年月日<span className="text-red-500">*</span>
          </label>
          <div className="mb-7 flex justify-between">
            <div className="inline-block w-1/3">
              <label className="text-sm">年</label>
              <select
                value={birthYear}
                onChange={birthYearChange}
                className="rounded-sm px-4 py-2 mt-3 bg-gray-100 w-full border border-gray-300"
              >
                {yearItem}
              </select>
            </div>
            <div className="inline-block w-1/4">
              <label className="text-sm">月</label>
              <select
                value={birthMonth}
                onChange={birthMonthChange}
                className="rounded-sm px-4 py-2 mt-3 bg-gray-100 w-full border border-gray-300"
              >
                {monthItem}
              </select>
            </div>
            <div className="inline-block w-1/4">
              <label className="text-sm">日</label>
              <select
                value={birthDate}
                onChange={birthDateChange}
                className="rounded-sm px-4 py-2 mt-3 bg-gray-100 w-full border border-gray-300"
              >
                {dateItem}
              </select>
            </div>
          </div>
        </div>
        <div>
          <label>
            お住まい<span className="text-red-500">*</span>
          </label>
          <div className="mb-7 flex justify-between">
            <div className="inline-block w-2/5">
              <select
                value={prefecture}
                onChange={prefectureChange}
                className="rounded-sm px-4 py-2 mt-3 bg-gray-100 w-full border border-gray-300"
              >
                {prefectureItem}
              </select>
            </div>
            <div className="inline-block w-1/2 ml-1">
              <input
                value={city}
                onChange={cityChange}
                className="rounded-sm px-4 py-2 mt-3 bg-gray-100 w-full border border-gray-300"
                placeholder="市区町村"
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            ご来店のきっかけ<span className="text-red-500">*</span>
          </div>
          <div className="mb-7 text-md flex flex-wrap md:justify-between">
            {hearFromItem}
          </div>
        </div>
        <div className="my-7 text-md">
          <label>ご紹介者様</label>
          <input
            type="text"
            value={introduced}
            onChange={introducedChange}
            className="rounded-sm px-4 py-2 mt-3  bg-gray-100 w-full border border-gray-300"
            placeholder="麻雀　太郎"
          />
        </div>
        <div className="my-7 text-md">
          <label>
            お電話番号<span className="text-red-500">*</span>
            <span className="text-gray-600">（ハイフンなし）</span>
          </label>
          <input
            type="text"
            value={phoneNum}
            onChange={phoneNumChange}
            className="rounded-sm px-4 py-2 mt-3  bg-gray-100 w-full border border-gray-300"
            placeholder="09012345678"
          />
        </div>
        <button
          onClick={regProfile}
          className="block bg-green-700 text-white mt-9 p-3 duration-300 rounded-sm hover:bg-green-600 w-full"
        >
          登録
        </button>
      </form>
    </div>
  );
};
