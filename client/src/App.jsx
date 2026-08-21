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
          <span className="eyebrow"></span>
          <h1>Nine Facades.<br />One Field of Paddy Green.</h1>
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
          <p>Editorial, pre-wedding, product and portrait shoots across nine distinct sets in a single visit.</p>
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
      <section className="showcase" id="showcase">
        <div className="showcase-text">
          <span className="eyebrow">The Location Diary</span>
          <h2>Where stories come<br />to life.</h2>
          <p>
            A glimpse into the places that became part of the frame — beautifully captured, 
            thoughtfully chosen, and unforgettable on screen.
          </p>
        </div>
        <div className="showcase-images">
          <div className='showcase-row'>
            <div className="showcase-card"><img src={m1} alt="Set detail"/></div>
            <div className="showcase-card"><img src={m2} alt="Set detail" /></div>
            <div className="showcase-card"><img src={m3} alt="Set detail"/></div>
          </div>
          <div className="showcase-row">
            <div className="showcase-card"><img src={m4} alt="Set detail" /></div>
            <div className="showcase-card"><img src={postOffice} alt="Set detail" /></div>
            <div className="showcase-card"><img src={blueArch} alt="Set detail" /></div>
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.760760421967!2d76.65482157504039!3d10.675668889467092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8130073d254cf%3A0x15ef192b93b7377a!2sFrame%20House%20Palakkad!5e0!3m2!1sen!2sin!4v1787290517253!5m2!1sen!2sin"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="location-details">
            <h3>Frame House</h3>
            <p className="mono">Vettumpully,<br />Palakkad, Kerala</p>
            <ul>
              <li><span>Open</span> Mon – Sun, 6:00 AM – 6:00 PM</li>
              <li><span>Parking</span> On-site, free for booked shoots</li>
              <li><span>Nearest landmark</span> 4 km from Palakkad Town</li>
            </ul>
            <a className="btn-ghost" href="https://www.google.com/maps/dir/?api=1&destination=10.675668889467092,76.65482157504039" target="_blank" rel="noreferrer">
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
              const form = e.target
              const name = form.name.value
              const phone = form.phone.value
              const date = form.date.value
              const purpose = form.purpose.value

              const message = `Hi Frame House, I'd like to enquire about a booking.%0A%0AName: ${name}%0APhone: ${phone}%0APreferred Date: ${date}%0APurpose: ${purpose}`
              const whatsappNumber = '916282388736'
              window.open(`https://wa.me/${whatsappNumber}?text=${message}`,'_blank')
            }}
          >
            <input type="text" name="name" placeholder="Your name" required />
            <input type="tel" name="phone" placeholder="Phone number" required />
            <input type="date" name='date' required />
            <select name='purpose' defaultValue="">
              <option value="" disabled>Purpose</option>
              <option>Photoshoot</option>
              <option>Birthday Party</option>
              <option>Film / Content Shoot</option>
              <option>Other</option>
            </select>
            <button className="btn-primary" type="submit">Send Enquiry via WhatsApp</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Frame House, Palakkad</span>
      </footer>
    </div>
  )
}
