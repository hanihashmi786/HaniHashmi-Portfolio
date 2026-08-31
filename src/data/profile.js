// Single source of truth for the digital business card + vCard exports.
// Kept in sync with ContactView.vue and HomeView.vue.

export const profile = {
  firstName: 'Hani',
  lastName: 'Hashmi',
  fullName: 'Hani Hashmi',
  title: 'Software Engineer',
  // Same portrait the About page uses, so the card and the site never drift.
  photo: '/images/profile-about.jpeg',
  tagline: 'Full Stack Developer',
  org: 'Freelance / Independent',
  email: 'hanimhashmi121@gmail.com',
  // E.164 for links, pretty form for display.
  phone: '+966539429379',
  phoneDisplay: '+966 539 429 379',
  city: 'Riyadh',
  country: 'Saudi Arabia',
  location: 'Riyadh, Saudi Arabia',
  whatsapp: 'https://wa.me/966539429379',
  linkedin: 'https://linkedin.com/in/hanihashmi',
  github: 'https://github.com/hanihashmi786',
  stack: ['React', 'React Native', 'Vue', 'Node', 'Python', 'Django'],
  summary:
    'Software Engineer with ~3 years of experience in Full Stack Development. React.js, React Native, Python (Flask/Django) and the MERN stack.'
}

// Resolve the live origin at runtime so the QR is always correct on
// localhost, Vercel previews and the production domain alike.
export function siteOrigin() {
  if (typeof window === 'undefined') return ''
  return window.location.origin
}

export function cardUrl() {
  return `${siteOrigin()}/card`
}

// vCard escaping: backslash, comma, semicolon and newline are special.
function esc(value) {
  return String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}

/**
 * Build a vCard 3.0 payload.
 *
 * `compact` trims it to the fields worth carrying inside a QR: every extra
 * byte pushes the symbol to a higher version (denser modules), which is what
 * makes a card QR hard to scan from a phone. The full record ships in the
 * downloadable .vcf instead.
 */
export function buildVCard({ compact = false, url = '' } = {}) {
  const p = profile
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${esc(p.lastName)};${esc(p.firstName)};;;`,
    `FN:${esc(p.fullName)}`,
    `TITLE:${esc(p.title)}`,
    `TEL;TYPE=CELL:${p.phone}`,
    `EMAIL;TYPE=INTERNET:${p.email}`
  ]

  if (url) lines.push(`URL:${url}`)

  // Measured: the fields below push the symbol from 57x57 to 93x93 modules,
  // which stops scanning reliably at card size. They ride in the .vcf instead.
  if (!compact) {
    lines.push(
      `ORG:${esc(p.org)}`,
      `ROLE:${esc(p.tagline)}`,
      `ADR;TYPE=WORK:;;;${esc(p.city)};;;${esc(p.country)}`,
      `X-SOCIALPROFILE;TYPE=whatsapp:${p.whatsapp}`,
      `X-SOCIALPROFILE;TYPE=linkedin:${p.linkedin}`,
      `X-SOCIALPROFILE;TYPE=github:${p.github}`,
      `NOTE:${esc(p.summary)}`
    )
  }

  lines.push('END:VCARD')
  // RFC 6350 wants CRLF; iOS/Android importers are strict about it.
  return lines.join('\r\n')
}
