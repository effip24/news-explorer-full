import "./About.css";
import avatar from "../../images/me.jpg";

const About = () => {
  return (
    <section className="about">
      <div className="about__container">
        <img className="about__image" src={avatar} alt="avatar"></img>
        <div className="about__body">
          <h4 className="about__title">About the author</h4>
          <p className="about__text">
            My name is Ephraim Phil, I love being a web developer and I'm passionate about creating fully functional
            websites and seeing my imagination come to life. This is my final graduation project at Yandex Practicum
            bootcamp. The project was built using MERN stack.
          </p>
        </div>
      </div>
    </section>
  );
};
export default About;
