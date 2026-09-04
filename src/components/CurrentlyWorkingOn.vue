<script>
import { currentWork, STATUS } from '../data/projects.js'

export default {
  name: 'CurrentlyWorkingOn',
  data() {
    return {
      work: currentWork,
      broken: {},
      visible: false
    }
  },
  mounted() {
    // Reveal on scroll: the block sits below the hero, so animate it when it
    // actually enters the viewport instead of on page load.
    if (!('IntersectionObserver' in window)) {
      this.visible = true
      return
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.visible = true
          this.observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    )
    this.observer.observe(this.$el)
  },
  beforeUnmount() {
    if (this.observer) this.observer.disconnect()
  },
  methods: {
    statusOf(p) {
      return STATUS[p.status] || STATUS.live
    },
    onImgError(id) {
      this.broken[id] = true
    }
  }
}
</script>

<template>
  <section class="cwo px-5 md:px-12 mx-3 pb-32 md:pb-20" :class="{ 'is-visible': visible }" aria-labelledby="cwo-title">
    <header class="cwo-head rise">
      <div class="cwo-head-main">
        <span class="cwo-kicker">
          <span class="cwo-pulse" aria-hidden="true"></span>
          Currently Working On
        </span>
        <h2 id="cwo-title" class="cwo-title">Two products in flight for the Saudi market</h2>
        <p class="cwo-sub">
          Product Developer at Otaishan Investments, Riyadh. Each platform is owned end-to-end:
          mobile app, web, backend, admin platform and release.
        </p>
      </div>
      <ul class="cwo-meta" aria-label="Role details">
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          Otaishan Investments
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Riyadh, Saudi Arabia
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          Since Oct 2025
        </li>
      </ul>
    </header>

    <div class="cwo-grid">
      <div v-for="(p, i) in work" :key="p.id" class="rise" :style="{ animationDelay: (0.15 + i * 0.15) + 's' }">
        <article class="cwo-card" :style="{ '--brand': p.color, '--status-color': statusOf(p).color }">
          <div class="cwo-cover">
            <img v-if="!broken[p.id]" class="cwo-cover-img" :src="p.image" :alt="p.name + ' preview'" loading="lazy" @error="onImgError(p.id)" />
            <div v-else class="cwo-cover-fallback">{{ p.name }}</div>
            <div class="cwo-cover-shade" aria-hidden="true"></div>
            <span class="cwo-status">
              <span class="cwo-status-dot" aria-hidden="true"></span>
              {{ statusOf(p).label }}
            </span>
            <img class="cwo-logo" :src="p.icon" alt="" aria-hidden="true" />
          </div>

          <div class="cwo-body">
            <div class="cwo-name-row">
              <div class="min-w-0">
                <h3 class="cwo-name">{{ p.name }}</h3>
                <p class="cwo-tagline">{{ p.tagline }}</p>
              </div>
              <a :href="p.website" target="_blank" rel="noopener" class="cwo-iconlink" :aria-label="'Open ' + p.websiteLabel" :title="p.websiteLabel">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>

            <p class="cwo-desc">{{ p.description }}</p>

            <ol class="cwo-phases" :aria-label="p.name + ' delivery progress'">
              <li v-for="(ph, pi) in p.phases" :key="ph" :class="{ done: pi < p.phase, now: pi === p.phase }" :aria-current="pi === p.phase ? 'step' : null">
                <span class="ph-dot" aria-hidden="true"></span>
                <span class="ph-label">{{ ph }}</span>
              </li>
            </ol>
            <p class="cwo-note">{{ p.statusNote }}</p>

            <ul class="cwo-highlights">
              <li v-for="h in p.highlights" :key="h">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span>{{ h }}</span>
              </li>
            </ul>

            <div class="cwo-stack">
              <span v-for="s in p.stack" :key="s" class="cwo-chip">{{ s }}</span>
            </div>
          </div>

          <footer class="cwo-foot">
            <span class="cwo-org">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              {{ p.org }}
            </span>
            <a :href="p.website" target="_blank" rel="noopener" class="cwo-visit">
              {{ p.websiteLabel }}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </footer>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cwo {
  max-width: 72rem;
  margin-left: auto;
  margin-right: auto;
}

/* ---------- reveal ---------- */
.rise {
  opacity: 0;
  transform: translateY(26px);
}

.is-visible .rise {
  animation: cwoRise 0.65s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
}

@keyframes cwoRise {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ---------- header ---------- */
.cwo-head {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-align: center;
  margin-bottom: 1.75rem;
}

@media (min-width: 768px) {
  .cwo-head {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    text-align: left;
    gap: 2rem;
  }
}

.cwo-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  background: rgba(var(--accent-rgb), 0.1);
  border: 1px solid rgba(var(--accent-rgb), 0.25);
}

.cwo-pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  animation: cwoPulse 1.8s ease-out infinite;
}

@keyframes cwoPulse {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.55); }
  70% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

.cwo-title {
  margin-top: 0.9rem;
  font-size: 1.55rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--text);
}

@media (min-width: 768px) {
  .cwo-title {
    font-size: 1.9rem;
  }
}

.cwo-sub {
  margin-top: 0.5rem;
  max-width: 40rem;
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--text-muted);
}

.cwo-meta {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  flex: none;
}

.cwo-meta li {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  font-size: 0.72rem;
  color: var(--text-muted);
  background: var(--bg-card);
  border: 1px solid var(--border);
}

.cwo-meta svg {
  width: 13px;
  height: 13px;
  color: var(--accent);
}

@media (min-width: 768px) {
  .cwo-meta {
    flex-direction: column;
    align-items: flex-end;
  }
}

