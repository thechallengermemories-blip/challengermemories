// app/challenger/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import MissionHero from "@/components/mission/MissionHero";
import CrewGrid from "@/components/mission/CrewGrid";
import MissionTimeline from "@/components/mission/MissionTimeline";
import StoriesPreviewList from "@/components/mission/StoriesPreviewList";
import { Footer } from "@/components/home/Footer";
import { CrewFooter } from "@/components/layout/crewfooter";

export default function ChallengerPage() {
  return (
    <main className="bg-[#020617] min-h-screen">
      <MissionHero/>
      <CrewGrid />
      <MissionTimeline />
      <StoriesPreviewList />
      <CrewFooter/>
    </main>
  );
}
// const CREW_DATA = {
//   challenger: [
//     {
//       name: "Francis R. Scobee",
//       role: "Commander",
//       image: "https://imgs.search.brave.com/RfOTrlOq28gVswBDrdbeZGv-by6jvTvE63YwTXvbUEc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi80LzQyL1Nj/b2JlZS1mci5qcGcv/NTEycHgtU2NvYmVl/LWZyLmpwZw",
//       bio: "Air Force pilot and veteran of STS-41-C.",
//       bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/scobee_francis.pdf"
//     },
//     {
//       name: "Michael J. Smith",
//       role: "Pilot",
//       image: "https://imgs.search.brave.com/pRRopRtuY22Anb1JOCv5Rl0wtZjz-qhPx0cvcolFXFw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9hL2E4L01p/Y2hhZWxfU21pdGhf/JTI4TkFTQSUyOS5q/cGcvNTEycHgtTWlj/aGFlbF9TbWl0aF8l/MjhOQVNBJTI5Lmpw/Zw",
//       bio: "Navy captain and experienced test pilot.",
//       bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/smith_michael.pdf"
//     },
//     {
//       name: "Ronald McNair",
//       role: "Mission Specialist",
//       image: "https://imgs.search.brave.com/Uu1LsOYoa46dkfWKACPTJZqHHmkQ6fMmDNoniCQ5syw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8wLzA4L1Jv/bmFsZF9Fcndpbl9N/Y05haXIuanBnLzUx/MnB4LVJvbmFsZF9F/cndpbl9NY05haXIu/anBn",
//       bio: "Physicist and accomplished saxophonist.",
//       bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/mcnair_ronald.pdf"
//     },
//     {
//       name: "Ellison Onizuka",
//       role: "Mission Specialist",
//       image: "https://imgs.search.brave.com/xH0DjyD7vmoiZDyWJBJRw5Zy_Ra_FgpH7CfirUnAaO4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9jL2NlL0Vs/bGlzb25fU2hvamlf/T25penVrYV8lMjhO/QVNBJTI5LmpwZy81/MTJweC1FbGxpc29u/X1Nob2ppX09uaXp1/a2FfJTI4TkFTQSUy/OS5qcGc",
//       bio: "The first Asian American in space.",
//       bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/onizuka_ellison.pdf"
//     },
//     {
//       name: "Judith Resnik",
//       role: "Mission Specialist",
//       image: "https://imgs.search.brave.com/mj5OB9O8K7DQzk7V9C8_2epklc9mAktlXUAaosUXoxw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8xLzFmL0p1/ZGl0aF9BLl9SZXNu/aWslMkNfb2ZmaWNp/YWxfcG9ydHJhaXRf/JTI4Y3JvcHBlZCUy/OS5qcGcvNTEycHgt/SnVkaXRoX0EuX1Jl/c25payUyQ19vZmZp/Y2lhbF9wb3J0cmFp/dF8lMjhjcm9wcGVk/JTI5LmpwZw",
//       bio: "Electrical engineer and second American woman in space.",
//       bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/resnik_judith_with_photo_0.pdf"
//     },
//     {
//       name: "Gregory Jarvis",
//       role: "Payload Specialist",
//       image: "https://imgs.search.brave.com/9BQgyxhX26_SO6u3408lkfwIHeL92g7RtdtXCA-qSuE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8xLzEzL0dy/ZWdvcnlfSmFydmlz/XyUyOE5BU0ElMjlf/Y3JvcHBlZC5qcGcv/NTEycHgtR3JlZ29y/eV9KYXJ2aXNfJTI4/TkFTQSUyOV9jcm9w/cGVkLmpwZw",
//       bio: "Engineer specialized in satellite design.",
//       bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/jarvis.pdf"
//     },
//     {
//       name: "Christa McAuliffe",
//       role: "Teacher in Space",
//       image: "https://imgs.search.brave.com/_kRTkHEDsi8-ds3nGq5v4fME5bVlniMeaWeW_GssGL4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9lL2UxL0No/cmlzdGFNY0F1bGlm/ZmVfJTI4Y3JvcHBl/ZCUyOS5qcGcvNTEy/cHgtQ2hyaXN0YU1j/QXVsaWZmZV8lMjhj/cm9wcGVkJTI5Lmpw/Zw",
//       bio: "Chosen from 11,000 to be the first teacher in space.",
//       bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/mcauliffe.pdf"
//     }
//   ],

