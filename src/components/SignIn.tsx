import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import { Alert } from "./Alert";

export const SignIn = () => {
  useEffect(() => {
    if (localStorage.getItem("access")) {
      window.location.href = "/mypage";
    }
  });

  const url = process.env.URL ? process.env.URL : "http://localhost:8080";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ err: false, text: "" }); // アラートオブジェクト

  const emailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const pwChange = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const login = async (event) => {
    event.preventDefault();

    if (localStorage.getItem("access")) {
      window.location.href = "/mypage";
    }

    try {
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
      window.location.href = "/mypage";
    } catch {
      setAlert({
        ...alert,
        err: true,
        text: "メールアドレス or パスワードに誤りがあります",
      });
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-3/4 lg:h-2/3 p-4 divide-y divide-gray-200"
      style={{ height: "40rem" }}
    >
      {alert.err && <Alert text={alert.text} />}
      <form className="block px-8 md:px-0">
        <h1 className="font-medium text-3xl mb-6 md:mb-12 text-center tracking-widest">
          ログイン
        </h1>
        <div className="my-7 text-md">
          <label>メールアドレス</label>
          <input
            type="text"
            value={email}
            onChange={emailChange}
            className="rounded-sm px-4 py-2 mt-3 bg-gray-100 w-full border border-gray-300"
            placeholder="Email"
          />
        </div>
        <div className="my-7 text-md">
          <label>パスワード</label>
          <input
            type="password"
            value={password}
            onChange={pwChange}
            className="rounded-sm px-4 py-2 mt-3 bg-gray-100 w-full border border-gray-300"
            placeholder="Password"
          />
        </div>
        <button
          onClick={login}
          className="block bg-green-700 text-white mt-9 p-3 duration-300 rounded-sm hover:bg-green-600 w-full"
        >
          ログイン
        </button>
      </form>
      <div className="text-center w-4/5 md:w-1/4 mt-4 py-2">
        <span>まだ登録されてない方</span>
        <Link href="/sign-up">
          <a className="inline-block ml-2 text-green-600 hover:text-green-500">
            新規登録
          </a>
        </Link>
      </div>
    </div>
  );
};
