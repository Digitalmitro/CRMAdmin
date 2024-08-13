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
     {mailData?.map((data) => {
      return(
        <>
           <p>
             {/* Hello ${clientName || "client name"}, */}
        Hello Client
        <br />
        <br />
        Greetings from DIGITAL MITRO.
        <br />
        <br />
        <h6 >
         {data?.BasicWebMailIntro}
        </h6>
       
        <br/>
      {data?.BasicWebMailMainBody}
      <br/>
      <br/>
        <h6>
          COMPLETE DETAILED WORK MODULES FOR THE DEVELOPMENT OF YOUR BUSINESS
          WEBSITE ALONG WITH CURRENCY CONVERTER MECHANISM & MULTI LINGUISTICS
          LANGUAGE CONTENT.
        </h6>
        <br />
        {data?.BasicWebMailList}
        <br />
        <br />
       <h6>{data?.BasicWebMailConclude}</h6>
        <h6>PROJECT AND TO UNDERSTAND YOUR BUSINESS REQUIREMENTS.</h6>
        <br />
        <a href="https://www.lillywhites.com/">{data?.BasicWebMailLink}</a>
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
