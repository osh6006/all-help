import AuthForm from "./components/AuthForm";
import SignInHeader from "./components/SignInHeader";

export default function SignIn() {
  return (
    <div
      className="
        flex 
        min-h-full flex-col
        justify-center 
        bg-gray-100 
        py-12 
        sm:px-6 
        lg:px-8"
    >
      <SignInHeader />
      <AuthForm />
    </div>
  );
}
