import { ProgressBar, ProgressSteps } from '../../components/ProgressBar'

export default function ProgressPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-display-sm font-bold">Progress</h1>
        <p className="text-body-md text-[var(--accu-gray-5)]">Horizontal progress bars and step meter variants.</p>
      </div>

      <section className="space-y-4 rounded-[var(--accu-radius-md)] border border-[var(--accu-gray-2)] bg-[var(--accu-white)] p-[var(--accu-space-6)]">
        <h2 className="text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Progress Bar</h2>
        <ProgressBar value={0} color="blue" />
        <ProgressBar value={33} color="green" />
        <ProgressBar value={66} color="red" />
        <ProgressBar value={100} color="gray" />
      </section>

      <section className="space-y-4 rounded-[var(--accu-radius-md)] border border-[var(--accu-gray-2)] bg-[var(--accu-white)] p-[var(--accu-space-6)]">
        <h2 className="text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Progress Steps</h2>
        <ProgressSteps steps={['Scheduled', 'In Progress', 'Completed']} currentStep={2} />
        <ProgressSteps steps={['New', 'Inspected', 'Estimate', 'Closed']} currentStep={3} />
      </section>
    </div>
  )
}
