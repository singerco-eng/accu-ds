export interface Crew {
  id: string
  name: string
  trade: string
  color: string
  available: boolean
}

export const crews: Crew[] = [
  { id: 'crew-alpha',   name: 'Crew Alpha',   trade: 'Roof Replacement', color: '#4A90D9', available: true },
  { id: 'crew-bravo',   name: 'Crew Bravo',   trade: 'Siding',          color: '#E8854A', available: true },
  { id: 'crew-charlie', name: 'Crew Charlie',  trade: 'Metal',           color: '#7B61C2', available: true },
  { id: 'crew-delta',   name: 'Crew Delta',    trade: 'Gutters',         color: '#3BAF85', available: true },
  { id: 'crew-echo',    name: 'Crew Echo',     trade: 'Windows',         color: '#D94A6B', available: false },
  { id: 'crew-foxtrot', name: 'Crew Foxtrot',  trade: 'Skylights',      color: '#C9A227', available: true },
]

const crewMap = new Map(crews.map((c) => [c.id, c]))

export function getCrewById(id: string): Crew | undefined {
  return crewMap.get(id)
}

export function getCrewColor(crewId?: string): string | undefined {
  if (!crewId) return undefined
  return crewMap.get(crewId)?.color
}
