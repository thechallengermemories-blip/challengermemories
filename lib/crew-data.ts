// lib/crew-data.ts
//
// Single source of truth for the STS-51-L crew.
// Add a new crew member by pushing an object onto CREW below —
// the /crew/[slug] route and the hero grid both read from here,
// so nothing else needs to change.

export interface MediaItem {
  type: "image" | "video";
  url: string;
  caption?: string;
  /** For type: "video" — if the url isn't already a YouTube/Vimeo embed link, set this to true and we'll try to embed it as-is. */
  embed?: boolean;
}

export interface BioSection {
  heading: string;
  content: string;
}

export interface CrewMember {
  slug: string; // used for /crew/[slug]
  name: string; // short display name, e.g. "Francis R. Scobee"
  fullTitle: string; // formal NASA title, e.g. "FRANCIS R. (DICK) SCOBEE (LT. COL., U.S. AIR FORCE, RET.)"
  role: string; // "Commander", "Pilot", etc.
  id: string; // "CDR", "PLT", "MS1"...
  seat: string; // "01".."07"
  img: string; // portrait, from /public
  shortBio: string; // one-liner used in the hero grid hover card
  /** Raw NASA-style biography text (PERSONAL DATA: ... EDUCATION: ... etc). Leave "" until you have it — the page will just skip the biography block. */
  rawBiography: string;
  media: MediaItem[];
}

// ---------------------------------------------------------------------------
// NASA biographies are consistently formatted as a run of ALL-CAPS headers
// ("PERSONAL DATA:", "EDUCATION:", "NASA EXPERIENCE:"...) each followed by
// normal-case prose. This splits that raw text into clean sections so the
// UI can render them as cards instead of one giant wall of text.
// ---------------------------------------------------------------------------
export function parseBiography(raw: string): BioSection[] {
  if (!raw?.trim()) return [];

const headerRegex =
  /(?:^|\s)([A-Z][A-Z0-9/&().,\- ]{3,60}):\s/g;
  const matches: { heading: string; index: number; end: number }[] = [];

  let m: RegExpExecArray | null;
  while ((m = headerRegex.exec(raw)) !== null) {
    matches.push({
      heading: m[1].trim(),
      index: m.index,
      end: m.index + m[0].length,
    });
  }

  if (matches.length === 0) {
    return [{ heading: "Biography", content: raw.trim() }];
  }

  const sections: BioSection[] = [];
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].end;
    const stop = i + 1 < matches.length ? matches[i + 1].index : raw.length;
    const content = raw.slice(start, stop).trim();
    if (content) {
      sections.push({ heading: titleCase(matches[i].heading), content });
    }
  }
  return sections;
}

