import React from 'react'
import HeroAbout from '../../components/About_Com/HeroAbout'
import MessageWelcome from '../../components/About_Com/MessageWelcome';
import Personalized_Learning from '../../components/About_Com/Personalized_Learning';
import Collaborative_Community from '../../components/About_Com/Collaborative_Community';
import Progress_Tracking from '../../components/About_Com/Progress_Tracking';
import Dynamic_Resources from '../../components/About_Com/Dynamic_Resources';
import Container_Images from '../../components/About_Com/Container_Images';


const About = () => {
    return (
        <>
            <div className="About container py-5 overflow-hidden">
                <HeroAbout />
                <Container_Images />
                <MessageWelcome />
                <Personalized_Learning />
                <Collaborative_Community />
                <Progress_Tracking />
                <Dynamic_Resources />
            </div>
        </>
    )
}

export default About