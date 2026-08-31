<template>
  <div class="px-5 py-5 md:px-12 md:py-10 mx-3 min-h-[70vh]">
    <article>
      <header>
        <div class="text-2xl font-bold mb-3 fadein-bot title-section flex items-center justify-center flex-col">
          <h4 style="color: var(--text)">Digital Business Card</h4>
          <p class="text-base font-normal mt-2 text-center max-w-lg" style="color: var(--text-muted)">
            Scan the code to drop me straight into your contacts. No typing, no app needed.
          </p>
        </div>
      </header>

      <!-- ================= CARD ================= -->
      <section class="mt-10 flex flex-col items-center">
        <div
          class="card-stage fadein-bot"
          @pointermove="onTilt"
          @pointerleave="resetTilt"
        >
          <div
            class="card-3d"
            :class="{ 'is-flipped': flipped }"
            :style="tiltStyle"
            @click="onCardClick"
          >
            <!-- ---------- FRONT ---------- -->
            <div class="face face-front" :aria-hidden="flipped">
              <div class="sheen" aria-hidden="true"></div>
              <div class="glow" aria-hidden="true"></div>

              <div class="face-inner">
                <div class="flex items-start justify-between">
                  <span class="brand">haniHashmi();</span>
                  <!-- Chip: the detail that sells the "real card" metaphor -->
                  <svg class="chip" viewBox="0 0 40 30" aria-hidden="true">
                    <defs>
                      <linearGradient id="chipG" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="var(--accent)" stop-opacity=".95" />
                        <stop offset="100%" stop-color="var(--accent)" stop-opacity=".45" />
                      </linearGradient>
                    </defs>
                    <rect x=".75" y=".75" width="38.5" height="28.5" rx="5" fill="url(#chipG)" />
                    <g stroke="var(--bg-card)" stroke-width="1.4" opacity=".65">
                      <path d="M0 10h13M27 10h13M0 20h13M27 20h13M13 0v30M27 0v30" />
                    </g>
                    <rect x="13" y="10" width="14" height="10" rx="2" fill="none"
                      stroke="var(--bg-card)" stroke-width="1.4" opacity=".65" />
                  </svg>
                </div>

                <div class="mt-auto text-left">
                  <h2 class="card-name">{{ p.fullName }}</h2>
                  <p class="card-role">{{ p.tagline }}</p>
                </div>

                <div class="divider"></div>

                <div class="flex items-end justify-between gap-3">
                  <div class="text-left min-w-0">
                    <p class="card-meta">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {{ p.location }}
                    </p>
                    <p class="card-stack">{{ p.stack.join(' · ') }}</p>
                  </div>
                  <span class="flip-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4 4v5h5M20 20v-5h-5M20 9A8 8 0 006.3 5.7M4 15a8 8 0 0013.7 3.3" />
                    </svg>
                    QR
                  </span>
                </div>
              </div>
            </div>

            <!-- ---------- BACK ---------- -->
            <div class="face face-back" :aria-hidden="!flipped">
              <div class="glow" aria-hidden="true"></div>

              <div class="face-inner back-grid">
                <button
                  type="button"
                  class="qr-panel"
                  @click.stop="zoomed = true"
                  :aria-label="`Enlarge QR code: ${modeLabel}`"
                >
                  <QrCode ref="qr" :value="qrValue" :size="qrSize" :label="modeLabel" />
                </button>

                <div class="back-details text-left">
                  <p class="back-name">{{ p.fullName }}</p>
                  <p class="back-title">{{ p.title }}</p>

                  <ul class="back-list">
                    <li>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span class="truncate">{{ p.email }}</span>
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{{ p.phoneDisplay }}</span>
                    </li>
                    <li>
                      <svg class="wa-icon" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                        <path :d="waPath" />
                      </svg>
                      <span>Chat on WhatsApp</span>
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                      <span>/in/hanihashmi</span>
                    </li>
                  </ul>

                  <p class="scan-note">{{ modeHint }}</p>
                  <p class="scan-sub">Tap the code to enlarge</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ================= CONTROLS ================= -->
        <div class="mt-7 flex flex-col items-center gap-5 w-full max-w-[620px]">
          <button type="button" class="btn btn-accent w-full sm:w-auto" @click="flipped = !flipped">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M4 4v5h5M20 20v-5h-5M20 9A8 8 0 006.3 5.7M4 15a8 8 0 0013.7 3.3" />
            </svg>
            {{ flipped ? 'Show card front' : 'Flip to QR code' }}
          </button>

          <!-- QR payload switch -->
          <div class="mode-switch" role="group" aria-label="QR code content">
            <button
              type="button"
              :class="['mode-btn', { active: mode === 'vcard' }]"
              :aria-pressed="mode === 'vcard'"
              @click="setMode('vcard')"
            >
              Contact
            </button>
            <button
              type="button"
              :class="['mode-btn', { active: mode === 'whatsapp' }]"
              :aria-pressed="mode === 'whatsapp'"
              @click="setMode('whatsapp')"
            >
              WhatsApp
            </button>
            <button
              type="button"
              :class="['mode-btn', { active: mode === 'url' }]"
              :aria-pressed="mode === 'url'"
              @click="setMode('url')"
            >
              Portfolio
            </button>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
            <a :href="p.whatsapp" target="_blank" rel="noopener" class="btn btn-ghost btn-wa">
              <svg class="wa-icon" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path :d="waPath" />
              </svg>
              WhatsApp
            </a>
            <a :href="`mailto:${p.email}`" class="btn btn-ghost">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
            <button type="button" class="btn btn-ghost" @click="saveVCard">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
              </svg>
              Save contact
            </button>
            <button type="button" class="btn btn-ghost" @click="share">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7M16 6l-4-4-4 4M12 2v14" />
              </svg>
              Share
            </button>
            <button type="button" class="btn btn-ghost" @click="copyLink">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
              </svg>
              Copy link
            </button>
            <button type="button" class="btn btn-ghost" @click="downloadQr">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <path stroke-linecap="round" d="M14 14h3v3h-3zM20 14h1M14 20h3M20 17v4" />
              </svg>
              Download QR
            </button>
          </div>
        </div>
      </section>

      <div class="pb-32"></div>
    </article>

    <!-- ================= FULLSCREEN QR ================= -->
    <div v-if="zoomed" class="qr-modal" @click="zoomed = false">
      <div class="qr-modal-inner" role="dialog" aria-modal="true" aria-label="QR code" @click.stop>
        <div class="qr-modal-panel">
          <QrCode :value="qrValue" :size="320" :label="modeLabel" />
        </div>
        <p class="qr-modal-title">{{ p.fullName }}</p>
        <p class="qr-modal-sub">{{ modeHint }}</p>
        <button type="button" class="btn btn-accent mt-5" @click="zoomed = false">Close</button>
      </div>
    </div>

    <!-- Toast -->
    <transition name="toast">
      <div v-if="toast" class="toast" role="status" aria-live="polite">{{ toast }}</div>
    </transition>
  </div>
