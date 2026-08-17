import { useEffect, useRef, useState } from 'react'

// ---- Gallery images ----
// Traditional frames — heritage & festive sets
import postOffice from './assets/gallery/traditional/post-office.jpg'
import floralWall from './assets/gallery/traditional/floral-wall.jpg'
import marigoldArch from './assets/gallery/traditional/marigold-arch.jpg'
import keralaHouse from './assets/gallery/traditional/kerala-house.jpg'

// Western frames — modern arch & minimal sets
import blueArch from './assets/gallery/western/blue-arch.jpg'
import purpleArch from './assets/gallery/western/purple-arch.jpg'
import whiteArch from './assets/gallery/western/white-arch.jpg'
import pavilion from './assets/gallery/western/pavilion.jpg'

// Motion column images
import m1 from './assets/gallery/motion/m1.jpg'
import m2 from './assets/gallery/motion/m2.jpg'
import m3 from './assets/gallery/motion/m3.jpg'
import m4 from './assets/gallery/motion/m4.jpg'

// Props & furniture available for shoots
import guitarProp from './assets/gallery/props/guitar.jpg'
import standsProp from './assets/gallery/props/stands.jpg'
import vaseProp from './assets/gallery/props/vase.jpg'
import lanternsProps from './assets/gallery/props/lanterns.jpg'
import violinProps from './assets/gallery/props/violin.jpg'
import woodenchairProps from './assets/gallery/props/woodenChair.jpg'
import candlestandsProps from './assets/gallery/props/candleStands.jpg'
import clothsProps from './assets/gallery/props/cloths.jpg'
import flowerProps from './assets/gallery/props/flower.jpg'
import foldingchairProps from './assets/gallery/props/foldingChair.jpg'
import lampProps from './assets/gallery/props/lamp.jpg'
import casioProps from './assets/gallery/props/casio.jpg'
import radioProps from './assets/gallery/props/radio.jpg'
import redstoolProps from './assets/gallery/props/redStools.jpg'

const TRADITIONAL = [
  { src: postOffice, label: 'Postal Facade' },
  { src: floralWall, label: 'Floral Panel Wall' },
  { src: marigoldArch, label: 'Marigold Arch' },
  { src: keralaHouse, label: 'Tharavadu Courtyard' },
]

const WESTERN = [
  { src: blueArch, label: 'Indigo Archway' },
  { src: purpleArch, label: 'Violet Double Arch' },
  { src: whiteArch, label: 'Minimal White Arch' },
  { src: pavilion, label: 'Garden Pavilion' },
]

const MOTION_COL_A = [m1, m2]
const MOTION_COL_B = [m3, m4]
const MOTION_COL_C = [m2, m1]
const MOTION_COL_D = [m4, m3]

const PROPS = [
  { src: guitarProp, label: 'Vintage Acoustic Guitar' },
  { src: standsProp, label: 'Iron Flower Stands (Set of 3)' },
  { src: vaseProp, label: 'Handpainted Floor Vase' },
  { src: lanternsProps, label: 'Tealight Lanterns'},
  { src: violinProps, label: 'Violin'},
  { src: woodenchairProps, label: 'Wooden Chair'},
  { src: candlestandsProps, label: 'Hurricane Lamp'},
  { src: clothsProps, label: 'Decor Clothes'},
  { src: flowerProps, label: 'Decor Flowers'},
  { src: foldingchairProps, label: 'Folding Chair'},
  { src: lampProps, label: 'Metal Kalash Minar'},
  { src: casioProps, label: 'Vintage Casio'},
  { src: radioProps, label: 'Vintage Radio'},
  { src: redstoolProps, label: 'Red Stools'}
]

function useScrollY() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return scrollY
}

