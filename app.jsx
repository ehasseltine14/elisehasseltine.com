const { useState, useEffect, useRef } = React;

/* ---------- Tweak defaults ---------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "subway"
}/*EDITMODE-END*/;

/* ---------- Reveal hook ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.10, rootMargin: "0px 0px -6% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Active section ---------- */
function useActiveSection(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] });
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [ids.join(",")]);
  return active;
}

/* ---------- Date formatting ---------- */
const TODAY = new Date(2026, 4, 24); // May 24, 2026
const fmtIso = (d) =>
  `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;

/* ---------- Top Nav ---------- */
function TopNav({ active }) {
  const links = [
    { id: "practice", label: "Practice", num: "01" },
    { id: "path",     label: "Path",     num: "02" },
    { id: "focus",    label: "Focus",    num: "03" },
    { id: "contact",  label: "Contact",  num: "04" },
  ];
  return (
    <React.Fragment>
      <div className="top-rule"></div>
      <nav className="top">
        <div className="row">
          <div className="left">
            <a href="#top" style={{ letterSpacing: "0.22em" }}>Elise Hasseltine</a>
          </div>
          <div className="center">
            COMMUNICATIONS PRACTICE / EST. 2026
          </div>
          <div className="right">
            {links.map((l) => (
              <a key={l.id} href={"#" + l.id} className={active === l.id ? "active" : ""}>
                <span className="num">{l.num}</span>{l.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-meta">
        <div><span className="k">Vol.</span><span className="v">I</span></div>
        <div><span className="k">No.</span><span className="v">001 / 064</span></div>
        <div><span className="k">Issued</span><span className="v">{fmtIso(TODAY)}</span></div>
        <div><span className="k">Field</span><span className="v">Editorial / Strategy</span></div>
        <div><span className="k">Location</span><span className="v">San Diego, CA</span></div>
      </div>

      <div className="hero-stage">
        <div>
          <h1 className="hello reveal">hello<span className="dot">.</span></h1>
          <p className="hero-tag reveal d1">
            A communications practice for <b>mission driven institutions</b> whose research, policy, and legal work deserves to reach <span className="hilite">further than the press release.</span>
          </p>
        </div>

        <div className="hero-aside reveal d2">
          <div className="stamp">Now Booking 2026</div>
          <div className="signature">
            <span className="label">Proprietor</span>
            <div className="name">Elise Hasseltine</div>
            <div className="where">Editorial strategy, narrative development,<br/>and platform native content.</div>
          </div>
          <div className="hero-mark">
            <span className="tag-tl">E.H. / MARK</span>
            <div className="circle"></div>
            <span className="tag-br">EST. 2026</span>
          </div>
        </div>
      </div>

      <div className="hero-foot">
        <span className="l">A four part program <span className="arrow"></span> Practice / Path / Focus / Contact</span>
        <span className="r">Scroll to begin</span>
      </div>
    </section>
  );
}

/* ---------- Section banner ---------- */
function SectionBanner({ id, num, numStyle, title, titleAccent, subKey, subVal }) {
  return (
    <div className="section-banner" id={id}>
      <div className={"num " + (numStyle || "")}>{num}</div>
      <div className="ttl">{title}{titleAccent && (
        titleAccent.startsWith(" ")
          ? <React.Fragment>{"\u00a0"}<em>{titleAccent.trimStart()}</em></React.Fragment>
          : <em>{titleAccent}</em>
      )}</div>
      <div className="sub">
        <span className="label">{subKey}</span>
        <span className="val">{subVal}</span>
      </div>
    </div>
  );
}

/* ---------- Practice ---------- */
function Practice() {
  return (
    <section className="body">
      <SectionBanner
        id="practice"
        num="01"
        numStyle="red"
        title="The Practice"
        titleAccent="."
        subKey="Filed Under"
        subVal="Editorial / Translation"
      />
      <div className="section-content">
        <div className="col">
          <span className="kicker reveal">A Statement</span>
          <div className="pull reveal d1">
            I help mission driven nonprofits translate sophisticated, fact based work into the formats where the public <span className="red">forms opinions.</span>
          </div>
        </div>
        <div className="col">
          <p className="reveal">
            <span className="lead">I work at the intersection of expert institutions and the public platforms most people now live on.</span>
          </p>
          <p className="reveal d1">
            A lot of the most important work being done by nonpartisan, fact based organizations is failing to reach the public. Not because the work is weak, but because the communications model it was built on (top down, gatekeeper validated, press release driven) no longer maps to how trust and attention are formed online. Only 38 percent of Americans now claim to follow news regularly, down from 51 percent a decade ago. Only 17 percent pay for it. The audience the press release was built to reach is no longer there.
          </p>
          <p className="reveal d2">
            I help organizations close that gap. In practice, that looks like <b>editorial strategy, narrative development, and platform native content</b> that takes rigorous research and policy work and renders it in the formats the public reads, watches, and shares, without losing the rigor.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Path ---------- */
function Path() {
  return (
    <section className="body">
      <SectionBanner
        id="path"
        num="02"
        numStyle=""
        title="The Path,"
        titleAccent=" The Long Way"
        subKey="Class Of"
        subVal="Bucknell, 2024"
      />
      <div className="section-content">
        <div className="col">
          <span className="kicker reveal">Origin</span>
          <div className="pull reveal d1">
            The communications problem and the justice problem turned out to be <span className="red">the same problem.</span>
          </div>
          <div className="ticket reveal d2" aria-label="Curriculum vitae, ticket stub">
            <div className="stub">
              <div className="head">No. 2024</div>
              <div className="big">B.A.</div>
              <div className="small">American History</div>
            </div>
            <div className="perf"></div>
            <div className="main">
              <div className="label">Itinerary</div>
              <div className="vals">
                <div className="row"><span className="k">From</span>Bucknell, PA</div>
                <div className="row"><span className="k">To</span>Civil Rights, Nat'l</div>
                <div className="row"><span className="k">Started</span>Intake Phone Line</div>
                <div className="row"><span className="k">Led</span>Digital, Site / Social / SEO</div>
              </div>
              <div className="label" style={{ marginTop: 2 }}>Admit One</div>
            </div>
          </div>
        </div>
        <div className="col">
          <p className="reveal">
            I studied American history at Bucknell and wrote a senior thesis on four hundred years of the country's argument with itself over alcohol, which turned out to be a history of how punitive systems and public narratives get built together.
          </p>
          <p className="reveal d1">
            Late in college I learned that <b>54 percent of American adults read below a sixth grade level</b>, and realized the country I had been studying still writes its forms, ballots, leases, and websites above the reading level of half the people living in it.
          </p>
          <p className="reveal d2">
            After graduating in 2024 I joined a national civil rights firm, started on the intake phone line, and a year later was leading the firm's digital work across website, social, and search. That is where I spent a year watching how algorithms decide what reaches a public and what does not, and watching the translation layer between expertise and the public break in real time.
          </p>
          <p className="reveal d3">
            The bet I am making now is that the most useful thing someone with my training can do is bring rigorous research and accessible language onto the platforms where the public conversation is already happening, and treat that translation work seriously, over time, <b>as a practice.</b>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Focus ---------- */
const FOCUS_ITEMS = [
  {
    color: "red",
    num: "01",
    kicker: "Field 01",
    title: "Information\nInfrastructure",
    body: "The systems by which credible knowledge reaches the people who need it. Search, encyclopedias, libraries, public broadcasters, fact checking, archival projects, and the standards that hold them together. Weekly use of generative AI nearly doubled in the last year, from 18 to 34 percent. The layer through which people find out what is true is being rebuilt in real time.",
    tag: "FLD / 01",
  },
  {
    color: "yellow",
    num: "02",
    kicker: "Field 02",
    title: "AI\nGovernance",
    body: "Independent research, policy, and civil society work on how powerful systems are built, deployed, and held to account. Translating that work for the audiences and platforms shaping the public's understanding of it.",
    tag: "FLD / 02",
  },
  {
    color: "blue",
    num: "03",
    kicker: "Field 03",
    title: "Civic\nInstitutions",
    body: "Courts, legal aid networks, voting and elections work, nonpartisan policy shops, and the small set of organizations still trying to make government legible to the public it serves.",
    tag: "FLD / 03",
  },
  {
    color: "black",
    num: "04",
    kicker: "Field 04",
    title: "The Public\nSphere",
    body: "The long term health of the spaces where citizens form opinions together. Local journalism, civic media, deliberative platforms, and the slow, unglamorous work of rebuilding shared reference points.",
    tag: "FLD / 04",
  },
];

function FocusGeom({ kind }) {
  // Vignelli-ish geometric flourish, low opacity background
  if (kind === "red") return (
    <svg className="geom" viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="6"/>
      <circle cx="100" cy="100" r="50" fill="currentColor"/>
    </svg>
  );
  if (kind === "yellow") return (
    <svg className="geom" viewBox="0 0 200 200" fill="none">
      <rect x="8" y="8" width="184" height="184" stroke="currentColor" strokeWidth="6"/>
      <path d="M8 8 L192 192 M192 8 L8 192" stroke="currentColor" strokeWidth="6"/>
    </svg>
  );
  if (kind === "blue") return (
    <svg className="geom" viewBox="0 0 200 200" fill="none">
      <polygon points="100,12 188,188 12,188" stroke="currentColor" strokeWidth="6"/>
      <circle cx="100" cy="130" r="30" fill="currentColor"/>
    </svg>
  );
  return (
    <svg className="geom" viewBox="0 0 200 200" fill="none">
      <circle cx="60" cy="100" r="48" fill="currentColor"/>
      <circle cx="140" cy="100" r="48" stroke="currentColor" strokeWidth="6"/>
    </svg>
  );
}

function Focus() {
  const [open, setOpen] = useState(0);
  return (
    <section className="body">
      <SectionBanner
        id="focus"
        num="03"
        numStyle="yellow"
        title="Current Focus"
        titleAccent=""
        subKey="Engaged With"
        subVal="A Small Number"
      />
      <div className="focus-grid">
        {FOCUS_ITEMS.map((it, i) => {
          const isOpen = open === i;
          return (
            <div
              key={it.num}
              className={"focus-cell " + it.color + (isOpen ? " open" : "")}
              onClick={() => setOpen(isOpen ? -1 : i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(isOpen ? -1 : i); } }}
            >
              <span className="ftag">{it.tag} {isOpen ? "/ OPEN" : "/ TAP"}</span>
              <FocusGeom kind={it.color} />
              <div>
                <div className="fnum">{it.num}</div>
              </div>
              <div>
                <div className="fkicker">{it.kicker}</div>
                <div className="ftitle">{it.title.split("\n").map((s, j) => <div key={j}>{s}</div>)}</div>
                <div className="fbody">{it.body}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [copied, setCopied] = useState(false);
  const email     = "elise.hasseltine@gmail.com";
  const linkedin  = "linkedin.com/in/elisehasseltine";
  const instagram = "instagram.com/elisehasseltine";
  const onCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <section className="body" id="contact">
      <div className="section-banner">
        <div className="num blue">04</div>
        <div className="ttl">Correspond<em>.</em></div>
        <div className="sub">
          <span className="label">Status</span>
          <span className="val">Open to Inquiries</span>
        </div>
      </div>
      <div className="contact-wrap">
        <div className="contact-lhs">
          <h2 className="reveal">hello<span className="dot">.</span></h2>
          <div className="lede reveal d1">
            If your organization is doing rigorous, public interest work and the translation layer is where things are <b>breaking down</b>, I would like to hear from you. Initial conversations are unstructured and free.
          </div>
          <button
            className={"copy-btn" + (copied ? " copied" : "")}
            onClick={onCopy}
          >
            {copied ? "Copied to Clipboard" : "Copy Email Address"}
          </button>
        </div>

        <div className="ctk reveal d2">
          <div className="ctk-head">
            <div className="ttl">Admit <span className="red">One</span></div>
            <div className="no">No. 001 / 064</div>
            <div className="right">Communications<br/>Day Pass</div>
          </div>
          <div className="ctk-strip">
            <div><span className="k">Issued</span>{fmtIso(TODAY)}</div>
            <div><span className="k">Valid</span>Through 2026</div>
            <div><span className="k">Class</span>All Inquiries</div>
          </div>
          <div className="ctk-rows">
            <a href={"mailto:" + email}>
              <span className="k">Email</span>
              <span className="v">{email}</span>
              <span className="arr">Send →</span>
            </a>
            <a href={"https://www." + linkedin} target="_blank" rel="noreferrer noopener">
              <span className="k">LinkedIn</span>
              <span className="v">/in/elisehasseltine</span>
              <span className="arr">Open →</span>
            </a>
            <a href={"https://www." + instagram} target="_blank" rel="noreferrer noopener">
              <span className="k">Instagram</span>
              <span className="v">@elisehasseltine</span>
              <span className="arr">Open →</span>
            </a>
            <div className="row">
              <span className="k">Reply</span>
              <span className="v" style={{ fontWeight: 500, fontStyle: "italic" }}>within two business days</span>
              <span className="arr"></span>
            </div>
          </div>
          <div className="ctk-foot">
            <span>E.H. / 2026 / SD</span>
            <span className="barcode" aria-hidden="true">
              <i></i><i className="s"></i><i className="w"></i><i></i><i className="s"></i><i></i><i className="w"></i><i></i><i></i><i className="s"></i><i className="w"></i><i></i><i></i><i className="s"></i><i></i>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer>
      <div className="l">
        <b>Elise Hasseltine</b> &nbsp;/&nbsp; Communications Practice
      </div>
      <div className="c">
        Set in Helvetica &nbsp;/&nbsp; Hand built, 2026
      </div>
      <div className="r">
        © 2026 &nbsp;/&nbsp; All Rights Reserved
      </div>
    </footer>
  );
}

/* ---------- Tweaks ---------- */
function Tweaks({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Palette" />
      <TweakSelect
        label="Color System"
        value={tweaks.palette}
        options={[
          { value: "subway",    label: "Subway (Default)" },
          { value: "newsstand", label: "Newsstand Vintage" },
          { value: "press",     label: "Letterpress Muted" },
        ]}
        onChange={(v) => setTweak("palette", v)}
      />
    </TweaksPanel>
  );
}

/* ---------- App ---------- */
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();
  const active = useActiveSection(["practice", "path", "focus", "contact"]);

  useEffect(() => {
    document.documentElement.setAttribute("data-palette", tweaks.palette);
  }, [tweaks.palette]);

  return (
    <React.Fragment>
      <TopNav active={active} />
      <Hero />
      <Practice />
      <Path />
      <Focus />
      <Contact />
      <Footer />
      <Tweaks tweaks={tweaks} setTweak={setTweak} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
