<template>
  <svg
    class="qr-svg"
    :viewBox="viewBox"
    :width="size"
    :height="size"
    shape-rendering="crispEdges"
    role="img"
    :aria-label="label"
  >
    <!-- The quiet zone is part of the symbol: always render it light, even in
         dark theme, or scanners lose the finder patterns. -->
    <rect
      :x="-margin"
      :y="-margin"
      :width="count + margin * 2"
      :height="count + margin * 2"
      :fill="bg"
    />

    <!-- All data modules as one path: 1 DOM node instead of ~1600. -->
    <path :d="dataPath" :fill="fg" />

    <!-- Finder eyes drawn separately with a soft radius. -->
    <g :fill="fg" shape-rendering="geometricPrecision">
      <template v-for="(f, i) in finders" :key="i">
        <rect :x="f.c" :y="f.r" width="7" height="7" rx="1.9" :fill="fg" />
        <rect :x="f.c + 1" :y="f.r + 1" width="5" height="5" rx="1.3" :fill="bg" />
        <rect :x="f.c + 2" :y="f.r + 2" width="3" height="3" rx="0.85" :fill="fg" />
      </template>
    </g>

    <!-- Centre badge. The modules underneath are still drawn and simply
         painted over: error correction restores them, and leaving the gap
         empty instead would break the mask pattern. -->
    <g v-if="logo" shape-rendering="geometricPrecision">
      <circle :cx="center" :cy="center" :r="plateRadius" :fill="bg" />
      <image
        :href="logo"
        :x="center - badgeSize / 2"
        :y="center - badgeSize / 2"
        :width="badgeSize"
        :height="badgeSize"
        preserveAspectRatio="xMidYMid slice"
      />
    </g>
  </svg>
</template>

<script>
import qrcode from 'qrcode-generator'
import { badgeSide } from '../utils/cardArt.js'

export default {
  name: 'QrCode',
  props: {
    value: { type: String, required: true },
    size: { type: Number, default: 240 },
    // 'M' recovers 15% and keeps a card-sized payload compact. Anything
    // carrying a centre badge should ask for 'H' instead.
    ec: { type: String, default: 'M' },
    margin: { type: Number, default: 3 },
    fg: { type: String, default: '#0b0b0c' },
    bg: { type: String, default: '#ffffff' },
    label: { type: String, default: 'QR code' },
    // Square data URL painted over the middle of the symbol. Its corners are
    // expected to be matted to `bg`; see circularDataUrl in utils/cardArt.
    logo: { type: String, default: '' },
    // Badge diameter as a fraction of the symbol width. See QR_LOGO_SCALE.
    logoScale: { type: Number, default: 0.28 }
  },
  computed: {
    qr() {
      const qr = qrcode(0, this.ec)
      qr.addData(this.value)
      qr.make()
      return qr
    },
    count() {
      return this.qr.getModuleCount()
    },
    viewBox() {
      const m = this.margin
      return `${-m} ${-m} ${this.count + m * 2} ${this.count + m * 2}`
    },
    center() {
      return this.count / 2
    },
    plateRadius() {
      return (this.count * this.logoScale) / 2
    },
    badgeSize() {
      return badgeSide(this.plateRadius)
    },
    finders() {
      const n = this.count
      return [
        { r: 0, c: 0 },
        { r: 0, c: n - 7 },
        { r: n - 7, c: 0 }
      ]
    },
    dataPath() {
      const { qr, count: n } = this
      let d = ''
      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          if (this.inFinder(r, c) || !qr.isDark(r, c)) continue
          d += `M${c} ${r}h1v1h-1z`
        }
      }
      return d
    }
  },
  methods: {
    // The 7x7 eye plus its 1-module separator, so the path never
    // paints over the rounded eyes.
    inFinder(r, c) {
      const n = this.count
      return (
        (r < 8 && c < 8) || (r < 8 && c >= n - 8) || (r >= n - 8 && c < 8)
      )
    },
    /**
     * Rasterise to a PNG data URL for download. Uses plain square modules,
     * the shape verified to decode, at print-friendly resolution.
     */
    async toPngDataUrl({ scale = 12, margin = 4 } = {}) {
      const { qr, count: n } = this
      const px = (n + margin * 2) * scale
      const canvas = document.createElement('canvas')
      canvas.width = px
      canvas.height = px
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, px, px)
      ctx.fillStyle = '#0b0b0c'
      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          if (!qr.isDark(r, c)) continue
          ctx.fillRect((c + margin) * scale, (r + margin) * scale, scale, scale)
        }
      }

      if (this.logo) {
        try {
          const img = new Image()
          img.src = this.logo
          await img.decode()
          const mid = (margin + n / 2) * scale
          const plate = this.plateRadius * scale
          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(mid, mid, plate, 0, Math.PI * 2)
          ctx.fill()
          const side = badgeSide(plate)
          ctx.drawImage(img, mid - side / 2, mid - side / 2, side, side)
        } catch {
          // A missing badge is cosmetic; the plain symbol still scans.
        }
      }

      return canvas.toDataURL('image/png')
    }
  }
}
</script>

<style scoped>
.qr-svg {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