/* ---------- grid + card ---------- */
.cwo-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 900px) {
  .cwo-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.cwo-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  text-align: left;
  background: var(--bg-card);
  border: 1px solid var(--border);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.cwo-card:hover {
  transform: translateY(-6px);
  border-color: rgba(var(--accent-rgb), 0.45);
  box-shadow: 0 28px 48px -28px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(var(--accent-rgb), 0.08);
}

/* cover */
.cwo-cover {
  position: relative;
  height: 170px;
  background: var(--brand);
}

@media (min-width: 768px) {
  .cwo-cover {
    height: 200px;
  }
}

.cwo-cover-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.cwo-card:hover .cwo-cover-img {
  transform: scale(1.04);
}

.cwo-cover-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #fff;
  background: linear-gradient(135deg, var(--brand), rgba(0, 0, 0, 0.55));
}

.cwo-cover-shade {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(to top, var(--bg-card) 0%, rgba(0, 0, 0, 0) 50%);
}

.cwo-status {
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.32rem 0.7rem;
  border-radius: 999px;
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #fff;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.cwo-status-dot {
  position: relative;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--status-color);
}

.cwo-status-dot::after {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 2px solid var(--status-color);
  opacity: 0.8;
  animation: cwoRing 1.8s ease-out infinite;
}

@keyframes cwoRing {
  0% { transform: scale(0.5); opacity: 0.8; }
  100% { transform: scale(1.9); opacity: 0; }
}

.cwo-logo {
  position: absolute;
  left: 1.25rem;
  bottom: -22px;
  width: 56px;
  height: 56px;
  border-radius: 15px;
  background: var(--bg-card);
  border: 3px solid var(--bg-card);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.35);
}

/* body */
.cwo-body {
  flex: 1;
  padding: 2.2rem 1.25rem 1.25rem;
}

.cwo-name-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.cwo-name {
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--text);
}

.cwo-tagline {
  margin-top: 0.2rem;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--accent);
}

.cwo-iconlink {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  color: var(--text-muted);
  background: rgba(var(--accent-rgb), 0.08);
  border: 1px solid var(--border);
  transition: color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}

.cwo-iconlink svg {
  width: 16px;
  height: 16px;
}

.cwo-iconlink:hover {
  color: var(--accent);
  border-color: rgba(var(--accent-rgb), 0.5);
  transform: translateY(-2px);
}

.cwo-desc {
  margin-top: 0.8rem;
  font-size: 0.86rem;
  line-height: 1.65;
  color: var(--text-muted);
}

/* phase stepper */
.cwo-phases {
  list-style: none;
  display: flex;
  margin: 1.2rem 0 0;
  padding: 0;
}

.cwo-phases li {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.cwo-phases li::before {
  content: '';
  position: absolute;
  top: 5px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: var(--border);
}

.cwo-phases li:last-child::before {
  display: none;
}

.cwo-phases li.done::before {
  background: var(--accent);
}

.ph-dot {
  position: relative;
  z-index: 1;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 2px solid var(--border);
  transition: background 0.3s ease, border-color 0.3s ease;
}

.cwo-phases li.done .ph-dot {
  background: var(--accent);
  border-color: var(--accent);
}

.cwo-phases li.now .ph-dot {
  background: var(--accent);
  border-color: var(--accent);
  box-shadow: 0 0 0 4px rgba(var(--accent-rgb), 0.22);
  animation: cwoStep 2s ease-in-out infinite;
}

@keyframes cwoStep {
  0%, 100% { box-shadow: 0 0 0 4px rgba(var(--accent-rgb), 0.22); }
  50% { box-shadow: 0 0 0 7px rgba(var(--accent-rgb), 0.08); }
}

.ph-label {
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-align: center;
  line-height: 1.2;
  color: var(--text-muted);
  opacity: 0.75;
}

.cwo-phases li.done .ph-label {
  color: var(--text-secondary);
  opacity: 1;
}

.cwo-phases li.now .ph-label {
  color: var(--accent);
  opacity: 1;
}

.cwo-note {
  margin-top: 0.7rem;
  text-align: center;
  font-size: 0.74rem;
  font-style: italic;
  color: var(--text-muted);
}

/* highlights */
.cwo-highlights {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin: 1rem 0 0;
  padding: 0.95rem 0 0;
  border-top: 1px solid var(--border);
}

.cwo-highlights li {
  display: flex;
  gap: 0.55rem;
  font-size: 0.8rem;
  line-height: 1.55;
  color: var(--text-muted);
}

.cwo-highlights svg {
  flex: none;
  width: 15px;
  height: 15px;
  margin-top: 3px;
  color: var(--accent);
}

/* stack chips */
.cwo-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1rem;
}

.cwo-chip {
  padding: 0.28rem 0.62rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: rgba(var(--accent-rgb), 0.08);
  border: 1px solid rgba(var(--accent-rgb), 0.18);
}

/* footer */
.cwo-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem 1.25rem;
  border-top: 1px solid var(--border);
  background: rgba(var(--accent-rgb), 0.03);
}

.cwo-org {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  color: var(--text-muted);
}

.cwo-org svg {
  width: 14px;
  height: 14px;
  color: var(--accent);
}

.cwo-visit {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--accent);
  transition: gap 0.25s ease;
}

.cwo-visit svg {
  width: 14px;
  height: 14px;
}

.cwo-visit:hover {
  gap: 0.6rem;
}

@media (prefers-reduced-motion: reduce) {
  .rise,
  .is-visible .rise {
    opacity: 1;
    transform: none;
    animation: none;
  }

  .cwo-pulse,
  .cwo-status-dot::after,
  .cwo-phases li.now .ph-dot {
    animation: none;
  }
}
</style>
