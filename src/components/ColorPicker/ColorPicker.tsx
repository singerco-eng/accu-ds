import { ChevronDown } from 'lucide-react'
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { cn } from '../../lib/utils'
import { type ColorPickerProps } from './ColorPicker.types'

const FIGMA_SWATCHES = [
  '#A32C25', '#D25580', '#497CEC', '#75E5AA', '#B3C441',
  '#882010', '#8C428D', '#4A68AF', '#A9CF76', '#8A8F2E',
  '#E57E59', '#5021A6', '#4C8CCC', '#89BC44', '#E5A545',
  '#B63F20', '#3837A3', '#71DBFB', '#70AF5E', '#E8BA41',
  '#C5443E', '#251F7E', '#428395', '#366B5E', '#DC884A',
  '#66103E', '#11014A', '#243F87', '#523F3B', '#F6ED51',
]

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const c = v * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v - c
  let r = 0, g = 0, b = 0
  if (h < 60) { r = c; g = x }
  else if (h < 120) { r = x; g = c }
  else if (h < 180) { g = c; b = x }
  else if (h < 240) { g = x; b = c }
  else if (h < 300) { r = x; b = c }
  else { r = c; b = x }
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)]
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase()
}

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) return null
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)]
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const d = max - min
  const v = max
  const s = max === 0 ? 0 : d / max
  let h = 0
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60
    else if (max === g) h = ((b - r) / d + 2) * 60
    else h = ((r - g) / d + 4) * 60
  }
  return [h, s, v]
}

function SpectrumCanvas({
  hue,
  saturation,
  brightness,
  onPick,
}: {
  hue: number
  saturation: number
  brightness: number
  onPick: (s: number, v: number) => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dragging = useRef(false)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const w = canvas.width
    const h = canvas.height

    const [hr, hg, hb] = hsvToRgb(hue, 1, 1)
    const hueColor = `rgb(${hr},${hg},${hb})`

    ctx.fillStyle = hueColor
    ctx.fillRect(0, 0, w, h)

    const whiteGrad = ctx.createLinearGradient(0, 0, w, 0)
    whiteGrad.addColorStop(0, 'rgba(255,255,255,1)')
    whiteGrad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = whiteGrad
    ctx.fillRect(0, 0, w, h)

    const blackGrad = ctx.createLinearGradient(0, 0, 0, h)
    blackGrad.addColorStop(0, 'rgba(0,0,0,0)')
    blackGrad.addColorStop(1, 'rgba(0,0,0,1)')
    ctx.fillStyle = blackGrad
    ctx.fillRect(0, 0, w, h)
  }, [hue])

  useEffect(() => { draw() }, [draw])

  const pick = (e: React.MouseEvent<HTMLCanvasElement> | MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height))
    onPick(x / rect.width, 1 - y / rect.height)
  }

  useEffect(() => {
    const move = (e: MouseEvent) => { if (dragging.current) pick(e) }
    const up = () => { dragging.current = false }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
  })

  const markerX = saturation * 100
  const markerY = (1 - brightness) * 100

  return (
    <div className="relative" style={{ width: 250, height: 220 }}>
      <canvas
        ref={canvasRef}
        width={250}
        height={220}
        className="block cursor-crosshair"
        onMouseDown={(e) => {
          dragging.current = true
          pick(e)
        }}
      />
      <div
        className="pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
        style={{
          left: `${markerX}%`,
          top: `${markerY}%`,
          boxShadow: '0 0 2px rgba(0,0,0,0.6)',
        }}
      />
    </div>
  )
}

