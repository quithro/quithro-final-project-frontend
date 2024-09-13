import "./About.css";
import avatar from "/src/images/avatar.png";

function About() {
    return (
        <div className="about">
            <img className="about__image" alt="avatar" src={avatar}></img>
            <div className="about__content">
                <h2 className="about__title">About the author</h2>
                <div className="about__description">
                    <p>
                        This project was completed by Carlos Sierra. Carlos is knowledgable in full-stack skills HTML, CSS, Javascript, React,
                        Express, Node.js, Figma, MongoDB. Also Carlos is able to produce source code for
                        websites, programs, software, and applications.
                    </p>
                    <p>
                        This knowledge was achieved from TripleTen, a software engineering bootcamp. 
                        This program provided the basis, foundation, and
                        the knowledge & oppurtunity for an aspiring software engineer to find an 
                        entry level engineering job.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;