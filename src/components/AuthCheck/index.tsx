import { ComponentType } from "react";
import { useUserStore } from "../../store";
import { Login } from "../../pages";

interface Props<T> {
  WrappedComponent: ComponentType<T>;
}

export const AuthCheck = <T extends object>({
  WrappedComponent,
  ...props
}: Props<T> & T) => {
  const { user } = useUserStore();

  if (user) {
    return <WrappedComponent {...(props as T)} />;
  } else {
    return <Login />;
  }
};