function titleCase(s: string) {
  return s
    .toLowerCase()
    .split(" ")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

// ---------------------------------------------------------------------------
// Crew roster
// ---------------------------------------------------------------------------
export const CREW: CrewMember[] = [
{
  slug: "francis-scobee",
  name: "Francis R. Scobee",
  fullTitle: "FRANCIS R. (DICK) SCOBEE (LT. COL., U.S. AIR FORCE, RET.)",
  role: "Commander",
  id: "CDR",
  seat: "01",
  img: "/Scobee-fr.webp",
  shortBio: "Test pilot. Vietnam veteran. Led STS-51-L with quiet courage.",
  rawBiography: `PERSONAL DATA: Born May 19, 1939, in Cle Elum, Washington. Died January 28, 1986. He is survived by his wife, June, and two children. He enjoyed flying, oil painting, woodworking, motorcycling, racquetball, jogging, and most outdoor sports.

EDUCATION: Graduated from Auburn Senior High School, Auburn, Washington, in 1957; received a bachelor of science degree in Aerospace Engineering from the University of Arizona in 1965.

ORGANIZATIONS: Member of the Society of Experimental Test Pilots, the Tau Beta Pi, the Experimental Aircraft Association, and the Air Force Association.

AWARDS: Posthumously awarded the Congressional Space Medal of Honor.

SPECIAL HONORS: Awarded the Air Force Distinguished Flying Cross, the Air Medal, and two NASA Exceptional Service Medals.

EXPERIENCE: Scobee enlisted in the United States Air Force in 1957, trained as a reciprocating engine mechanic, and was subsequently stationed at Kelly Air Force Base, Texas. While there, he attended night school and acquired 2 years of college credit which led to his selection for the Airman’s Education and Commissioning Program. He graduated from the University of Arizona with a bachelor of science degree in Aerospace Engineering. He received his commission in 1965 and, after receiving his wings in 1966, completed a number of assignments including a combat tour in Vietnam. He returned to the United States and attended the U.S. Air Force Aerospace Research Pilot School at Edwards Air Force Base, California. After graduating in 1972, he participated in test programs for which he flew such varied aircraft as the Boeing 747, the X-24B, the transonic aircraft technology (TACT) F-111, and the C-5.

He logged more than 6,500 hours flying time in 45 types of aircraft.

NASA EXPERIENCE: Lt. Col. Scobee was selected as an astronaut candidate by NASA in January 1978. In August 1979, he completed a 1-year training and evaluation period, making him eligible for assignment as a pilot on future space shuttle flightcrews. In addition to astronaut duties, Scobee was an Instructor Pilot on the NASA/Boeing 747 shuttle carrier airplane.

He first flew as pilot of STS 41-C which launched from Kennedy Space Center, Florida, on April 6, 1984. Crew members included spacecraft commander Captain Robert L. Crippen, and three mission specialists, Terry J. Hart, Dr. G.D. (Pinky) Nelson, and Dr. J.D.A. (Ox) van Hoften. During this mission, the crew successfully deployed the Long Duration Exposure Facility (LDEF); retrieved the ailing Solar Maximum Satellite, repaired it onboard the orbiting Challenger, and replaced it in orbit using the robot arm called the Remote Manipulator System (RMS). The mission also included flight testing of Manned Maneuvering Units (MMU’s) in two Extravehicular Activities (EVAs); operation of the Cinema 360 and IMAX Camera Systems, as well as a Bee Hive Honeycomb Structures student experiment. The mission duration was 7 days before landing at Edwards Air Force Base, California, on April 13, 1984. With the completion of this flight, he logged a total of 168-hours in space.

Lt. Col. Scobee was spacecraft commander on STS 51-L, which launched from Kennedy Space Center, Florida, at 11:38:00 EST on January 28, 1986. The crew onboard the Orbiter Challenger included the pilot, M.J. Smith (U.S. Navy) (pilot), three mission specialists, Dr. R.E. McNair, Lt. Col. E.S. Onizuka (U.S. Air Force), and Dr. J.A. Resnik, as well as two civilian payload specialists, G.B. Jarvis and S.C. McAuliffe. The STS 51-L crew died on January 28, 1986 when Challenger exploded after launch.`,
  media: [
    // { type: "image", url: "/crew/scobee/1.jpg", caption: "Official NASA portrait" },
    // { type: "video", url: "https://www.youtube.com/embed/XXXXXXX", caption: "Mission briefing" },
  ],
},
  {
    slug: "michael-smith",
    name: "Michael J. Smith",
    fullTitle: "MICHAEL J. SMITH (CAPTAIN, USN)",
    role: "Pilot",
    id: "PLT",
    seat: "02",
    img: "/Michael_Smith.webp",
    shortBio: "Navy test pilot. Father of three. His first spaceflight.",
    rawBiography: `PERSONAL DATA: Born April 30, 1945, in Beaufort, North Carolina. Died January 28, 1986. He is survived by his wife, Jane, and three children. Michael enjoyed woodworking, running, tennis, and squash.

EDUCATION: Graduated from Beaufort High School, Beaufort, North Carolina, in 1963; received a bachelor of science degree in Naval Science from the United States Naval Academy in 1967 and a master of science degree in Aeronautical Engineering from the U.S. Naval Postgraduate School in 1968.

AWARDS: Posthumously awarded the Congressional Space Medal of Honor.

SPECIAL HONORS: The Defense Distinguished Service Medal (posthumous), Navy Distinguished Flying Cross, 3 Air Medals, 13 Strike Flight Air Medals, the Navy Commendation Medal with "V", the Navy Unit Citation, and the Vietnamese Cross of Gallantry with Silver Star.

EXPERIENCE: Graduated from the United States Naval Academy in 1967 and subsequently attended the U.S. Naval Postgraduate School at Monterey, California. He completed Navy aviation jet training at Kingsville, Texas, receiving his aviator wings in May 1969. He was then assigned to the Advanced Jet Training Command (VT-21) where he served as an instructor from May 1969 to March 1971. During the 2-year period that followed, he flew A-6 Intruders and completed a Vietnam cruise while assigned to Attack Squadron 52 aboard the USS KITTY HAWK (CV-63). In 1974, he completed U.S. Navy Test Pilot School and was assigned to the Strike Aircraft Test Directorate at Patuxent River, Maryland, to work on the A6E TRAM and CRUISE missile guidance systems. He returned to the U.S. Navy Test Pilot School in 1976 and completed an 18-month tour as an instructor. From Patuxent River, he was assigned to Attack Squadron 75 where he served as maintenance and operations officer while completing two Mediterranean deployments aboard the USS SARATOGA. He flew 28 different types of civilian and military aircraft, logging 4,867.7 hours of flying time.

NASA EXPERIENCE: Selected as an astronaut candidate by NASA in May 1980, he completed a 1-year training and evaluation period in August 1981, qualifying him for assignment as a pilot on future Space Shuttle flight crews. He served as a commander in the Shuttle Avionics Integration Laboratory, Deputy Chief of Aircraft Operations Division, Technical Assistant to the Director, Flight Operations Directorate, and was also assigned to the Astronaut Office Development and Test Group. Captain Smith was assigned as pilot on STS 51-L. He was also assigned as pilot for Space Shuttle Mission 61-N scheduled for launch in the Fall of 1986. Captain Smith died on January 28, 1986 when the Space Shuttle Challenger exploded after launch from the Kennedy Space Center, also taking the lives of spacecraft commander, Mr. F.R. Scobee, three mission specialists, Dr. R.E. McNair, Lieutenant Colonel E.S. Onizuka (USAF), and Dr. J.A. Resnik, and two civilian payload specialists, Mr. G.B. Jarvis and Mrs. S. C. McAuliffe.`,
    media: [
      // { type: "image", url: "/crew/smith/1.jpg" },
      // { type: "video", url: "https://www.youtube.com/embed/XXXXXXX" },
    ],
  },
  {
  slug: "ronald-mcnair",
  name: "Ronald E. McNair",
  fullTitle: "RONALD E. McNAIR (Ph.D.)",
  role: "Mission Specialist",
  id: "MS1",
  seat: "03",
  img: "/Ronald_Erwin_McNair.webp",
  shortBio: "Physicist. Saxophonist. Second African American in space.",
  rawBiography: `PERSONAL DATA: Born October 21, 1950, in Lake City, South Carolina. Died January 28, 1986. He is survived by his wife Cheryl, and two children. He was a 5th degree black belt Karate instructor and a performing jazz saxophonist. He also enjoyed running, boxing, football, playing cards, and cooking.

EDUCATION: Graduated from Carver High School, Lake City, South Carolina, in 1967; received a bachelor of science degree in Physics from North Carolina A&T State University in 1971 and a doctor of philosophy in Physics from Massachusetts Institute of Technology in 1976; presented an honorary doctorate of Laws from North Carolina A&T State University in 1978, an honorary doctorate of Science from Morris College in 1980, and an honorary doctorate of science from the University of South Carolina in 1984.

ORGANIZATIONS: Member of the American Association for the Advancement of Science, the American Optical Society, the American Physical Society (APS), the APS Committee on Minorities in Physics, the North Carolina School of Science and Mathematics Board of Trustees, the MIT Corporation Visiting Committee, Omega Psi Phi, and a visiting lecturer in Physics at Texas Southern University.

AWARDS: Posthumously awarded the Congressional Space Medal of Honor.

SPECIAL HONORS: Graduated magna cum laude from North Carolina A&T (1971); named a Presidential Scholar (1967-1971), a Ford Foundation Fellow (1971-1974), a National Fellowship Fund Fellow (1974-1975), a NATO Fellow (1975); winner of Omega Psi Phi Scholar of the Year Award (1975), Los Angeles Public School System’s Service Commendation (1979), Distinguished Alumni Award (1979), National Society of Black Professional Engineers Distinguished National Scientist Award (1979), Friend of Freedom Award (1981), Who’s Who Among Black Americans (1980), an AAU Karate Gold Medal (1976), five Regional Blackbelt Karate Championships, and numerous proclamations and achievement awards.

EXPERIENCE: While at Massachusetts Institute of Technology, Dr. McNair performed some of the earliest development of chemical HF/DF and high-pressure CO lasers. His later experiments and theoretical analysis on the interaction of intense CO2 laser radiation with molecular gases provided new understandings and applications for highly excited polyatomic molecules.

In 1975, he studied laser physics with many authorities in the field at E’cole D’ete Theorique de Physique, Les Houches, France. He published several papers in the areas of lasers and molecular spectroscopy and gave many presentations in the United States and abroad.

Following graduation from MIT in 1976, he became a staff physicist with Hughes Research Laboratories in Malibu, California. His assignments included the development of lasers for isotope separation and photochemistry utilizing nonlinear interactions in low-temperature liquids and optical pumping techniques. He also conducted research on electro-optic laser modulation for satellite-to-satellite space communications, the construction of ultra-fast infrared detectors, ultraviolet atmospheric remote sensing, and the scientific foundations of the martial arts.

NASA EXPERIENCE: Selected as an astronaut candidate by NASA in January 1978, he completed a 1-year training and evaluation period in August 1979, qualifying him for assignment as a mission specialist astronaut on Space Shuttle flight crews.

He first flew as a mission specialist on STS 41-B which launched from Kennedy Space Center, Florida, on February 3, 1984. The crew included spacecraft commander, Mr. Vance Brand, the pilot, Commander Robert L. Gibson, and fellow mission specialists, Captain Bruce McCandless II, and Lt. Col. Robert L. Stewart. The flight accomplished the proper shuttle deployment of two Hughes 376 communications satellites, as well as the flight testing of rendezvous sensors and computer programs. This mission marked the first flight of the Manned Maneuvering Unit and the first use of the Canadian arm (operated by McNair) to position EVA crewman around Challenger’s payload bay. Included were the German SPAS-01 Satellite, acoustic levitation and chemical separation experiments, the Cinema 360 motion picture filming, five Getaway Specials, and numerous mid-deck experiments -- all of which Dr. McNair assumed primary responsibility. Challenger culminated in the first landing on the runway at Kennedy Space Center on February 11, 1984. With the completion of this flight, he logged a total of 191 hours in space.

Dr. McNair was assigned as a mission specialist on STS 51-L. Dr. McNair died on January 28, 1986 when the Space Shuttle Challenger exploded after launch from the Kennedy Space Center, Florida, also taking the lives of the spacecraft commander, Mr. F.R. Scobee, the pilot, Commander M.J. Smith (USN), mission specialists, Lieutenant Colonel E.S. Onizuka (USAF), and Dr. J.A. Resnik, and two civilian payload specialists, Mr. G.B. Jarvis and Mrs. S. C. McAuliffe.`,
  media: [],
},
 {
  slug: "ellison-onizuka",
  name: "Ellison S. Onizuka",
  fullTitle: "ELLISON S. ONIZUKA (LT. COL., USAF)",
  role: "Mission Specialist",
  id: "MS2",
  seat: "04",
  img: "/Ellison_Shoji_Onizuka.webp",
  shortBio: "Air Force colonel. First Asian American in space.",
  rawBiography: `PERSONAL DATA: Born June 24, 1946, in Kealakekua, Kona, Hawaii. Died January 28, 1986. He is survived by his wife, Lorna, and two daughters. He enjoyed running, hunting, fishing, and indoor/outdoor sports.

EDUCATION: Graduated from Konawaena High School, Kealakekua, Hawaii, in 1964; received bachelor and master of science degrees in Aerospace Engineering in June and December 1969, respectively, from the University of Colorado.

ORGANIZATIONS: Member of the Society of Flight Test Engineers, the Air Force Association, the American Institute of Aeronautics and Astronautics, Tau Beta Pi, Sigma Tau, and the Triangle Fraternity.

AWARDS / PROMOTIONS: Posthumously promoted to the rank of Colonel. Posthumously awarded the Congressional Space Medal of Honor.

SPECIAL HONORS: Presented the Air Force Commendation Medal, Air Force Meritorious Service Medal, Air Force Outstanding Unit Award, Air Force Organizational Excellence Award, and National Defense Service Medal.

EXPERIENCE: Onizuka entered on active duty with the United States Air Force in January 1970 after receiving his commission at the University of Colorado through the 4-year ROTC program as a distinguished military graduate. As an aerospace flight test engineer with the Sacramento Air Logistics Center at McClellan Air Force Base, California, he participated in flight test programs and systems safety engineering for the F-84, F-100, F-105, F-111, EC-121T, T-33, T-39, T-28, and A-1 aircraft. He attended the USAF Test Pilot School from August 1974 to July 1975, receiving formal academic and flying instruction in performance, stability and control, and systems flight testing of aircraft. In July 1975, he was assigned to the Air Force Flight Test Center at Edwards Air Force Base, California, serving on the USAF Test Pilot School staff initially as squadron flight test engineer and later as chief of the engineering support section in the training resources branch. His duties involved instruction of USAF Test Pilot School curriculum courses and management of all flight test modifications to general support fleet aircraft (A-7, A-37, T-38, F-4, T-33, and NKC-135) used by the test pilot school and the flight test center. He has logged more than 1,700 hours flying time.

NASA EXPERIENCE: Selected as an astronaut candidate by NASA in January 1978, he completed a 1-year training and evaluation period in August 1979. He subsequently worked on orbiter test and checkout teams and launch support crews at the Kennedy Space Center for STS-1 and STS-2. He worked on software test and checkout crew at the Shuttle Avionics and Integration Laboratory (SAIL), and has supported numerous other technical assignments ranging from astronaut crew equipment/orbiter crew compartment coordinator to systems and payload development.

He first flew as a mission specialist on STS 51-C, the first Space Shuttle Department of Defense mission, which launched from Kennedy Space Center, Florida on January 24, 1985. He was accompanied by Captain Thomas K. Mattingly (spacecraft commander), Colonel Loren J. Shriver (pilot), fellow mission specialist, Colonel James F. Buchli, and Lieutenant Colonel Gary E. Payton (DOD payload specialist). During the mission Onizuka was responsible for the primary payload activities, which included the deployment of a modified Inertial Upper Stage (IUS). STS 51-C Discovery completed 48 orbits of the Earth before landing at Kennedy Space Center, Florida, on January 27, 1985. With the completion of this flight he logged a total of 74 hours in space.

Colonel Onizuka was a mission specialist on STS 51-L which was launched from the Kennedy Space Center, Florida, at 11:38:00 EST on January 28, 1986. The crew on board the Orbiter Challenger included the spacecraft commander, Mr. F.R. Scobee, the pilot, Commander M.J. Smith (USN), fellow mission specialists, Dr. R.E. McNair, and Dr. J.A. Resnik, as well as two civilian payload specialists, Mr. G.B. Jarvis and Mrs. S. C. McAuliffe. The STS 51-L crew died on January 28, 1986 when Challenger exploded 1 min. 13 sec. after launch.`,
  media: [],
},
 {
  slug: "judith-resnik",
  name: "Judith A. Resnik",
  fullTitle: "JUDITH A. RESNIK (Ph.D.)",
  role: "Mission Specialist",
  id: "MS3",
  seat: "05",
  img: "/Judith_A._Resnik_official_portrait.webp",
  shortBio: "Electrical engineer. Second American woman in space.",
  rawBiography: `PERSONAL DATA: Born April 5, 1949, in Akron, Ohio. Died January 28, 1986. Unmarried. She was a classical pianist and also enjoyed bicycling, running, and flying during her free time.

EDUCATION: Graduated from Firestone High School, Akron, Ohio, in 1966; received a bachelor of science degree in Electrical Engineering from Carnegie-Mellon University in 1970, and a doctorate in Electrical Engineering from the University of Maryland in 1977.

ORGANIZATIONS: Member of the Institute of Electrical and Electronic Engineers; American Association for the Advancement of Science; IEEE Committee on Professional Opportunities for Women; American Association of University Women; American Institute of Aeronautics and Astronautics; Tau Beta Pi; Eta Kappa Nu; Mortarboard; Senior Member of the Society of Women Engineers.

AWARDS: Posthumously awarded the Congressional Space Medal of Honor.

SPECIAL HONORS: Graduate Study Program Award, RCA, 1971; American Association of University Women Fellow, 1975-1976. NASA Space Flight Medal, 1984.

EXPERIENCE: Upon graduating from Carnegie-Mellon University in 1970, she was employed by RCA located in Moorestown, New Jersey; and in 1971, she transferred to RCA in Springfield, Virginia. Her projects while with RCA as a design engineer included circuit design and development of custom integrated circuitry for phased-array radar control systems; specification, project management, and performance evaluation of control system equipment; and engineering support for NASA sounding rocket and telemetry systems programs. She authored a paper concerning design procedures for special-purpose integrated circuitry.

Dr. Resnik was a biomedical engineer and staff fellow in the Laboratory of Neurophysiology at the National Institutes of Health in Bethesda, Maryland, from 1974 to 1977, where she performed biological research experiments concerning the physiology of visual systems. Immediately preceding her selection by NASA in 1978, she was a senior systems engineer in product development with Xerox Corporation at El Segundo, California.

NASA EXPERIENCE: Selected as an astronaut candidate by NASA in January 1978, she completed a 1-year training and evaluation period in August 1979. Dr. Resnik worked on a number of projects in support of Orbiter development, including experiment software, the Remote Manipulator System (RMS), and training techniques.

Dr. Resnik first flew as a mission specialist on STS 41-D which launched from the Kennedy Space Center, Florida, on August 30, 1984. She was accompanied by spacecraft commander Hank Hartsfield, pilot Mike Coats, fellow mission specialists, Steve Hawley and Mike Mullane, and payload specialist Charlie Walker. This was the maiden flight of the orbiter Discovery. During this 7-day mission the crew successfully activated the OAST-1 solar cell wing experiment, deployed three satellites, SBS-D, SYNCOM IV-2, and TELSTAR 3-C, operated the CFES-III experiment, the student crystal growth experiment, and photography experiments using the IMAX motion picture camera. The crew earned the name "Icebusters" in successfully removing hazardous ice particles from the orbiter using the Remote Manipulator System. STS 41-D completed 96 orbits of the earth before landing at Edwards Air Force Base, California, on September 5, 1984. With the completion of this flight she logged 144 hours and 57 minutes in space.

Dr. Resnik was a mission specialist on STS 51-L which was launched from the Kennedy Space Center, Florida, at 11:38:00 EST on January 28, 1986. The crew on board the Orbiter Challenger included the spacecraft commander, Mr. F.R. Scobee, the pilot, Commander M.J. Smith (USN), fellow mission specialists, Dr. R.E. McNair, and Lieutenant Colonel E.S. Onizuka (USAF), as well as two civilian payload specialists, Mr. G.B. Jarvis and Mrs. S. C. McAuliffe. The STS 51-L crew died on January 28, 1986 when Challenger exploded after launch.`,
  media: [],
},
 {
  slug: "gregory-jarvis",
  name: "Gregory B. Jarvis",
  fullTitle: "GREGORY B. JARVIS",
  role: "Payload Specialist",
  id: "PS1",
  seat: "06",
  img: "/Gregory_Jarvis.webp",
  shortBio: "Satellite engineer for Hughes Aircraft. Dreamed of the cosmos.",
  rawBiography: `PERSONAL DATA: Born August 24, 1944, in Detroit, Michigan. He is survived by his wife, Marcia. Greg Jarvis was an avid squash player and bicycle rider. He also enjoyed cross country skiing, backpacking, racquet ball, and white water river rafting. For relaxation, he played the classical guitar.

AWARDS: Posthumously awarded the Congressional Space Medal of Honor.

EDUCATION: Graduated from Mohawk Central High School, Mohawk, New York, 1962; received a bachelor of science degree in electrical engineering, State University of New York at Buffalo, 1967; a masters degree in electrical engineering, Northeastern University, Boston, Massachusetts, 1969. Mr. Jarvis also completed all of the course work for a masters degree in management science, West Coast University, Los Angeles, California.

EXPERIENCE: While pursuing his masters degree at Northeastern, Mr. Jarvis worked at Raytheon in Bedford Massachusetts, where he was involved in circuit design on the SAM-D missile. In July 1969, he entered active duty in the Air Force and was assigned to the Space Division in El Segundo, California. As a Communications Payload Engineer, in the Satellite Communications Program Office, he worked on advanced tactical communications satellites. He was involved in the concept formulation, source selection, and early design phase of the FLTSATCOM communications payload. After being honorably discharged from the Air Force in 1973, with the rank of Captain, he joined Hughes Aircraft Companys Space and Communications group, where he worked as a Communications Subsystem Engineer on the MARISAT Program. In 1975, he became the MARISAT F-3 Spacecraft Test and Integration Manager. In 1976, the MARISAT F-3 was placed in geosynchronous orbit. Jarvis became a member of the Systems Applications Laboratory in 1976, and was involved in the concept definition for advanced UHF and SHF communications for the strategic forces. Joining the Advanced Program Laboratory in 1978, he began working on the concept formulation and subsequent proposal for the SYNCON IV/LEASAT Program. In 1979, he became the Power/Thermal/Harness Subsystem Engineer on the LEASAT Program. In 1981, he became the Spacecraft Bus System Engineering and in 1982, the Assistant Spacecraft System Engineering Manager. He was the Test and Integration Manager for the F-1, F-2, and F-3 spacecraft and the cradle in 1983, where he worked until the shipment of the F-1 spacecraft and cradle to Cape Kennedy for integration into the Orbiter. Both the F-1 and F-2 LEASAT spacecraft have successfully achieved their geosynchronous positions. Mr. Jarvis worked on advanced satellite designs in the Systems Application Laboratory. He was selected as a payload specialist candidate in July 1984.

NASA EXPERIENCE: Mr. Jarvis was a payload specialist on STS 51-L which was launched from the Kennedy Space Center, Florida, at 11:38:00 EST on January 28, 1986. The crew on board the Orbiter Challenger included the spacecraft commander, Mr. F.R. Scobee, the pilot, Commander M.J. Smith (USN), mission specialists, Dr. R.E. McNair, Lieutenant Colonel E.S. Onizuka (USAF), and Dr. J. A. Resnik, and fellow civilian payload specialist, Mrs. S. C. McAuliffe. The STS 51-L crew died on January 28, 1986 when Challenger exploded after launch.`,
  media: [],
},
 {
  slug: "christa-mcauliffe",
  name: "Christa McAuliffe",
  fullTitle: "SHARON CHRISTA McAULIFFE",
  role: "Teacher in Space",
  id: "PS2",
  seat: "07",
  img: "/ChristaMcAuliffe.webp",
  shortBio: "New Hampshire schoolteacher. Chosen from 11,000 to teach from orbit.",
  rawBiography: `PERSONAL DATA: Born September 2, 1948 in Boston, Massachusetts. She is survived by husband Steven and two children. Her listed recreational interests included jogging, tennis, and volleyball.

EDUCATION: Graduated from Marian High School, Framingham, Massachusetts, in 1966; received a bachelor of arts degree, Framingham State College, 1970; and a masters degree in education, Bowie State College, Bowie, Maryland, 1978.

ORGANIZATIONS: Board member, New Hampshire Council of Social Studies; National Council of Social Studies; Concord Teachers Association; New Hampshire Education Association; and the National Education Association.

AWARDS: Posthumously awarded the Congressional Space Medal of Honor.

OUTSIDE ACTIVITIES: Member, Junior Service League; teacher, Christian Doctrine Classes, St. Peters Church; host family, A Better Chance Program (ABC), for inner-city students; and fundraiser for Concord Hospital and Concord YMCA.

EXPERIENCE:
1970-1971 Benjamin Foulois Junior High School, Morningside, Maryland. Teacher. American history, 8th grade.

1971-1978 Thomas Johnson Junior High School, Lanham, Maryland. Teacher. English and American history, 8th grade and civics, 9th grade.

1978-1979 Rundlett Junior High School, Concord, New Hampshire. Teacher, 7th grade and American history, 8th grade.

1980-1982 Bow Memorial (Middle) School, Bow, New Hampshire. Teacher. Social Studies, 9th grade.

1982-1985 Concord High School, Concord, New Hampshire. Teacher. Courses in economics, law, American history, and a course she developed entitled The American Woman, 10th, 11th, and 12th grade.

NASA EXPERIENCE: Christa McAuliffe was selected as the primary candidate for the NASA Teacher in Space Project on July 19, 1985. She was a payload specialist on STS 51-L which was launched from the Kennedy Space Center, Florida, at 11:38:00 EST on January 28, 1986. The crew on board the Orbiter Challenger included the spacecraft commander, Mr. F.R. Scobee, the pilot, Commander M.J. Smith (USN), three mission specialists, Dr. R.E. McNair, Lieutenant Colonel E.S. Onizuka (USAF), and Dr. J.A. Resnik, and fellow civilian payload specialist, Mr. G.B. Jarvis. The STS 51-L crew died on January 28, 1986 when Challenger exploded after launch.`,
  media: [],
},
];

export function getCrewMember(slug: string): CrewMember | undefined {
  return CREW.find((c) => c.slug === slug);
}