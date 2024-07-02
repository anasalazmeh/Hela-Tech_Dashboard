import {
  FaAffiliatetheme,
  FaBoxes,
  FaBullhorn,
  FaChalkboard,
  FaCog,
  FaEvernote,
  FaFilter,
  FaFlag,
  FaGift,
  FaHome,
  FaInfo,
  FaLink,
  FaListAlt,
  FaMedal,
  FaNotesMedical,
  FaPhone,
  FaProjectDiagram,
  FaQuestion,
  FaQuestionCircle,
  FaRegStickyNote,
  FaServer,
  FaStreetView,
  FaTag,
  FaTags,
  FaTasks,
  FaToolbox,
  FaTools,
  FaUser,
  FaUserLock,
  FaUserSecret,
  FaUserTie,
  FaUsers,
  FaUsersCog,
  FaUsersSlash,
  FaVideo,
  FaPeopleArrows
} from "react-icons/fa";
import { FiGrid, FiMap, FiMapPin, FiShoppingCart  } from "react-icons/fi";
import { IoIosPeople } from "react-icons/io";
import AnnoucementsPage from "../pages/annoucements";

import Home from "../pages/home";
import ServicesPagee from "../pages/services";
import ServicesForm from "../components/services/services-form";
import ServiceDetailsPage from "../components/services/services-details";
import ProcessesPage from "../pages/process";
import ProcessForm from "../components/process/process-form";
import ProcessDetailsPage from "../components/process/process-details";
import TeamMembersPage from "../pages/team_members";
import TeamMemberForm from "../components/team-members/team-member-form";
import TeamMemberDetailsPage from "../components/team-members/team-member-details";
import ConsultingPage from "../pages/consulting";
import ConsultingForm from "../components/consulting/consulting-form";
import AboutUsPage from "../pages/about-us";
import AboutUsForm from "../components/about-us/about-us-form";
import ConsultingDetailsPage from "../components/consulting/consulting-details";
import AboutUsDetailsPage from "../components/about-us/about-us-details";
import TestimonialsPage from "../pages/testimonials";
import TestimonialForm from "../components/testimonails/testionials-form";
import TestimonialsDetailsPage from "../components/testimonails/testimonials-details";
import SubscribersPage from "../pages/subscribers";
import TagsPage from "../pages/tags";
import TagForm from "../components/tags/tags-form";
import TagDetailsPage from "../components/tags/tags-details";
import ProjectsPage from "../pages/projects";
import ProjectsForm from "../components/projects/projects-form";
import ProjectDetailsPage from "../components/projects/projects-details";
import VideoPage from "../pages/video";
import WelcomePage from "../pages/welcome";
import InfoPage from "../pages/info";
import InfoForm from "../components/info/info-form";
import InfoDetailsPage from "../components/info/info-details";
import WelcomeDetailsPage from "../components/welcome/welcome-details";
import WelcomeForm from "../components/welcome/welcome-form";
import AboutUsDetailsMainPage from "../pages/about-us-details";
import AboutUIsDetailsIfnoMainPage from "../components/about-us-details/about-us-details-main";
import AboutUsDetailsForm from "../components/about-us-details/about-details-main-form";
import ContactUsPage from "../pages/contact-us";
import ConsultantsPage from "../pages/Consultants";
import ConsultationForm from "../components/consultants/consultants-form";
import ConsultationDetailsPage from "../components/consultants/consultants-details";
import ConsultationsDetailsPage from "../components/consultations/consultations-details";
import ConsultationsPage from "../pages/consultations";
// import { GiPayMoney, GiSplitArrows, GiTable } from 'react-icons/gi'

// import { FiLogIn, FiLogOut, FiSettings, FiTrash } from 'react-icons/fi'

export interface ICrudRoutes {
  path: string;
  component: React.ReactNode;
}

export interface ISubRoute {
  labelKey: string;
  icon?: JSX.Element;
  path: string;
  // permissions: string[]
  component: any;
  crudRoutes?: ICrudRoutes[];
  exact?: boolean;
}

export interface IRoute {
  labelKey: string;
  icon: JSX.Element;
  path: string;
  crudRoutes?: ICrudRoutes[];
  roles?: string[];
  hasSubMenus: boolean;
  subMenus?: ISubRoute[];
  component?: any;
  exact?: boolean;
}

