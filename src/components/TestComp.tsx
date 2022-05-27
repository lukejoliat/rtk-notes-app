import { useConst } from "@chakra-ui/react";
import { useState } from "react";
import { useCallbackRef } from "../hooks/useConst";

const TestComp = ({ callback }: { callback: any }) => {
  const [val, setVal] = useState("tst");
  const ref = useCallbackRef(callback, [val]);

  return <div>{ref()}</div>;
};

export { TestComp };
