import { assets } from "../assets/assets";
import Title from "../components/title";
import NewsLetterBox from "../components/newsLetterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="flex flex-col my-10 sm:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt={assets.about_img}
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 ">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab cum
            dolorem, voluptatem velit eius beatae adipisci accusamus rem odit
            aspernatur. Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Odit accusamus est dicta incidunt nemo perferendis tempora
            ullam accusantium, ipsum, dolorem facere alias quam, corrupti
            ratione quidem. Hic molestiae amet repellat.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
            quisquam, molestias laborum autem ut ipsam maiores ullam quod nam
            quis odio reiciendis debitis, nesciunt Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Ex, exercitationem. Vitae repudiandae
            quidem itaque cum voluptatum ut enim esse nam incidunt, quibusdam
            sequi libero voluptas sapiente non asperiores assumenda impedit?
          </p>
          <b className="text-gry-500">Our Mession</b>
          <p>
            Our Misson Forever Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Voluptatibus commodi praesentium tenetur vel hic
            temporibus.
          </p>
        </div>
      </div>

      <div className="text-2xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Quality Assurence:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            similique mollitia atque maxime repellat officiis!
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            similique mollitia atque maxime repellat officiis!
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 ">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            similique mollitia atque maxime repellat officiis!
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
