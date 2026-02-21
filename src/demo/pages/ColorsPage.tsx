import { colors } from '../../tokens/colors'

type ColorRecord = Record<string, string>

type ColorSectionProps = {
  title: string
  tokens: ColorRecord
}

function ColorSection({ title, tokens }: ColorSectionProps) {
  return (
    <section className="mb-10">
      <h2 className="text-display-sm font-bold mb-4">{title}</h2>
      <div className="flex flex-wrap gap-4">
        {Object.entries(tokens).map(([name, value]) => (
          <div key={name} className="w-24">
            <div
              className="mb-2 h-20 w-20"
              style={{
                backgroundColor: value,
                borderRadius: 'var(--accu-radius-md)',
                border: '1px solid var(--accu-gray-2)',
              }}
            />
            <p className="text-body-sm font-bold">{name}</p>
            <p className="text-body-sm font-regular" style={{ color: 'var(--accu-gray-5)' }}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function ColorsPage() {
  return (
    <div>
      <h1 className="text-display-sm font-bold mb-6">Colors</h1>
      <ColorSection title="Primary" tokens={colors.primary} />
      <ColorSection title="Grays" tokens={colors.gray} />
      <ColorSection title="Secondary" tokens={colors.secondary} />
      <ColorSection title="Light Tints" tokens={colors.light} />
      <ColorSection title="Logo" tokens={colors.logo} />
      <ColorSection title="Button States" tokens={colors.button} />
      <ColorSection title="Form" tokens={colors.form} />
    </div>
  )
}
