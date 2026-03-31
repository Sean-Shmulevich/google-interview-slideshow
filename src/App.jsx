import { useEffect, useRef, useState } from 'react';
import { presentation } from './content';
import portrait from './assets/me.webp';
import cloudsBackground from './assets/clouds-bg.jpg';
import mountainWallpaper from './assets/swissMountains.webp';
import pittMark from './assets/pitt-mark.png';
import linkedInIcon from './assets/linkedin_pixel_logo_icon_181925.png';
import instagramIcon from './assets/instagram_pixel_logo_icon_181922.png';
import xIcon from './assets/x_pixel_logo.png';
import overviewIcon from './assets/myIcon_1.png';
import folderIcon from './assets/aim_fldr.ico';
import codeIcon from './assets/vb-bas.ico';
import peerIcon from './assets/aimblt2-1.png';
const philosophyIcon =
  'https://win98icons.alexmeub.com/icons/png/users_green-4.png';
const picturesIcon =
  'https://win98icons.alexmeub.com/icons/png/wia_img_color-0.png';
const summaryIcon =
  'https://win98icons.alexmeub.com/icons/png/winrep-1.png';
const pictureModules = import.meta.glob(
  './assets/pictures/*.{png,jpg,jpeg,webp,gif,PNG,JPG,JPEG,WEBP,GIF}',
  { eager: true, import: 'default' }
);

const galleryImages = Object.entries(pictureModules)
  .sort(([leftPath], [rightPath]) => leftPath.localeCompare(rightPath))
  .map(([path, src]) => ({
    src,
    name: formatPictureName(path),
  }));

