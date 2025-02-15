import Image from "next/image";

const Features = async () => {
  const response = await fetch(
    `https://hydrogenous.vercel.app/api/GetFeatures`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch features (Status: ${response.status})`);
  }

  const colors = [
    {
      id: "0",
      color:
        "rounded-2xl shadow-[0px_5px_15px_0px_rgba(8,_112,_184,_0.7)] px-10 ",
    },
    {
      id: "1",
      color:
        "rounded-2xl shadow-[0px_5px_15px_0px_rgba(167,_215,_169,_1)] px-10 ",
    },
    {
      id: "2",
      color:
        "rounded-2xl shadow-[0px_5px_15px_0px_rgba(255,_87,_51,_1)] px-10 ",
    },
    {
      id: "3",
      color:
        "rounded-2xl shadow-[0px_5px_15px_0px_rgba(133,_193,_233,_1)] px-10 ",
    },
    {
      id: "4",
      color:
        "rounded-2xl shadow-[0px_5px_15px_0px_rgba(215,_195,_226,_1)] px-10 ",
    },
    {
      id: "5",
      color:
        "rounded-2xl shadow-[0px_5px_15px_0px_rgba(8,_112,_184,_0.7)] px-10",
    },
  ];

  const features = await response.json();
  return (
    <>
      <h2 className="text-center text-3xl my-5">چرا هیدروژنوس</h2>
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2  sm:gap-y-10 sm:gap-x-10  lg:gap-y-10 lg:gap-x-24 lg:grid-cols-3 py-10 px-10">
        {features.map((feature, index) => (
          <div className={colors[index].color} key={feature.feature_id}>
            <div className="flex flex-row justify-between items-center mt-4">
              <h2 className="text-xl mb-2">{feature.feature_heading}</h2>
              <Image
                src={`/images/statics/${feature.feature_image}`}
                width={60}
                height={60}
                alt="image not found"
              />
            </div>
            <p className="text-justify leading-8 text-[14px] py-5">
              {feature.feature_content}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Features;