</template>

<script>
import QrCode from '../components/QrCode.vue'
import { profile, buildVCard, cardUrl } from '../data/profile.js'

export default {
  name: 'BusinessCardView',
  components: { QrCode },
  data() {
    return {
      p: profile,
      flipped: false,
      zoomed: false,
      mode: 'vcard',
      origin: '',
      toast: '',
      tilt: { x: 0, y: 0 },
      reduceMotion: false,
      toastTimer: null,
      // Same glyph the Contact page uses, kept here as data to avoid
      // repeating the path in two places in the template.
      waPath:
        'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'
    }
  },
  computed: {
    url() {
      // Empty until mounted (SSR-safe); falls back to a relative path.
      return this.origin ? `${this.origin}/card` : '/card'
    },
    qrValue() {
      if (this.mode === 'url') return this.url
      if (this.mode === 'whatsapp') return this.p.whatsapp
      return buildVCard({ compact: true, url: this.url })
    },
    modeLabel() {
      if (this.mode === 'url') return 'QR code linking to the portfolio'
      if (this.mode === 'whatsapp') return 'QR code opening a WhatsApp chat'
      return 'QR code with contact details for Hani Hashmi'
    },
    modeHint() {
      if (this.mode === 'url') return 'Scan to open this portfolio.'
      if (this.mode === 'whatsapp') return 'Scan to message me on WhatsApp.'
      return 'Scan to save me to your contacts.'
    },
    qrSize() {
      return 210
    },
    tiltStyle() {
      const { x, y } = this.tilt
      return {
        transform: `rotateX(${x}deg) rotateY(${y + (this.flipped ? 180 : 0)}deg)`
      }
    }
  },
  mounted() {
    this.origin = window.location.origin
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.addEventListener('keydown', this.onKeydown)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKeydown)
    clearTimeout(this.toastTimer)
  },
  methods: {
    onKeydown(e) {
      if (e.key === 'Escape' && this.zoomed) this.zoomed = false
    },
    onCardClick(e) {
      // Let the QR panel open the zoom overlay without also flipping.
      if (e.target.closest('button')) return
      this.flipped = !this.flipped
    },
    onTilt(e) {
      // Fine pointers only: on touch this fires mid-scroll and looks jittery.
      if (this.reduceMotion || e.pointerType !== 'mouse') return
      const r = e.currentTarget.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      this.tilt = { x: (0.5 - py) * 12, y: (px - 0.5) * 14 }
      e.currentTarget.style.setProperty('--mx', `${px * 100}%`)
      e.currentTarget.style.setProperty('--my', `${py * 100}%`)
    },
    resetTilt() {
      this.tilt = { x: 0, y: 0 }
    },
    setMode(mode) {
      this.mode = mode
      this.flipped = true
    },
    showToast(msg) {
      this.toast = msg
      clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => (this.toast = ''), 2200)
    },
    saveVCard() {
      // Full record here; the QR carries the trimmed one.
      const blob = new Blob([buildVCard({ compact: false, url: this.url })], {
        type: 'text/vcard;charset=utf-8'
      })
      const href = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = href
      a.download = 'Hani-Hashmi.vcf'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(href)
      this.showToast('Contact card downloaded')
    },
    downloadQr() {
      // Both faces stay mounted, so the ref resolves whichever side is showing.
      const qr = this.$refs.qr
      if (!qr) return
      const a = document.createElement('a')
      a.href = qr.toPngDataUrl()
      a.download = `hani-hashmi-qr-${this.mode}.png`
      document.body.appendChild(a)
      a.click()
      a.remove()
      this.showToast('QR code downloaded')
    },
    async share() {
      const payload = {
        title: `${this.p.fullName}, ${this.p.title}`,
        text: `${this.p.fullName}, ${this.p.tagline} based in ${this.p.location}.`,
        url: this.url
      }
      if (navigator.share) {
        try {
          await navigator.share(payload)
          return
        } catch (err) {
          // User dismissed the sheet; not an error worth surfacing.
          if (err && err.name === 'AbortError') return
        }
      }
      this.copyLink()
    },
    async copyLink() {
      try {
        await navigator.clipboard.writeText(this.url)
        this.showToast('Link copied to clipboard')
      } catch {
        this.showToast(this.url)
      }
    }
  }
}
</script>

