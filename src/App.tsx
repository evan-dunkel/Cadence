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
      <div className="flex flex-col justify-between items-start h-screen">
        <div className="flex-1 flex flex-col justify-center gap-4 pl-12 py-8">
          <div className="flex items-end gap-0.5">
            <span className="text-6xl font-light text-stone-800">
              Hello world{" "}
            </span>
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
        <div className="self-start pl-6 pb-4">
          <span className="text-sm text-stone-500">
            Created by Evan Dunkel. Proof of concept UX for{" "}
            <a
              className="underline"
              href="https://evandunkel.com/cadence"
              target="_blank"
            >
              Cadence
            </a>
            .
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
