import { useState } from 'react'
import { Tabs } from '../../components/Tabs'

const threeTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'history', label: 'History' },
]

const fiveTabs = [
  { id: 'one', label: 'Tab One' },
  { id: 'two', label: 'Tab Two' },
  { id: 'three', label: 'Tab Three' },
  { id: 'four', label: 'Tab Four' },
  { id: 'five', label: 'Tab Five' },
]

export default function TabsPage() {
  const [underlineThree, setUnderlineThree] = useState('overview')
  const [underlineFive, setUnderlineFive] = useState('one')
  const [tableThree, setTableThree] = useState('overview')
  const [tableFive, setTableFive] = useState('one')
  const [pillThree, setPillThree] = useState('overview')
  const [pillFive, setPillFive] = useState('one')

  return (
    <div>
      <h1 className="accu-text-display-sm font-bold mb-6">Tabs</h1>
      <div className="grid gap-8">
        <section>
          <h2 className="accu-text-display-sm font-bold mb-3">Tabbed Cards - 3 Tabs</h2>
          <Tabs items={threeTabs} activeId={underlineThree} onChange={setUnderlineThree} variant="underline" />
        </section>

        <section>
          <h2 className="accu-text-display-sm font-bold mb-3">Tabbed Cards - 5 Tabs</h2>
          <Tabs items={fiveTabs} activeId={underlineFive} onChange={setUnderlineFive} variant="underline" />
        </section>

        <section>
          <h2 className="accu-text-display-sm font-bold mb-3">Table Tabs - 3 Tabs</h2>
          <Tabs items={threeTabs} activeId={tableThree} onChange={setTableThree} variant="table" />
        </section>

        <section>
          <h2 className="accu-text-display-sm font-bold mb-3">Table Tabs - 5 Tabs</h2>
          <Tabs items={fiveTabs} activeId={tableFive} onChange={setTableFive} variant="table" />
        </section>

        <section>
          <h2 className="accu-text-display-sm font-bold mb-3">Pill Navigation - 3 Tabs</h2>
          <Tabs items={threeTabs} activeId={pillThree} onChange={setPillThree} variant="pill" />
        </section>

        <section>
          <h2 className="accu-text-display-sm font-bold mb-3">Pill Navigation - 5 Tabs</h2>
          <Tabs items={fiveTabs} activeId={pillFive} onChange={setPillFive} variant="pill" />
        </section>
      </div>
    </div>
  )
}
