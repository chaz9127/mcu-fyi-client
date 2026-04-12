'use client'

type Tab = {
  title: string
  value: string
  active: boolean
  setTab: () => void
}

type TabsProps = {
  tabs: Tab[]
}

export default function Tabs({ tabs }: TabsProps) {
  return (
    <div className="flex mb-4">
      {tabs.map((tab, idx) => (
        <div
          key={idx}
          onClick={tab.setTab}
          className={[
            'flex-1 text-center py-3 cursor-pointer border-b-2 font-bold text-white',
            tab.active ? 'border-mcu-red/70' : 'border-white/10',
          ].join(' ')}
        >
          {tab.title}
        </div>
      ))}
    </div>
  )
}
