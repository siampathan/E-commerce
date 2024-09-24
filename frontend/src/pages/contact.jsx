import { assets } from "../assets/assets";
import NewsLetterBox from "../components/newsLetterBox";
import Title from "../components/title";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t ">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[480px]"
          alt={assets.contact_img}
        />

        <div className="flex flex-col justify-center items-center gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            54709, Willms Station <br /> Suite 350, Washington, USA
          </p>
          <p className="text-gray-500">
            Tel: 9988074 <br /> Email: siam@gmail.com
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default Contact;
