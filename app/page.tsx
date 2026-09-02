import Image from "next/image";

type Setlist = {
  date: string;
  title: string;
  description: string;
  spotifyEmbedUrl: string;
};

const setlists: Setlist[] = [
  {
    date: "May 4, 2026",
    title: "mar/apr recap",
    description:
      "my picks for the best songs and albums from march and april!",
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/playlist/404GsUnDPa4XknSueJyEVU?utm_source=generator&si=dacf0f7eaced473e",
  },
  {
    date: "April 27, 2026",
    title: "press play",
    description:
      "the rhythm games episode featuring select hits from osu! and geometry dash alike.",
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/playlist/6FOeLS59nJ3exT0DvTY9WD?utm_source=generator&si=5e947406163d4cd7",
  },
  {
    date: "April 20, 2026",
    title: "sonatine",
    description:
      "my favorite korean pop songs of all time (old and new)!",
    spotifyEmbedUrl:
      "https://open.spotify.com/embed/playlist/2GBahKHB7Jgg56UXviawiC?utm_source=generator&si=3f0fd9880dcf489c",
  },
];

type SetlistCardProps = {
  setlist: Setlist;
};

function SetlistCard({ setlist }: SetlistCardProps) {
  return (
    <article className="setlist-card">
      <iframe
        className="spotify-embed"
        src={setlist.spotifyEmbedUrl}
        title={`Spotify playlist: ${setlist.title}`}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
      <p className="card-meta">{setlist.date}</p>
      <h3>{setlist.title}</h3>
      <p>{setlist.description}</p>
    </article>
  );
}

type InstagramPost = {
  title: string;
  embedUrl: string;
};

const instagramPosts: InstagramPost[] = [
  {
    title: "My Songs of the Summer (2026)",
    embedUrl: "https://www.instagram.com/p/Db8zMPVGhm_/embed/",
  },
  {
    title: "The 2026 astilbe Freshman List",
    embedUrl: "https://www.instagram.com/p/DaLsRhsGIAz/embed/",
  },
];


export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <nav aria-label="Primary navigation">
          <a href="#on-air">On air</a><a href="#setlists">Setlists</a><a href="#writing">Writing</a>
          <a href="https://www.instagram.com/astilbe.wav/" target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main id="main-content">
        <section
          className="hero"
          id="top"
          aria-labelledby="hero-title"
        >
          <h1 id="hero-title" className="visually-hidden">
            astilbe
          </h1>
          <div className="hero-art">
            <Image
              className="hero-image"
              src="/images/astilbelogo.png"
              alt=""
              width={2000}
              height={2000}
              fetchPriority="high"
              sizes="(max-width: 760px) 100vw, 950px"
            />
          </div>
          <div>
            <p className="eyebrow">Independent radio from College Park</p>
            <p className="hero-intro">  astilbe is a music journalism project and radio show by Rafael Regalado (
              <a
                href="https://www.instagram.com/tar0mix/"
                target="_blank"
                rel="noreferrer"
              >
                @tar0mix
              </a>
              ), based in the University of Maryland, College Park.</p>
            <div className="hero-actions">
              <a className="button" href="https://wmuc.umd.edu/show/253547" target="_blank" rel="noreferrer">Listen on WMUC <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#setlists">Browse past setlists ↓</a>
            </div>
          </div>
        </section>

        <section className="on-air section-shell" id="on-air" aria-labelledby="on-air-title">
          <div><p className="section-index">01 / On air</p><h2 id="on-air-title">Coming soon...</h2></div>
          <div className="schedule-card"><span className="status-dot" aria-hidden="true" /><div>
            <p className="schedule-label">FW26 + SS27</p><p className="schedule-time">Coming soon...</p>
            <p>Listen online through WMUC&apos;s website. The confirmed time will be posted here as soon as it is available.</p>
          </div></div>
        </section>

        <section className="section-shell" id="setlists" aria-labelledby="setlists-title">
          <div className="section-heading"><div><p className="section-index">02 / Setlists</p><h2 id="setlists-title">Recently on astilbe...</h2></div>
            <a className="text-link" href="https://wmuc.umd.edu/show/253547" target="_blank" rel="noreferrer">Full WMUC archive ↗</a>
          </div>
          <div className="card-grid">
            {setlists.map((setlist) => (
              <SetlistCard key={setlist.title} setlist={setlist} />
            ))}
          </div>
        </section>

        <section className="writing section-shell" id="writing" aria-labelledby="writing-title">
          <div className="section-heading"><div><p className="section-index">03 / Articles</p><h2 id="writing-title">Latest posts</h2></div></div>
          <div className="editorial-grid">
            {instagramPosts.map((post) => (
              <article className="instagram-card" key={post.embedUrl}>
                <iframe
                  className="instagram-embed"
                  src={post.embedUrl}
                  title={post.title}
                  loading="lazy"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </article>
            ))}
          </div>
        </section>

        <section className="about section-shell" aria-labelledby="about-title">
          <div className="about-meta">
            <p className="section-index">04 / About</p>

            <Image
              className="about-portrait"
              src="/images/rafael.jpeg"
              alt="Portrait of Rafael Regalado"
              width={2888}
              height={2888}
              loading="lazy"
              sizes="(max-width: 760px) 120px, 340px"
            />
          </div>

          <div className="about-copy">
            <h2 id="about-title">
              Celebrating the underground: US, UK, and beyond
            </h2>

            <p>
              astilbe started as an Instagram page for me to post about the music I
              loved, the newest releases from my favorite artists, and my latest
              underground discoveries. Since then, it has evolved into a radio show
              with the lovely folks at WMUC, while still continuing as a side project
              for me to share my passion for music with the world. I hope you tune in
              every ______ at ______ and shoot me a follow on Instagram!
            </p>

            <p className="signature">— love, rafael</p>
          </div>
        </section>
      </main>

      <footer><a className="footer-logo-link" href="#top">
        <Image
          className="footer-logo"
          src="/images/astilbelogo.png"
          alt="astilbe — back to top"
          width={2000}
          height={2000}
          loading="lazy"
          sizes="220px"
        />
      </a><div>
          <a href="https://wmuc.umd.edu/show/253547" target="_blank" rel="noreferrer">WMUC ↗</a>
          <a href="https://www.instagram.com/astilbe.wav/" target="_blank" rel="noreferrer">Instagram ↗</a>
        </div></footer>
    </>
  );
}
