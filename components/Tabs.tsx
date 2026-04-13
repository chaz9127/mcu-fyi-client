"use client";

type Tab = {
  title: string;
  value: string;
  active: boolean;
  setTab: () => void;
};

type TabsProps = {
  tabs: Tab[];
};

export default function Tabs({ tabs }: TabsProps) {
  return (
    <div className="mb-4 flex">
      {tabs.map((tab, idx) => (
        <div
          key={idx}
          onClick={tab.setTab}
          className={[
            "flex-1 cursor-pointer border-b-2 py-3 text-center font-bold",
            tab.active ? "border-mcu-red/70" : "border-white/10",
          ].join(" ")}
        >
          {tab.title}
        </div>
      ))}
    </div>
  );
}