<style scoped>
/* ---------------- stage + 3D ---------------- */
.card-stage {
  perspective: 1400px;
  width: min(94vw, 460px);
  --mx: 50%;
  --my: 50%;
}

.card-3d {
  position: relative;
  width: 100%;
  aspect-ratio: 1.586 / 1;
  transform-style: preserve-3d;
  transition: transform 0.85s cubic-bezier(0.2, 0.8, 0.2, 1);
  cursor: pointer;
}

.card-3d.is-flipped {
  transition: transform 0.85s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.face {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: 0 18px 45px -12px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(var(--accent-rgb), 0.08);
}

.face-back {
  transform: rotateY(180deg);
}

.face[aria-hidden='true'] {
  pointer-events: none;
}

.face-inner {
  position: relative;
  z-index: 2;
  height: 100%;
  padding: clamp(14px, 4.2%, 22px);
  display: flex;
  flex-direction: column;
}

/* Accent wash + pointer-tracked sheen */
.glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(120% 90% at 100% 0%, rgba(var(--accent-rgb), 0.16), transparent 55%),
    radial-gradient(90% 80% at 0% 100%, rgba(var(--accent-rgb), 0.08), transparent 60%);
  z-index: 1;
}

.sheen {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: radial-gradient(
    circle at var(--mx) var(--my),
    rgba(255, 255, 255, 0.16),
    transparent 42%
  );
  opacity: 0;
  transition: opacity 0.35s ease;
}

.card-stage:hover .sheen {
  opacity: 1;
}

/* ---------------- front ---------------- */
.brand {
  font-weight: 600;
  font-size: clamp(0.78rem, 2.6vw, 0.95rem);
  color: var(--accent);
  letter-spacing: -0.01em;
}

.chip {
  width: clamp(30px, 8.5%, 40px);
  height: auto;
}

.card-name {
  font-size: clamp(1.35rem, 5.4vw, 1.95rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--text);
  letter-spacing: -0.02em;
}

.card-role {
  margin-top: 2px;
  font-size: clamp(0.75rem, 2.9vw, 0.95rem);
  font-weight: 600;
  background-image: linear-gradient(to right, var(--gradient-from), var(--gradient-to));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.divider {
  height: 1px;
  margin: clamp(8px, 3%, 14px) 0;
  background: linear-gradient(
    to right,
    rgba(var(--accent-rgb), 0.55),
    var(--border) 45%,
    transparent
  );
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: clamp(0.62rem, 2.3vw, 0.75rem);
  color: var(--text-muted);
}

.card-meta svg {
  width: 12px;
  height: 12px;
  flex: none;
  color: var(--accent);
}

.card-stack {
  margin-top: 3px;
  font-size: clamp(0.58rem, 2.1vw, 0.7rem);
  color: var(--text-muted);
  opacity: 0.75;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.flip-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex: none;
  padding: 4px 9px;
  border-radius: 999px;
  font-size: clamp(0.55rem, 2vw, 0.65rem);
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--accent);
  border: 1px solid rgba(var(--accent-rgb), 0.35);
  background: rgba(var(--accent-rgb), 0.08);
}

