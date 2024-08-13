import axios from 'axios';
import React, { useEffect, useState } from 'react';

function BasicWebsite() {
  const [mailData, setMailData] = useState()
  const handleGetMailData = async() => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/mailData`);
      console.log("response", response)
      setMailData(response.data)
    } catch (error) {
      console.error('Error submitting mail data:', error);
    }
  }
console.log("mailData", mailData)
  useEffect(() => {
    handleGetMailData()
  },[])
  return (
    <div>
     {mailData.map((data) => {
      return(
        <>
           <p>
        Hello Client
        {/* Hello ${clientName || "client name"}, */}
        <br /><br />
        Greetings from DIGITAL MITRO.
        <br /><br />
        <h6 >
         {data.BasicWebMailIntro}
        </h6>
        <br />
        Proposed work to be performed for your business are as follows (Business
        Plan of action) These work will be performed together at one go for your
        website:-
        <br />
        <br />
        <h6>WEBSITE (DESIGN & COMPLETE DEVELOPMENT)</h6>
        <br /><br />
        Please note:-Our business motive is to support you from your business
        aspect from every corner, gradually perform all the necessary works for
        all your online solutions and to take care completely from every aspect
        step by step in a sequence. So that we go ahead complete each work step
        by step and give you the desired results and in return you give us work
        step by step.
        <br />
        Please review the attached PDF Business Confidential Proposals for you in
        order to start the work on your website as we are going to take care of
        this website completely from start to end.
        <br />
        <h6>
          COMPLETE DETAILED WORK MODULES FOR THE DEVELOPMENT OF YOUR BUSINESS
          WEBSITE ALONG WITH CURRENCY CONVERTER MECHANISM & MULTI LINGUISTICS
          LANGUAGE CONTENT.
        </h6>
        <br />
        <br />
        <br />
        Number of Pages 6
        <br />
        Number of Royalty Images 5
        <br />
        Number of Dynamic Banners 3
        <br />
        Responsive Website Design
        <br />
        Content Management System
        <br />
        Number of Additional Pages
        <br />
        Favicon
        <br />
        Contact Us Page
        <br />
        Google Map on Contact us Page
        <br />
        Support for Latest Browsers
        <br />
        Internet Explorer +10 Compatible
        <br />
        Google Chrome Compatible
        <br />
        Mozilla Firefox Compatible
        <br />
        Displaying Social Media Links
        <br />
        SEO Friendly URL Structure
        <br />
        Website Parameters Check
        <br />
        Phone Support & Consultation
        <br />
        Basic SEO
        <br />
        Basic SMO
        <br />
        Blog Management
        <br />
        Post Go Live Support
        <br />
        Serenity
        <br />
        Testimonial
        <br />
        Google Analytics Set-Up
        <br />
        Google Webmasters Set-Up
        <br />
        E-Mail Support & Consultation
        <br />
        Gallery Management
        <br />
        Portfolio
        <br />
        Display feature product on home page
        <br />
        Send to a friend with email
        <br />
        Share on Facebook
        <br />
        <h6>PLEASE FEEL FREE TO CALL ON BELOW MENTIONED NUMBERS TO DISCUSS THE</h6>
        <h6>PROJECT AND TO UNDERSTAND YOUR BUSINESS REQUIREMENTS.</h6>
        <br />
        <a href="https://www.lillywhites.com/">https://www.lillywhites.com/</a>
        <br />
        <a href="https://www.gavins-garage.com/">https://www.gavins-garage.com/</a>
        <br />
        <a href="https://cashmere-suit.com/">https://cashmere-suit.com/</a>
        <br />
        <br /><br />
        Warm Regards,
        <br />
        {/* <h2>${userName}</h2> */}
        <h6>User Name</h6>
        <h6>Sales Executive, Digital Mitro.</h6>
        <div >
          <img
            style={{ width: '30px', height: '18px' }}
            src="https://th.bing.com/th/id/R.607b9f69862d76af04b474113c0c7ff5?rik=lfnOsbv7mhDNbQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fb%2fbc%2fFlag_of_India.png&ehk=Pk5lH0C%2fhstFahWfb15vLjtrJb3DslIU4%2fAQneo9IIM%3d&risl=&pid=ImgRaw&r=0"
            alt="INDIA"
          />
          <span>+91 81008 25310 (Whatsapp)|</span>
          <br/>
          <img
            style={{ width: '30px', height: '18px' }}
            src="https://th.bing.com/th/id/R.fdb5e4205cc924e04bf6283e64e462c8?rik=%2fnOSihdqikVOOQ&riu=http%3a%2f%2fnouahsark.com%2fdata%2fimages%2finfocenter%2fworldwide%2fnorth_america%2fflags_big%2funited_states.png&ehk=OIJT2CHdxaWUwULdf8thd%2fsMfrrHZAXd9tbzZfVQh%2bs%3d&risl=&pid=ImgRaw&r=0"
            alt="USA"
          />
          <span>(1) +1 (512) 487 7639</span>
        </div>
        <br />
        <a style={{ color: 'blue' }} href="https://www.digitalmitro.com">
          https://www.digitalmitro.com
        </a>
        <br />
        <h6 style={{ fontWeight: 'bold' }}>
          Unit No. 1420, Aurora Waterfront, GN 34/1, GN Block, Sector V,
          Bidhannagar, Kolkata, West Bengal 700091
        </h6>
        <img
          style={{ width: '50%', height: 'auto' }}
          src="https://digitalmitro.com/wp-content/uploads/2022/07/final__logo.png"
          alt="Signature Image"
        />
      </p>
        </>
      )
     })}
    </div>
  );
}

export default BasicWebsite;
