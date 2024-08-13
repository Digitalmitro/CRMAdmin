import axios from "axios";
import { useEffect } from "react";

const EcomMail = async ({clientName, aliceName, clientEmail}) => {
 
  const [mailData, setMailData] = useState()


  const handleGetMailData = async() => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/mailData`);
      console.log('Mail data get successfully:', response.data);
      console.log("response", response)
      setMailData(mailData)
    } catch (error) {
      console.error('Error submitting mail data:', error);
    }
  }

  useEffect(() => {
    handleGetMailData()
  },[])

  const handleEmoMail =async() => {
    try {
      const setMail = {
        to: clientEmail,
        subject: `E-Commerce Website Proposal`,
        html: `
                <p>
        Hello ${clientName},
        <br /><br />
        Greetings from DIGITAL MITRO.
        <br /><br />
        <h4>INTRODUCING "DIGITAL MITRO" WHICH IS THE RENOWNED & REGISTERED LEADING "GLOBAL" BASED WEB DESIGNING & DEVELOPMENT, APPLICATION SOFTWARE & DIGITAL MARKETING ALONG WITH MOBILE APP (BOTH ANDROID & I-PHONE DEVELOPMENT). WE CATER OUR SERVICES GLOBALLY FOR ALL TYPES OF BUSINESS CLIENTS IN INDIA, NEW ZEALAND, AUSTRALIA, SINGAPORE, MALAYSIA, THAILAND, INDONESIA, PHILIPPINES IN SOUTH ASIA, & EUROPEAN COUNTRIES LIKE UNITED KINGDOM (SCOTLAND, WALES, ENGLAND) POLAND, HOLLAND, IRELAND, NORTHERN IRELAND, SPAIN, GERMANY, FRANCE, & THE WHOLE OF USA. WITHIN A SPAN OF JUST 5 YEARS, WE HAVE BEEN SUCCESSFUL IN DELIVERING WORLD CLASS COMMITTED SERVICES TO OUR ESTEEMED CLIENTS. THE DEDICATED TEAM OF OURS HAS ALWAYS HAD A BIG ROLE IN DEVELOPING, MAINTAINING AND SUPPORTING THE WEBSITE. EVENTUALLY, WITH TIME WE HAVE ROLLED INTO BECOMING AN ORGANIZATION WITH THE STRONGEST FOUNDATION OF MUTUAL TRUST AND HEALTHY BUSINESS RELATIONSHIP.</h4>
  
        <br />
        <br />
       <h4>* E-COMMERCE WEBSITE (DESIGN & COMPLETE DEVELOPMENT)</h4> 
        <br />
        <br /><br />
        Please note: Our business motive is to support you from your business aspect from every corner, gradually perform all the necessary works for all your online solutions and to take care completely from every aspect step by step in a sequence. So that we go ahead complete each work step by step and give you the desired results and in return you give us work step by step.
  
  
        <br /><br />
        <br />
        Please review the attached PDF Business Confidential Proposals for you in order to start the work on your website as we are going to take care of this website completely from start to end.
        <br />
        <h4>COMPLETE DETAILED WORK MODULES FOR THE DEVELOPMENT OF YOUR BUSINESS WEBSITE ALONG WITH CURRENCY CONVERTER MECHANISM & MULTI LINGUISTICS LANGUAGE CONTENT.</h4>
        <br />
        <h4>E-COMMERCE WEBSITE ALONG WITH CURRENCY CONVERTER MECHANISM & MULTI</h4>
        <br />
        <h4>E-COMMERCE WEBSITE ALONG WITH CURRENCY CONVERTER MECHANISM & MULTI</h4>
        <br />
        <br />
        Number of  Pages 6
        <br />
       Subpages Unlimited
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
        <br />
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
        <br />
        
        SERVICE MANAGEMENT FEATURES
        <br />
        <br />
        Gallery
  
        Product Showcase
        <br />
        Project
        <br />
        Portfolio
        <br />
        Testimonial
        <br />
        Newsletter
        <br />
        Document List
        <br />
        News
        <br/>
        <br/>
        PRODUCT MANAGEMENT SYSTEM
        <br/>
        Display feature product on home page
        <br/>
        Multiple images per product (Up to 10 max)
        <br/>
        Product image zoom-in capability
        <br/>
        Unlimited product attribute
        <br/>
        Attribute wise product price
        <br/>
        Product review & ratings
        <br/>
        Compare products
        <br/>
        Add products to Wish list
        <br/>
        Different price for different customer groups such as wholesalers and retailers.
        <br/>
        Related products
        <br/>
        Stock availability
        <br/>
        Send to a friend with email
        <br/>
        Share on Facebook
        <br/>
        Special offers
        <br/>
        <br/>
        <br/>
        <h5>CUSTOMER ACCOUNTS<h5/>
        <br/>
        <br/>    
        Address book with unlimited addresses
        <br/>    
        Wish list with ability to add comments
        <br/>    
        Order status and history
        <br/>    
        Recently ordered items
        <br/>    
        Default billing and shipping addresses
        <br/>    
        Newsletter subscription management
        <br/>    
        Product reviews submitted
        <br/>    
        <br/>    
        <h4>ANALYTICS AND REPORTING</h4>
        <br/>    
        <br/> 
        Admin dashboard for report overview
        <br/> 
        Sales report
        <br/> 
        Best viewed products report
        <br/> 
        Best purchased products report
        <br/> 
        Stock report
        <br/> 
        Search terms report
        <br/> 
        Product reviews report
        <br/> 
        Coupon usage report
        <br/> 
        Total sales invoiced
        <br/> 
        Mobile Commerce
        <br/> Sales report
        <br/> 
        Best viewed products report
        <br/> 
        Best purchased products report
        <br/> 
        Stock report
        <br/> 
        Search terms report
        <br/> 
        Product reviews report
        <br/> 
        Coupon usage report
        <br/> 
        Total sales invoiced
        <br/> 
        Mobile Commerce
        <br/> 
        <br/> 
        <br/> 
        <h4>PLEASE FEEL FREE TO CALL ON BELOW MENTIONED NUMBERS TO DISCUSS THE<h4/>
        <br/> 
        <h4>PROJECT AND TO UNDERSTAND YOUR BUSINESS REQUIREMENTS.<h4/>
        <br/>
        <a href="https://www.lillywhites.com/">https://www.lillywhites.com/</a>
        <br />
        <a href="https://www.gavins-garage.com/">https://www.gavins-garage.com/</a>
        <br />
        <a href="https://cashmere-suit.com/">https://cashmere-suit.com/</a>
        <br />
        <br /><br />
        Warm Regards,
        <br />
        <h2>${aliceName}</h2>
        <h4>Sales Executive, Digital Mitro.</h4>
        
        <div style="display: flex; align-items: center; gap:55px;">
        <img style="width: 30px; height: 18px;" src="https://th.bing.com/th/id/R.607b9f69862d76af04b474113c0c7ff5?rik=lfnOsbv7mhDNbQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fb%2fbc%2fFlag_of_India.png&ehk=Pk5lH0C%2fhstFahWfb15vLjtrJb3DslIU4%2fAQneo9IIM%3d&risl=&pid=ImgRaw&r=0" alt="INDIA"/>
        <span>+91 81008 25310 (Whatsapp)|</span>
        <img style="width: 30px; height: 18px;" src="https://th.bing.com/th/id/R.fdb5e4205cc924e04bf6283e64e462c8?rik=%2fnOSihdqikVOOQ&riu=http%3a%2f%2fnouahsark.com%2fdata%2fimages%2finfocenter%2fworldwide%2fnorth_america%2fflags_big%2funited_states.png&ehk=zrThqMDFOGIcFqqgJOVToWxTlHPQPqwfmih%2f7CNjFH4%3d&risl=&pid=ImgRaw&r=0" alt="USA"/>
        <span>(1) +1 (512) 487 7639</span>
    </div>
    
        <br />
        <a style="color:'blue';" href="https://www.digitalmitro.com">https://www.digitalmitro.com</a>
        <br />
      
        <h4 style="font-weight:bold;">Unit No. 1420, Aurora Waterfront, GN 34/1, GN Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091</h4>
        <img style="width: 50%; height: auto;" src="https://digitalmitro.com/wp-content/uploads/2022/07/final__logo.png" alt="Signature Image"/>
        </p>
        `,
      };
      
      // Assuming you have a local server running to handle sending emails
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/send-email`, setMail);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    handleEmoMail()
  },[clientName, aliceName, clientEmail])
  return (
    <>
      <div>
      <p>Hello {clientName || 'client name'},</p>
      <br /><br />
      <p>Greetings from DIGITAL MITRO.</p>
      <br /><br />
      <h4>
        INTRODUCING "DIGITAL MITRO" WHICH IS THE RENOWNED & REGISTERED LEADING "GLOBAL" BASED WEB DESIGNING & DEVELOPMENT, APPLICATION SOFTWARE & DIGITAL MARKETING ALONG WITH MOBILE APP (BOTH ANDROID & I-PHONE DEVELOPMENT). WE CATER OUR SERVICES GLOBALLY FOR ALL TYPES OF BUSINESS CLIENTS IN INDIA, NEW ZEALAND, AUSTRALIA, SINGAPORE, MALAYSIA, THAILAND, INDONESIA, PHILIPPINES IN SOUTH ASIA, & EUROPEAN COUNTRIES LIKE UNITED KINGDOM (SCOTLAND, WALES, ENGLAND) POLAND, HOLLAND, IRELAND, NORTHERN IRELAND, SPAIN, GERMANY, FRANCE, & THE WHOLE OF USA. WITHIN A SPAN OF JUST 5 YEARS, WE HAVE BEEN SUCCESSFUL IN DELIVERING WORLD CLASS COMMITTED SERVICES TO OUR ESTEEMED CLIENTS. THE DEDICATED TEAM OF OURS HAS ALWAYS HAD A BIG ROLE IN DEVELOPING, MAINTAINING AND SUPPORTING THE WEBSITE. EVENTUALLY, WITH TIME WE HAVE ROLLED INTO BECOMING AN ORGANIZATION WITH THE STRONGEST FOUNDATION OF MUTUAL TRUST AND HEALTHY BUSINESS RELATIONSHIP.
      </h4>
      <br /><br />
      <h4>* E-COMMERCE WEBSITE (DESIGN & COMPLETE DEVELOPMENT)</h4>
      <br /><br /><br />
      <p>
        Please note: Our business motive is to support you from your business aspect from every corner, gradually perform all the necessary works for all your online solutions and to take care completely from every aspect step by step in a sequence. So that we go ahead complete each work step by step and give you the desired results and in return you give us work step by step.
      </p>
      <br /><br /><br />
      <p>
        Please review the attached PDF Business Confidential Proposals for you in order to start the work on your website as we are going to take care of this website completely from start to end.
      </p>
      <br />
      <h4>
        COMPLETE DETAILED WORK MODULES FOR THE DEVELOPMENT OF YOUR BUSINESS WEBSITE ALONG WITH CURRENCY CONVERTER MECHANISM & MULTI LINGUISTICS LANGUAGE CONTENT.
      </h4>
      <br />
      <h4>E-COMMERCE WEBSITE ALONG WITH CURRENCY CONVERTER MECHANISM & MULTI</h4>
      <br />
      <h4>E-COMMERCE WEBSITE ALONG WITH CURRENCY CONVERTER MECHANISM & MULTI</h4>
      <br /><br />
      <p>Number of Pages 6</p>
      <p>Subpages Unlimited</p>
      <p>Number of Royalty Images 5</p>
      <p>Number of Dynamic Banners 3</p>
      <p>Responsive Website Design</p>
      <p>Content Management System</p>
      <p>Number of Additional Pages</p>
      <p>Favicon</p>
      <p>Contact Us Page</p>
      <br /><br />
      <p>Google Map on Contact us Page</p>
      <p>Support for Latest Browsers</p>
      <p>Internet Explorer +10 Compatible</p>
      <p>Google Chrome Compatible</p>
      <p>Mozilla Firefox Compatible</p>
      <p>Displaying Social Media Links</p>
      <p>SEO Friendly URL Structure</p>
      <p>Website Parameters Check</p>
      <p>Phone Support & Consultation</p>
      <p>Basic SEO</p>
      <p>Basic SMO</p>
      <p>Blog Management</p>
      <p>Post Go Live Support</p>
      <p>Serenity</p>
      <p>Testimonial</p>
      <p>Google Analytics Set-Up</p>
      <p>Google Webmasters Set-Up</p>
      <p>E-Mail Support & Consultation</p>
      <br />
      <h4>SERVICE MANAGEMENT FEATURES</h4>
      <br />
      <p>Gallery</p>
      <p>Product Showcase</p>
      <p>Project</p>
      <p>Portfolio</p>
      <p>Testimonial</p>
      <p>Newsletter</p>
      <p>Document List</p>
      <p>News</p>
      <br /><br />
      <h4>PRODUCT MANAGEMENT SYSTEM</h4>
      <p>Display feature product on home page</p>
      <p>Multiple images per product (Up to 10 max)</p>
      <p>Product image zoom-in capability</p>
      <p>Unlimited product attribute</p>
      <p>Attribute wise product price</p>
      <p>Product review & ratings</p>
      <p>Compare products</p>
      <p>Add products to Wish list</p>
      <p>Different price for different customer groups such as wholesalers and retailers.</p>
      <p>Related products</p>
      <p>Stock availability</p>
      <p>Send to a friend with email</p>
      <p>Share on Facebook</p>
      <p>Special offers</p>
      <br /><br />
      <h5>CUSTOMER ACCOUNTS</h5>
      <br /><br />
      <p>Address book with unlimited addresses</p>
      <p>Wish list with ability to add comments</p>
      <p>Order status and history</p>
      <p>Recently ordered items</p>
      <p>Default billing and shipping addresses</p>
      <p>Newsletter subscription management</p>
      <p>Product reviews submitted</p>
      <br /><br />
      <h4>ANALYTICS AND REPORTING</h4>
      <br /><br />
      <p>Admin dashboard for report overview</p>
      <p>Sales report</p>
      <p>Best viewed products report</p>
      <p>Best purchased products report</p>
      <p>Stock report</p>
      <p>Search terms report</p>
      <p>Product reviews report</p>
      <p>Coupon usage report</p>
      <p>Total sales invoiced</p>
      <p>Mobile Commerce</p>
      <p>Sales report</p>
      <p>Best viewed products report</p>
      <p>Best purchased products report</p>
      <p>Stock report</p>
      <p>Search terms report</p>
      <p>Product reviews report</p>
      <p>Coupon usage report</p>
      <p>Total sales invoiced</p>
      <p>Mobile Commerce</p>
      <br /><br />
      <h4>PLEASE FEEL FREE TO CALL ON BELOW MENTIONED NUMBERS TO DISCUSS THE PROJECT AND TO UNDERSTAND YOUR BUSINESS REQUIREMENTS.</h4>
      <br />
      <a href="https://www.lillywhites.com/">https://www.lillywhites.com/</a>
      <br />
      <a href="https://www.gavins-garage.com/">https://www.gavins-garage.com/</a>
      <br />
      <a href="https://cashmere-suit.com/">https://cashmere-suit.com/</a>
      <br /><br />
      <p>Warm Regards,</p>
      <h2>{aliceName || 'Alice'}</h2>
      <h4>Sales Executive, Digital Mitro.</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '55px' }}>
        <img
          style={{ width: '30px', height: '18px' }}
          src="https://th.bing.com/th/id/R.607b9f69862d76af04b474113c0c7ff5?rik=lfnOsbv7mhDNbQ&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fb%2fbc%2fFlag_of_India.png&ehk=Pk5lH0C%2fhstFahWfb15vLjtrJb3DslIU4%2fAQneo9IIM%3d&risl=&pid=ImgRaw&r=0"
          alt="INDIA"
        />
        <span>+91 81008 25310 (Whatsapp) |</span>
        <img
          style={{ width: '30px', height: '18px' }}
          src="https://th.bing.com/th/id/R.fdb5e4205cc924e04bf6283e64e462c8?rik=%2fnOSihdqikVOOQ&riu=http%3a%2f%2fnouahsark.com%2fdata%2fimages%2finfocenter%2fworldwide%2fnorth_america%2fflags_big%2funited_states.png&ehk=zrThqMDFOGIcFqqgJOVToWxTlHPQPqwfmih%2f7CNjFH4%3d&risl=&pid=ImgRaw&r=0"
          alt="USA"
        />
        <span>(1) +1 (512) 487 7639</span>
      </div>
      <br />
      <a style={{ color: 'blue' }} href="https://www.digitalmitro.com">https://www.digitalmitro.com</a>
      <br />
      <h4 style={{ fontWeight: 'bold' }}>
        Unit No. 1420, Aurora Waterfront, GN 34/1, GN Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091
      </h4>
      <img
        style={{ width: '50%', height: 'auto' }}
        src="https://digitalmitro.com/wp-content/uploads/2022/07/final__logo.png"
        alt="Signature Image"
      />
    </div>
    </>
  )
};

export default EcomMail