import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Alert } from "./Alert";

export const SignUp = () => {
  const url = process.env.URL ? process.env.URL : "http://localhost:8080";

  const [email, setEmail] = useState(""); // メールアドレス
  const [password, setPassword] = useState(""); // パスワード
  const [checkPw, setCheckPw] = useState(""); // 確認用パスワード
  const [alert, setAlert] = useState({ err: false, text: "" }); // アラートオブジェクト

  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const pwChange = (event) => {
    setPassword(event.target.value);
  };

  const checkPwChange = (event) => {
    setCheckPw(event.target.value);

  // 登録処理
  const signup = async (event) => {
    event.preventDefault();
    const validEmail =
      /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    if (validEmail.test(email)) {
      // email正規表現チェック
      if (password.length >= 6) {
        // パスワード長チェック
        if (password === checkPw) {
          // パスワード一致チェック
          try {
            await axios.post(
              `${url}/api/v1/user/create/`,
              {
                email: email,
                password: password,
              },
              {
                headers: { "Content-Type": "application/json" },
              }
            );
            const token = await axios.post(
              `${url}/api/v1/auth/jwt/create`,
              {
                email: email,
                password: password,
              },
              {
                headers: { "Content-Type": "application/json" },
              }
            );
            localStorage.setItem("access", token.data.access);
            window.location.href = "/reg-profile";
          } catch {
            setAlert({
              ...alert,
              err: true,
              text: "このメールアドレスは既に使われています",
            });
          }
        } else {
          setAlert({
            ...alert,
            err: true,
            text: "確認用パスワードが一致しません",
          });
        }
      } else {
        setAlert({
          ...alert,
          err: true,
          text: "パスワードは半角英数字６文字以上です",
        });
      }
    } else {
      setAlert({
        ...alert,
        err: true,
        text: "メールアドレスの形式が正しくありません",
      });
    }
  };
  return (
    <div className="flex flex-col justify-center lg:h-4/5 items-center px-4 py-14 divide-y divide-gray-200">
      {alert.err && <Alert text={alert.text} />}
      <form className="block px-8 pt-8 md:px-0">
        <h1 className="font-medium text-3xl mb-6 md:mb-12 text-center tracking-widest">
          新規登録
        </h1>
        <div className="my-7 text-md">
          <label>メールアドレス</label>
          <input
            type="text"
            value={email}
            onChange={emailChange}
            className="rounded-sm px-4 py-2 mt-3  bg-gray-100 w-full border border-gray-300"
            placeholder="Email"
          />
        </div>
        <div className="my-7 text-md">
          <label>パスワード</label>
          <input
            type="password"
            value={password}
            onChange={pwChange}
            className="rounded-sm px-4 py-2 mt-3  bg-gray-100 w-full border border-gray-300"
            placeholder="英数字６文字以上"
          />
        </div>
        <div className="my-7 text-md">
          <label>パスワードの確認</label>
          <input
            type="password"
            value={checkPw}
            onChange={checkPwChange}
            className="rounded-sm px-4 py-2 mt-3  bg-gray-100 w-full border border-gray-300"
            placeholder=""
          />
        </div>
        <button
          onClick={signup}
          className="block bg-green-700 text-white mt-9 p-3 duration-300 rounded-sm hover:bg-green-600 w-full"
        >
          登録
        </button>
      </form>
      <div className="text-center w-4/5 md:w-1/4 mt-4 py-2">
        <span>既にアカウントをお持ちの方</span>
        <Link href="/">
          <a className="inline-block ml-2 text-green-600 hover:text-green-500">
            ログイン
          </a>
        </Link>
      </div>
    </div>
  );
};