function GalleryGrid({ items }) {
  return (
    <div className="gallery-grid">
      {items.map((item, i) => (
        <figure className="gallery-card" key={i}>
          <img src={item.src} alt={item.label} loading="lazy" />
          <figcaption>{item.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState('traditional')
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollY = useScrollY()
  const motionRef = useRef(null)
  const trackRef = useRef(null)      
const colARef = useRef(null)     
const colBRef = useRef(null)       
  const [inView, setInView] = useState(false)

  // Only animate once the motion section is near the viewport, keeps math cheap
  useEffect(() => {
    const el = motionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '200px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Offset derived from scroll position relative to the section.
  // Column A drifts opposite to Column B, so the whole strip feels alive
  // while it moves up on scroll-down and back down on scroll-up.
 let offsetA = 0
let offsetB = 0
if (inView && motionRef.current && trackRef.current && colARef.current && colBRef.current) {
  const rect = motionRef.current.getBoundingClientRect()
  const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)

  const trackHeight = trackRef.current.offsetHeight
  const rangeA = colARef.current.scrollHeight - trackHeight
  const rangeB = colBRef.current.scrollHeight - trackHeight

  const isMobile = window.innerWidth <= 900
  const speedA = isMobile ? 1.4 : 1
  const speedB = isMobile ? 0.2 : 1   // lower = slower; tweak this number

  offsetA = (progress - 0.5) * 5 * rangeA * speedA
  offsetB = (0.5 - progress) * 20 * rangeB * speedB
}

  return (
    <div className="page">
      {/* NAV */}
      <header className="nav">
        <div className="nav-mark">
          <span className="nav-mark-serif">Frame House</span>
          <span className="nav-mark-mono">PALAKKAD · KERALA</span>
        </div>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="#props" onClick={() => setMenuOpen(false)}>Props</a>
          <a href="#location" onClick={() => setMenuOpen(false)}>Location</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Book a Slot</a>
        </nav>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span><span></span></span>
        </button>
      </header>

      {/* HERO */}
      <section className="hero">
        <img className="hero-bg" src={keralaHouse} alt="Tharavadu courtyard set" />
        <div className="hero-scrim" />
        <div className="hero-content">
          <span className="eyebrow">A Standing-Set Backlot for Shoots & Celebrations</span>
          <h1>Eight Facades.<br />One Field of Paddy Green.</h1>
          <p>
            A curated backlot in the paddy fields of Palakkad — hand-painted postal
            counters, festival arches and a century-old tharavadu, built to be walked
            into and photographed, not just looked at.
          </p>
          <div className="hero-cta">
            <a className="btn-primary" href="#contact">Check Availability</a>
            <a className="btn-ghost" href="#gallery">See the Sets</a>
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="about">
        <div className="about-item">
          <span className="about-num">01</span>
          <h3>Photoshoots</h3>
          <p>Editorial, pre-wedding, product and portrait shoots across eight distinct sets in a single visit.</p>
        </div>
        <div className="about-item">
          <span className="about-num">02</span>
          <h3>Birthdays & Parties</h3>
          <p>Open lawns, a tyre play-corner and covered pavilions built for celebrations of every size.</p>
        </div>
        <div className="about-item">
          <span className="about-num">03</span>
          <h3>Film & Content</h3>
          <p>Reels, short films and brand shoots — sets are dressed and ready, no art department needed.</p>
        </div>
      </section>

      {/* MOTION COLUMN — images pan with scroll direction, caption text stays fixed */}
      <section className="motion" id="motion" ref={motionRef}>
        <div className="motion-text">
          <span className="eyebrow">The Location Diary</span>
          <h2>Where stories come<br />to life.</h2>
          <p>
            A glimpse into the places that became part of the frame — beautifully captured, 
            thoughtfully chosen, and unforgettable on screen.
          </p>
        </div>
       <div className="motion-track" ref={trackRef}>
  <div
    className="motion-col"
    ref={colARef}
    style={{ transform: `translateY(${offsetA}px)` }}
  >
    {[m1, m2, m3].map((src, i) => (
      <img key={i} src={src} alt="Venue set in motion" />
    ))}
  </div>
  <div
    className="motion-col motion-col-b"
    ref={colBRef}
    style={{ transform: `translateY(${offsetB}px)` }}
  >
    {[m2, m4, m2].map((src, i) => (
      <img key={i} src={src} alt="Venue set in motion" />
    ))}
  </div>
  <div
    className="motion-col"
    style={{ transform: `translateY(${offsetA}px)` }}
  >
    {[m3, m1, m3].map((src, i) => (
      <img key={i} src={src} alt="Venue set in motion" />
    ))}
  </div>
</div>
      </section>

      {/* GALLERY */}
      <section className="gallery" id="gallery">
        <div className="section-head">
          <span className="eyebrow">The Sets</span>
          <h2>Western Frames &amp; Traditional Frames</h2>
        </div>
        <div className="tabs" role="tablist" aria-label="Gallery frame style">
          <button
            role="tab"
            aria-selected={tab === 'traditional'}
            className={tab === 'traditional' ? 'tab active' : 'tab'}
            onClick={() => setTab('traditional')}
          >
            Traditional Frames
          </button>
          <button
            role="tab"
            aria-selected={tab === 'western'}
            className={tab === 'western' ? 'tab active' : 'tab'}
            onClick={() => setTab('western')}
          >
            Western Frames
          </button>
        </div>
        <GalleryGrid items={tab === 'traditional' ? TRADITIONAL : WESTERN} />
      </section>

      {/* PROPS & FURNITURE */}
      <section className="props" id="props">
        <div className="section-head">
          <span className="eyebrow">What's Included</span>
          <h2>Props &amp; Furniture Available</h2>
          <p className="props-note">A few pieces from our prop collection — ask about availability for your shoot or event.</p>
        </div>
        <div className="gallery-grid props-grid">
          {PROPS.map((item, i) => (
            <figure className="gallery-card" key={i}>
              <img src={item.src} alt={item.label} loading="lazy" />
              <figcaption>{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* LOCATION */}
      <section className="location" id="location">
        <div className="section-head">
          <span className="eyebrow">Find Us</span>
          <h2>Set among the paddy fields</h2>
        </div>
        <div className="location-grid">
          <div className="location-map">
            <iframe
              title="Frame House location map"
              src="https://www.google.com/maps?q=Palakkad,Kerala&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="location-details">
            <h3>Frame House</h3>
            <p className="mono">Vettumpully,<br />Palakkad, Kerala</p>
            <ul>
              <li><span>Open</span> Mon – Sun, 8:00 AM – 6:30 PM</li>
              <li><span>Parking</span> On-site, free for booked shoots</li>
              <li><span>Nearest landmark</span> 4 km from Palakkad Town</li>
            </ul>
            <a className="btn-ghost" href="https://maps.google.com" target="_blank" rel="noreferrer">
              Get Directions →
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="section-head light">
          <span className="eyebrow">Book a Slot</span>
          <h2>Reserve your date at Frame House</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <p><span className="mono">Call / WhatsApp</span> +91 88484 77706 / 96337 77706 / 62823 88736</p>
            <p><span className="mono">Email</span> framehousepalakkad@gmail.com</p>
            <p><span className="mono">Instagram</span> @framehousepalakkad</p>
          </div>
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault()
              alert('Thanks! This is a demo form — hook it up to POST /api/bookings on the Express server.')
            }}
          >
            <input type="text" placeholder="Your name" required />
            <input type="tel" placeholder="Phone number" required />
            <input type="date" required />
            <select defaultValue="">
              <option value="" disabled>Purpose</option>
              <option>Photoshoot</option>
              <option>Birthday Party</option>
              <option>Film / Content Shoot</option>
              <option>Other</option>
            </select>
            <button className="btn-primary" type="submit">Send Enquiry</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Frame House, Palakkad</span>
        <span className="mono">Sample content — replace with real details</span>
      </footer>
    </div>
  )
}
