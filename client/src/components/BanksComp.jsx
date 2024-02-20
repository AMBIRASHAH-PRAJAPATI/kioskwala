import { FaAngleDoubleRight } from "react-icons/fa";

export default function BanksComp({ banks, bankType }) {
  const visitbank = (link) => {
    window.open(link, '_blank');
  };

  if (!banks || banks.length === 0) {
    // Loading state or empty banks case
    return <p>No {bankType.toLowerCase()} banks available.</p>;
  }

  return (
    <section id="banksec">
      <div id="bnkheading"><h1>{bankType} Banks</h1></div>
      <section className="banksgrid">
        {banks.map((currel, index) => (
          <div className="bankcard" key={index}>
            <div className="bcard-img">
              {/* Update the image source to use the correct URL */}
              <img src={currel.logo} alt="Bank logo" />
            </div>
            <div className="bcard-details">
              <h2>{currel.name}</h2>
              <button onClick={() => visitbank(currel.link)} className="button-24">Visit <FaAngleDoubleRight /> </button>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
