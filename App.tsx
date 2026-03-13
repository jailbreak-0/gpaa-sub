
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import VersionChecker from './components/VersionChecker';
import LoadingIndicator from './components/LoadingIndicator';

// Eager load critical pages
import Home from './pages/Home';

// Lazy load other pages for better performance
const About = lazy(() => import('./pages/About'));
const History = lazy(() => import('./pages/History'));
const Programs = lazy(() => import('./pages/Programs'));
const Membership = lazy(() => import('./pages/Membership'));
const MembershipJoin = lazy(() => import('./pages/MembershipJoin'));
const Events = lazy(() => import('./pages/Events'));
const ConferenceArchive = lazy(() => import('./pages/ConferenceArchive'));
const Advocacy = lazy(() => import('./pages/Advocacy'));
const News = lazy(() => import('./pages/News'));
const NewsResources = lazy(() => import('./pages/NewsResources'));
const Resources = lazy(() => import('./pages/Resources'));
const Contact = lazy(() => import('./pages/Contact'));
const Donate = lazy(() => import('./pages/Donate'));
const GetInvolved = lazy(() => import('./pages/GetInvolved'));
const Volunteer = lazy(() => import('./pages/Volunteer'));
const Careers = lazy(() => import('./pages/Careers'));
const Partnerships = lazy(() => import('./pages/Partnerships'));
const Welfare = lazy(() => import('./pages/Welfare'));
const Documents = lazy(() => import('./pages/Documents'));
const MembersDirectory = lazy(() => import('./pages/MembersDirectory'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <VersionChecker />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow">
          <Suspense fallback={<LoadingIndicator message="Loading page..." overlay />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/about/history" element={<History />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/membership/join" element={<MembershipJoin />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/conference-archive" element={<ConferenceArchive />} />
              <Route path="/advocacy" element={<Advocacy />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/get-involved/volunteer" element={<Volunteer />} />
              <Route path="/get-involved/careers" element={<Careers />} />
              <Route path="/get-involved/partnerships" element={<Partnerships />} />
              <Route path="/news" element={<News />} />
              <Route path="/news-resources" element={<NewsResources />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/welfare" element={<Welfare />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/members-directory" element={<MembersDirectory />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/donate" element={<Donate />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