function HueSlider({ hue, onChange }: { hue: number; onChange: (h: number) => void }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const pick = (e: React.MouseEvent | MouseEvent) => {
    const el = trackRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    onChange((x / rect.width) * 360)
  }

  useEffect(() => {
    const move = (e: MouseEvent) => { if (dragging.current) pick(e) }
    const up = () => { dragging.current = false }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
  })

  return (
    <div
      ref={trackRef}
      className="relative h-[10px] w-[176px] cursor-pointer rounded-[8px]"
      style={{
        background:
          'linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)',
      }}
      onMouseDown={(e) => {
        dragging.current = true
        pick(e)
      }}
    >
      <div
        className="absolute top-1/2 h-4 w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-white"
        style={{
          left: `${(hue / 360) * 100}%`,
          boxShadow: '0 0 2px rgba(0,0,0,0.4)',
        }}
      />
    </div>
  )
}

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(function ColorPicker(
  { value, onChange, presetColors, className },
  ref,
) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'swatches' | 'custom'>('swatches')
  const swatches = useMemo(() => presetColors ?? FIGMA_SWATCHES, [presetColors])
  const currentValue = value ?? '#A32C25'

  const rgb = hexToRgb(currentValue)
  const [initH, initS, initV] = rgb ? rgbToHsv(...rgb) : [0, 1, 0.5]
  const [hue, setHue] = useState(initH)
  const [sat, setSat] = useState(initS)
  const [bri, setBri] = useState(initV)
  const [hexInput, setHexInput] = useState(currentValue)

  useEffect(() => {
    const rgb2 = hexToRgb(currentValue)
    if (rgb2) {
      const [h, s, v] = rgbToHsv(...rgb2)
      setHue(h)
      setSat(s)
      setBri(v)
      setHexInput(currentValue)
    }
  }, [currentValue])

  const customColor = useMemo(() => {
    const [r, g, b] = hsvToRgb(hue, sat, bri)
    return rgbToHex(r, g, b)
  }, [hue, sat, bri])

  const handleSpectrumPick = (s: number, v: number) => {
    setSat(s)
    setBri(v)
    const [r, g, b] = hsvToRgb(hue, s, v)
    const hex = rgbToHex(r, g, b)
    setHexInput(hex)
    onChange(hex)
  }

  const handleHueChange = (h: number) => {
    setHue(h)
    const [r, g, b] = hsvToRgb(h, sat, bri)
    const hex = rgbToHex(r, g, b)
    setHexInput(hex)
    onChange(hex)
  }

  const handleHexCommit = () => {
    const parsed = hexToRgb(hexInput)
    if (parsed) {
      const hex = rgbToHex(...parsed)
      onChange(hex)
    } else {
      setHexInput(currentValue)
    }
  }

  return (
    <div
      ref={(node) => {
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }}
      className={cn('relative', className)}
      style={{ width: 'var(--accu-color-picker-trigger-width)' }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false)
          setMode('swatches')
        }
      }}
    >
      {/* Trigger -- 252x50, #F8F8F8 bg, 48x20 color rectangle + down arrow */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex w-full items-center bg-[var(--accu-input-bg)] border transition-colors',
          open
            ? 'border-[var(--accu-primary-orange)]'
            : 'border-[var(--accu-gray-2)] hover:border-[var(--accu-gray-3)]',
        )}
        style={{
          height: 'var(--accu-color-picker-trigger-height)',
          padding: '0 8px 0 10px',
        }}
      >
        <div
          className="shrink-0"
          style={{ width: 48, height: 20, backgroundColor: currentValue }}
        />
        <div className="flex-1" />
        <ChevronDown
          className={cn(
            'h-5 w-5 text-[var(--accu-gray-4)] transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>

      {/* Dropdown */}
      {open ? (
        <div
          className="absolute left-0 top-full z-20 mt-0 bg-[var(--accu-white)] shadow-[var(--accu-shadow-lg)]"
          style={{ width: 'var(--accu-color-picker-trigger-width)', borderRadius: 2 }}
          onMouseDown={(e) => e.preventDefault()}
        >
          {mode === 'swatches' ? (
            <div style={{ padding: 8 }}>
              {/* 6-column grid of ~33x33 square swatches with 2px radius */}
              <div
                className="grid"
                style={{
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gap: 8,
                }}
              >
                {swatches.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      onChange(color)
                      setOpen(false)
                      setMode('swatches')
                    }}
                    className="aspect-square w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accu-focus-shadow)]"
                    style={{ backgroundColor: color, borderRadius: 2 }}
                    aria-label={`Select ${color}`}
                  />
                ))}
              </div>

              {/* "Create Custom Color" link */}
              <button
                type="button"
                onClick={() => setMode('custom')}
                className="mt-2 w-full cursor-pointer px-2 py-2 text-left accu-text-body-md font-normal text-[var(--accu-primary-blue)] hover:underline"
              >
                Create Custom Color
              </button>
            </div>
          ) : (
            /* Custom color picker mode */
            <div>
              {/* Spectrum canvas 250x220 */}
              <SpectrumCanvas
                hue={hue}
                saturation={sat}
                brightness={bri}
                onPick={handleSpectrumPick}
              />

              {/* Color circle + hue slider */}
              <div className="flex items-center gap-2 px-2 pt-[14px]">
                <div
                  className="shrink-0 rounded-full"
                  style={{ width: 34, height: 34, backgroundColor: customColor }}
                />
                <HueSlider hue={hue} onChange={handleHueChange} />
              </div>

              {/* Hex input */}
              <div className="px-2 pt-[14px]">
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => setHexInput(e.target.value)}
                  onBlur={handleHexCommit}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleHexCommit()
                  }}
                  className="w-full bg-[var(--accu-gray-0)] px-1 py-[6px] text-[13px] font-normal text-[var(--accu-gray-5)] outline-none"
                  style={{ height: 28 }}
                />
              </div>

              {/* "Return to Swatches" link */}
              <div style={{ padding: 8 }}>
                <button
                  type="button"
                  onClick={() => setMode('swatches')}
                  className="w-full cursor-pointer px-2 py-2 text-left accu-text-body-md font-normal text-[var(--accu-primary-blue)] hover:underline"
                >
                  Return to Swatches
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
})