.flip-badge svg {
  width: 11px;
  height: 11px;
}

/* ---------------- back ---------------- */
.back-grid {
  flex-direction: row;
  gap: clamp(10px, 3.5%, 18px);
  align-items: center;
}

.qr-panel {
  position: relative;
  flex: none;
  /* Slightly inset from full height so the detail column has room for the
     full email address instead of ellipsising it. */
  align-self: center;
  height: 90%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(5px, 1.8%, 9px);
  border-radius: 14px;
  /* Always light: the QR quiet zone must stay high-contrast in both themes. */
  background: #ffffff;
  box-shadow: 0 6px 18px -6px rgba(0, 0, 0, 0.45);
}

/* Square viewBox, so filling the square panel keeps modules undistorted. */
.qr-panel :deep(.qr-svg) {
  width: 100%;
  height: 100%;
}

.back-details {
  min-width: 0;
  flex: 1;
}

.back-name {
  font-size: clamp(0.9rem, 3.4vw, 1.15rem);
  font-weight: 700;
  color: var(--text);
  line-height: 1.15;
}

.back-title {
  font-size: clamp(0.62rem, 2.3vw, 0.75rem);
  color: var(--accent);
  font-weight: 600;
  margin-bottom: clamp(6px, 2.5%, 10px);
}

.back-list {
  display: flex;
  flex-direction: column;
  gap: clamp(4px, 1.8%, 7px);
}

.back-list li {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: clamp(0.5rem, 1.9vw, 0.66rem);
  color: var(--text-muted);
  min-width: 0;
}

.back-list svg {
  width: 12px;
  height: 12px;
  flex: none;
  color: var(--accent);
}

/* WhatsApp brand green reads instantly, in either theme. */
.wa-icon {
  color: #25d366;
}

.scan-note {
  margin-top: clamp(6px, 2.5%, 11px);
  font-size: clamp(0.55rem, 2vw, 0.68rem);
  color: var(--text);
  font-weight: 600;
}

.scan-sub {
  font-size: clamp(0.5rem, 1.8vw, 0.6rem);
  color: var(--text-muted);
  opacity: 0.8;
}

/* ---------------- controls ---------------- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
  border: 1px solid var(--border);
  color: var(--text-muted);
  background: var(--bg-card);
  transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease,
    border-color 0.2s ease;
}

.btn svg {
  width: 15px;
  height: 15px;
  flex: none;
}

.btn:hover {
  transform: translateY(-2px);
  background: var(--bg-card-hover);
  color: var(--text);
}

.btn-accent {
  color: var(--accent);
  border-color: var(--accent);
}

.btn-accent:hover {
  color: var(--accent);
}

.btn-wa:hover {
  border-color: rgba(37, 211, 102, 0.5);
}

.mode-switch {
  display: inline-flex;
  padding: 4px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg-card);
}

.mode-btn {
  padding: 7px 16px;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--text-muted);
  transition: background-color 0.25s ease, color 0.25s ease;
}

.mode-btn.active {
  background: rgba(var(--accent-rgb), 0.14);
  color: var(--accent);
}

/* Keep the three pills on one row on narrow phones. */
@media (max-width: 420px) {
  .mode-btn {
    padding: 7px 11px;
    font-size: 0.71rem;
  }
}

/* ---------------- modal + toast ---------------- */
.qr-modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.78);
  backdrop-filter: blur(6px);
}

.qr-modal-inner {
  text-align: center;
}

.qr-modal-panel {
  display: inline-block;
  padding: 18px;
  border-radius: 22px;
  background: #ffffff;
  box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.7);
}

.qr-modal-panel :deep(.qr-svg) {
  width: min(72vw, 320px);
  height: auto;
}

.qr-modal-title {
  margin-top: 16px;
  font-weight: 700;
  color: #ffffff;
}

.qr-modal-sub {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.7);
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 96px;
  transform: translateX(-50%);
  z-index: 210;
  padding: 10px 20px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text);
  background: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: 0 12px 30px -8px rgba(0, 0, 0, 0.6);
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 10px);
}

@media (prefers-reduced-motion: reduce) {
  .card-3d,
  .btn,
  .sheen {
    transition: none;
  }
}

/* Printing the page yields a clean, cuttable card. */
@media print {
  .btn,
  .mode-switch,
  .qr-modal,
  .toast,
  .qr-hint {
    display: none !important;
  }

  .card-3d {
    transform: none !important;
  }

  .face {
    position: relative;
    box-shadow: none;
    border: 1px solid #999;
    page-break-inside: avoid;
  }

  .face-back {
    transform: none;
    margin-top: 12px;
  }
}
</style>
