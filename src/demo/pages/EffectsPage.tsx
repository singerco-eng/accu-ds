const radiusTokens = [
  { name: '--accu-radius-sm', value: 'var(--accu-radius-sm)' },
  { name: '--accu-radius-md', value: 'var(--accu-radius-md)' },
  { name: '--accu-radius-lg', value: 'var(--accu-radius-lg)' },
  { name: '--accu-radius-full', value: 'var(--accu-radius-full)' },
]

export default function EffectsPage() {
  return (
    <div>
      <h1 className="accu-text-display-sm font-bold mb-6">Effects</h1>

      <section className="mb-10">
        <h2 className="accu-text-display-sm font-bold mb-4">Text &amp; Input Field Focus Shadow</h2>
        <div className="flex flex-wrap gap-4 mb-3">
          <input
            className="accu-text-body-md px-3 py-2"
            style={{
              border: '1px solid var(--accu-gray-3)',
              borderRadius: 'var(--accu-radius-md)',
              background: 'var(--accu-white)',
              color: 'var(--accu-input-text)',
            }}
            value="Unfocused input"
            readOnly
          />
          <input
            className="accu-text-body-md px-3 py-2"
            style={{
              border: '1px solid var(--accu-gray-3)',
              borderRadius: 'var(--accu-radius-md)',
              background: 'var(--accu-white)',
              color: 'var(--accu-input-text)',
              boxShadow: 'var(--accu-focus-ring)',
            }}
            value="Focused input demo"
            readOnly
          />
        </div>
        <p className="accu-text-body-sm font-normal" style={{ color: 'var(--accu-gray-5)' }}>
          box-shadow: var(--accu-focus-ring)
        </p>
      </section>

      <section>
        <h2 className="accu-text-display-sm font-bold mb-4">Border Radius Scale</h2>
        <div className="flex flex-wrap gap-4">
          {radiusTokens.map((token) => (
            <div key={token.name} className="w-28">
              <div
                className="h-16 w-16 mb-2"
                style={{
                  border: '1px solid var(--accu-gray-3)',
                  borderRadius: token.value,
                  background: 'var(--accu-light-blue)',
                }}
              />
              <p className="accu-text-body-sm font-bold">{token.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
