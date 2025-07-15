import { useState } from "react";
import "./App.css";
import { Caret } from "./components/ui/Caret";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function App() {
  const [bubbleState, setBubbleState] = useState<
    "hidden" | "icon" | "suggesting"
  >("hidden");

  return (
    <>
      <div className="flex flex-col justify-center items-start h-screen gap-4">
        <div className="flex items-end gap-2">
          <span className="text-md">Hello world, </span>
          <Caret bubbleState={bubbleState} />
        </div>
        <div className="flex items-start gap-2">
          <Tabs
            value={bubbleState}
            onValueChange={(value) =>
              setBubbleState(value as "hidden" | "icon" | "suggesting")
            }
            className="w-[400px]"
          >
            <TabsList>
              <TabsTrigger value="hidden">Hidden</TabsTrigger>
              <TabsTrigger value="icon">Icon</TabsTrigger>
              <TabsTrigger value="suggesting">Suggesting</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default App;
