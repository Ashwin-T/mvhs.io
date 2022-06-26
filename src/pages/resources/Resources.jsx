import "./resources.css";
import * as faqs from "../../data/FaqEN.json";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { AiOutlineArrowDown } from "react-icons/ai";
import AddToMobile from "../../components/addToMobile/AddToMobile";
const Resources = () => {

    const links = [
        {
            name: "Aeries",
            link: "https://mvla.asp.aeries.net/student/LoginParent.aspx?page=default.aspx",
            description: "Aeries is a school management and grading system for students and parents.",
            image: "images/aeriesLogo.png",
        },
        {
            name: "Canvas",
            link: "https://mvla.instructure.com/",
            description: "Canvas is a web application that allows teachers to create and manage course content.",
            image: "images/canvasLogo.png",
        },
        {
            name: "Community Resources",
            link: "https://drive.google.com/file/d/1c7EYzQegCrfI_-KqSdH0JcEuIuvZbvF-/view",
            description: "Mental Health Services is a free, online service that provides mental health information and services to people in need.",
            image: "images/metalHealthLogo.png",
        },
        {
            name: "Mental Health Referral",
            link: "https://app.informedk12.com/link_campaigns/mvla-student-support-referral-form-electronic-form?token=FfsLpPWfS98i2RiHN1vG7gVS",
            description: "Mental Health Referral is a free, online service that provides mental health information and services to people in need.",
            image: "images/mentalHealthReferralLogo.png",
        },
        {
            name: "G Classroom",
            link: "https://classroom.google.com",
            description: "Google Classroom is a free online course management tool for teachers and students.",
            image: "images/google-classroom-logo.png",
        },
        {
            name: "MVHS Website",
            link: "https://mvhs.mvla.net/",
            description: "MVHS is a high school in Mountain View Highschool",
            image: "images/mvhslogo.png",
        }
    ];

    return (
        <>
            <div className='flexbox column helloWorld'>
                <div className='main-resources-container'>
                    <h1 className='main-resources'>Resources</h1>
                    <div className='right-triangle-title'></div>
                </div>

                <div className='flexbox resouces-container row'>
                    <div className='flexbox faq-container'>
                        <h3>FAQ</h3>
                        {faqs.faqs.map((item, index) => {
                            return (
                                <Accordion key = {index} sx = {{borderRadius : '0.5rem'}}>
                                    <AccordionSummary expandIcon={<AiOutlineArrowDown />} aria-controls='panel1a-content' id='panel1a-header'>
                                        <h3>{item.faq}</h3>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p>{item.answer}</p>
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })}
                    </div>
                    <div className='link-container'>
                        <h3>Links</h3>
                        {links.map((link, index) => {
                            return (
                                <a key={index} className='flexbox importantLinks' href={link.link} target='_blank' rel='noopener noreferrer'>
                                    <img src={link.image} alt='logo for icon' />
                                    <h3>{link.name}</h3>
                                </a>
                            );
                        })}
                    </div>
                </div>
                <div className = 'bottom-margin' />
            </div>
        </>
    );
};

export default Resources;
