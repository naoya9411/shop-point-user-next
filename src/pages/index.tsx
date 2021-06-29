import { LayoutLogin } from "../components/LayoutLogin";
import { SignIn } from "../components/SignIn";

export default function Home() {
  return (
    <LayoutLogin>
      <SignIn />
    </LayoutLogin>
  );
}
