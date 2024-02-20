import { CiBank } from "react-icons/ci";
import { AiOutlineSafety } from "react-icons/ai";
import { BsGraphUpArrow } from "react-icons/bs";

export default function BenifitSection() {
  return (
    <>
    <section className="belowhero" id="keypointscontainer">
      <div className="container">
        <h1>Our Key Benefits</h1>
        <div className="benifitxontainer">
          <div className="benifitbox">
            <CiBank />
            <h2>Financial Services</h2>
            <p>
              Banks offer various services such as checking and savings
              accounts, loans, credit cards, and investments, meeting diverse
              financial needs efficiently.
            </p>
          </div>
          <div className="benifitbox">
            <AiOutlineSafety />
            <h2>Safety and Security</h2>
            <p>
              Bank deposits are typically insured by government agencies like
              the FDIC, ensuring protection for depositors and bolstering
              confidence in the banking system.
            </p>
          </div>
          <div className="benifitbox">
            <BsGraphUpArrow />
            <h2>Economic Stability</h2>
            <p>
              Economic stability entails sustained growth, low inflation, and
              minimal unemployment, instilling confidence and predictability in
              financial markets.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className="belowhero" id="aboutusextra">
    <div className="container" id="belowwork">
    <h1>
      We are here to help you, redirect you to the bank website of your
      choice, and assist you with particular task.
    </h1>
    <div className="charpic">
    <img src="/assets/boywithchart.webp" alt="Work" />
    </div>
  </div>
  </section>
    </>
  );
}
