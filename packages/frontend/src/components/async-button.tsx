import React, { useState } from "react";
import { LoadingButton } from "@atlaskit/button";
import { ButtonProps } from "@atlaskit/button/dist/types/button";

export default function AsyncButton({
  onClick,
  children,
  ...props
}: ButtonProps & {
  onClick: (event: React.MouseEvent<HTMLElement>) => Promise<void>;
  children?: React.ReactNode | React.ReactNode[] | null;
}) {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingButton
      {...props}
      isLoading={isLoading}
      isDisabled={isLoading || props.isDisabled}
      onClick={async (event) => {
        try {
          setLoading(true);
          await onClick(event);
        } finally {
          setLoading(false);
        }
      }}
    >
      {children}
    </LoadingButton>
  );
}
