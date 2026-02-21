export const typography = {
  fontFamily: "'Roboto', sans-serif",

  display: {
    large: { fontSize: '42px', lineHeight: '42px', weights: { light: 300, normal: 400, bold: 700 } },
    medium: { fontSize: '30px', lineHeight: '34px', weights: { light: 300, normal: 400, bold: 700 } },
    small: { fontSize: '18px', lineHeight: '22px', weights: { light: 300, normal: 400, bold: 700 } },
  },

  body: {
    large: { fontSize: '16px', lineHeight: '18px', weights: { light: 300, normal: 400, bold: 700 } },
    medium: { fontSize: '14px', lineHeight: '16px', weights: { light: 300, normal: 400, bold: 700 } },
    small: { fontSize: '12px', lineHeight: '14px', weights: { light: 300, normal: 400, bold: 700 } },
  },

  custom: {
    modalTitle: { fontSize: '42px', lineHeight: '42px', fontWeight: 100 },
    tabbedCardLabel: { fontSize: '20px', lineHeight: '20px', fontWeight: 300 },
    buttonLabel: { fontSize: '18px', lineHeight: '20px', weights: { regular: 400, medium: 500, bold: 700 } },
    breadcrumbHover: { fontSize: '12px', lineHeight: '14px', fontWeight: 500 },
    allCapsLight: { fontSize: '12px', lineHeight: '14px', fontWeight: 300, textTransform: 'uppercase' as const },
    allCapsRegular: { fontSize: '10px', lineHeight: '10px', fontWeight: 400, textTransform: 'uppercase' as const },
    allCapsBold: { fontSize: '10px', lineHeight: '12px', fontWeight: 700, textTransform: 'uppercase' as const },
    historyText: { fontSize: '10px', lineHeight: '12px', fontWeight: 400 },
    italicSubtext: { fontSize: '10px', lineHeight: '12px', fontWeight: 400, fontStyle: 'italic' as const },
    italicDesc: { fontSize: '14px', lineHeight: '14px', fontWeight: 400, fontStyle: 'italic' as const },
  },
} as const
