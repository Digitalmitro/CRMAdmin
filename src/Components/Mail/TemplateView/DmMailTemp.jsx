

import axios from "axios";
import { useEffect, useState } from "react";

const DMMailTemp = () => {
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
      <div>
      <p>Hello client,</p>
      <br />
      <br />
      <p>Greetings from DIGITAL MITRO.</p>
      <br />
      <br />
      <h6>
        Search Engine Optimization" or SEO in short, is a term that encapsulates everything you need to do to improve your website's ranking positions in the top search engines. It is the process of getting traffic from the "free," "organic," "editorial" or "natural" search results on search engines. Three Techniques to be conducted to provide you the Search Engine Rankings are:-
      </h6>
      <br />
      <br />
      <br />
      <ul>
        <li>On Page SEO Optimization</li>
        <li>Off-Page SEO Optimization</li>
        <li>Technical SEO</li>
      </ul>
      <br />
      <h6>ON-PAGE SEO ACTIVITIES (WHICH WOULD BE CONDUCTED ON-PAGE OF YOUR WEBSITE)</h6>
      <br />
      <ul>
        <li>NO. OF KEYWORDS - 10</li>
        <li>KEYWORD ANALYSIS</li>
        <li>KEYWORDS MAPPING</li>
        <li>COMPETITOR ANALYSIS & REPORT</li>
        <li>WEBSITE ANALYSIS</li>
        <li>META TAGS IMPLEMENTATION</li>
        <li>DOCUMENT STRUCTURE IMPLEMENTATION</li>
        <li>INTERNAL LINKING</li>
        <li>BLOG IMPLEMENTATION</li>
        <li>GOOGLE ANALYTICS SET-UP</li>
        <li>GOOGLE SEARCH CONSOLE SET-UP</li>
        <li>SITEMAP.XML SET-UP</li>
        <li>ROBOTS.TXT SET-UP</li>
        <li>WEBSITE CONTENT OPTIMIZATION</li>
        <li>IMAGE OPTIMIZATION</li>
        <li>URL STRUCTURE OPTIMIZATION</li>
        <li>LOAD TIME, PAGE SIZE & WEBSITE SPEED OPTIMIZATION</li>
        <li>MOBILE FRIENDLINESS OPTIMIZATION</li>
      </ul>
      <br />
      <h6>OFF-PAGE SEO ACTIVITIES (WHICH WOULD BE CONDUCTED OFF-PAGE/OFF-LINE FOR YOUR WEBSITE)</h6>
      <br />
      <ul>
        <li>BLOG POSTS</li>
        <li>ANALYTICS GOAL SET-UP</li>
        <li>GOOGLE LOCAL LISTING</li>
        <li>LOCAL BUSINESS LISTING</li>
        <li>BLOG COMMENTING</li>
        <li>CLASSIFIED ADS</li>
        <li>PRESS RELEASE DISTRIBUTION</li>
        <li>ARTICLES PUBLICATION</li>
        <li>WEB 2.0 BLOG PUBLICATION</li>
        <li>SLIDE CREATION AND SHARING</li>
        <li>GUEST POSTING</li>
        <li>VIDEO SUBMISSION</li>
        <li>PDF SHARING</li>
        <li>INFOGRAPHICS</li>
        <li>POWERPOINT PRESENTATION SHARING</li>
      </ul>
      <br />
      <h6>
        TECHNICAL SEO REFERS TO WEBSITE AND SERVER OPTIMIZATIONS THAT HELP SEARCH ENGINE SPIDERS CRAWL AND INDEX YOUR SITE MORE EFFECTIVELY (TO HELP IMPROVE ORGANIC RANKINGS).
      </h6>
      <br />
      <ul>
        <li>TECHNICAL SEO ACTIVITIES & REPORTING & CREDENTIALS</li>
        <li>CRAWLING & INDEXING</li>
        <li>WEBSITE ANALYSIS REPORT</li>
        <li>MONTHLY WORK & KEYWORDS RANKING REPORT</li>
        <li>GOOGLE ANALYTICAL REPORT</li>
        <li>VISITOR OVERVIEW REPORT</li>
      </ul>
      <br />
      <h6>Features which we will provide you in SMO (Social Media Optimization):</h6>
      <br />
      <p>OUR PROCESS - HOURS DAILY/WEEKLY/MONTHLY SOCIAL MEDIA POST.</p>
      <br />
      <br />
      <h3>FACEBOOK</h3>
      <ul>
        <li>Profile Optimization</li>
        <li>FB Timeline Status Posting</li>
        <li>Post Sharing in Groups</li>
        <li>Attractive Cover Images</li>
        <li>Targeted Page Likes</li>
        <li>Call To Action Button Setup</li>
        <li>Insight Monitoring</li>
        <li>Video Sharing (provided by client)</li>
        <li>Sponsored Ads (Not for ORM)</li>
      </ul>
      <br />
      <h3>TWITTER</h3>
      <ul>
        <li>Tweets Posting & Retweets</li>
        <li>Targeted Twitter Followers Increase</li>
        <li>#hashtag Trend Research</li>
        <li>Followers</li>
      </ul>
      <br />
      <h3>INSTAGRAM</h3>
      <ul>
        <li>Profile Optimization (Business Profile)</li>
        <li>Timeline Status Posting</li>
        <li>#hashtag Trend Research</li>
        <li>Followers</li>
      </ul>
      <br />
      <h3>PINTEREST</h3>
      <ul>
        <li>Board Creation</li>
        <li>Pins Design and Post</li>
        <li>Followers</li>
        <li>Website Verification & Business Account</li>
      </ul>
      <br />
      <h3>LINKEDIN</h3>
      <ul>
        <li>Profile Optimization (Business Profile)</li>
        <li>Timeline Status Posting</li>
        <li>#hashtag Trend Research</li>
        <li>Followers</li>
      </ul>
      <br />
      <h6>Examples:</h6>
      <br />
      <a href="https://www.shivamrestaurant.com.sg/">https://www.shivamrestaurant.com.sg/</a>
      <br />
      <a href="https://www.facebook.com/shivamRestaurantSg/">https://www.facebook.com/shivamRestaurantSg/</a>
      <br />
      <a href="https://orderupapps.com/">https://orderupapps.com/</a>
      <br />
      <a href="https://www.facebook.com/orderuporderingapps">https://www.facebook.com/orderuporderingapps</a>
      <br />
      <a href="https://bestpermanentmakeupatlanta.com/">https://bestpermanentmakeupatlanta.com/</a>
      <br />
      <a href="https://www.facebook.com/permanentmakeupbymilla/">https://www.facebook.com/permanentmakeupbymilla/</a>
      <br />
      <br />
      <p>Warm Regards,</p>
      <h6>'User Name'</h6>
      <h6>Sales Executive, Digital Mitro.</h6>
      <div style={{ display: 'flex', alignItems: 'center', gap: '55px' }}>
        <img
          style={{ width: '30px', height: '18px' }}
          src="https://th.bing.com/th/id/R.607b9f69862d76af04b474113c0c7ff5?rik=lfnOsbv7mhDNbQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fb%2fbc%2fFlag_of_India.png&ehk=Pk5lH0C%2fhstFahWfb15vLjtrJb3DslIU4%2fAQneo9IIM%3d&risl=&pid=ImgRaw&r=0"
          alt="INDIA"
        />
        <span>+91 81008 25310 (Whatsapp)|</span>
        <img
          style={{ width: '30px', height: '18px' }}
          src="https://th.bing.com/th/id/R.fdb5e4205cc924e04bf6283e64e462c8?rik=%2fnOSihdqikVOOQ&riu=http%3a%2f%2fnouahsark.com%2fdata%2fimages%2finfocenter%2fworldwide%2fnorth_america%2fflags_big%2funited_states.png&ehk=zrThqMDFOGIcFqqgJOVToWxTlHPQPqwfmih%2f7CNjFH6%3d&risl=&pid=ImgRaw&r=0"
          alt="USA"
        />
        <span>(1) +1 (512) 487 7639</span>
      </div>
      <br />
      <a style={{ color: 'blue' }} href="https://www.digitalmitro.com">https://www.digitalmitro.com</a>
      <br />
      <h6 style={{ fontWeight: 'bold' }}>
        Unit No. 1420, Aurora Waterfront, GN 34/1, GN Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091
      </h6>
      <img
        style={{ width: '50%', height: 'auto' }}
        src="https://digitalmitro.com/wp-content/uploads/2022/07/final__logo.png"
        alt="Signature Image"
      />
    </div>
    </div>
  );
};

export default DMMailTemp;
