import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useIsUser = () => {
  const session = useSession();
  const router = useRouter();
};
export default useIsUser;
