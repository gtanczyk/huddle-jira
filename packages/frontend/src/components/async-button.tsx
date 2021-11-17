import React, { useState } from "react";
import { LoadingButton } from "@atlaskit/button";
import { ButtonProps } from "@atlaskit/button/dist/types/button";

export default function AsyncButton({
  onClick,
  children,
  ...props
}: ButtonProps & {
  onClick: () => Promise<void>;
  children?: React.ReactNode | React.ReactNode[] | null;
}) {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingButton
      {...props}
      isLoading={isLoading}
      isDisabled={isLoading}
      onClick={async () => {
        try {
          setLoading(true);
          await onClick();
        } finally {
          setLoading(false);
        }
      }}
    >
      {children}
    </LoadingButton>
  );
}
