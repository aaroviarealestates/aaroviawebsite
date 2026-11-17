export type FeaturedProject = {
  name: string;
  category: string;
  location: string;
  href: string;
  logo: string;
  image: string;
  filter: string;
  external?: boolean;
};

export const featuredProjects: FeaturedProject[] = [
  {
    name: "The Quiet Estate",
    category: "Premium farm plots",
    location: "Srinivaspura · 90 min from Bengaluru",
    href: "https://quietestate.aaroviagroup.com/",
    logo: "/images/projects/quiet-estate.png",
    image: "/images/188686.webp",
    filter: "farm-lands",
  },
  {
    name: "Lake Estate",
    category: "4 & 5 BHK luxury villas",
    location: "Yelahanka · North Bengaluru",
    href: "https://lakeestates.aaroviagroup.com/",
    logo: "/images/projects/lake-estate.webp",
    image: "/images/project-2.webp",
    filter: "luxury-villas",
  },
  {
    name: "Hara Rassai Vijayam",
    category: "Premium plotted development",
    location: "Hindupur",
    href: "https://www.hararassai.aaroviagroup.com/",
    logo: "/images/projects/hara-rassai-vijayam.png",
    image: "/images/189471.webp",
    filter: "villa-plots",
  },
  {
    name: "Premia",
    category: "3 & 4 BHK residences",
    location: "Jakkur · North Bengaluru",
    href: "https://premia.aaroviagroup.com/",
    logo: "/images/projects/premia.png",
    image: "/images/service-1.webp",
    filter: "luxury-apartments",
  },
  {
    name: "Veda Vilasa",
    category: "Eco-friendly villaments",
    location: "Kengeri",
    href: "https://vedavilasa.aaroviagroup.com/",
    logo: "/images/projects/veda-vilasa.png",
    image: "/images/189140.webp",
    filter: "villaments",
  },
];
