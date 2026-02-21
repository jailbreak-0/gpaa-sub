
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import History from './pages/History';
import Programs from './pages/Programs';
import Membership from './pages/Membership';
import MembershipJoin from './pages/MembershipJoin';
import Events from './pages/Events';
import ConferenceArchive from './pages/ConferenceArchive';
import Advocacy from './pages/Advocacy';
import NewsResources from './pages/NewsResources';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import GetInvolved from './pages/GetInvolved';
import Volunteer from './pages/Volunteer';
import Careers from './pages/Careers';
import Partnerships from './pages/Partnerships';
import Header from './components/Header';
import Footer from './components/Footer';
import VersionChecker from './components/VersionChecker';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <VersionChecker />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow">
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
            <Route path="/news-resources" element={<NewsResources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