const desktopIcons = [
  { label: 'Overview', icon: overviewIcon },
  { label: 'Executive Summary', icon: summaryIcon },
  { label: 'Four Principles', icon: codeIcon },
  { label: 'Philosophy', icon: philosophyIcon },
  { label: 'Peer Recommendations', icon: peerIcon },
  { label: 'Academic Recommendations', icon: peerIcon },
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [clock, setClock] = useState(() => formatTime(new Date()));
  const [navPulse, setNavPulse] = useState(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryPosition, setGalleryPosition] = useState(null);
  const [galleryDrag, setGalleryDrag] = useState(null);
  const slideStageRef = useRef(null);
  const galleryWindowRef = useRef(null);
  const totalSlides = presentation.slides.length;
  const activeSlide = presentation.slides[activeIndex];
  const activeGalleryImage = galleryImages[galleryIndex] ?? null;

  function goToSlide(index) {
    setActiveIndex(Math.max(0, Math.min(index, totalSlides - 1)));
  }

  function goToPrevious() {
    setNavPulse('left');
    setActiveIndex((current) => Math.max(current - 1, 0));
  }

  function goToNext() {
    setNavPulse('right');
    setActiveIndex((current) => Math.min(current + 1, totalSlides - 1));
  }

  function openGallery() {
    setGalleryIndex(0);
    if (!galleryPosition && slideStageRef.current) {
      const stageRect = slideStageRef.current.getBoundingClientRect();
      setGalleryPosition({
        x: Math.max(stageRect.width - 560, 84),
        y: 48,
      });
    }
    setGalleryOpen(true);
  }

  function closeGallery() {
    setGalleryOpen(false);
    setGalleryDrag(null);
  }

  function goToPreviousImage() {
    setGalleryIndex((current) => {
      if (galleryImages.length === 0) return current;
      return (current - 1 + galleryImages.length) % galleryImages.length;
    });
  }

  function goToNextImage() {
    setGalleryIndex((current) => {
      if (galleryImages.length === 0) return current;
      return (current + 1) % galleryImages.length;
    });
  }

  function beginGalleryDrag(event) {
    if (!galleryWindowRef.current || !slideStageRef.current) return;

    const galleryRect = galleryWindowRef.current.getBoundingClientRect();
    setGalleryDrag({
      offsetX: event.clientX - galleryRect.left,
      offsetY: event.clientY - galleryRect.top,
    });
  }

  useEffect(() => {
    function handleKeydown(event) {
      if (galleryOpen) {
        if (event.key === 'Escape') {
          closeGallery();
        }

        if (event.key === 'ArrowRight') {
          goToNextImage();
        }

        if (event.key === 'ArrowLeft') {
          goToPreviousImage();
        }

        return;
      }

      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        goToNext();
      }

      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        goToPrevious();
      }

      if (event.key === 'Home') {
        goToSlide(0);
      }

      if (event.key === 'End') {
        goToSlide(totalSlides - 1);
      }
    }

    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [galleryOpen, totalSlides]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setClock(formatTime(new Date()));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!navPulse) return undefined;

    const timeoutId = window.setTimeout(() => {
      setNavPulse(null);
    }, 220);

    return () => window.clearTimeout(timeoutId);
  }, [navPulse]);

  useEffect(() => {
    if (!galleryDrag) return undefined;

    function handlePointerMove(event) {
      if (!slideStageRef.current || !galleryWindowRef.current) return;

      const stageRect = slideStageRef.current.getBoundingClientRect();
      const windowRect = galleryWindowRef.current.getBoundingClientRect();
      const nextX = event.clientX - stageRect.left - galleryDrag.offsetX;
      const nextY = event.clientY - stageRect.top - galleryDrag.offsetY;

      setGalleryPosition({
        x: clamp(nextX, 0, Math.max(stageRect.width - windowRect.width, 0)),
        y: clamp(nextY, 0, Math.max(stageRect.height - windowRect.height, 0)),
      });
    }

    function handlePointerUp() {
      setGalleryDrag(null);
    }

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [galleryDrag]);

  return (
    <div className="presentation-shell">
      <div className="screen-frame">
        <header className="browser-chrome">
          <div className="chrome-brand">{presentation.profile.name}</div>
          <div className="chrome-meta">
            <div className="chrome-socials">
              <a
                href="https://github.com/Sean-Shmulevich"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/d7e4e1e509c728d.png"
                  alt="GitHub"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/sean-shmulevich-237190185/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedInIcon} alt="LinkedIn" />
              </a>
              <a
                href="https://www.instagram.com/c0nspiraskis/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagramIcon} alt="Instagram" />
              </a>
              <a
                href="https://x.com/ShmulevichZ"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={xIcon} alt="X" />
              </a>
            </div>
            <span className="chrome-meta-pill chrome-date">Tue Mar 31</span>
          </div>
        </header>

        <div className="workspace">
          <img
            className="workspace-clouds"
            src={cloudsBackground}
            alt=""
            aria-hidden="true"
          />
          <img
            className="wallpaper"
            src={mountainWallpaper}
            alt=""
            aria-hidden="true"
          />
          <div className="crt-overlay" aria-hidden="true" />

          <aside className="desktop-rail">
            {desktopIcons.map((entry, index) => (
              <button
                key={entry.label}
                className={`desktop-icon ${index === activeIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                type="button"
              >
                <img src={entry.icon} alt="" aria-hidden="true" />
                <span>{entry.label}</span>
              </button>
            ))}
          </aside>

          <main className="slide-stage" ref={slideStageRef}>
            <div className={`window-frame slide-window ${navPulse ? 'slide-window-animate' : ''}`}>
              <div className="title-bar">
                <div className="title-bar-text">
                  <img
                    className="title-bar-icon"
                    src={desktopIcons[activeIndex].icon}
                    alt=""
                    aria-hidden="true"
                  />
                  <span>{activeSlide.windowTitle}</span>
                </div>
                <div className="title-bar-controls" aria-hidden="true">
                  <span className="control minimize" />
                  <span className="control maximize" />
                  <span className="control close" />
                </div>
              </div>

              <div className="window-body">
                <SlideContent
                  slide={activeSlide}
                  profile={presentation.profile}
                  slideNumber={activeIndex + 1}
                />
              </div>

              <div className="inner-status-bar">
                <span className="status-bar-field">{activeSlide.desktopLabel}</span>
              </div>
            </div>

            {galleryOpen ? (
              <div
                className={`window-frame gallery-window ${galleryDrag ? 'gallery-window-dragging' : ''}`}
                ref={galleryWindowRef}
                style={
                  galleryPosition
                    ? { left: `${galleryPosition.x}px`, top: `${galleryPosition.y}px` }
                    : undefined
                }
              >
                <div className="title-bar gallery-title-bar" onPointerDown={beginGalleryDrag}>
                  <div className="title-bar-text">
                    <img className="title-bar-icon" src={picturesIcon} alt="" aria-hidden="true" />
                    <span>pictures.exe</span>
                  </div>
                  <button
                    className="gallery-close-button"
                    onClick={closeGallery}
                    type="button"
                    aria-label="Close pictures window"
                  >
                    ×
                  </button>
                </div>

                <div className="window-body gallery-body">
                  {activeGalleryImage ? (
                    <>
                      <div className="gallery-viewport">
                        <img
                          className="gallery-image"
                          src={activeGalleryImage.src}
                          alt={activeGalleryImage.name}
                        />
                      </div>

                      <div className="gallery-controls">
                        <button onClick={goToPreviousImage} type="button">
                          Prev
                        </button>
                        <span className="gallery-caption">
                          {activeGalleryImage.name} | {galleryIndex + 1}/{galleryImages.length}
                        </span>
                        <button onClick={goToNextImage} type="button">
                          Next
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="gallery-empty-state">
                      <p>No pictures found yet.</p>
                      <p>Drop image files into `src/assets/pictures` to populate this window.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </main>
        </div>

        <footer className="taskbar">
          <div className="taskbar-left">
            <div className="task-chip active">
              <span>{activeSlide.desktopLabel}</span>
              <span className="task-chip-separator" aria-hidden="true" />
              <span>{activeIndex + 1}/{totalSlides}</span>
            </div>
          </div>

          <div className="taskbar-center">
            <button
              aria-label="Previous slide"
              className={`nav-button ${navPulse === 'left' ? 'nav-button-active' : ''}`}
              onClick={goToPrevious}
              type="button"
            >
              Prev
            </button>
            <button
              aria-label="Next slide"
              className={`nav-button ${navPulse === 'right' ? 'nav-button-active' : ''}`}
              onClick={goToNext}
              type="button"
            >
              Next
            </button>
          </div>

          <div className="taskbar-right">
            <button
              className={`taskbar-gallery-button ${galleryOpen ? 'active' : ''}`}
              onClick={openGallery}
              type="button"
              aria-label="Open pictures"
              title="Pictures"
            >
              <img src={picturesIcon} alt="" aria-hidden="true" />
            </button>
            <div className="taskbar-clock">
              <span>{clock}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatPictureName(path) {
  const fileName = path.split('/').pop() ?? path;
  const baseName = fileName.replace(/\.[^.]+$/, '');
  return baseName.replace(/[-_]+/g, ' ');
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function SlideContent({ slide, profile, slideNumber }) {
  if (slide.variant === 'intro') {
    return <IntroSlide profile={profile} title={slide.title} />;
  }

  if (slide.variant === 'summary') {
    return (
      <section className="slide">
        <div className="section-heading">
          <p className="eyebrow">Slide {slideNumber}</p>
          <h1>{slide.title}</h1>
        </div>

        <div className="summary-grid">
          <SummaryPanel title="Why Sean" items={slide.whySean} />
          <SummaryPanel title="Why Google" items={slide.whyGoogle} />
        </div>
      </section>
    );
  }

  if (slide.variant === 'principles') {
    return (
      <section className="slide">
        <div className="section-heading">
          <p className="eyebrow">Slide {slideNumber}</p>
          <h1>{slide.title}</h1>
        </div>

        <div className="principle-grid">
          {slide.principles.map((principle) => (
            <article key={principle.title} className="principle-card">
              <p className="metric">{principle.metric}</p>
              <h2>{principle.title}</h2>
              <p className="metric-label">{principle.label}</p>
              <p>{principle.body}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (slide.variant === 'philosophy') {
    return (
      <section className="slide">
        <div className="section-heading">
          <p className="eyebrow">Slide {slideNumber}</p>
          <h1>{slide.title}</h1>
          {slide.intro ? <p className="section-intro">{slide.intro}</p> : null}
        </div>

        <div className="philosophy-grid">
          {slide.philosophies.map((item) => (
            <article key={item.title} className="philosophy-card">
              <h2>{item.title}</h2>
              <p className="philosophy-line">{item.line}</p>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="slide">
      <div className="section-heading">
        <p className="eyebrow">Slide {slideNumber}</p>
        <h1>{slide.title}</h1>
        {slide.intro ? <p className="section-intro">{slide.intro}</p> : null}
      </div>

      <div className="recommendation-grid">
        {slide.recommendations.map((recommendation) => (
          <article key={recommendation.name} className="recommendation-card">
            <div className="recommendation-head">
              <div>
                <h2>
                  {recommendation.href ? (
                    <a
                      href={recommendation.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="recommendation-link"
                    >
                      {recommendation.name}
                    </a>
                  ) : (
                    recommendation.name
                  )}
                </h2>
                <p>{recommendation.role}</p>
              </div>
              <span className="badge">Reference</span>
            </div>

            <blockquote>{recommendation.quote}</blockquote>

            <ul>
              {recommendation.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {slide.footer ? <p className="footer-note">{slide.footer}</p> : null}
    </section>
  );
}

function IntroSlide({ profile, title }) {
  const [activeTab, setActiveTab] = useState('hello');
  const googleColors = ['#4285F4', '#DB4437', '#F4B400', '#4285F4', '#0F9D58', '#DB4437'];
  const nameChars = profile.name.split('');

  return (
    <section className="slide intro-slide">
      <div className="intro-window">
        <div className="inner-tabs" role="tablist" aria-label="Introduction sections">
          <button
            className={activeTab === 'hello' ? 'active' : ''}
            onClick={() => setActiveTab('hello')}
            role="tab"
            aria-selected={activeTab === 'hello'}
            type="button"
          >
            Hello
          </button>
          <button
            className={activeTab === 'skills' ? 'active' : ''}
            onClick={() => setActiveTab('skills')}
            role="tab"
            aria-selected={activeTab === 'skills'}
            type="button"
          >
            Skills
          </button>
        </div>

        {activeTab === 'hello' ? (
          <div className="intro-grid">
            <div className="portrait-panel">
              <img src={portrait} alt={`${profile.name} portrait`} />
            </div>

            <div className="intro-copy">
              <p className="eyebrow">{title}</p>
              <h1 className="google-name" aria-label={profile.name}>
                {nameChars.map((char, index) => (
                  <span
                    key={`${char}-${index}`}
                    style={{
                      color: char === ' ' ? 'inherit' : googleColors[index % googleColors.length],
                    }}
                  >
                    {char}
                  </span>
                ))}
              </h1>
              <h2>{profile.role}</h2>
              <p className="thesis">{profile.thesis}</p>

              <div className="fact-list">
                <div className="school-card">
                  <span className="fact-label">School</span>
                  <span className="school-value">
                    <img src={pittMark} alt="" aria-hidden="true" />
                    <span>{profile.school}</span>
                  </span>
                </div>
                <div className="fact-card-centered">
                  <span className="fact-label">Focus</span>
                  <span className="fact-value-centered">{profile.focus}</span>
                </div>
                <div className="fact-card-centered">
                  <span className="fact-label">Location</span>
                  <span className="fact-value-centered">{profile.location}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="skills-panel">
            <div className="skills-header">
              <h2>Skills</h2>
            </div>

            <div className="skills-grid">
              {profile.skillGroups.map((group) => (
                <article key={group.title} className="skill-group">
                  <h3>{group.title}</h3>
                  <ul>
                    {group.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

function SummaryPanel({ title, items }) {
  return (
    <article className="summary-panel">
      <div className="summary-panel-bar">{title}</div>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default App;
