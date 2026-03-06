import { useState } from 'react'

// ─────────────────────────────────────────
// FARVER
// ─────────────────────────────────────────
const C = {
  bg:       '#0f0f17',
  surface:  '#1a1a2e',
  surface2: '#22223b',
  border:   '#2d2d4a',
  pink:     '#ff4f8b',
  green:    '#22c55e',
  yellow:   '#f59e0b',
  red:      '#ef4444',
  blue:     '#3b82f6',
  purple:   '#a855f7',
  orange:   '#f97316',
  gray:     '#6b7280',
  white:    '#f8fafc',
  muted:    '#94a3b8',
}

// ─────────────────────────────────────────
// GENANVENDELIGE KOMPONENTER
// ─────────────────────────────────────────

function KPI({ label, value, color = C.white, sub }) {
  return (
    <div style={{ textAlign: 'center', padding: '16px 12px' }}>
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: 28, fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, color: C.muted, marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: C.gray, marginTop: 3 }}>{sub}</div>}
    </div>
  )
}

function Badge({ status }) {
  const map = {
    active:  { bg: '#14532d', color: C.green,  label: 'AKTIV' },
    paused:  { bg: '#451a03', color: C.yellow, label: 'PAUSE' },
    missing: { bg: '#450a0a', color: C.red,    label: 'MANGLER' },
    new:     { bg: '#1e1b4b', color: C.blue,   label: 'NY' },
  }
  if (!status || !map[status]) return null
  const s = map[status]
  return (
    <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}`, borderRadius: 4, fontSize: 10, fontWeight: 700, padding: '2px 7px', letterSpacing: '0.1em' }}>
      {s.label}
    </span>
  )
}

function FunnelStep({ title, subtitle, metrics = [], status, color = C.blue, width = '100%' }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${color}40`, borderLeft: `3px solid ${color}`, borderRadius: 8, padding: '14px 16px', width, boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <div>
          <div style={{ fontWeight: 700, color: C.white, fontSize: 14 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{subtitle}</div>}
        </div>
        <Badge status={status} />
      </div>
      {metrics.map((m, i) => (
        <div key={i} style={{ fontSize: 12, color: m.color || C.muted, marginTop: 4 }}>
          <span style={{ color: C.gray }}>→ </span>{m.label}: <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, color: m.color || C.white }}>{m.value}</span>
        </div>
      ))}
    </div>
  )
}

function Arrow({ label, direction = 'down', color = C.gray }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 0', color }}>
      <div style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 20 }}>{direction === 'right' ? '→' : '↓'}</div>
    </div>
  )
}

function Section({ title, color = C.pink, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{ width: 4, height: 20, background: color, borderRadius: 2 }} />
        <div style={{ fontSize: 13, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{title}</div>
      </div>
      {children}
    </div>
  )
}

function Card({ children, style = {} }) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 20, ...style }}>
      {children}
    </div>
  )
}

function Grid({ cols = 4, children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }}>
      {children}
    </div>
  )
}

