import axios from "axios";
import { useEffect, useState } from "react";

const handelSMMail = async (clientName, userName, clientEmail) => {

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


    try {
     
      const setMail = {
        to: clientEmail,
        subject: `Social Media Marketing Plan`,

        html: `
        <div style="font-family: Arial, sans-serif;">
        <p>Hello ${clientName}</p>
        <br />
        <br />
        <p>Greetings from DIGITAL MITRO.</p>
        <br />
        <p style="font-size: 14px;">
            INTRODUCING "DIGITAL MITRO" WHICH IS THE RENOWNED & REGISTERED LEADING
            "GLOBAL BASED WEB DESIGNING & DEVELOPMENT, APPLICATION SOFTWARE &
            DIGITAL MARKETING ALONG WITH MOBILE APP (BOTH ANDROID & I-PHONE
            DEVELOPMENT) ORGANIZATIONS. WE CATER OUR SERVICES GLOBALLY FOR ALL TYPES
            OF BUSINESS CLIENTS IN INDIA, NEW ZEALAND, AUSTRALIA, SINGAPORE,
            MALAYSIA, THAILAND, INDONESIA,
        </p>
        <br /> 
        <p style="font-size: 14px;">
            PHILIPPINES IN SOUTH ASIA, & EUROPEAN COUNTRIES LIKE UNITED
            KINGDOM(SCOTLAND, WALES, ENGLAND) POLAND, HOLLAND, IRELAND, NORTHERN
            IRELAND, SPAIN, GERMANY, FRANCE, & THE WHOLE OF USA. WITHIN A SPAN
            OF JUST 5 YEARS, WE HAVE BEEN SUCCESSFUL IN DELIVERING WORLD CLASS
            COMMITTED SERVICES TO OUR ESTEEMED CLIENTS. THE DEDICATED TEAM OF OURS
            HAS ALWAYS HAD A BIG ROLE IN DEVELOPING, MAINTAINING AND SUPPORTING THE
            WEBSITE. EVENTUALLY, WITH TIME WE HAVE ROLLED INTO BECOMING AN
            ORGANIZATION WITH THE STRONGEST FOUNDATION OF MUTUAL TRUST AND HEALTHY
            BUSINESS RELATIONSHIP.
        </p>
        <p><br />
            <strong style="background-color: yellow; font-size: 14px;">Project Details:</strong>
            <span style="color: red;">SMO PROPOSAL</span>
        </p>
        <br />
        <p style="font-size: 14px;">
            <strong style="background-color: yellow;">Features which we will provide you in SMO(Social Media Optimization):</strong>
        </p>

        <h6 style="color: red;">FACEBOOK</h6>

        <ul>
            <li style="list-style-type: disc; margin-left: 20px;">Profile Optimization</li>
            <li style="list-style-type: disc; margin-left: 20px;">FB Timeline Status Posting</li>
            <li style="list-style-type: disc; margin-left: 20px;">Post Sharing in Groups</li>
            <li style="list-style-type: disc; margin-left: 20px;">Attractive Cover Images</li>
            <li style="list-style-type: disc; margin-left: 20px;">Call To Action Button Setup</li>
            <li style="list-style-type: disc; margin-left: 20px;">Insight Monitoring</li>
            <li style="list-style-type: disc; margin-left: 20px;">Video Sharing (provided by client)</li>
            <li style="list-style-type: disc; margin-left: 20px;">Sponsored Ads (Not for ORM)</li>
        </ul>

        <h6 style="color: red;">TWITTER</h6>
        <ul>
            <li style="list-style-type: disc; margin-left: 20px;">Tweets Posting & Retweets</li>
            <li style="list-style-type: disc; margin-left: 20px;">Targeted Twitter Followers Increase</li>
            <li style="list-style-type: disc; margin-left: 20px;">#hashtag Trend Research</li>
            <li style="list-style-type: disc; margin-left: 20px;">Followers</li>
        </ul>

        <h6 style="color: red;">INSTAGRAM</h6>

        <ul>
            <li style="list-style-type: disc; margin-left: 20px;">Profile Optimization (Business Profile)</li>
            <li style="list-style-type: disc; margin-left: 20px;">Timeline Status Posting</li>
            <li style="list-style-type: disc; margin-left: 20px;">#hashtag Trend Research</li>
            <li style="list-style-type: disc; margin-left: 20px;">Followers</li>
        </ul>

        <h6 style="color: red;">PINTEREST</h6>

        <ul>
            <li style="list-style-type: disc; margin-left: 20px;">Board Creation</li>
            <li style="list-style-type: disc; margin-left: 20px;">Pins Design and Post</li>
            <li style="list-style-type: disc; margin-left: 20px;">Followers</li>
            <li style="list-style-type: disc; margin-left: 20px;">Website Verification & Business Account</li>
        </ul>

        <br />

        <h6 style="color: red;">LINKEDIN</h6>

        <ul>
            <li style="list-style-type: disc; margin-left: 20px;">Profile Optimization (Business Profile)</li>
            <li style="list-style-type: disc; margin-left: 20px;">Timeline Status Posting</li>
            <li style="list-style-type: disc; margin-left: 20px;">#hashtag Trend Research</li>
        </ul>

        <br />
        <br />
        <p><strong>Warm Regards,</strong></p>
        <h6 style="color: #08125f;"><strong>SAM WILLIAM</strong></h6>
        <h6 style="color: #08125f;"><strong>Sales Head, <span style="color: coral;">Digital Mitro.</span></strong></h6>

        <div style="display: flex; align-items: center; gap: 10px;">
            <img style="width: 20px; height: 18px;" src="https://th.bing.com/th/id/R.607b9f69862d76af04b474113c0c7ff5?rik=lfnOsbv7mhDNbQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fb%2fbc%2fFlag_of_India.png&ehk=Pk5lH0C%2fhstFahWfb15vLjtrJb3DslIU4%2fAQneo9IIM%3d&risl=&pid=ImgRaw&r=0" alt="INDIA" />
            <span>+91 81008 25310 ( Whatsapp ) | </span>
           <img class="flag-usa" style="width: 30px; height: 18px;" src="https://th.bing.com/th/id/R.fdb5e4205cc924e04bf6283e64e462c8?rik=%2fnOSihdqikVOOQ&riu=http%3a%2f%2fnouahsark.com%2fdata%2fimages%2finfocenter%2fworldwide%2fnorth_america%2fflags_big%2funited_states.png&ehk=zrThqMDFOGIcFqqgJOVToWxTlHPQPqwfmih%2f7CNjFH6%3d&risl=&pid=ImgRaw&r=0" alt="USA" />
            <span>(1) +1 (512) 487 7639</span>
        </div>

        <a style="color: blue;" href="https://www.digitalmitro.com">https://www.digitalmitro.com</a>
        <br />
        <p style="font-weight: bold;">
            Unit No. 1420, Aurora Waterfront, GN 34/1, GN Block, Sector V,
            Bidhannagar, Kolkata, West Bengal 700091
        </p>
        <img style="width: 26%; height: auto;" src="https://digitalmitro.com/wp-content/uploads/2022/07/final__logo.png" alt="Signature Image" />
    </div>
        `,
      
            
      };

      // Assuming you have a local server running to handle sending emails
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/send-email`, setMail);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  export default handelSMMail

















//   html: `
//   <p>
// Hello ${clientName},
// <br /><br />
// Greetings from DIGITAL MITRO.
// <br /><br />
// <h4>SMO is similar to search engine optimization (SEO) in that the goal is to generate web traffic and increase awareness for a website. SMO's focal point is on gaining organic links to social media content. In contrast, SEO's core is about reaching the top of the search engine hierarchy. <h4/> 
// <br />
// <h4>Features which we will provide you in SMO(Social Media Optimization):</h4> 
// <br /><br />
// <br />
// OUR PROCESS - HOURS DAILY/WEEKLY/MONTHLY SOCIAL MEDIA POST.
// <br /><br />
// <br />
// <h3>FACEBOOK</h3>
// <br /><br />
// Profile Optimization
// <br /><br />
// FB Timeline Status Posting
// <br /><br />
// Post Sharing in Groups
// <br /><br />
// Attractive Cover Images
// <br /><br />
// Targeted Page Likes
// <br /><br />
// Call To Action Button Setup
// <br /><br />
// Insight Monitoring
// <br /><br />
// Video Sharing (provided by client)
// <br /><br />
// Sponsored Ads (Not for ORM)
// <br /><br />
// <br /><br />
// <br /><br />
// <br /><br />
// <h3>TWITTER</h3>
// Tweets Posting & Retweets
// <br /><br />

// Targeted Twitter Followers Increase
// <br /><br />

// #hashtag Trend Research
// <br /><br />

// Followers
// <br /><br />

// <br /><br />
// <h3>INSTAGRAM</h3>
// Profile Optimization (Business Profile)
// <br /><br />
// Timeline Status Posting
// <br /><br />
// #hashtag Trend Research
// <br /><br />
// Followers
// <br /><br />
// <br /><br />
// <h3>PINTEREST</h3>
// <br /><br />
// Board Creation
// <br /><br />
// Pins Design and Post
// <br /><br />

// Followers
// <br /><br />
// Website Verification & Business Account
// <br /><br />
// <br /><br />
// <h3>LINKEDIN</h3>
// <br /><br />
// Profile Optimization (Business Profile)
// <br /><br />
// Timeline Status Posting
// <br /><br />
// #hashtag Trend Research
// <br /><br />
// Followers
// <br /><br />
// <br /><br />
// Examples:
// <br /><br />
// <a href="https://www.shivamrestaurant.com.sg/">https://www.shivamrestaurant.com.sg/</a>
// <br />
// <a href="https://www.facebook.com/shivamRestaurantSg/">https://www.facebook.com/shivamRestaurantSg/</a>
// <br />
// <a href="https://orderupapps.com/">https://orderupapps.com/</a>
// <br />
// <a href="https://www.facebook.com/orderuporderingapps">https://www.facebook.com/orderuporderingapps</a>
// <br />
// <a href="https://bestpermanentmakeupatlanta.com/">https://bestpermanentmakeupatlanta.com/</a>
// <br />
// <a href="https://www.facebook.com/permanentmakeupbymilla/">https://www.facebook.com/permanentmakeupbymilla/</a>
// <br /><br />
// Warm Regards,
// <br />
// <h2>${userName}</h2>
// <h4>Sales Executive, Digital Mitro.</h4>

// <div style="display: flex; align-items: center; gap:55px;">
// <img style="width: 30px; height: 18px;" src="https://th.bing.com/th/id/R.607b9f69862d76af04b474113c0c7ff5?rik=lfnOsbv7mhDNbQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fb%2fbc%2fFlag_of_India.png&ehk=Pk5lH0C%2fhstFahWfb15vLjtrJb3DslIU4%2fAQneo9IIM%3d&risl=&pid=ImgRaw&r=0" alt="INDIA"/>
// <span>+91 81008 25310 (Whatsapp)|</span>
// <img style="width: 30px; height: 18px;" src="https://th.bing.com/th/id/R.fdb5e4205cc924e04bf6283e64e462c8?rik=%2fnOSihdqikVOOQ&riu=http%3a%2f%2fnouahsark.com%2fdata%2fimages%2finfocenter%2fworldwide%2fnorth_america%2fflags_big%2funited_states.png&ehk=zrThqMDFOGIcFqqgJOVToWxTlHPQPqwfmih%2f7CNjFH4%3d&risl=&pid=ImgRaw&r=0" alt="USA"/>
// <span>(1) +1 (512) 487 7639</span>
// </div>

// <br />
// <a style="color:'blue';" href="https://www.digitalmitro.com">https://www.digitalmitro.com</a>
// <br />

// <h4 style="font-weight:bold;">Unit No. 1420, Aurora Waterfront, GN 34/1, GN Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091</h4>
// <img style="width: 50%; height: auto;" src="https://digitalmitro.com/wp-content/uploads/2022/07/final__logo.png" alt="Signature Image"/>
// </p>
//   `,