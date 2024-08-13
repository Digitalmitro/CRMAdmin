import axios from "axios";
import { useEffect, useState } from "react";

const SmoMailTemp = () => {
  const [mailData, setMailData] = useState();
  const handleGetMailData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/mailData`
      );
      console.log("response", response);
      setMailData(response.data);
    } catch (error) {
      console.error("Error submitting mail data:", error);
    }
  };
  console.log("mailData", mailData);
  useEffect(() => {
    handleGetMailData();
  }, []);

  return (
    <div className="smolist">
      <p>Hello 'client name'</p>
      <br />
      <br />
      <p>Greetings from DIGITAL MITRO.</p>
      <br />
      <p>
        INTRODUCING "DIGITAL MITRO" WHICH IS THE RENOWNED & REGISTERED LEADING
        "GLOBAL BASED WEB DESIGNING & DEVELOPMENT, APPLICATION SOFTWARE &
        DIGITAL MARKETING ALONG WITH MOBILE APP (BOTH ANDROID & I-PHONE
        DEVELOPMENT) ORGANIZATIONS. WE CATER OUR SERVICES GLOBALLY FOR ALL TYPES
        OF BUSINESS CLIENTS IN INDIA, NEW ZEALAND, AUSTRALIA, SINGAPORE,
        MALAYSIA, THAILAND, INDONESIA,
      </p>
      <br /> <br />
      <p>
        PHILIPPINES IN SOUTH ASIA, & EUROPEAN COUNTRIES LIKE UNITED
        KINGDOM(SCOTLAND, WALES, ENGLAND) POLAND, HOLLAND, IRELAND, NORTHERN
        IRELAND, SPAIN, GERMANY, FRANCE, & THE WHOLE OF USA. WITHIN A SPAN
        OFJUST 5 YEARS, WE HAVE BEEN SUCCESSFUL IN DELIVERING WORLD CLASS
        COMMITTED SERVICES TO OUR ESTEEMED CLIENTS. THE DEDICATED TEAM OF OURS
        HAS ALWAYS HAD A BIG ROLE IN DEVELOPING, MAINTAINING AND SUPPORTING THE
        WEBSITE. EVENTUALLY, WITH TIME WE HAVE ROLLED INTO BECOMING AN
        ORGANIZATION WITH THE STRONGEST FOUNDATION OF MUTUAL TRUST AND HEALTHY
        BUSINESS RELATIONSHIP.
      </p>
      <p><br/><br/>
        <strong style={{ backgroundColor: "yellow", fontSize:"14px" }}>Project Details:</strong>{" "}
        <span style={{ color: "red" }}>SMO PROPOSAL</span>
      </p>
      <br/>
      <p style={{fontSize:"14px"}}>
        <strong style={{ backgroundColor: "yellow" }}>
          Features which we will provide you in SMO(Social Media Optimization):
        </strong>
      </p>
     
      <h6 style={{ color: "red" }}>FACEBOOK</h6>
      
      <ul className="" style={{ listStyle: "disc !important" }}>
        <li>Profile Optimization</li>
        <li>FB Timeline Status Posting</li>
        <li>Post Sharing in Groups</li>
        <li>Attractive Cover Images</li>
        <li>Call To Action Button Setup</li>
        <li>Insight Monitoring</li>
        <li>Video Sharing (provided by client)</li>
        <li>Sponsored Ads (Not for ORM) </li>
      </ul>
      <h6 style={{ color: "red" }}>TWITTER</h6>
      <ul>
        <li>Tweets Posting & Retweets</li>
        <li>Targeted Twitter Followers Increase</li>
        <li>#hashtag Trend Research</li>
        <li>Followers</li>
      </ul>
      

      <h6 style={{ color: "red" }}>INSTAGRAM</h6>

      <ul>
        <li>Profile Optimization (Business Profile)</li>
        <li>Timeline Status Posting</li>
        <li>#hashtag Trend Research</li>
        <li>Followers</li>
      </ul>

      <h6 style={{ color: "red" }}>PINTEREST</h6>

<ul>
  <li>Board Creation</li>
  <li>Pins Design and Post</li>
  <li>Followers</li>
  <li>Website Verification & Business Account</li>
</ul>
   
<br/>

<h6 style={{ color: "red" }}>LINKEDIN</h6>

<ul>
  <li>Profile Optimization (Business Profile)</li>
  <li>Timeline Status Posting</li>
  <li> #hashtag Trend Research</li>
</ul>
   

     
      {/* <a href="https://www.lillywhites.com/">https://www.lillywhites.com/</a>
      <br />
      <a href="https://www.gavins-garage.com/">
        https://www.gavins-garage.com/
      </a>
      <br />
      <a href="https://cashmere-suit.com/">https://cashmere-suit.com/</a> */}
     
      <br />
      <br />
      <p><strong>Warm Regards,</strong></p>
      <h6 style={{color:"#08125f"}}><strong>SAM WILLIAM</strong></h6>
      <h6 style={{color:"#08125f"}}><strong>Sales Head, <span style={{color:"coral"}}>Digital Mitro.</span></strong></h6>
      {/* <br/> */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          style={{ width: "20px", height: "18px" }}
          src="https://th.bing.com/th/id/R.607b9f69862d76af04b474113c0c7ff5?rik=lfnOsbv7mhDNbQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fb%2fbc%2fFlag_of_India.png&ehk=Pk5lH0C%2fhstFahWfb15vLjtrJb3DslIU4%2fAQneo9IIM%3d&risl=&pid=ImgRaw&r=0"
          alt="INDIA"
        />
        <span>+91 81008 25310 ( Whatsapp ) | </span>
        <img
          style={{ width: "30px", height: "18px" }}
          src="https://th.bing.com/th/id/R.fdb5e4205cc924e04bf6283e64e462c8?rik=%2fnOSihdqikVOOQ&riu=http%3a%2f%2fnouahsark.com%2fdata%2fimages%2finfocenter%2fworldwide%2fnorth_america%2fflags_big%2funited_states.png&ehk=zrThqMDFOGIcFqqgJOVToWxTlHPQPqwfmih%2f7CNjFH6%3d&risl=&pid=ImgRaw&r=0"
          alt="USA"
        />
        <span>(1) +1 (512) 487 7639</span>
      </div>
      {/* <br /> */}
      <a style={{ color: "blue" }} href="https://www.digitalmitro.com">
        https://www.digitalmitro.com
      </a>
      <br />
      <p style={{ fontWeight: "bold" }}>
        Unit No. 1420, Aurora Waterfront, GN 34/1, GN Block, Sector V,
        Bidhannagar, Kolkata, West Bengal 700091
      </p>
      <img
        style={{ width: "26%", height: "auto" }}
        src="https://digitalmitro.com/wp-content/uploads/2022/07/final__logo.png"
        alt="Signature Image"
      />
    </div>
  );
};

export default SmoMailTemp;
