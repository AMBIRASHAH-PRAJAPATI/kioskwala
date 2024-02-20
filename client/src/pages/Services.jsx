import BanksComp from '../components/BanksComp';
import "./CSS/Services.css";
import { useAuth } from '../store/auth';
import Loader from "../components/Loader";

export default function Services() {
  const { allBanks } = useAuth();

  if (!allBanks) {
    return <Loader />;
  }

  return (
    <section id="services">
      <BanksComp banks={allBanks.govtBanks} bankType="Government" />
      <BanksComp banks={allBanks.pvtBanks} bankType="Private" />
    </section>
  );
}
