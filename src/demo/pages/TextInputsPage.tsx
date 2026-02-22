import { TextInput } from '../../components/TextInput'

export default function TextInputsPage() {
  return (
    <div>
      <h1 className="accu-text-display-sm font-bold mb-6">Text Inputs</h1>
      <div className="grid max-w-3xl gap-4">
        <TextInput label="Empty" placeholder="Type here..." />
        <TextInput label="Populated" value="Sample value" readOnly />
        <TextInput label="Required (empty)" required />
        <TextInput label="Error state" error="This field has an error." />
        <TextInput label="Focused" defaultValue="Focus demo" autoFocus />
        <TextInput label="Disabled" value="Disabled value" disabled readOnly />
        <TextInput label="Multiline" multiline rows={4} defaultValue="This is a multiline field." />
      </div>
    </div>
  )
}
