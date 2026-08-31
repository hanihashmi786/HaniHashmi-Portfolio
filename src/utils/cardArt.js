// Shared artwork helpers for the business card: the circular portrait used as
// the card avatar and as the badge in the middle of the QR code.

/**
 * Diameter of the QR's centre badge as a fraction of the symbol width.
 *
 * At 0.28 the badge covers pi * 0.14^2 = ~6% of the symbol. The card's QR is
 * generated at error-correction level H, which restores 30% of the codewords,
 * so even halving that for errors at unknown positions leaves roughly twice
 * the headroom the badge needs. Raise this and the code stops scanning.
 */
export const QR_LOGO_SCALE = 0.28

/**
 * Circle-crop an image and hand it back as a square PNG data URL.
 *
 * `matte` fills the area outside the circle instead of leaving it
 * transparent. Callers draw the badge inscribed in a plate of the same
 * colour, so the square corners disappear into it — which avoids depending
 * on PNG alpha surviving every renderer, jsPDF in particular.
 *
 * Resolves to null if the image cannot be loaded, so callers can fall back
 * to rendering without it rather than failing outright.
 */
export async function circularDataUrl(src, { px = 512, matte = null } = {}) {
  try {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src
    await img.decode()

    const canvas = document.createElement('canvas')
    canvas.width = px
    canvas.height = px
    const ctx = canvas.getContext('2d')

    if (matte) {
      ctx.fillStyle = matte
      ctx.fillRect(0, 0, px, px)
    }

    ctx.save()
    ctx.beginPath()
    ctx.arc(px / 2, px / 2, px / 2, 0, Math.PI * 2)
    ctx.clip()
    // object-fit: cover, so a portrait source is never squashed. Matches the
    // square centre crop the About page already shows.
    const scale = Math.max(px / img.naturalWidth, px / img.naturalHeight)
    const w = img.naturalWidth * scale
    const h = img.naturalHeight * scale
    ctx.drawImage(img, (px - w) / 2, (px - h) / 2, w, h)
    ctx.restore()

    return canvas.toDataURL('image/png')
  } catch {
    return null
  }
}

/**
 * Side of the square the badge image is drawn at, given the plate radius.
 * The square is inscribed in the plate circle, so its matted corners stay
 * inside the plate and never paint over QR modules.
 */
export function badgeSide(plateRadius) {
  return plateRadius * Math.SQRT2
}
