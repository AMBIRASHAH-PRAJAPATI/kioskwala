import BenifitSection from '../components/BenifitSection';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import './CSS/Home.css'
export default function Home() {
  return (
    <div className="home">
    <HeroSection/>
    <BenifitSection />
    <Footer />
    </div>
  );
}