// ─────────────────────────────────────────
// FANE: MONEY MODEL
// ─────────────────────────────────────────
function MoneyModelTab() {
  return (
    <div>
      <Section title="Overblik — nøgletal" color={C.pink}>
        <Grid cols={4}>
          <Card><KPI label="Netto omsætning" value="3,89M DKK" color={C.green} sub="Brutto 4,32M · Refund 431K" /></Card>
          <Card><KPI label="Aktive leads" value="38.156" color={C.blue} sub="40.252 minus bounces/DNC" /></Card>
          <Card><KPI label="Betalende kunder" value="2.257" color={C.purple} sub="Verificeret fra ordredata" /></Card>
          <Card><KPI label="ROAS (netto)" value="40,75x" color={C.green} sub="95.377 DKK spend · all-time" /></Card>
        </Grid>
        <Grid cols={4}>
          <Card><KPI label="Gns. CPL (all-time)" value="24,29 DKK" color={C.yellow} sub="40.252 leads (korrekt fra mailliste)" /></Card>
          <Card><KPI label="Gns. CPA (køber)" value="433 DKK" color={C.orange} sub="977K spend / 2.257 kunder" /></Card>
          <Card><KPI label="AOV per ordre" value="1.274 DKK" color={C.white} sub="3.390 betalte ordrer" /></Card>
          <Card><KPI label="Total Meta spend" value="977.677 DKK" color={C.pink} sub="All-time · Feb 2023–mar 2026" /></Card>
        </Grid>
      </Section>

      <Section title="Værditrappe — Money Model" color={C.purple}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

          <FunnelStep
            title="Gratis Workshop — Sig Farvel til Lændesmerter"
            subtitle="Attraction Offer · Lead magnet · Kold trafik ind"
            status="active" color={C.gray} width="680px"
            metrics={[
              { label: 'Total leads i Simplero-listen', value: '40.252', color: C.blue },
              { label: 'Workshops afholdt', value: '14 dokumenterede hold', color: C.muted },
              { label: 'Gns. leads per workshop', value: '~1.500–2.000', color: C.muted },
              { label: 'No-shows uden efterfølgende køb', value: '7.534', color: C.yellow },
            ]}
          />
          <Arrow label="Konvertering workshop → køb: ~5,6%" color={C.gray} />

          <FunnelStep
            title="Tripwire — Smertefri Lænd / Start Slow (200–297 kr)"
            subtitle="Low-ticket front-end · 3 versioner · Attraction + Upsell"
            status="active" color={C.blue} width="630px"
            metrics={[
              { label: 'Smertefri Lænd (gratis adgang, 75 kr)', value: '524 salg · 39.243 DKK', color: C.blue },
              { label: 'TRIPWIRE 2 (m. Simplero adgang, 258 kr)', value: '946 salg · 244.000 DKK', color: C.blue },
              { label: 'TRIPWIRE - Smertefri Lænd (250 kr)', value: '230 salg · 57.500 DKK', color: C.blue },
              { label: 'Tripwire Start Slow (200 kr)', value: '311 salg · 62.200 DKK', color: C.blue },
              { label: 'Total tripwire-kunder', value: '~2.011 salg', color: C.white },
            ]}
          />
          <Arrow label="Ascendering tripwire → B.A.C.K TO LIFE: 9,5%" color={C.blue} />

          <FunnelStep
            title="B.A.C.K TO LIFE — Signaturkursus (2.045–5.078 kr)"
            subtitle="Core product · 13 hold + evergreen · All-time 2,81M DKK"
            status="active" color={C.purple} width="570px"
            metrics={[
              { label: 'Hold 5 (størst)', value: '242 salg · 715.504 DKK · gns 2.957 kr', color: C.purple },
              { label: 'Hold X 2025 + 2026', value: '124 + 43 salg · 602.725 DKK', color: C.purple },
              { label: 'B.A.C.K SELVTRÆNING (evergreen)', value: '23 salg · 42.300 DKK', color: C.purple },
              { label: 'Total high-ticket kunder', value: '649 kunder', color: C.white },
              { label: 'All-time B.A.C.K TO LIFE omsætning', value: '~2,81M DKK', color: C.green },
            ]}
          />
          <Arrow label="Continuity efter kursus: kun 3,1% (underudnyttet)" color={C.orange} />

          <FunnelStep
            title="B.A.C.K+ Membership (1.215 kr gns.)"
            subtitle="Continuity · Recurring revenue · Massivt underudnyttet"
            status="active" color={C.orange} width="510px"
            metrics={[
              { label: 'Aktive B.A.C.K+ kunder', value: '20 verificerede · 60.750 DKK', color: C.orange },
              { label: 'Gns. betaling per kunde', value: '1.215 DKK (abonnement)', color: C.orange },
              { label: 'Potentiale: 10% af 649 kursus-kunder', value: '65 × 499/md = 32.435 kr/md', color: C.green },
            ]}
          />
          <Arrow label="" color={C.red} />

          <FunnelStep
            title="High-Ticket 1:1 / Intensivt forløb (2.500–11.588 kr)"
            subtitle="Eksisterer sporadisk — ikke systematiseret"
            status="missing" color={C.red} width="450px"
            metrics={[
              { label: '6 ugers 1:1 mentorforløb', value: '9 salg · 26.080 DKK · gns 2.898 kr', color: C.yellow },
              { label: 'EXPERIENCE fysisk miniforløb', value: '7 salg · 17.465 DKK · gns 2.495 kr', color: C.yellow },
              { label: 'Ingen systematisk application funnel', value: 'Potentiale: 2% af 2.257 = 45 kunder', color: C.red },
              { label: 'Estimeret potentiale ved 15.000 kr HT', value: '45 × 15.000 = 675.000 DKK/år', color: C.green },
            ]}
          />
        </div>
      </Section>

      <Section title="Styrker & svagheder" color={C.yellow}>
        <Grid cols={2}>
          <Card style={{ borderLeft: `3px solid ${C.green}` }}>
            <div style={{ fontWeight: 700, color: C.green, marginBottom: 10 }}>✓ STYRKER</div>
            {[
              'Ekstraordinær ROAS: 40,75x netto på Meta Ads — markedsbevist funnel',
              'Lav CPA: 42,26 DKK per betalende kunde er exceptionelt',
              'B.A.C.K TO LIFE all-time: ~2,81M DKK · 649 verificerede kursuskunder',
              'Tripwire fungerer: 2.011+ salg på tværs af 4 versioner',
              'Stor liste: 38.000+ aktive emails at genaktivere',
              'Top-LTV kunder: 11.000–13.745 DKK (loyalitet bevist)',
            ].map((s, i) => <div key={i} style={{ fontSize: 13, color: C.muted, marginBottom: 6 }}>• {s}</div>)}
          </Card>
          <Card style={{ borderLeft: `3px solid ${C.red}` }}>
            <div style={{ fontWeight: 700, color: C.red, marginBottom: 10 }}>✗ SVAGHEDER</div>
            {[
              'Refunderinger: 431.488 DKK (10% af brutto) — for høj rate',
              'B.A.C.K+ kun 20 kunder — continuity massivt underudnyttet',
              '1:1 high-ticket sporadisk — ingen systematisk backend-funnel',
              '7.534 no-shows uden genaktiveringsflow = gratis penge der venter',
              'AOV falder: 3.993 kr (jan 2024) → 433 kr (mar 2026) — alarmerende',
              '100% annonce-afhængig — ingen organisk trafik',
            ].map((s, i) => <div key={i} style={{ fontSize: 13, color: C.muted, marginBottom: 6 }}>• {s}</div>)}
          </Card>
        </Grid>
      </Section>

      <Section title="Prioriteret handlingsplan" color={C.green}>
        {[
          { nr: 1, title: 'Genaktiver 7.534 no-shows inden 18. marts', desc: 'Email-sekvens: 3 mails over 7 dage. Forventet: 3–5% konvertering = 225–375 ekstra tilmeldinger til nul annoncekost.', color: C.green, tid: 'Nu' },
          { nr: 2, title: 'Sæt B.A.C.K+ membership i system', desc: 'Design en Continuity Offer efter B.A.C.K TO LIFE. Mål: 100 medlemmer à 499 kr/md = 49.900 kr recurring månedligt.', color: C.orange, tid: '30 dage' },
          { nr: 3, title: 'Byg Application Funnel til high-ticket', desc: 'Value Bomb → Awareness Bridge → Book et opkald. Mål: 2% af 2.173 betalende = 43 kunder × 15.000 kr = 645.000 kr.', color: C.purple, tid: '60 dage' },
          { nr: 4, title: 'Tilføj order bump på workshop-tilmelding', desc: 'Tilbyd "Start Slow" tripwire (297 kr) som order bump ved workshop-signup. Branche-benchmark: 30–50% take rate.', color: C.blue, tid: '14 dage' },
          { nr: 5, title: 'Skaler annonce-creatives', desc: 'Lancér 3 nye ad variants (testimonial, farveblok, nyt video-script). Mål: CPL under 20 DKK inden 18. marts.', color: C.pink, tid: 'I gang' },
        ].map(item => (
          <div key={item.nr} style={{ display: 'flex', gap: 14, marginBottom: 12, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 16px', alignItems: 'flex-start' }}>
            <div style={{ background: item.color, color: '#000', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0, marginTop: 2 }}>{item.nr}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, color: C.white, fontSize: 14 }}>{item.title}</div>
                <span style={{ fontSize: 11, background: item.color + '22', color: item.color, border: `1px solid ${item.color}44`, borderRadius: 4, padding: '2px 8px', flexShrink: 0, marginLeft: 12 }}>{item.tid}</span>
              </div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </Section>
    </div>
  )
}

// ─────────────────────────────────────────
// FANE: WORKSHOP FUNNEL
// ─────────────────────────────────────────
function WorkshopFunnelTab() {
  const workshops = [
    { dato: '2024-08-07', leads: 4044 },
    { dato: '2024-09-04', leads: 2979 },
    { dato: '2024-11-06', leads: 1185 },
    { dato: '2025-01-08', leads: 1868 },
    { dato: '2025-01-17', leads: 1252 },
    { dato: '2025-02-26', leads: 1788 },
    { dato: '2025-03-12', leads: 1615 },
    { dato: '2025-04-02', leads: 1299 },
    { dato: '2025-04-30', leads: 1145 },
    { dato: '2025-06-11', leads: 1925 },
    { dato: '2025-07-02', leads: 1030 },
    { dato: '2025-08-06', leads: 1481 },
    { dato: '2026-01-28', leads: 1426 },
    { dato: '2026-02-18', leads: 1531 },
    { dato: '2026-03-18', leads: null, kommende: true },
  ]

  return (
    <div>
      <Section title="Workshop Funnel — Sig Farvel til Lændesmerter" color={C.pink}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, marginBottom: 32 }}>

          <FunnelStep title="Meta Ads — Kold + Varm trafik" subtitle="Facebook & Instagram · All-time feb 2023–mar 2026"
            status="active" color={C.pink} width="680px"
            metrics={[
              { label: 'Total spend all-time', value: '977.677 DKK', color: C.white },
              { label: 'Total leads all-time', value: '40.252 leads (korrekt fra mailliste)', color: C.blue },
              { label: 'Bedste CPL nogensinde', value: '3,9 DKK (Image ad 10)', color: C.green },
              { label: 'Gns. CPL all-time', value: '24,29 DKK ⚠ (Meta overestimerer)', color: C.yellow },
              { label: 'Nuværende CPL (seneste periode)', value: '22–27 DKK — creatives er trætte', color: C.yellow },
              { label: 'Spild (spend u. leads)', value: '11.793 DKK på 22 annoncer', color: C.red },
            ]} />
          <Arrow label="Klik til landingpage" color={C.pink} />

          <FunnelStep title="Landingpage — start.zabrinasofia.dk/workshop" subtitle="Konverterer godt — rør ikke ved den"
            status="active" color={C.blue} width="620px"
            metrics={[
              { label: 'Konvertering (estimat)', value: '~35–45% af klik', color: C.green },
              { label: 'Format', value: 'Simplero · Gratis tilmelding', color: C.muted },
              { label: 'Dato vist', value: '18. marts kl. 10:00', color: C.muted },
            ]} />
          <Arrow label="Tilmelding" color={C.blue} />

          <FunnelStep title="Workshop — Live 60 min online" subtitle="The Missing Links · Sig Farvel til Lændesmerter"
            status="active" color={C.purple} width="560px"
            metrics={[
              { label: 'Gns. tilmeldinger per workshop', value: '~1.500–2.000', color: C.muted },
              { label: 'Deltog + replay (tidlige hold)', value: '2.864 totalt', color: C.green },
              { label: 'No-shows (totalt)', value: '7.534 uden køb', color: C.yellow },
            ]} />
          <Arrow label="Tilbudsdag (dag 4–5)" color={C.purple} />

          <FunnelStep title="Tripwire — Smertefri Lænd (197–297 kr)" subtitle="Low-ticket upsell efter workshop"
            status="active" color={C.orange} width="500px"
            metrics={[
              { label: 'Konvertering workshop→tripwire (estimat)', value: '~3–5%', color: C.muted },
              { label: 'Total tripwire-kunder', value: '~1.983 (alle versioner)', color: C.orange },
              { label: 'Order bump mangler', value: 'Potentiale: 30–50% take rate', color: C.red },
            ]} />
          <Arrow label="Ascendering ~33%" color={C.orange} />

          <FunnelStep title="B.A.C.K TO LIFE — Signaturkursus (4.500–5.000 kr)" subtitle="Kerneprodukt · 11+ hold"
            status="active" color={C.purple} width="440px"
            metrics={[
              { label: 'High-ticket kunder totalt', value: '~523', color: C.purple },
              { label: 'ROAS samlet', value: '~2,4x', color: C.green },
            ]} />
          <Arrow label="" color={C.red} />

          <FunnelStep title="High-Ticket Backend — Mangler" subtitle="Application funnel ikke bygget"
            status="missing" color={C.red} width="380px"
            metrics={[
              { label: 'Potentiale', value: '43 kunder × 15.000 kr = 645.000 kr', color: C.green },
            ]} />
        </div>
      </Section>

      <Section title="Workshops historik" color={C.blue}>
        <Card>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {workshops.map((w, i) => (
              <div key={i} style={{
                background: w.kommende ? C.pink + '18' : C.surface2,
                border: `1px solid ${w.kommende ? C.pink : C.border}`,
                borderRadius: 6, padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <span style={{ fontSize: 13, color: w.kommende ? C.pink : C.muted, fontWeight: w.kommende ? 700 : 400 }}>{w.dato}</span>
                {w.kommende
                  ? <span style={{ fontSize: 11, color: C.pink, fontWeight: 700 }}>KOMMENDE</span>
                  : <span style={{ fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700, color: C.white }}>{w.leads.toLocaleString('da-DK')}</span>
                }
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section title="Annoncer — All-time top performers & Traffic Light" color={C.yellow}>
        <div style={{ marginBottom: 8, fontSize: 12, color: C.muted }}>
          977.677 DKK spend · 40.252 leads (korrekt fra mailliste) · 24,29 DKK gns. CPL
        </div>
        <div style={{ marginBottom: 12, fontSize: 12, color: C.yellow, background: C.yellow+'15', border:`1px solid ${C.yellow}40`, borderRadius:6, padding:'8px 12px' }}>
          ⚠ CPL-tal er korrigeret: Meta rapporterer 66.878 leads men korrekt antal er 40.252 (factor 1,66x overestimering). Alle tal herunder er baseret på korrekte leads.
        </div>
        <Grid cols={1}>
          {[
            { name: 'Image ad 1 - reused', spend: '141.679 kr', leads: '7.389', cpl: '19,2', status: '🟢', note: 'Kontens største annonce all-time. Korr. CPL 19,2 DKK — stadig grønt.' },
            { name: 'Image ad 10 - reused - Copy', spend: '105.821 kr', leads: '5.951', cpl: '17,8', status: '🟢', note: 'Korr. CPL 17,8 DKK. Solid performer med stort spend.' },
            { name: 'Video ad 1 - reused - Copy', spend: '64.873 kr', leads: '3.949', cpl: '16,4', status: '🟢', note: 'Bedste video-performer. Korr. CPL 16,4 DKK.' },
            { name: 'Ad 4: Billede MIG - Tekst 2', spend: '36.283 kr', leads: '3.419', cpl: '10,6', status: '🟢', note: 'STÆRKESTE annonce — korr. CPL kun 10,6 DKK. Massivt underallokeret budget. Genaktivér og skalér.' },
            { name: 'Image ad 6 - reused', spend: '89.748 kr', leads: '4.049', cpl: '22,2', status: '🟡', note: 'Gult lys — korr. CPL 22,2 DKK. Over benchmark.' },
            { name: 'Video ad 1 - reused', spend: '62.781 kr', leads: '1.791', cpl: '35,1', status: '🔴', note: 'RØDT LYS — korr. CPL 35,1 DKK. Klar fatigue. Sluk eller refresh creative.' },
            { name: 'Zabrina video stairs', spend: '14.144 kr', leads: '384', cpl: '36,8', status: '🔴', note: 'RØDT LYS — korr. CPL 36,8 DKK.' },
            { name: 'Zabrina Image 2025', spend: '2.453 kr', leads: '51', cpl: '48,5', status: '🔴', note: 'RØDT LYS — korr. CPL 48,5 DKK. Lav spend men klar taber.' },
            { name: 'Ad 3: Billede MIG - Tekst 2', spend: '87.158 kr', leads: '55', cpl: '1.572', status: '🔴', note: 'HISTORISK SPILD — 87.158 DKK for ~55 korrekte leads. Bør verificeres i Ads Manager.' },
            { name: 'Ad 2: Billede FULL BODY - Tekst 2', spend: '34.362 kr', leads: '13', cpl: '2.716', status: '🔴', note: 'RØDT LYS — 34.362 DKK for ~13 leads. Slukket (verificér).' },
            { name: 'Image ad - finger (alle)', spend: '2.504 kr', leads: '16', cpl: '153', status: '🔴', note: 'RØDT LYS — Finger-annoncen. Sluk straks.' },
            { name: 'Annonce A — Testimonial (NY)', spend: '–', leads: '–', cpl: '–', status: '🆕', note: 'Lanceres nu. Mål: under 25 DKK CPL (korrigeret benchmark).' },
            { name: 'Annonce B — Farveblok (NY)', spend: '–', leads: '–', cpl: '–', status: '🆕', note: 'Lanceres nu. Mål: under 25 DKK CPL.' },
          ].map((ad, i) => (
            <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: '12px 16px', display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ fontSize: 22, flexShrink: 0 }}>{ad.status}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: C.white, fontSize: 14 }}>{ad.name}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{ad.note}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 16, fontWeight: 700, color: ad.cpl === '–' ? C.gray : parseFloat(ad.cpl) < 15 ? C.green : parseFloat(ad.cpl) > 30 ? C.red : C.yellow }}>{ad.cpl !== '–' ? ad.cpl + ' DKK' : '–'}</div>
                <div style={{ fontSize: 11, color: C.gray }}>CPL · {ad.leads} leads</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{ad.spend}</div>
              </div>
            </div>
          ))}
        </Grid>
      </Section>
    </div>
  )
}

