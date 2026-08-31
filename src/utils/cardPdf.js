// Print-ready PDF of the business card: two pages, front and back, at exact
// ISO/CR80 card size so it can go straight to a print shop. Everything is
// drawn natively (text stays text, the QR stays vector) rather than screenshot
// into a bitmap, so it stays crisp at any zoom and at 300+ dpi.

import { profile } from '../data/profile.js'
import { badgeSide, circularDataUrl, QR_LOGO_SCALE } from './cardArt.js'

// CR80 / standard business card. 53.98mm rounded to the printer-friendly 54.
const CARD_W = 85.6
const CARD_H = 54

// Fixed dark palette rather than the live CSS variables: the card should look
// the same in the PDF whichever theme the visitor happens to be viewing in.
const BG = '#1e1e1f'
const ACCENT = '#ffdb70'
const TEXT = '#ffffff'
const MUTED = '#9ca3af'
const BORDER = '#383838'
const INK = '#0b0b0c'
const PANEL = '#ffffff'

/**
 * Collapse each row of dark modules into horizontal runs. The card's 77x77
 * symbol is a few thousand individual squares; as runs it is a few hundred
 * rectangles, which keeps the PDF small without changing what a scanner sees.
 */
function darkRuns(qr, n) {
  const runs = []
  for (let r = 0; r < n; r++) {
    let c = 0
    while (c < n) {
      if (!qr.isDark(r, c)) {
        c++
        continue
      }
      let len = 1
      while (c + len < n && qr.isDark(r, c + len)) len++
      runs.push([c, r, len])
      c += len
    }
  }
  return runs
}

// Shrink a label until it fits its column; long emails are the usual offender.
function fitFontSize(doc, text, maxWidth, size, min = 4.2) {
  let s = size
  doc.setFontSize(s)
  while (s > min && doc.getTextWidth(text) > maxWidth) {
    s -= 0.2
    doc.setFontSize(s)
  }
  return s
}

function drawFront(doc, photo) {
  const p = profile

  doc.setFillColor(BG)
  doc.rect(0, 0, CARD_W, CARD_H, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(ACCENT)
  doc.text('haniHashmi();', 6, 9.5)

  // The chip, same detail as the on-screen card.
  doc.setFillColor(ACCENT)
  doc.roundedRect(70.6, 5, 9, 6.6, 1.2, 1.2, 'F')
  doc.setDrawColor(BG)
  doc.setLineWidth(0.25)
  doc.line(70.6, 8.3, 79.6, 8.3)
  doc.line(73.6, 5, 73.6, 11.6)
  doc.line(76.6, 5, 76.6, 11.6)

  let textX = 6
  if (photo) {
    doc.addImage(photo, 'PNG', 6, 25, 14, 14)
    doc.setDrawColor(ACCENT)
    doc.setLineWidth(0.4)
    doc.circle(13, 32, 7, 'S')
    textX = 23
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13.5)
  doc.setTextColor(TEXT)
  doc.text(p.fullName, textX, 32)

  doc.setFontSize(7.5)
  doc.setTextColor(ACCENT)
  doc.text(p.tagline, textX, 37)

  doc.setDrawColor(BORDER)
  doc.setLineWidth(0.2)
  doc.line(6, 43, 79.6, 43)

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(MUTED)
  doc.setFontSize(6.5)
  doc.text(p.location, 6, 47.2)
  fitFontSize(doc, p.stack.join('  ·  '), 73.6, 5.6)
  doc.text(p.stack.join('  ·  '), 6, 50.6)
}

function drawBack(doc, qr, moduleCount, url, badge) {
  const p = profile

  doc.setFillColor(BG)
  doc.rect(0, 0, CARD_W, CARD_H, 'F')

  // White panel behind the symbol: the quiet zone has to stay light or
  // scanners lose the finder patterns. Sized to fill the card's height so the
  // level-H symbol still prints at a comfortable module size.
  const panelX = 4
  const panelY = 4
  const panel = 46
  doc.setFillColor(PANEL)
  doc.roundedRect(panelX, panelY, panel, panel, 2.5, 2.5, 'F')

  const pad = 2.8
  const box = panel - pad * 2
  const unit = box / moduleCount
  doc.setFillColor(INK)
  for (const [c, r, len] of darkRuns(qr, moduleCount)) {
    doc.rect(panelX + pad + c * unit, panelY + pad + r * unit, len * unit, unit, 'F')
  }

  // Centre badge, drawn over the modules exactly as the on-screen code does.
  const mid = panelX + pad + box / 2
  const plate = (moduleCount * QR_LOGO_SCALE * unit) / 2
  doc.setFillColor(PANEL)
  doc.circle(mid, mid, plate, 'F')
  if (badge) {
    const side = badgeSide(plate)
    doc.addImage(badge, 'PNG', mid - side / 2, mid - side / 2, side, side)
  }

  const x = 53.5
  const colW = CARD_W - x - 4

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(TEXT)
  doc.text(p.fullName, x, 13)

  doc.setFontSize(6.5)
  doc.setTextColor(ACCENT)
  doc.text(p.title, x, 17.5)

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(MUTED)
  const rows = [p.email, p.phoneDisplay, p.whatsapp.replace(/^https:\/\//, ''), url.replace(/^https?:\/\//, '')]
  rows.forEach((row, i) => {
    fitFontSize(doc, row, colW, 6)
    doc.text(row, x, 24 + i * 5)
  })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(6)
  doc.setTextColor(TEXT)
  doc.text('Scan to save my contact', x, 46.5)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(5.2)
  doc.setTextColor(MUTED)
  doc.text(p.location, x, 50)
}

/**
 * Build and download the card as a PDF.
 *
 * @param {object} qr           A made qrcode-generator instance.
 * @param {number} moduleCount  Its module count, so the symbol scales exactly.
 * @param {string} url          The live card URL, printed on the back.
 */
export async function downloadCardPdf({ qr, moduleCount, url }) {
  const { jsPDF } = await import('jspdf')

  const doc = new jsPDF({
    unit: 'mm',
    format: [CARD_W, CARD_H],
    orientation: 'landscape',
    compress: true
  })
  doc.setProperties({
    title: `${profile.fullName} — Business Card`,
    author: profile.fullName,
    subject: profile.title
  })

  // Two mattes: the front portrait sits on the card, the QR badge sits on the
  // symbol's white plate, and neither renderer is asked to composite alpha.
  const [photo, badge] = await Promise.all([
    circularDataUrl(profile.photo, { matte: BG }),
    circularDataUrl(profile.photo, { matte: PANEL })
  ])

  drawFront(doc, photo)
  doc.addPage([CARD_W, CARD_H], 'landscape')
  drawBack(doc, qr, moduleCount, url, badge)

  doc.save('Hani-Hashmi-Business-Card.pdf')
}
