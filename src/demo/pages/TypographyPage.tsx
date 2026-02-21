import { typography } from '../../tokens/typography'

const sampleText = 'The quick brown fox jumps over the lazy dog'

type WeightEntry = {
  label: string
  weight: number
}

type ScaleSpecimen = {
  name: string
  fontSize: string
  lineHeight: string
  weights: WeightEntry[]
}

function Specimen({
  label,
  fontSize,
  lineHeight,
  weight,
  fontStyle,
  textTransform,
}: {
  label: string
  fontSize: string
  lineHeight: string
  weight: number
  fontStyle?: 'italic'
  textTransform?: 'uppercase'
}) {
  return (
    <article className="mb-6">
      <p className="text-body-sm font-bold mb-2">{label}</p>
      <p
        style={{
          fontFamily: typography.fontFamily,
          fontSize,
          lineHeight,
          fontWeight: weight,
          fontStyle,
          textTransform,
        }}
      >
        {sampleText}
      </p>
      <p className="text-body-sm font-regular mt-1" style={{ color: 'var(--accu-gray-4)' }}>
        {`Roboto / ${fontSize} / line-height ${lineHeight} / weight ${weight}`}
      </p>
    </article>
  )
}

function ScaleSection({ title, specimens, prefix }: { title: string; specimens: ScaleSpecimen[]; prefix: string }) {
  return (
    <section className="mb-10">
      <h2 className="text-display-sm font-bold mb-4">{title}</h2>
      {specimens.flatMap((specimen) =>
        specimen.weights.map((entry) => (
          <Specimen
            key={`${specimen.name}-${entry.label}`}
            label={`${prefix} / ${specimen.name} / ${entry.label} ${entry.weight}`}
            fontSize={specimen.fontSize}
            lineHeight={specimen.lineHeight}
            weight={entry.weight}
          />
        )),
      )}
    </section>
  )
}