export const routes: IRoute[] = [
  {
    labelKey: "Home",
    icon: <FaHome />,
    path: "/",
    hasSubMenus: false,
    component: <Home />,
  },
  {
    labelKey: "Welcome",
    icon: <FaBoxes />,
    path: "/welcome",
    hasSubMenus: false,
    component: <WelcomePage />,
    crudRoutes: [
      {
        path: "update/:id",
        component: <WelcomeForm />,
      },
      {
        path: "details/:id",
        component: <WelcomeDetailsPage />,
      },
    ],
  },
  {
    labelKey: "Services",
    icon: <FaTasks />,
    path: "/services",
    hasSubMenus: false,
    component: <ServicesPagee />,
    crudRoutes: [
      {
        path: "update/:id",
        component: <ServicesForm />,
      },
      {
        path: "create",
        component: <ServicesForm />,
      },
      {
        path: "details/:id",
        component: <ServiceDetailsPage />,
      },
    ],
  },
  {
    labelKey: "Processes",
    icon: <FaServer />,
    path: "/process",
    hasSubMenus: false,
    component: <ProcessesPage />,
    crudRoutes: [
      {
        path: "update/:id",
        component: <ProcessForm />,
      },
      {
        path: "create",
        component: <ProcessForm />,
      },
      {
        path: "details/:id",
        component: <ProcessDetailsPage />,
      },
    ],
  },
  {
    labelKey: "Team Members",
    icon: <FaUsers />,
    path: "/team-members",
    hasSubMenus: false,
    component: <TeamMembersPage />,
    crudRoutes: [
      {
        path: "update/:id",
        component: <TeamMemberForm />,
      },
      {
        path: "create",
        component: <TeamMemberForm />,
      },
      {
        path: "details/:id",
        component: <TeamMemberDetailsPage />,
      },
    ],
  },

  {
    labelKey: "Consultings",
    icon: <FaQuestionCircle />,
    path: "/consultings",
    hasSubMenus: false,
    component: <ConsultingPage />,
    crudRoutes: [
      {
        path: "update/:id",
        component: <ConsultingForm />,
      },
      {
        path: "create",
        component: <ConsultingForm />,
      },
      {
        path: "details/:id",
        component: <ConsultingDetailsPage />,
      },
    ],
  },
  {
    labelKey: "AboutUs",
    icon: <FaStreetView />,
    path: "/about-us",
    hasSubMenus: false,
    component: <AboutUsPage />,
    crudRoutes: [
      {
        path: "update/:id",
        component: <AboutUsForm />,
      },
      {
        path: "create",
        component: <AboutUsForm />,
      },
      {
        path: "details/:id",
        component: <AboutUsDetailsPage />,
      },
    ],
  },
  {
    labelKey: "AboutUs Details",
    icon: <FaStreetView />,
    path: "/about-us-details",
    hasSubMenus: false,
    component: <AboutUsDetailsMainPage />,
    crudRoutes: [
      {
        path: "update/:id",
        component: <AboutUsDetailsForm />,
      },
      {
        path: "create",
        component: <AboutUsDetailsForm />,
      },
      {
        path: "details/:id",
        component: <AboutUIsDetailsIfnoMainPage />,
      },
    ],
  },
  {
    labelKey: "Testimonials",
    icon: <FaUserTie />,
    path: "/testimonials",
    hasSubMenus: false,
    component: <TestimonialsPage />,
    crudRoutes: [
      {
        path: "update/:id",
        component: <TestimonialForm />,
      },
      {
        path: "create",
        component: <TestimonialForm />,
      },
      {
        path: "details/:id",
        component: <TestimonialsDetailsPage />,
      },
    ],
  },
  {
    labelKey: "Tags",
    icon: <FaTags />,
    path: "/tags",
    hasSubMenus: false,
    component: <TagsPage />,
    crudRoutes: [
      {
        path: "update/:id",
        component: <TagForm />,
      },
      {
        path: "create",
        component: <TagForm />,
      },
      {
        path: "details/:id",
        component: <TagDetailsPage />,
      },
    ],
  },
  {
    labelKey: "Projects",
    icon: <FaProjectDiagram />,
    path: "/projects",
    hasSubMenus: false,
    component: <ProjectsPage />,
    crudRoutes: [
      {
        path: "update/:id",
        component: <ProjectsForm />,
      },
      {
        path: "create",
        component: <ProjectsForm />,
      },
      {
        path: "details/:id",
        component: <ProjectDetailsPage />,
      },
    ],
  },
  {
    labelKey: "Video",
    icon: <FaVideo />,
    path: "/video",
    hasSubMenus: false,
    component: <VideoPage />,
    crudRoutes: [
      {
        path: "update/:id",
        component: <ProjectsForm />,
      },
    ],
  },
  {
    labelKey: "Info",
    icon: <FaInfo />,
    path: "/info",
    hasSubMenus: false,
    component: <InfoPage />,
    crudRoutes: [
      {
        path: "update/:id",
        component: <InfoForm />,
      },
      {
        path: "details/:id",
        component: <InfoDetailsPage />,
      },
    ],
  },
  {
    labelKey: "Subscribers",
    icon: <FaUsers />,
    path: "/subscribers",
    hasSubMenus: false,
    component: <SubscribersPage />,
  },
  {
    labelKey: "Contact Us",
    icon: <FaPhone />,
    path: "/contact-us",
    hasSubMenus: false,
    component: <ContactUsPage />,
  },
  {
    labelKey: "Consultants",
    icon: <IoIosPeople />,
    path: "/consultants",
    hasSubMenus: false,
    component: <ConsultantsPage />,
    crudRoutes: [
      {
        path: "update/:id",
        component: <ConsultationForm />,
      },
      {
        path: "create",
        component: <ConsultationForm />,
      },
      {
        path: "details/:id",
        component: <ConsultationDetailsPage />,
      },
    ],
  },
  {
    labelKey: "Consultations",
    icon: <FaPeopleArrows />,
    path: "/consultations",
    hasSubMenus: false,
    component: <ConsultationsPage />,
    crudRoutes: [
      {
        path: "details/:id",
        component: <ConsultationsDetailsPage />,
      },
    ],
  },
];
