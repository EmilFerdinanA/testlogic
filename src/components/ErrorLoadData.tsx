import Image from "next/image";
import alert from "@/assets/alert-triangle.svg";

const ErrorLoadData = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <section className="bg-rose-100 rounded-xl flex flex-col gap-6 items-center justify-center h-[40vh] sm:h-[50vh] lg:h-[60vh] text-center px-4">
      <Image src={alert} alt={"alert"} />
      <div>
        <h4 className="mb-1 text-rose-900 text-base font-semibold">
          Opps! Unable to load clients
        </h4>
        <p className="text-rose-900 text-sm font-normal">
          Something went wrong that we didn’t anticipate.
        </p>
      </div>
      <button
        onClick={handleRefresh}
        className="shadow border-gray-300 rounded-lg text-base text-gray-700 font-semibold px-5 py-3 bg-white"
      >
        Retry
      </button>
    </section>
  );
};

export default ErrorLoadData;