// ─────────────────────────────────────────
// FANE: KONTAKTER & ASCENDERING
// ─────────────────────────────────────────
function KontakterTab() {
  const leadVaekst = [
    { maaned: 'Jan 2025', leads: 1571 }, { maaned: 'Feb 2025', leads: 1263 },
    { maaned: 'Mar 2025', leads: 2052 }, { maaned: 'Apr 2025', leads: 779 },
    { maaned: 'Maj 2025', leads: 919 },  { maaned: 'Jun 2025', leads: 1752 },
    { maaned: 'Jul 2025', leads: 748 },  { maaned: 'Aug 2025', leads: 645 },
    { maaned: 'Sep 2025', leads: 658 },  { maaned: 'Okt 2025', leads: 678 },
    { maaned: 'Nov 2025', leads: 263 },  { maaned: 'Dec 2025', leads: 180 },
    { maaned: 'Jan 2026', leads: 1573 }, { maaned: 'Feb 2026', leads: 1426 },
    { maaned: 'Mar 2026', leads: 204, partial: true },
  ]
  const maxLeads = Math.max(...leadVaekst.map(l => l.leads))

  const segmenter = [
    { label: 'Leads — aldrig købt', antal: 38079, pct: 94.6, color: C.gray },
    { label: 'Low-ticket (1–500 kr)', antal: 1587, pct: 3.9, color: C.blue },
    { label: 'Mid-ticket (501–3.000 kr)', antal: 63, pct: 0.2, color: C.orange },
    { label: 'High-ticket (3.000+ kr)', antal: 523, pct: 1.3, color: C.purple },
  ]

  return (
    <div>
      <Section title="Liste-oversigt" color={C.blue}>
        <Grid cols={4}>
          <Card><KPI label="Totalt kontakter" value="40.252" color={C.white} /></Card>
          <Card><KPI label="Aktive emails" value="38.156" color={C.green} sub="Minus bounces + DNC" /></Card>
          <Card><KPI label="No-shows u. køb" value="7.534" color={C.yellow} sub="Genaktiveringsmål" /></Card>
          <Card><KPI label="Trafik-kilde" value="87% Meta" color={C.pink} sub="Facebook + Instagram" /></Card>
        </Grid>
      </Section>

      <Section title="Lead-segmentering" color={C.purple}>
        <Card>
          <div style={{ marginBottom: 20 }}>
            {segmenter.map((s, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: C.muted }}>{s.label}</span>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: s.color, fontWeight: 700 }}>
                    {s.antal.toLocaleString('da-DK')} ({s.pct}%)
                  </span>
                </div>
                <div style={{ background: C.surface2, borderRadius: 4, height: 8, overflow: 'hidden' }}>
                  <div style={{ background: s.color, width: `${s.pct}%`, height: '100%', borderRadius: 4, minWidth: s.pct < 1 ? 8 : 0 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: C.yellow, background: C.yellow + '15', border: `1px solid ${C.yellow}40`, borderRadius: 6, padding: '10px 14px' }}>
            💡 94,6% af listen har aldrig købt. Med en god email-sekvens til de 38.000 leads er potentialet enormt — selv 1% konvertering til tripwire = 381 nye kunder.
          </div>
        </Card>
      </Section>

      <Section title="Lead-vækst per måned (2025–2026)" color={C.green}>
        <Card>
          <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 160, paddingBottom: 24 }}>
            {leadVaekst.map((m, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: C.muted, marginBottom: 2 }}>{m.leads > 999 ? (m.leads/1000).toFixed(1)+'k' : m.leads}</div>
                <div style={{
                  background: m.partial ? C.yellow : C.pink,
                  width: '100%',
                  height: `${(m.leads / maxLeads) * 120}px`,
                  borderRadius: '3px 3px 0 0',
                  opacity: m.partial ? 0.6 : 1,
                }} />
                <div style={{ fontSize: 8, color: C.gray, textAlign: 'center', transform: 'rotate(-45deg)', transformOrigin: 'top center', marginTop: 6, whiteSpace: 'nowrap' }}>
                  {m.maaned.split(' ')[0].substring(0,3)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: C.gray, marginTop: 8 }}>* Mar 2026 er delvis (måned ikke afsluttet)</div>
        </Card>
      </Section>

      <Section title="Ascendering — kundernes rejse" color={C.orange}>
        <Card>
          <div style={{ display: 'flex', gap: 0, alignItems: 'stretch', marginBottom: 20 }}>
            {[
              { label: 'Workshop', antal: '40.252', pct: '100%', color: C.gray, note: 'Tilmeldt workshop' },
              { label: '→ Tripwire', antal: '1.983', pct: '~5%', color: C.blue, note: 'Køber low-ticket' },
              { label: '→ B.A.C.K TO LIFE', antal: '~650', pct: '~33%', color: C.purple, note: 'Ascenderer til kursus' },
              { label: '→ B.A.C.K+', antal: '24', pct: '~4%', color: C.orange, note: 'Membership (underudnyttet)' },
              { label: '→ High-ticket', antal: '0', pct: '0%', color: C.red, note: 'MANGLER backend' },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, background: C.surface2, borderTop: `3px solid ${s.color}`, padding: '14px 10px', textAlign: 'center', borderRight: i < 4 ? `1px solid ${C.border}` : 'none' }}>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 20, fontWeight: 700, color: s.color }}>{s.antal}</div>
                <div style={{ fontSize: 12, color: C.white, fontWeight: 600, margin: '4px 0' }}>{s.label}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{s.note}</div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: s.color, marginTop: 6 }}>{s.pct}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: C.green + '15', border: `1px solid ${C.green}40`, borderRadius: 8, padding: '14px 16px' }}>
              <div style={{ fontWeight: 700, color: C.green, marginBottom: 8, fontSize: 13 }}>✓ Fungerer godt</div>
              <div style={{ fontSize: 12, color: C.muted }}>Workshop → Tripwire konverteringen er stabil. B.A.C.K TO LIFE har 11 hold med stærke resultater. Top-kunder er loyale og returnerer.</div>
            </div>
            <div style={{ background: C.red + '15', border: `1px solid ${C.red}40`, borderRadius: 8, padding: '14px 16px' }}>
              <div style={{ fontWeight: 700, color: C.red, marginBottom: 8, fontSize: 13 }}>✗ Skal fikses</div>
              <div style={{ fontSize: 12, color: C.muted }}>B.A.C.K+ membership er massivt underudnyttet (kun 24 med. vs. potentiale 200+). Ingen systematisk high-ticket backend. 7.534 no-shows uden opfølgning.</div>
            </div>
          </div>
        </Card>
      </Section>

      <Section title="Genaktivering — lavthængende frugt" color={C.yellow}>
        <Card>
          <div style={{ fontWeight: 600, color: C.white, marginBottom: 12 }}>No-show email-sekvens (3 mails, 7 dage)</div>
          {[
            { dag: 'Dag 1', emne: 'Du gik glip af noget vigtigt...', type: 'Nurture', color: C.blue },
            { dag: 'Dag 3', emne: 'Her er replay-linket (tidsbegrænset)', type: 'Value + Proof', color: C.orange },
            { dag: 'Dag 7', emne: 'Sidste chance — tilmeld næste workshop', type: 'Direct Offer', color: C.pink },
          ].map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'center' }}>
              <div style={{ background: m.color + '22', color: m.color, border: `1px solid ${m.color}44`, borderRadius: 4, padding: '3px 10px', fontSize: 12, fontWeight: 700, flexShrink: 0, width: 50, textAlign: 'center' }}>{m.dag}</div>
              <div style={{ flex: 1, background: C.surface2, borderRadius: 6, padding: '10px 14px' }}>
                <div style={{ fontSize: 13, color: C.white }}>{m.emne}</div>
                <div style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>{m.type}</div>
              </div>
            </div>
          ))}
          <div style={{ fontSize: 12, color: C.green, marginTop: 8 }}>
            Estimat: 3% af 7.534 = 226 ekstra tilmeldinger · 5% = 377 tilmeldinger — til NUL annoncekost
          </div>
        </Card>
      </Section>
    </div>
  )
}