//   columbia: [
//     {
//       name: "Rick Husband",
//       role: "Commander",
//       image: "https://imgs.search.brave.com/T0q3EqkiZEpcQaqK64A87KJyeuo28Emcu8VVE5W0jEs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8yLzIwL1Jp/Y2hhcmRfSHVzYmFu/ZCUyQ19OQVNBX3Bo/b3RvX3BvcnRyYWl0/X2lu/X29yYW5nZV9z/dWl0LmpwZy81MTJw/eC1SaWNoYXJkX0h1/c2JhbmQlMkNfTkFT/QV9waG90b19wb3J0/cmFpdF9pbl9vcmFu/Z2Vfc3VpdC5qcGc",
//       bio: "Air Force colonel and mechanical engineer.",
//       bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/husband_rick.pdf"
//     },
//     {
//       name: "William C. McCool",
//       role: "Pilot",
//       image: "https://imgs.search.brave.com/cpE6oLYLpRHqvKFuu7mNV1sCS4W6kjZFRYc5pc6FRvs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9jL2M1L1dp/bGxpYW1fQ2FtZXJv/bl9NY0Nvb2wuanBn/LzUxMnB4LVdpbGxp/YW1fQ2FtZXJvbl9N/Y0Nvb2wuanBn",
//       bio: "Navy commander and test pilot.",
//       bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/mccool_william.pdf"
//     },
//     {
//       name: "Michael P. Anderson",
//       role: "Mission Specialist",
//       image: "https://imgs.search.brave.com/pyhBMexn7iIi_8iH_CFgqQABudQ0cQY9bRRpZMH2AjQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi81LzU5L01p/Y2hhZWxfUC5fQW5k/ZXJzb24lMkNfb2Zm/aWNpYWxfcG9ydHJh/aXQuanBnLzUxMnB4/LU1pY2hhZWxfUC5f/QW5kZXJzb24lMkNf/b2ZmaWNpYWxfcG9y/dHJhaXQuanBn",
//       bio: "Payload commander in charge of science experiments.",
//       bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/anderson_michael.pdf"
//     },
//     {
//       name: "David M. Brown",
//       role: "Mission Specialist",
//       image: "https://imgs.search.brave.com/lkGjkElx0LxDA2_d7FUfpKdsRGey2vA84OxYjyhkpYI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zcGVj/aWFsdHlwaHlzaWNp/YW5hc3NvY2lhdGVz/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMS8wMy9EYXZp/ZC1NLi1Ccm93bi1N/RC0xLnBuZw",
//       bio: "Captain, flight surgeon, and circus performer.",
//       bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/brown_david.pdf"
//     },
//     {
//       name: "Kalpana Chawla",
//       role: "Mission Specialist",
//       image: "https://imgs.search.brave.com/vHgEsCsErp7CuafRIfiSnYa22D3YakwJzQw7aswew6U/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi85LzljL0th/bHBhbmFfQ2hhd2xh/JTJDX05BU0FfcGhv/dG9fcG9ydHJhaXRf/aW5fb3JhbmdlX3N1/aXQuanBnLzUxMnB4/LUthbHBhbmFfQ2hh/d2xhJTJDX05BU0Ff/cGhvdG9fcG9ydHJh/aXRfaW5fb3Jhbmdl/X3N1aXQuanBn",
//       bio: "The first woman of Indian origin to go to space.",
//       bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/chawla_kalpana.pdf"
//     },
//     {
//       name: "Laurel Clark",
//       role: "Mission Specialist",
//       image: "https://imgs.search.brave.com/NTY5kvO7R23fjIvCv8wnb1HB4FLq_LeHQvtDQSOxGvQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8yLzI0L0xh/dXJlbF9DbGFyayUy/Q19OQVNBX3Bob3Rv/X3BvcnRyYWl0X2lu/X2JsdWVfc3VpdC5q/cGcvNTEycHgtTGF1/cmVsX0NsYXJrJTJD/X05BU0FfcGhvdG9f/cG9ydHJhaXRfaW5f/Ymx1ZV9zdWl0Lmpw/Zw",
//       bio: "Medical doctor and flight surgeon.",
//       bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/clark_laurel.pdf"
//     },
//     {
//       name: "Ilan Ramon",
//       role: "Payload Specialist",
//       image: "https://imgs.search.brave.com/jTAE-fgWbV3AQ1j8yKsxnIZ51eSVyIp8_cmHa1eHB5E/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi80LzQ4L0ls/YW5fUmFtb24lMkNf/TkFTQV9waG90b19w/b3J0cmFpdF9pbl9v/cmFuZ2Vfc3VpdC5q/cGcvNTEycHgtSWxh/bl9SYW1vbiUyQ19O/QVNBX3Bob3RvX3Bv/cnRyYWl0/X2luX29yYW5nZV9z/dWl0LmpwZw",
//       bio: "The first Israeli astronaut.",
//       bioUrl: "https://www.nasa.gov/wp-content/uploads/2016/01/ramon_ilan.pdf"
//     }
//   ]
// };