import { getCrewById } from './crews'

export type WodAwcStatus = 'pending' | 'complete' | 'today' | 'overdue'

export interface WodStatus {
  w: WodAwcStatus
  o: WodAwcStatus
  d: WodAwcStatus
}

export interface AwcStatus {
  a: WodAwcStatus
  w: WodAwcStatus
  c: WodAwcStatus
}

export type Criteria = 'rush' | 'hold' | 'special' | 'none'

export interface MockOrder {
  id: string
  jobNumber: string
  customerName: string
  phone: string
  poNumber: string
  ageDays: number
  trade: string
  orderType: string
  orderName: string
  hasMoney: boolean
  address: string
  wodStatus: WodStatus
  awcStatus: AwcStatus
  eventType: EventType
  hasAlert: boolean
  isScheduled: boolean
  criteria: Criteria
  deliveryDate?: string
  startDate?: string
  endDate?: string
  crewId?: string
  supplier?: string
}

export type EventType = 'material-and-labor' | 'material-only' | 'labor-only'

export type PanelScope =
  | 'to-be-scheduled'
  | 'scheduled'
  | 'completed'
  | 'all'

export type GroupByField = 'trade' | 'age' | 'wod-status' | 'awc-status' | 'event-type' | 'crew' | 'none'

export type AgeFilter = 'any' | '0-7' | '8-14' | '15-30' | '30+'

export const SCOPE_LABELS: Record<PanelScope, string> = {
  'to-be-scheduled': 'TO BE SCHEDULED',
  'scheduled': 'SCHEDULED',
  'completed': 'COMPLETED',
  'all': 'ALL ORDERS',
}

export const TRADES = [
  'Change Order',
  'Gutters',
  'Metal',
  'Roof Replacement',
  'Siding',
  'Skylights',
  'Soffit & Fascia',
  'Windows',
] as const

const wod = (w: WodAwcStatus, o: WodAwcStatus, d: WodAwcStatus): WodStatus => ({ w, o, d })
const awc = (a: WodAwcStatus, w: WodAwcStatus, c: WodAwcStatus): AwcStatus => ({ a, w, c })

