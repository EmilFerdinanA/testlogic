"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";
import axios from "axios";

import ErrorLoadData from "@/components/ErrorLoadData";
import Table from "@/components/Table";
import { IClients } from "@/constant/type";

const CRM = () => {
  const [clients, setClients] = useState<IClients[] | undefined>();
  const [error, setError] = useState<boolean>(false);

  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const currentPath: string = usePathname();

  const activeTab: String | null = searchParams.get("tab");

  const createQueryParams = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const fetchClient = async () => {
    await axios
      .get("https://interview-test-mock-api.azurewebsites.net/clients")
      .then((data) => setClients(data.data))
      .catch(() => setError(true));
  };

  useEffect(() => {
    fetchClient();
  }, []);

  return (
    <section className="mt-2 px-6 sm:px-10 lg:px-28 flex flex-col gap-5">
      <h2 className="py-5 border-b border-ternary text-3xl font-semibold">
        CRM
      </h2>

      <ul className="flex gap-2 items-center">
        <li>
          <Link
            href={`${currentPath}?${createQueryParams("tab", "clients")}`}
            className={`py-2 px-3 text-sm font-semibold rounded-md ${
              activeTab === "clients" || activeTab === null
                ? "bg-primary text-primary2"
                : "text-gray-500"
            }`}
          >
            Clients
          </Link>
        </li>
        <li>
          <Link
            href={`${currentPath}?${createQueryParams("tab", "policy")}`}
            className={`py-2 px-3 text-sm font-semibold rounded-md ${
              activeTab === "policy"
                ? "bg-primary text-primary2"
                : "text-gray-500"
            }`}
          >
            Policy
          </Link>
        </li>
        <li>
          <Link
            href={`${currentPath}?${createQueryParams("tab", "support")}`}
            className={`py-2 px-3 text-sm font-semibold rounded-md ${
              activeTab === "support"
                ? "bg-primary text-primary2"
                : "text-gray-500"
            }`}
          >
            Support
          </Link>
        </li>
      </ul>

      <div>
        {!error && (activeTab === "clients" || activeTab === null) ? (
          <Table clients={clients} />
        ) : (
          <ErrorLoadData />
        )}
      </div>
    </section>
  );
};

export default CRM;
