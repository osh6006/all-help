import { create } from "zustand";

interface VariantState {
  variant: "LOGIN" | "REGISTER";
  toggleVariant: () => void;
}

// 사용법 1 create 함수를 이용하여 스토어를 생성
const useVariant = create<VariantState>(set => ({
  variant: "LOGIN",
  toggleVariant: () =>
    set(state => ({
      variant: (state.variant === "LOGIN" && "REGISTER") || "LOGIN",
    })),
}));

export default useVariant;