export default function TypographyPage() {
  const displaySpecimens: ScaleSpecimen[] = [
    {
      name: 'Large',
      fontSize: typography.display.large.fontSize,
      lineHeight: typography.display.large.lineHeight,
      weights: [
        { label: 'Light', weight: typography.display.large.weights.light },
        { label: 'Normal', weight: typography.display.large.weights.normal },
        { label: 'Bold', weight: typography.display.large.weights.bold },
      ],
    },
    {
      name: 'Medium',
      fontSize: typography.display.medium.fontSize,
      lineHeight: typography.display.medium.lineHeight,
      weights: [
        { label: 'Light', weight: typography.display.medium.weights.light },
        { label: 'Normal', weight: typography.display.medium.weights.normal },
        { label: 'Bold', weight: typography.display.medium.weights.bold },
      ],
    },
    {
      name: 'Small',
      fontSize: typography.display.small.fontSize,
      lineHeight: typography.display.small.lineHeight,
      weights: [
        { label: 'Light', weight: typography.display.small.weights.light },
        { label: 'Normal', weight: typography.display.small.weights.normal },
        { label: 'Bold', weight: typography.display.small.weights.bold },
      ],
    },
  ]

  const bodySpecimens: ScaleSpecimen[] = [
    {
      name: 'Large',
      fontSize: typography.body.large.fontSize,
      lineHeight: typography.body.large.lineHeight,
      weights: [
        { label: 'Light', weight: typography.body.large.weights.light },
        { label: 'Normal', weight: typography.body.large.weights.normal },
        { label: 'Bold', weight: typography.body.large.weights.bold },
      ],
    },
    {
      name: 'Medium',
      fontSize: typography.body.medium.fontSize,
      lineHeight: typography.body.medium.lineHeight,
      weights: [
        { label: 'Light', weight: typography.body.medium.weights.light },
        { label: 'Normal', weight: typography.body.medium.weights.normal },
        { label: 'Bold', weight: typography.body.medium.weights.bold },
      ],
    },
    {
      name: 'Small',
      fontSize: typography.body.small.fontSize,
      lineHeight: typography.body.small.lineHeight,
      weights: [
        { label: 'Light', weight: typography.body.small.weights.light },
        { label: 'Normal', weight: typography.body.small.weights.normal },
        { label: 'Bold', weight: typography.body.small.weights.bold },
      ],
    },
  ]

  return (
    <div>
      <h1 className="text-display-sm font-bold mb-6">Typography</h1>

      <ScaleSection title="Display Scale" specimens={displaySpecimens} prefix="Display" />
      <ScaleSection title="Body Scale" specimens={bodySpecimens} prefix="Body" />

      <section className="mb-10">
        <h2 className="text-display-sm font-bold mb-4">Custom Styles</h2>

        <Specimen
          label="Custom / Modal Title / Thin 100"
          fontSize={typography.custom.modalTitle.fontSize}
          lineHeight={typography.custom.modalTitle.lineHeight}
          weight={typography.custom.modalTitle.fontWeight}
        />
        <Specimen
          label="Custom / Tabbed Card Label / Light 300"
          fontSize={typography.custom.tabbedCardLabel.fontSize}
          lineHeight={typography.custom.tabbedCardLabel.lineHeight}
          weight={typography.custom.tabbedCardLabel.fontWeight}
        />
        <Specimen
          label="Custom / Button Label / Regular 400"
          fontSize={typography.custom.buttonLabel.fontSize}
          lineHeight={typography.custom.buttonLabel.lineHeight}
          weight={typography.custom.buttonLabel.weights.regular}
        />
        <Specimen
          label="Custom / Button Label / Medium 500"
          fontSize={typography.custom.buttonLabel.fontSize}
          lineHeight={typography.custom.buttonLabel.lineHeight}
          weight={typography.custom.buttonLabel.weights.medium}
        />
        <Specimen
          label="Custom / Button Label / Bold 700"
          fontSize={typography.custom.buttonLabel.fontSize}
          lineHeight={typography.custom.buttonLabel.lineHeight}
          weight={typography.custom.buttonLabel.weights.bold}
        />
        <Specimen
          label="Custom / Breadcrumb Hover / Medium 500"
          fontSize={typography.custom.breadcrumbHover.fontSize}
          lineHeight={typography.custom.breadcrumbHover.lineHeight}
          weight={typography.custom.breadcrumbHover.fontWeight}
        />
        <Specimen
          label="Custom / All Caps Light / Light 300"
          fontSize={typography.custom.allCapsLight.fontSize}
          lineHeight={typography.custom.allCapsLight.lineHeight}
          weight={typography.custom.allCapsLight.fontWeight}
          textTransform={typography.custom.allCapsLight.textTransform}
        />
        <Specimen
          label="Custom / All Caps Regular / Regular 400"
          fontSize={typography.custom.allCapsRegular.fontSize}
          lineHeight={typography.custom.allCapsRegular.lineHeight}
          weight={typography.custom.allCapsRegular.fontWeight}
          textTransform={typography.custom.allCapsRegular.textTransform}
        />
        <Specimen
          label="Custom / All Caps Bold / Bold 700"
          fontSize={typography.custom.allCapsBold.fontSize}
          lineHeight={typography.custom.allCapsBold.lineHeight}
          weight={typography.custom.allCapsBold.fontWeight}
          textTransform={typography.custom.allCapsBold.textTransform}
        />
        <Specimen
          label="Custom / History Text / Regular 400"
          fontSize={typography.custom.historyText.fontSize}
          lineHeight={typography.custom.historyText.lineHeight}
          weight={typography.custom.historyText.fontWeight}
        />
        <Specimen
          label="Custom / Italic Subtext / Regular 400"
          fontSize={typography.custom.italicSubtext.fontSize}
          lineHeight={typography.custom.italicSubtext.lineHeight}
          weight={typography.custom.italicSubtext.fontWeight}
          fontStyle={typography.custom.italicSubtext.fontStyle}
        />
        <Specimen
          label="Custom / Italic Desc / Regular 400"
          fontSize={typography.custom.italicDesc.fontSize}
          lineHeight={typography.custom.italicDesc.lineHeight}
          weight={typography.custom.italicDesc.fontWeight}
          fontStyle={typography.custom.italicDesc.fontStyle}
        />
      </section>
    </div>
  )
}
