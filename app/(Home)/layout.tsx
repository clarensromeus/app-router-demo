import React, { Children } from "react";

type Props<RN> = {
  children: RN;
  delete: RN;
  edit: RN;
};

export default function layout(props: Props<React.ReactNode>) {
  return (
    <>
      <div>{props.children}</div>
      <div>{props.delete}</div>
      <div>{props.edit}</div>
    </>
  );
}
