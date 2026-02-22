import { Button } from '../../components/Button'
import { Tooltip } from '../../components/Tooltip'

export default function TooltipsPage() {
  return (
    <div>
      <h1 className="accu-text-display-sm font-bold mb-6">Tooltips</h1>
      <div className="grid gap-6">
        <div className="flex flex-wrap gap-6">
          <Tooltip content="Top tooltip content" position="top">
            <Button variant="outline">Top</Button>
          </Tooltip>
          <Tooltip content="Bottom tooltip content" position="bottom">
            <Button variant="outline">Bottom</Button>
          </Tooltip>
          <Tooltip content="Left tooltip content" position="left">
            <Button variant="outline">Left</Button>
          </Tooltip>
          <Tooltip content="Right tooltip content" position="right">
            <Button variant="outline">Right</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
