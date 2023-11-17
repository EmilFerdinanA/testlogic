"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import Avatar from "@/assets/Avatar.png";
import Avatar1 from "@/assets/Avatar1.png";

const Detail = () => {
  const pathname = usePathname();

  const client = pathname.split("/")[2];
  const cleanedName = decodeURIComponent(client).replace(/%20/g, " ");

  return (
    <section className="mt-2 px-6 sm:px-10 lg:px-28 flex flex-col gap-5 pb-24">
      <div>
        <h2 className="py-5 border-b border-ternary text-3xl font-semibold">
          {cleanedName}
        </h2>

        <div className="bg-gray-50 rounded-xl py-5 px-6 text-gray-600 text-sm flex flex-col sm:flex-row gap-14 mt-8">
          <div>
            <div className="mb-2">Gender</div>
            <div>Female</div>
          </div>

          <div>
            <div className="mb-2">DOB</div>
            <div>20/10/2023</div>
          </div>

          <div>
            <div className="mb-2">Marital Status</div>
            <div>Divorced</div>
          </div>

          <div>
            <div className="mb-2">Employment</div>
            <div>Employed</div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="py-5 border-b border-ternary text-lg font-semibold">
          Financials
        </h2>

        <div className=" rounded-xl border border-gray-200 mt-8">
          <div className="py-4 px-6 flex justify-between items-center border-b border-gray-200">
            <div className="text-sm font-medium text-gray-900">Income</div>
            <div className="text-sm font-normal text-gray-600">$589.99</div>
          </div>

          <div className="py-4 px-6 flex justify-between items-center border-b border-gray-200">
            <div className="text-sm font-medium text-gray-900">Expenses</div>
            <div className="text-sm font-normal text-gray-600">$328.85</div>
          </div>

          <div className="py-4 px-6 flex justify-between items-center border-b border-gray-200">
            <div className="text-sm font-medium text-gray-900">Savings</div>
            <div className="text-sm font-normal text-gray-600">$396.84</div>
          </div>

          <div className="py-4 px-6 flex justify-between items-center border-b border-gray-200">
            <div className="text-sm font-medium text-gray-900">Invesment</div>
            <div className="text-sm font-normal text-gray-600">$406.27</div>
          </div>

          <div className="py-4 px-6 flex justify-between items-center border-b border-gray-200">
            <div className="text-sm font-medium text-gray-900">Debt</div>
            <div className="text-sm font-normal text-gray-600">$778.35</div>
          </div>

          <div className="py-4 px-6 flex justify-between items-center border-b border-gray-200">
            <div className="text-sm font-medium text-gray-900">Cashflow</div>
            <div className="text-sm font-normal text-gray-600">$490.51</div>
          </div>

          <div className="py-4 px-6 flex justify-between items-center">
            <div className="text-sm font-medium text-gray-900">Networth</div>
            <div className="text-sm font-normal text-gray-600">$928.41</div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="py-5 border-b border-ternary text-lg font-semibold">
          Goals
        </h2>

        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          <div className="w-fulll lg:w-1/2 p-6 flex justify-between items-center rounded-xl border border-gray-200 shadow">
            <div className="flex items-center justify-center gap-3">
              <Image src={Avatar} alt={"Avatar"} />
              <div>
                <h6 className="text-base font-semibold text-gray-900">
                  Emergency Fund
                </h6>
                <p className="text-sm font-normal text-gray-600">$2395.29</p>
              </div>
            </div>
            <button className="shadow border border-gray-300 rounded-lg px-3 py-2">
              Edit
            </button>
          </div>

          <div className="w-full lg:w-1/2 p-6 flex justify-between items-center rounded-xl border border-gray-200 shadow">
            <div className="flex items-center justify-center gap-3">
              <Image src={Avatar1} alt={"Avatar"} />
              <div>
                <h6 className="text-base font-semibold text-gray-900">
                  Travel
                </h6>
                <p className="text-sm font-normal text-gray-600">$2395.29</p>
              </div>
            </div>
            <button className="shadow border border-gray-300 rounded-lg px-3 py-2">
              Edit
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="py-5 border-b border-ternary text-lg font-semibold">
          Insurances
        </h2>

        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 p-6 flex justify-between items-center rounded-xl border border-gray-200 shadow">
            <div className="flex items-center justify-center gap-3">
              <Image src={Avatar1} alt={"Avatar"} />
              <div>
                <h6 className="text-base font-semibold text-gray-900">
                  Life Insurance
                </h6>
                <p className="text-sm font-normal text-gray-600">$2395.29</p>
              </div>
            </div>
            <button className="shadow border border-gray-300 rounded-lg px-3 py-2">
              View insurance
            </button>
          </div>

          <div className="w-full lg:w-1/2 p-6 flex justify-between items-center rounded-xl border border-gray-200 shadow">
            <div className="flex items-center justify-center gap-3">
              <Image src={Avatar1} alt={"Avatar"} />
              <div>
                <h6 className="text-base font-semibold text-gray-900">
                  Personal Accident
                </h6>
                <p className="text-sm font-normal text-gray-600">
                  Plan A $2395.29
                </p>
              </div>
            </div>
            <button className="shadow border border-gray-300 rounded-lg px-3 py-2">
              View insurance
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