// ─────────────────────────────────────────
// FANE: ECONOMICS
// ─────────────────────────────────────────
function EconomicsTab() {
  const scenarier = [
    {
      titel: 'Nuværende (verificeret all-time)',
      color: C.gray,
      ltv: '1.274 DKK AOV',
      cpa: '433 DKK',
      roas: '3,97x brutto',
      mdr: '~150.000 kr',
      items: [
        'Meta spend all-time: 977.677 DKK',
        'Brutto omsætning: 4,32M DKK · ROAS 3,97x',
        'Netto omsætning: 3,89M DKK · ROAS 3,58x',
        'Gns. CPL (korrekt): 24,29 DKK — Meta-data viser 66.878 leads (stærkt overestimeret)',
        'B.A.C.K+ kun 20 kunder',
        'AOV faldende: 3.993 kr (jan 2024) → 433 kr (mar 2026)',
      ],
    },
    {
      titel: 'Scenario: + B.A.C.K+ vækst + genaktivering',
      color: C.blue,
      ltv: '~2.000 DKK',
      cpa: '42 DKK',
      roas: '~50x',
      mdr: '~250.000 kr',
      items: [
        'B.A.C.K+ til 65 kunder: +32.435 kr/md recurring',
        'No-show genaktivering: +226–377 ekstra kursus-tilmeldinger',
        'Email-sekvens til 38.000 ukonverterede leads',
        'Ny tripwire order bump: 30–50% take rate',
        'CPL under 20 DKK med nye creatives',
      ],
    },
    {
      titel: 'Scenario: + Systematisk high-ticket backend',
      color: C.green,
      ltv: '~5.000 DKK',
      cpa: '42 DKK',
      roas: '~100x+',
      mdr: '~500.000+ kr',
      items: [
        'Application funnel: 2% af 2.257 kunder = 45 × 15.000 kr',
        'Awareness Bridge fra tripwire-købere til 1:1',
        'Potentiale: 675.000 DKK/år fra high-ticket alene',
        'Reducer refund-rate fra 10% til under 5%',
        'Value Bombs sekvens til de 649 B.A.C.K TO LIFE kunder',
      ],
    },
  ]

  return (
    <div>
      <Section title="Economics — nuværende vs. potentiale" color={C.green}>
        <Grid cols={3}>
          {scenarier.map((s, i) => (
            <Card key={i} style={{ borderTop: `3px solid ${s.color}` }}>
              <div style={{ fontWeight: 700, color: s.color, fontSize: 14, marginBottom: 16 }}>{s.titel}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                <div><div style={{ fontSize: 10, color: C.gray, textTransform: 'uppercase' }}>Gns. LTV</div><div style={{ fontFamily: 'JetBrains Mono', color: C.white, fontWeight: 700 }}>{s.ltv}</div></div>
                <div><div style={{ fontSize: 10, color: C.gray, textTransform: 'uppercase' }}>ROAS</div><div style={{ fontFamily: 'JetBrains Mono', color: s.color, fontWeight: 700 }}>{s.roas}</div></div>
                <div><div style={{ fontSize: 10, color: C.gray, textTransform: 'uppercase' }}>Est. CPA</div><div style={{ fontFamily: 'JetBrains Mono', color: C.muted, fontWeight: 700 }}>{s.cpa}</div></div>
                <div><div style={{ fontSize: 10, color: C.gray, textTransform: 'uppercase' }}>Mdr. omsæt.</div><div style={{ fontFamily: 'JetBrains Mono', color: C.green, fontWeight: 700 }}>{s.mdr}</div></div>
              </div>
              {s.items.map((item, j) => (
                <div key={j} style={{ fontSize: 12, color: C.muted, marginBottom: 5 }}>✓ {item}</div>
              ))}
            </Card>
          ))}
        </Grid>
      </Section>

      <Section title="Månedlig omsætning — topsæsoner" color={C.purple}>
        <Card>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 8 }}>
            {[
              { m: 'Okt 2023', rev: 164603, color: C.orange },
              { m: 'Dec 2023', rev: 216874, color: C.orange },
              { m: 'Feb 2024', rev: 174536, color: C.orange },
              { m: 'Jun 2024', rev: 332713, color: C.green },
              { m: 'Aug 2024', rev: 388642, color: C.green },
              { m: 'Nov 2024', rev: 195242, color: C.orange },
              { m: 'Jan 2025', rev: 264525, color: C.orange },
              { m: 'Mar 2025', rev: 181767, color: C.blue },
              { m: 'Maj 2025', rev: 175767, color: C.blue },
              { m: 'Jun 2025', rev: 186868, color: C.blue },
              { m: 'Jan 2026', rev: 136550, color: C.blue },
              { m: 'Feb 2026', rev: 173950, color: C.blue },
            ].map((item, i) => (
              <div key={i} style={{ background: C.surface2, borderTop: `2px solid ${item.color}`, borderRadius: 6, padding: '10px 8px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700, color: item.color }}>{(item.rev/1000).toFixed(0)}K</div>
                <div style={{ fontSize: 10, color: C.gray, marginTop: 3 }}>{item.m}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: C.yellow, marginTop: 12, background: C.yellow+'15', border:`1px solid ${C.yellow}40`, borderRadius:6, padding:'10px 14px' }}>
            ⚠ AOV-advarsel: Gennemsnitlig ordreværdi er faldet fra 3.993 DKK (jan 2024) til 433 DKK (mar 2026). Årsag: Tripwire-volumen dominerer nu omsætningen. Kurset sælges sjældnere i 2026. Backend-prioritet er kritisk.
          </div>
        </Card>
      </Section>

      <Section title="Rewire Profit Beregner — Workshop 18. marts" color={C.pink}>
        <Card>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div style={{ fontWeight: 700, color: C.white, marginBottom: 12 }}>Inputs (estimat)</div>
              {[
                ['Dagligt annoncebudget', '800–1.000 kr/dag'],
                ['Kampagneperiode', '12 dage (6–18. marts)'],
                ['Total annonce-budget', '~10.000–12.000 kr'],
                ['Mål-CPL', 'Under 20 DKK'],
                ['Forventet leads', '500–600'],
                ['Tripwire-konvertering', '3–5%'],
                ['Tripwire-pris', '297 kr'],
              ].map(([k, v], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${C.border}`, padding: '7px 0', fontSize: 13 }}>
                  <span style={{ color: C.muted }}>{k}</span>
                  <span style={{ color: C.white, fontFamily: 'JetBrains Mono' }}>{v}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: C.green, marginBottom: 12 }}>Outputs (estimat)</div>
              {[
                ['Workshop-leads (nye)', '500–600', C.blue],
                ['Tripwire-salg (3%)', '15–18 salg', C.orange],
                ['Tripwire-omsætning', '4.500–5.350 kr', C.orange],
                ['B.A.C.K TO LIFE salg (est. 2%)', '10–12 salg', C.purple],
                ['B.A.C.K TO LIFE omsætning', '45.000–60.000 kr', C.purple],
                ['Total omsætning (estimat)', '~50.000–65.000 kr', C.green],
                ['ROAS (estimat)', '~4–5x', C.green],
              ].map(([k, v, color], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${C.border}`, padding: '7px 0', fontSize: 13 }}>
                  <span style={{ color: C.muted }}>{k}</span>
                  <span style={{ color: color || C.white, fontFamily: 'JetBrains Mono', fontWeight: 700 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </Section>

      <Section title="Forbehold og begrænsninger" color={C.gray}>
        <Card>
          {[
            { titel: 'Ordredata fra Simplero (charges.csv)', tekst: 'Baseret på 3.390 betalte ordrer. Refunderinger på 431.488 DKK er fratrukket i netto-tal. "Refundering"-produkter (8 salg à 11.588 kr) er medregnet i brutto-tal — disse er reelt refunderede betalinger, ikke produktsalg.' },
            { titel: 'Meta Ads lead-tal er stærkt overestimeret', tekst: 'Meta rapporterer 66.878 leads all-time — men det korrekte antal verificerede leads er 40.252 (fra maillisten i Simplero/GHL). Meta overestimerer med faktor ~1,66x pga. attribution-overlap og view-through konverteringer. Alle CPL-tal i dette dashboard er beregnet på baggrund af 40.252 korrekte leads. Korrekt gns. CPL: 24,29 DKK (ikke 14,62 DKK som Meta rapporterer). Per-annonce CPL er tilsvarende skaleret op.' },
            { titel: 'Ascendering er korrelation', tekst: 'At en kunde har købt tripwire og B.A.C.K TO LIFE beviser ikke kausal ascendering via en specifik email-sekvens. Direkte køb og organisk trafik kan have bidraget.' },
            { titel: 'B.A.C.K+ kunder', tekst: '20 verificerede B.A.C.K+ kunder fra ordredata. Maillisten viser 24 — afvigelse kan skyldes gratis adgang som del af bundtede tilbud.' },
          ].map((f, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < 3 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ fontWeight: 600, color: C.yellow, fontSize: 13, marginBottom: 4 }}>⚠ {f.titel}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{f.tekst}</div>
            </div>
          ))}
        </Card>
      </Section>
    </div>
  )
}

// ─────────────────────────────────────────
// TABS CONFIG
// ─────────────────────────────────────────
const TABS = [
  { id: 'money',     label: '💰 Money Model',     color: C.purple,  Component: MoneyModelTab },
  { id: 'workshop',  label: '🎯 Workshop Funnel',  color: C.pink,    Component: WorkshopFunnelTab },
  { id: 'kontakter', label: '👥 Kontakter',        color: C.blue,    Component: KontakterTab },
  { id: 'economics', label: '📊 Economics',        color: C.green,   Component: EconomicsTab },
]

// ─────────────────────────────────────────
// HOVED-KOMPONENT
// ─────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState('money')
  const active = TABS.find(t => t.id === activeTab)

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: C.white }}>

      {/* Header */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 20, color: C.white }}>Zabrina Sofia</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Rewire Metoden — Performance Dashboard</div>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 22, fontWeight: 700, color: C.green }}>3,9M DKK</div>
            <div style={{ fontSize: 11, color: C.muted }}>All-time omsætning</div>
          </div>
          <div style={{ width: 1, height: 40, background: C.border }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 22, fontWeight: 700, color: C.blue }}>40.252</div>
            <div style={{ fontSize: 11, color: C.muted }}>Leads i listen</div>
          </div>
          <div style={{ width: 1, height: 40, background: C.border }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 16, fontWeight: 700, color: C.pink }}>18. MARTS</div>
            <div style={{ fontSize: 11, color: C.muted }}>Næste workshop</div>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: '0 32px', display: 'flex', gap: 0 }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '14px 20px', fontSize: 13, fontWeight: 600,
              color: activeTab === tab.id ? tab.color : C.muted,
              borderBottom: activeTab === tab.id ? `2px solid ${tab.color}` : '2px solid transparent',
              transition: 'all 0.15s',
              fontFamily: 'Inter, sans-serif',
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Indhold */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <active.Component />
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: '16px 32px', textAlign: 'center', fontSize: 11, color: C.gray }}>
        Rewire Metoden Dashboard · Data: Simplero mailliste (40.252 kontakter) · Sidst opdateret: marts 2026
      </div>
    </div>
  )
}