export const mockOrders: MockOrder[] = [
  // Change Order (3 unscheduled)
  { id: 'o1', jobNumber: 'JV-7015', customerName: 'Patricia Wilson', phone: '(608) 555-0127', poNumber: 'PO-10127', ageDays: 29, trade: 'Change Order', orderType: 'CHANGE ORDER', orderName: 'Additional Flashing Work', hasMoney: false, address: '933 Main St, Janesville, WI 53545', wodStatus: wod('pending', 'pending', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'labor-only', hasAlert: true, isScheduled: false, criteria: 'rush' },
  { id: 'o2', jobNumber: 'JV-7015', customerName: 'Lisa Miller', phone: '(262) 555-0128', poNumber: 'PO-10122', ageDays: 35, trade: 'Change Order', orderType: 'CHANGE ORDER', orderName: 'Extra Ridge Vent', hasMoney: true, address: '1090 S Wisconsin St, Delavan, WI 53115', wodStatus: wod('pending', 'pending', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: false, isScheduled: false, criteria: 'none' },
  { id: 'o3', jobNumber: 'DV-7016', customerName: 'Margaret Jones', phone: '(414) 555-0129', poNumber: 'PO-10113', ageDays: 14, trade: 'Change Order', orderType: 'CHANGE ORDER', orderName: 'Color Change - Shingles', hasMoney: false, address: '329 W Wisconsin St, Delavan, WI 53115', wodStatus: wod('complete', 'overdue', 'pending'), awcStatus: awc('complete', 'pending', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: false, criteria: 'none', deliveryDate: 'TUE FEB 10' },

  // Gutters (1 unscheduled)
  { id: 'o4', jobNumber: 'JV-7017', customerName: 'Linda Davis', phone: '(920) 555-0130', poNumber: 'PO-10120', ageDays: 31, trade: 'Gutters', orderType: 'GUTTERS', orderName: 'Seamless Gutter Install', hasMoney: false, address: '2401 N Court St, Janesville, WI 53548', wodStatus: wod('complete', 'overdue', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: true, isScheduled: false, criteria: 'hold', deliveryDate: 'TUE FEB 10' },

  // Metal (3 unscheduled)
  { id: 'o5', jobNumber: 'DV-7018', customerName: 'James Williams', phone: '(715) 555-0131', poNumber: 'PO-10115', ageDays: 26, trade: 'Metal', orderType: 'METAL', orderName: 'Standing Seam Roof Panel', hasMoney: true, address: '507 Walworth Ave, Delavan, WI 53115', wodStatus: wod('complete', 'overdue', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: false, isScheduled: false, criteria: 'none' },
  { id: 'o6', jobNumber: 'EK-7019', customerName: 'Susan Davis', phone: '(608) 555-0132', poNumber: 'PO-10108', ageDays: 42, trade: 'Metal', orderType: 'METAL', orderName: 'Metal Fascia Wrap', hasMoney: true, address: '218 E Geneva St, Elkhorn, WI 53121', wodStatus: wod('complete', 'complete', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: false, isScheduled: false, criteria: 'none' },
  { id: 'o7', jobNumber: 'LG-7020', customerName: 'Robert Taylor', phone: '(262) 555-0133', poNumber: 'PO-10099', ageDays: 18, trade: 'Metal', orderType: 'METAL', orderName: 'Copper Valley Lining', hasMoney: false, address: '145 N Main St, Lake Geneva, WI 53147', wodStatus: wod('pending', 'pending', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: true, isScheduled: false, criteria: 'special' },

  // Roof Replacement (4 unscheduled)
  { id: 'o8', jobNumber: 'BL-7021', customerName: 'Barbara Thompson', phone: '(414) 555-0134', poNumber: 'PO-10117', ageDays: 40, trade: 'Roof Replacement', orderType: 'ROOF REPLACEMENT', orderName: 'Full Tear-Off & Replace', hasMoney: true, address: '551 Grand Ave, Beloit, WI 53511', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'pending', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: false, criteria: 'none' },
  { id: 'o9', jobNumber: 'BL-7021', customerName: 'Margaret Lee', phone: '(920) 555-0135', poNumber: 'PO-10112', ageDays: 22, trade: 'Roof Replacement', orderType: 'ROOF REPLACEMENT', orderName: 'Overlay - Architectural Shingles', hasMoney: false, address: '889 Milwaukee Ave, Burlington, WI 53105', wodStatus: wod('pending', 'pending', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: false, isScheduled: false, criteria: 'none' },
  { id: 'o10', jobNumber: 'JV-7022', customerName: 'William Garcia', phone: '(715) 555-0136', poNumber: 'PO-10105', ageDays: 8, trade: 'Roof Replacement', orderType: 'ROOF REPLACEMENT', orderName: 'Emergency Leak Repair', hasMoney: true, address: '302 E Court St, Janesville, WI 53545', wodStatus: wod('complete', 'pending', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: false, isScheduled: false, criteria: 'none' },
  { id: 'o11', jobNumber: 'BG-7023', customerName: 'Nancy Clark', phone: '(608) 555-0137', poNumber: 'PO-10098', ageDays: 51, trade: 'Roof Replacement', orderType: 'ROOF REPLACEMENT', orderName: 'Flat Roof Section', hasMoney: false, address: '1205 Center Ave, Brodhead, WI 53520', wodStatus: wod('pending', 'pending', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: true, isScheduled: false, criteria: 'rush' },

  // Siding (2 unscheduled)
  { id: 'o12', jobNumber: 'JV-7024', customerName: 'Mary Anderson', phone: '(262) 555-0138', poNumber: 'PO-10118', ageDays: 16, trade: 'Siding', orderType: 'SIDING', orderName: 'Vinyl Siding - Full House', hasMoney: false, address: '571 E Court St, Janesville, WI 53545', wodStatus: wod('pending', 'pending', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: false, isScheduled: false, criteria: 'none' },
  { id: 'o13', jobNumber: 'JV-7024', customerName: 'Michael Jackson', phone: '(414) 555-0139', poNumber: 'PO-10109', ageDays: 33, trade: 'Siding', orderType: 'SIDING', orderName: 'Hardie Board Accent Wall', hasMoney: true, address: '420 Prairie Ave, Beloit, WI 53511', wodStatus: wod('complete', 'pending', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: false, isScheduled: false, criteria: 'none' },

  // Skylights (6 unscheduled)
  { id: 'o14', jobNumber: 'JV-7025', customerName: 'Christopher Hernandez', phone: '(920) 555-0140', poNumber: 'PO-10098', ageDays: 9, trade: 'Skylights', orderType: 'SKYLIGHTS', orderName: 'Velux Solar Skylight', hasMoney: false, address: '1108 S Court St, Janesville, WI 53548', wodStatus: wod('pending', 'pending', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: false, isScheduled: false, criteria: 'none' },
  { id: 'o15', jobNumber: 'DV-7026', customerName: 'Thomas Anderson', phone: '(715) 555-0141', poNumber: 'PO-10094', ageDays: 27, trade: 'Skylights', orderType: 'SKYLIGHTS', orderName: 'Fixed Deck Mount Skylight', hasMoney: true, address: '945 Grant St, Delavan, WI 53115', wodStatus: wod('complete', 'complete', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: false, isScheduled: false, criteria: 'none' },
  { id: 'o16', jobNumber: 'WW-7027', customerName: 'Jennifer Lopez', phone: '(608) 555-0142', poNumber: 'PO-10091', ageDays: 44, trade: 'Skylights', orderType: 'SKYLIGHTS', orderName: 'Tubular Skylight Install', hasMoney: false, address: '731 Wisconsin Ave, Whitewater, WI 53190', wodStatus: wod('pending', 'pending', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: true, isScheduled: false, criteria: 'hold' },
  { id: 'o17', jobNumber: 'JV-7028', customerName: 'David Martinez', phone: '(262) 555-0143', poNumber: 'PO-10087', ageDays: 5, trade: 'Skylights', orderType: 'SKYLIGHTS', orderName: 'Operable Vent Skylight', hasMoney: true, address: '2010 Center Ave, Janesville, WI 53545', wodStatus: wod('pending', 'pending', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: false, isScheduled: false, criteria: 'none' },
  { id: 'o18', jobNumber: 'JV-7028', customerName: 'Sarah Brown', phone: '(414) 555-0144', poNumber: 'PO-10083', ageDays: 19, trade: 'Skylights', orderType: 'SKYLIGHTS', orderName: 'Skylight Well Reframe', hasMoney: false, address: '625 Prairie Ave, Beloit, WI 53511', wodStatus: wod('complete', 'pending', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: false, isScheduled: false, criteria: 'none' },
  { id: 'o19', jobNumber: 'EK-7029', customerName: 'Daniel Wilson', phone: '(920) 555-0145', poNumber: 'PO-10079', ageDays: 38, trade: 'Skylights', orderType: 'SKYLIGHTS', orderName: 'Dual Skylight - Kitchen', hasMoney: true, address: '112 Main St, Elkhorn, WI 53121', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'pending', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: false, criteria: 'none' },

  // Soffit & Fascia (5 unscheduled)
  { id: 'o20', jobNumber: 'JV-7030', customerName: 'Thomas Garcia', phone: '(715) 555-0146', poNumber: 'PO-10104', ageDays: 4, trade: 'Soffit & Fascia', orderType: 'SOFFIT & FASCIA', orderName: 'Aluminum Soffit Wrap', hasMoney: false, address: '341 Parker Dr, Janesville, WI 53545', wodStatus: wod('pending', 'pending', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'labor-only', hasAlert: false, isScheduled: false, criteria: 'none' },
  { id: 'o21', jobNumber: 'DV-7031', customerName: 'Karen White', phone: '(608) 555-0147', poNumber: 'PO-10100', ageDays: 21, trade: 'Soffit & Fascia', orderType: 'SOFFIT & FASCIA', orderName: 'Fascia Board Replacement', hasMoney: true, address: '780 Milwaukee Rd, Delavan, WI 53115', wodStatus: wod('complete', 'pending', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: false, isScheduled: false, criteria: 'none' },
  { id: 'o22', jobNumber: 'BL-7032', customerName: 'George Harris', phone: '(262) 555-0148', poNumber: 'PO-10096', ageDays: 46, trade: 'Soffit & Fascia', orderType: 'SOFFIT & FASCIA', orderName: 'Soffit Vent Install', hasMoney: false, address: '159 W Grand Ave, Beloit, WI 53511', wodStatus: wod('pending', 'pending', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: true, isScheduled: false, criteria: 'rush' },
  { id: 'o23', jobNumber: 'JV-7033', customerName: 'Emily Robinson', phone: '(414) 555-0149', poNumber: 'PO-10092', ageDays: 12, trade: 'Soffit & Fascia', orderType: 'SOFFIT & FASCIA', orderName: 'Vinyl Soffit & Fascia', hasMoney: true, address: '508 N Parker Dr, Janesville, WI 53545', wodStatus: wod('complete', 'complete', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: false, isScheduled: false, criteria: 'none' },
  { id: 'o24', jobNumber: 'JV-7034', customerName: 'Richard Lee', phone: '(920) 555-0150', poNumber: 'PO-10088', ageDays: 30, trade: 'Soffit & Fascia', orderType: 'SOFFIT & FASCIA', orderName: 'Fascia Repair - Front Gable', hasMoney: false, address: '2215 Milton Ave, Janesville, WI 53545', wodStatus: wod('pending', 'pending', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'labor-only', hasAlert: false, isScheduled: false, criteria: 'none' },

  // Windows (13 unscheduled to reach 37 total)
  { id: 'o25', jobNumber: 'BL-7035', customerName: 'Jessica Moore', phone: '(715) 555-0151', poNumber: 'PO-10116', ageDays: 7, trade: 'Windows', orderType: 'WINDOWS', orderName: 'Double-Hung Replacement', hasMoney: true, address: '890 Riverview Dr, Beloit, WI 53511', wodStatus: wod('pending', 'pending', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: false, isScheduled: false, criteria: 'none' },
  { id: 'o26', jobNumber: 'EK-7036', customerName: 'Anthony Martin', phone: '(608) 555-0152', poNumber: 'PO-10111', ageDays: 25, trade: 'Windows', orderType: 'WINDOWS', orderName: 'Bay Window Install', hasMoney: false, address: '404 E Geneva St, Elkhorn, WI 53121', wodStatus: wod('complete', 'pending', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: false, isScheduled: false, criteria: 'none' },
  { id: 'o27', jobNumber: 'BG-7037', customerName: 'Donna Young', phone: '(262) 555-0153', poNumber: 'PO-10107', ageDays: 53, trade: 'Windows', orderType: 'WINDOWS', orderName: 'Egress Window - Basement', hasMoney: true, address: '1701 Center Ave, Brodhead, WI 53520', wodStatus: wod('pending', 'pending', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: true, isScheduled: false, criteria: 'special' },

  // Scheduled orders (24)
  { id: 's1', jobNumber: 'JV-8201', customerName: 'John Adams', phone: '(414) 555-0154', poNumber: 'PO-10050', ageDays: 60, trade: 'Roof Replacement', orderType: 'ROOF REPLACEMENT', orderName: 'Full Tear-Off - 3-Tab Shingle', hasMoney: true, address: '100 Oak St, Janesville, WI 53545', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'complete', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'ABC Supply', deliveryDate: 'MON FEB 17', startDate: '2026-02-17', endDate: '2026-02-19', crewId: 'crew-alpha' },
  { id: 's2', jobNumber: 'BL-8202', customerName: 'Jane Foster', phone: '(920) 555-0155', poNumber: 'PO-10051', ageDays: 55, trade: 'Siding', orderType: 'SIDING', orderName: 'James Hardie Lap Siding', hasMoney: true, address: '200 Elm St, Beloit, WI 53511', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'pending', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'Beacon', deliveryDate: 'TUE FEB 18', startDate: '2026-02-18', endDate: '2026-02-20', crewId: 'crew-bravo' },
  { id: 's3', jobNumber: 'DV-8203', customerName: 'Mark Spencer', phone: '(715) 555-0156', poNumber: 'PO-10052', ageDays: 48, trade: 'Metal', orderType: 'METAL', orderName: 'Standing Seam - Garage', hasMoney: true, address: '300 Pine St, Delavan, WI 53115', wodStatus: wod('complete', 'complete', 'pending'), awcStatus: awc('complete', 'pending', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'SRS', deliveryDate: 'WED FEB 19', startDate: '2026-02-19', endDate: '2026-02-21', crewId: 'crew-charlie' },
  { id: 's4', jobNumber: 'EK-8204', customerName: 'Laura Chen', phone: '(608) 555-0157', poNumber: 'PO-10053', ageDays: 40, trade: 'Gutters', orderType: 'GUTTERS', orderName: 'Gutter Guard Addition', hasMoney: false, address: '400 Maple Ave, Elkhorn, WI 53121', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'complete', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'ABC Supply', deliveryDate: 'THU FEB 20', startDate: '2026-02-20', endDate: '2026-02-20', crewId: 'crew-alpha' },
  { id: 's5', jobNumber: 'LG-8205', customerName: 'Kevin Brooks', phone: '(262) 555-0158', poNumber: 'PO-10054', ageDays: 35, trade: 'Skylights', orderType: 'SKYLIGHTS', orderName: 'Velux Solar Skylight - Master', hasMoney: true, address: '500 Birch Ln, Lake Geneva, WI 53147', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'pending', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'Velux', deliveryDate: 'FRI FEB 21', startDate: '2026-02-21', endDate: '2026-02-22', crewId: 'crew-delta' },
  { id: 's6', jobNumber: 'WW-8206', customerName: 'Amy Reed', phone: '(414) 555-0159', poNumber: 'PO-10055', ageDays: 30, trade: 'Change Order', orderType: 'CHANGE ORDER', orderName: 'Ridge Cap Addition', hasMoney: true, address: '600 Cedar St, Whitewater, WI 53190', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'complete', 'complete'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'ABC Supply', deliveryDate: 'MON FEB 24', startDate: '2026-02-24', endDate: '2026-02-25', crewId: 'crew-alpha' },
  { id: 's7', jobNumber: 'BR-8207', customerName: 'Brian Kelly', phone: '(920) 555-0160', poNumber: 'PO-10056', ageDays: 28, trade: 'Roof Replacement', orderType: 'ROOF REPLACEMENT', orderName: 'Architectural Shingle Overlay', hasMoney: true, address: '700 Walnut St, Burlington, WI 53105', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'pending', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'Beacon', deliveryDate: 'TUE FEB 25', startDate: '2026-02-25', endDate: '2026-02-27', crewId: 'crew-bravo' },
  { id: 's8', jobNumber: 'BG-8208', customerName: 'Michelle Torres', phone: '(715) 555-0161', poNumber: 'PO-10057', ageDays: 22, trade: 'Windows', orderType: 'WINDOWS', orderName: 'Casement Window Set', hasMoney: false, address: '800 Ash Dr, Brodhead, WI 53520', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'pending', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'Andersen', deliveryDate: 'WED FEB 26', startDate: '2026-02-26', endDate: '2026-02-28', crewId: 'crew-charlie' },
  { id: 's9', jobNumber: 'JV-8209', customerName: 'Steven Ramirez', phone: '(608) 555-0162', poNumber: 'PO-10058', ageDays: 18, trade: 'Soffit & Fascia', orderType: 'SOFFIT & FASCIA', orderName: 'Full Soffit & Fascia Wrap', hasMoney: true, address: '900 Spruce Ct, Janesville, WI 53545', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'pending', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'ABC Supply', deliveryDate: 'THU FEB 27', startDate: '2026-02-27', endDate: '2026-02-28', crewId: 'crew-delta' },
  { id: 's10', jobNumber: 'BL-8210', customerName: 'Rachel Green', phone: '(262) 555-0163', poNumber: 'PO-10059', ageDays: 15, trade: 'Roof Replacement', orderType: 'ROOF REPLACEMENT', orderName: 'Tear-Off - Architectural', hasMoney: true, address: '1000 Hickory Blvd, Beloit, WI 53511', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'complete', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'SRS', deliveryDate: 'FRI FEB 28', startDate: '2026-02-28', endDate: '2026-03-02', crewId: 'crew-alpha' },
  { id: 's11', jobNumber: 'DV-8211', customerName: 'Paul Cooper', phone: '(414) 555-0164', poNumber: 'PO-10060', ageDays: 12, trade: 'Metal', orderType: 'METAL', orderName: 'Metal Ridge Cap - Color Match', hasMoney: true, address: '1100 Poplar Way, Delavan, WI 53115', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'pending', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'Beacon', deliveryDate: 'MON MAR 2', startDate: '2026-03-02', endDate: '2026-03-04', crewId: 'crew-bravo' },
  { id: 's12', jobNumber: 'EK-8212', customerName: 'Angela Price', phone: '(920) 555-0165', poNumber: 'PO-10061', ageDays: 10, trade: 'Siding', orderType: 'SIDING', orderName: 'Cedar Siding Repair', hasMoney: false, address: '1200 Cherry Ln, Elkhorn, WI 53121', wodStatus: wod('complete', 'complete', 'pending'), awcStatus: awc('pending', 'pending', 'pending'), eventType: 'material-only', hasAlert: true, isScheduled: true, criteria: 'hold', supplier: 'ABC Supply', deliveryDate: 'TUE MAR 3', startDate: '2026-03-03', endDate: '2026-03-05', crewId: 'crew-charlie' },
  { id: 's13', jobNumber: 'LG-8213', customerName: 'Scott Murphy', phone: '(715) 555-0166', poNumber: 'PO-10062', ageDays: 50, trade: 'Roof Replacement', orderType: 'ROOF REPLACEMENT', orderName: 'Storm Damage - Full Replace', hasMoney: true, address: '1300 Willow Dr, Lake Geneva, WI 53147', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'complete', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'rush', supplier: 'SRS', deliveryDate: 'WED MAR 4', startDate: '2026-03-04', endDate: '2026-03-06', crewId: 'crew-delta' },
  { id: 's14', jobNumber: 'WW-8214', customerName: 'Tina Nguyen', phone: '(608) 555-0167', poNumber: 'PO-10063', ageDays: 8, trade: 'Windows', orderType: 'WINDOWS', orderName: 'Picture Window - Living Room', hasMoney: true, address: '1400 Dogwood Ct, Whitewater, WI 53190', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'pending', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'Andersen', deliveryDate: 'THU MAR 5', startDate: '2026-03-05', endDate: '2026-03-07', crewId: 'crew-alpha' },
  { id: 's15', jobNumber: 'BR-8215', customerName: 'Greg Palmer', phone: '(262) 555-0168', poNumber: 'PO-10064', ageDays: 45, trade: 'Gutters', orderType: 'GUTTERS', orderName: 'Half-Round Gutter Restoration', hasMoney: true, address: '1500 Sycamore St, Burlington, WI 53105', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'complete', 'complete'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'ABC Supply', deliveryDate: 'FRI MAR 6', startDate: '2026-03-06', endDate: '2026-03-06', crewId: 'crew-bravo' },
  { id: 's16', jobNumber: 'BG-8216', customerName: 'Diana Ross', phone: '(414) 555-0169', poNumber: 'PO-10065', ageDays: 20, trade: 'Skylights', orderType: 'SKYLIGHTS', orderName: 'Fixed Skylight - Bath', hasMoney: false, address: '1600 Magnolia Ave, Brodhead, WI 53520', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'pending', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'Velux', deliveryDate: 'MON MAR 9', startDate: '2026-03-09', endDate: '2026-03-10', crewId: 'crew-charlie' },
  { id: 's17', jobNumber: 'JV-8217', customerName: 'Frank Santos', phone: '(920) 555-0170', poNumber: 'PO-10066', ageDays: 36, trade: 'Change Order', orderType: 'CHANGE ORDER', orderName: 'Ice & Water Shield Addition', hasMoney: true, address: '1700 Cypress Blvd, Janesville, WI 53545', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'complete', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'Beacon', deliveryDate: 'TUE MAR 10', startDate: '2026-03-10', endDate: '2026-03-11', crewId: 'crew-delta' },
  { id: 's18', jobNumber: 'BL-8218', customerName: 'Carol Evans', phone: '(715) 555-0171', poNumber: 'PO-10067', ageDays: 14, trade: 'Soffit & Fascia', orderType: 'SOFFIT & FASCIA', orderName: 'Fascia Repair - Rear', hasMoney: true, address: '1800 Redwood Ln, Beloit, WI 53511', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'pending', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'ABC Supply', deliveryDate: 'WED MAR 11', startDate: '2026-03-11', endDate: '2026-03-12', crewId: 'crew-alpha' },
  { id: 's19', jobNumber: 'DV-8219', customerName: 'Peter Walsh', phone: '(608) 555-0172', poNumber: 'PO-10068', ageDays: 42, trade: 'Roof Replacement', orderType: 'ROOF REPLACEMENT', orderName: 'EPDM Flat Roof Replacement', hasMoney: true, address: '1900 Juniper St, Delavan, WI 53115', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'complete', 'complete'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'SRS', deliveryDate: 'THU MAR 12', startDate: '2026-03-12', endDate: '2026-03-14', crewId: 'crew-bravo' },
  { id: 's20', jobNumber: 'EK-8220', customerName: 'Megan Foster', phone: '(262) 555-0173', poNumber: 'PO-10069', ageDays: 6, trade: 'Metal', orderType: 'METAL', orderName: 'Metal Chimney Flashing', hasMoney: false, address: '2000 Hawthorn Dr, Elkhorn, WI 53121', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'pending', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'Beacon', deliveryDate: 'FRI MAR 13', startDate: '2026-03-13', endDate: '2026-03-14', crewId: 'crew-charlie' },
  { id: 's21', jobNumber: 'LG-8221', customerName: 'Victor Ruiz', phone: '(414) 555-0174', poNumber: 'PO-10070', ageDays: 32, trade: 'Siding', orderType: 'SIDING', orderName: 'Vinyl Siding - Front Elevation', hasMoney: true, address: '2100 Linden Ave, Lake Geneva, WI 53147', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'complete', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'ABC Supply', deliveryDate: 'MON MAR 16', startDate: '2026-03-16', endDate: '2026-03-18', crewId: 'crew-delta' },
  { id: 's22', jobNumber: 'WW-8222', customerName: 'Nicole Hayes', phone: '(920) 555-0175', poNumber: 'PO-10071', ageDays: 24, trade: 'Windows', orderType: 'WINDOWS', orderName: 'Slider Window - Patio', hasMoney: true, address: '2200 Aspen Ct, Whitewater, WI 53190', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'pending', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'Andersen', deliveryDate: 'TUE MAR 17', startDate: '2026-03-17', endDate: '2026-03-19', crewId: 'crew-alpha' },
  { id: 's23', jobNumber: 'BR-8223', customerName: 'Dennis Kim', phone: '(715) 555-0176', poNumber: 'PO-10072', ageDays: 16, trade: 'Skylights', orderType: 'SKYLIGHTS', orderName: 'Tubular Skylight - Hallway', hasMoney: true, address: '2300 Beech Rd, Burlington, WI 53105', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'complete', 'complete'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'Velux', deliveryDate: 'WED MAR 18', startDate: '2026-03-18', endDate: '2026-03-19', crewId: 'crew-bravo' },
  { id: 's24', jobNumber: 'BG-8224', customerName: 'Olivia Grant', phone: '(608) 555-0177', poNumber: 'PO-10073', ageDays: 11, trade: 'Change Order', orderType: 'CHANGE ORDER', orderName: 'Gutter Addition - Change Order', hasMoney: false, address: '2400 Fir Way, Brodhead, WI 53520', wodStatus: wod('complete', 'complete', 'complete'), awcStatus: awc('complete', 'pending', 'pending'), eventType: 'material-and-labor', hasAlert: false, isScheduled: true, criteria: 'none', supplier: 'SRS', deliveryDate: 'THU MAR 19', startDate: '2026-03-19', endDate: '2026-03-20', crewId: 'crew-charlie' },
]

function isOrderCompleted(o: MockOrder): boolean {
  const materialDone = o.eventType === 'labor-only' || o.wodStatus.d === 'complete'
  const laborDone = o.eventType === 'material-only' || o.awcStatus.c === 'complete'
  return materialDone && laborDone
}

export function filterByScope(orders: MockOrder[], scope: PanelScope): MockOrder[] {
  switch (scope) {
    case 'to-be-scheduled':
      return orders.filter((o) => !o.isScheduled)
    case 'scheduled':
      return orders.filter((o) => o.isScheduled && !isOrderCompleted(o))
    case 'completed':
      return orders.filter((o) => isOrderCompleted(o))
    case 'all':
    default:
      return orders
  }
}

export function filterByEventType(orders: MockOrder[], eventType: EventType | 'any'): MockOrder[] {
  if (eventType === 'any') return orders
  return orders.filter((o) => o.eventType === eventType)
}

export function filterBySearch(orders: MockOrder[], query: string): MockOrder[] {
  if (!query.trim()) return orders
  const q = query.toLowerCase()
  return orders.filter((o) => {
    const crewName = o.crewId ? getCrewById(o.crewId)?.name ?? '' : ''
    return (
      o.customerName.toLowerCase().includes(q) ||
      o.jobNumber.toLowerCase().includes(q) ||
      o.poNumber.toLowerCase().includes(q) ||
      o.phone.toLowerCase().includes(q) ||
      o.address.toLowerCase().includes(q) ||
      crewName.toLowerCase().includes(q)
    )
  })
}

export function filterByTrade(orders: MockOrder[], trades: string[]): MockOrder[] {
  if (trades.length === 0) return orders
  return orders.filter((o) => trades.includes(o.trade))
}

export function filterByAge(orders: MockOrder[], age: AgeFilter): MockOrder[] {
  switch (age) {
    case '0-7': return orders.filter((o) => o.ageDays <= 7)
    case '8-14': return orders.filter((o) => o.ageDays >= 8 && o.ageDays <= 14)
    case '15-30': return orders.filter((o) => o.ageDays >= 15 && o.ageDays <= 30)
    case '30+': return orders.filter((o) => o.ageDays > 30)
    default: return orders
  }
}

export function filterByMoney(orders: MockOrder[], filter: 'any' | 'yes' | 'no'): MockOrder[] {
  if (filter === 'yes') return orders.filter((o) => o.hasMoney)
  if (filter === 'no') return orders.filter((o) => !o.hasMoney)
  return orders
}

export type WodPhase = 'any' | 'waiting' | 'ordered' | 'delivered'
export type AwcPhase = 'any' | 'assigned' | 'working' | 'completed' | 'no-labor'

export function getWodPhase(wod: WodStatus): 'waiting' | 'ordered' | 'delivered' {
  if (wod.d === 'complete') return 'delivered'
  if (wod.o === 'complete') return 'ordered'
  return 'waiting'
}

export function getAwcPhase(awc: AwcStatus, eventType: EventType): 'assigned' | 'working' | 'completed' | 'no-labor' {
  if (eventType === 'material-only') return 'no-labor'
  if (awc.c === 'complete') return 'completed'
  if (awc.w === 'complete') return 'working'
  return 'assigned'
}

export function filterByCriteria(orders: MockOrder[], criteria: Criteria | 'any'): MockOrder[] {
  if (criteria === 'any') return orders
  return orders.filter((o) => o.criteria === criteria)
}

export function filterByWodPhase(orders: MockOrder[], phase: WodPhase): MockOrder[] {
  if (phase === 'any') return orders
  return orders.filter((o) => getWodPhase(o.wodStatus) === phase)
}

export function filterByAwcPhase(orders: MockOrder[], phase: AwcPhase): MockOrder[] {
  if (phase === 'any') return orders
  return orders.filter((o) => getAwcPhase(o.awcStatus, o.eventType) === phase)
}

const WOD_PHASE_LABELS: Record<string, string> = {
  waiting: 'Waiting',
  ordered: 'Ordered',
  delivered: 'Delivered',
}

const AWC_PHASE_LABELS: Record<string, string> = {
  assigned: 'Assigned',
  working: 'Working',
  completed: 'Completed',
  'no-labor': 'No Labor',
}

const EVENT_TYPE_LABELS: Record<EventType, string> = {
  'material-and-labor': 'Material & Labor',
  'material-only': 'Material Delivery Only',
  'labor-only': 'Labor Only',
}

export function groupOrders(orders: MockOrder[], groupBy: GroupByField): Map<string, MockOrder[]> {
  const groups = new Map<string, MockOrder[]>()

  if (groupBy === 'none') {
    groups.set('All Orders', orders)
    return groups
  }

  for (const order of orders) {
    let key: string
    if (groupBy === 'trade') {
      key = order.trade
    } else if (groupBy === 'crew') {
      const crew = order.crewId ? getCrewById(order.crewId) : undefined
      key = crew?.name ?? 'Unassigned'
    } else if (groupBy === 'age') {
      if (order.ageDays <= 7) key = '0-7 days'
      else if (order.ageDays <= 14) key = '8-14 days'
      else if (order.ageDays <= 30) key = '15-30 days'
      else key = '30+ days'
    } else if (groupBy === 'wod-status') {
      key = WOD_PHASE_LABELS[getWodPhase(order.wodStatus)] ?? 'Unknown'
    } else if (groupBy === 'awc-status') {
      key = AWC_PHASE_LABELS[getAwcPhase(order.awcStatus, order.eventType)] ?? 'Unknown'
    } else {
      key = EVENT_TYPE_LABELS[order.eventType]
    }
    const existing = groups.get(key) ?? []
    existing.push(order)
    groups.set(key, existing)
  }

  return groups
}
