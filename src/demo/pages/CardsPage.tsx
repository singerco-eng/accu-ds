import { useState } from 'react'
import { Mail, Phone, MoreVertical, MapPin, Calendar, FileText } from 'lucide-react'
import { Card } from '../../components/Card'
import { Avatar } from '../../components/Avatar'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { Checkbox } from '../../components/Checkbox'
import { Tag } from '../../components/Tag'

export default function CardsPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>('job-2')

  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-2 text-display-sm font-bold">Cards</h1>
        <p className="text-body-md text-[var(--accu-gray-5)]">
          Compound card component with Header, Title, Body, Footer, Media, and Divider sub-components.
        </p>
      </div>

      {/* Base Variants */}
      <section className="space-y-4">
        <h2 className="text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Base Variants</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <Card.Header>
              <Card.Title title="Default" subtitle="Standard card with 1px #DCDCDC border" />
            </Card.Header>
            <Card.Body>
              <p className="text-body-sm text-[var(--accu-gray-5)]">
                The base card style used across AccuLynx. White background, 4px radius, subtle border.
              </p>
            </Card.Body>
            <Card.Footer divider align="right">
              <Button variant="text">Cancel</Button>
              <Button>Save</Button>
            </Card.Footer>
          </Card>

          <Card variant="elevated">
            <Card.Header>
              <Card.Title title="Elevated" subtitle="Default + drop shadow" />
            </Card.Header>
            <Card.Body>
              <p className="text-body-sm text-[var(--accu-gray-5)]">
                Same as default but with a medium shadow for lifted emphasis.
              </p>
            </Card.Body>
            <Card.Footer divider align="right">
              <Button variant="outline">Details</Button>
            </Card.Footer>
          </Card>

          <Card variant="outlined">
            <Card.Header>
              <Card.Title title="Outlined" subtitle="Transparent bg, darker border" />
            </Card.Header>
            <Card.Body>
              <p className="text-body-sm text-[var(--accu-gray-5)]">
                Outlined variant with #9D9D9D border and no background fill.
              </p>
            </Card.Body>
          </Card>
        </div>
      </section>

      {/* Interactive Cards */}
      <section className="space-y-4">
        <h2 className="text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Interactive Cards</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card interactive onClick={() => alert('Card clicked!')}>
            <Card.Header>
              <Card.Title title="Clickable Card" subtitle="Hover for shadow, Enter/Space to activate" />
            </Card.Header>
            <Card.Body>
              <p className="text-body-sm text-[var(--accu-gray-5)]">
                This card has hover shadow and focus-visible ring. It's keyboard accessible.
              </p>
            </Card.Body>
          </Card>

          <Card interactive variant="elevated">
            <Card.Header>
              <Card.Title title="Elevated + Interactive" subtitle="Combined variant" />
            </Card.Header>
            <Card.Body>
              <p className="text-body-sm text-[var(--accu-gray-5)]">
                Elevated cards with interactivity get a stronger hover shadow transition.
              </p>
            </Card.Body>
          </Card>

          <Card as="article">
            <Card.Header>
              <Card.Title title="Semantic Element" subtitle="Rendered as <article>" />
            </Card.Header>
            <Card.Body>
              <p className="text-body-sm text-[var(--accu-gray-5)]">
                Use the <code className="rounded bg-[var(--accu-gray-1)] px-1 text-[var(--accu-gray-6)]">as</code> prop for semantic HTML.
              </p>
            </Card.Body>
          </Card>
        </div>
      </section>

      {/* Selected / Job Card Pattern */}
      <section className="space-y-4">
        <h2 className="text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Selected State (Job/Lead Card)</h2>
        <p className="text-body-sm text-[var(--accu-gray-5)]">
          Click a card to toggle selection. Selected cards get a 3px orange left bar, peach background, and orange border.
        </p>
        <div className="flex flex-col gap-3" style={{ maxWidth: 460 }}>
          {[
            { id: 'job-1', name: 'Martinez Roof Replacement', address: '1234 Elm St, Chicago IL', status: 'In Progress', badge: 'grayBlue' as const, badgeText: '3' },
            { id: 'job-2', name: 'Henderson Siding Repair', address: '567 Oak Ave, Naperville IL', status: 'Urgent', badge: 'danger' as const, badgeText: '!' },
            { id: 'job-3', name: 'Chen Gutter Install', address: '890 Pine Rd, Evanston IL', status: 'Scheduled', badge: 'gray' as const, badgeText: '1' },
          ].map((job) => {
            const isSelected = selectedJob === job.id
            return (
              <Card
                key={job.id}
                selected={isSelected}
                interactive
                onClick={() => setSelectedJob(isSelected ? null : job.id)}
              >
                <div className="flex">
                  <div
                    className="flex shrink-0 items-start border-r px-[var(--accu-space-3)] py-[var(--accu-space-4)]"
                    style={{ borderColor: isSelected ? 'var(--accu-logo-orange)' : 'var(--accu-gray-2)', width: 52 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={isSelected}
                      onChange={() => setSelectedJob(isSelected ? null : job.id)}
                      aria-label={`Select ${job.name}`}
                    />
                  </div>
                  <div className="flex flex-1 items-start justify-between p-[var(--accu-space-4)]">
                    <div className="min-w-0">
                      <p className="truncate text-body-md font-bold text-[var(--accu-gray-6)]">{job.name}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-body-sm text-[var(--accu-gray-4)]">
                        <MapPin className="h-3 w-3 shrink-0" /> {job.address}
                      </p>
                      <p className="mt-2 text-body-sm text-[var(--accu-gray-5)]">{job.status}</p>
                    </div>
                    <Badge variant={job.badge}>{job.badgeText}</Badge>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Header with Actions */}
      <section className="space-y-4">
        <h2 className="text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Header + Action Slot</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <Card.Header
              divider
              action={
                <button type="button" className="rounded p-1 text-[var(--accu-gray-4)] hover:bg-[var(--accu-gray-1)]">
                  <MoreVertical className="h-5 w-5" />
                </button>
              }
            >
              <Card.Title title="Primary Contact" subtitle="Alex Lee" />
            </Card.Header>
            <Card.Body>
              <div className="flex items-center gap-[var(--accu-space-3)]">
                <Avatar initials="AL" size={32} />
                <div>
                  <p className="flex items-center gap-2 text-body-sm text-[var(--accu-gray-5)]">
                    <Mail className="h-3.5 w-3.5" /> alex.lee@acculynx.com
                  </p>
                  <p className="flex items-center gap-2 text-body-sm text-[var(--accu-gray-5)]">
                    <Phone className="h-3.5 w-3.5" /> (312) 555-0198
                  </p>
                </div>
              </div>
            </Card.Body>
            <Card.Footer divider align="between">
              <span className="text-body-sm text-[var(--accu-gray-4)]">Added 3 days ago</span>
              <Button variant="text">View Profile</Button>
            </Card.Footer>
          </Card>

          <Card variant="elevated">
            <Card.Header
              divider
              action={<Tag variant="blue">Active</Tag>}
            >
              <Card.Title title="Insurance Details" subtitle="State Farm - Policy #8821934" />
            </Card.Header>
            <Card.Body>
              <div className="space-y-2 text-body-sm text-[var(--accu-gray-5)]">
                <p><span className="font-bold text-[var(--accu-gray-6)]">Adjuster:</span> Sarah Johnson</p>
                <p><span className="font-bold text-[var(--accu-gray-6)]">Claim #:</span> CLM-2026-4412</p>
                <p><span className="font-bold text-[var(--accu-gray-6)]">Deductible:</span> $1,000</p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>

      {/* Scrollable Body */}
      <section className="space-y-4">
        <h2 className="text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Scrollable Body</h2>
        <div style={{ maxWidth: 400 }}>
          <Card>
            <Card.Header divider>
              <Card.Title title="Activity Log" subtitle="Recent contact history" />
            </Card.Header>
            <Card.Body scrollable maxHeight={200}>
              <div className="space-y-3">
                {[
                  { icon: Phone, text: 'Called homeowner - no answer', time: '2h ago' },
                  { icon: Mail, text: 'Sent follow-up estimate email', time: '5h ago' },
                  { icon: FileText, text: 'Inspection report uploaded', time: 'Yesterday' },
                  { icon: Phone, text: 'Initial call with homeowner', time: '2 days ago' },
                  { icon: Calendar, text: 'Job scheduled for inspection', time: '3 days ago' },
                  { icon: Mail, text: 'Welcome email sent', time: '4 days ago' },
                ].map((entry, i) => (
                  <div key={i} className="flex items-start gap-[var(--accu-space-2)]">
                    <entry.icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accu-gray-4)]" />
                    <div className="min-w-0 flex-1">
                      <p className="text-body-sm text-[var(--accu-gray-6)]">{entry.text}</p>
                      <p className="text-body-sm text-[var(--accu-gray-4)]">{entry.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>

      {/* Media Card */}
      <section className="space-y-4">
        <h2 className="text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Media Slot</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <Card.Media height={140}>
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--accu-primary-blue)] to-[var(--accu-blue-dark)] text-white">
                <MapPin className="h-10 w-10 opacity-50" />
              </div>
            </Card.Media>
            <Card.Header>
              <Card.Title title="1234 Elm Street" subtitle="Chicago, IL 60614" />
            </Card.Header>
            <Card.Body>
              <p className="text-body-sm text-[var(--accu-gray-5)]">Residential - Single Family</p>
            </Card.Body>
          </Card>

          <Card>
            <Card.Media height={140}>
              <div className="flex h-full items-center justify-center bg-[var(--accu-gray-1)]">
                <FileText className="h-10 w-10 text-[var(--accu-gray-3)]" />
              </div>
            </Card.Media>
            <Card.Header>
              <Card.Title title="Inspection Report" subtitle="Uploaded Feb 18, 2026" />
            </Card.Header>
            <Card.Footer divider>
              <Button variant="text">Download</Button>
              <Button variant="outline">Preview</Button>
            </Card.Footer>
          </Card>

          <Card variant="elevated">
            <Card.Media height={140}>
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--accu-logo-orange)] to-[var(--accu-primary-orange)]">
                <span className="text-display-md font-light text-white/80">AL</span>
              </div>
            </Card.Media>
            <Card.Header>
              <Card.Title title="AccuLynx Tile" subtitle="Card with media + elevated" />
            </Card.Header>
          </Card>
        </div>
      </section>

      {/* Divider usage */}
      <section className="space-y-4">
        <h2 className="text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Divider & Composition</h2>
        <div style={{ maxWidth: 400 }}>
          <Card>
            <Card.Header>
              <Card.Title title="Estimate Summary" subtitle="Martinez Roof Replacement" />
            </Card.Header>
            <Card.Divider />
            <Card.Body>
              <div className="space-y-2 text-body-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--accu-gray-5)]">Materials</span>
                  <span className="font-bold text-[var(--accu-gray-6)]">$4,200.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--accu-gray-5)]">Labor</span>
                  <span className="font-bold text-[var(--accu-gray-6)]">$3,800.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--accu-gray-5)]">Overhead</span>
                  <span className="font-bold text-[var(--accu-gray-6)]">$1,200.00</span>
                </div>
              </div>
            </Card.Body>
            <Card.Divider />
            <Card.Footer align="between">
              <span className="text-body-md font-bold text-[var(--accu-gray-6)]">Total</span>
              <span className="text-body-lg font-bold text-[var(--accu-logo-orange)]">$9,200.00</span>
            </Card.Footer>
          </Card>
        </div>
      </section>

      {/* Padding Variants */}
      <section className="space-y-4">
        <h2 className="text-body-sm font-bold uppercase text-[var(--accu-gray-4)]">Padding Variants</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {(['none', 'sm', 'md', 'lg'] as const).map((p) => (
            <Card key={p} padding={p}>
              <div className="bg-[var(--accu-light-blue)] p-2 text-center text-body-sm text-[var(--accu-gray-6)]">
                padding=&quot;{p}&quot;
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
