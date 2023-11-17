import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { IClients } from "@/constant/type";
import { FormattedDate } from "@/utils/FormattedDate";
import ArrowUp from "@/assets/arrow-up.svg";
import Avatar from "@/assets/Avatar.png";
import Search from "./Search";
import SearchSpecific from "./SearchSpecific";
import Pagination from "./Pagination";
import Link from "next/link";

interface TableProps {
  clients: IClients[] | undefined;
}

const initialFilters = {
  Male: false,
  Female: false,
  Single: false,
  Married: false,
  Divorced: false,
  Unemployed: false,
  Employed: false,
};

const gender = ["Male", "Female"];
const maritalstatus = ["Single", "Married", "Divorced"];
const Employment = ["Unemployed", "Employed"];

const Table: React.FC<TableProps> = ({ clients }) => {
  const [client, setClient] = useState<IClients[] | undefined>(clients);

  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [isSearchByName, setIsSearchByName] = useState<boolean>(false);
  const [isSorting, setIsSorting] = useState<number>(1);
  const [checkedClients, setCheckedClients] = useState<{
    [key: string]: boolean;
  }>({});

  const [dataFilteredClient, setDataFilteredClient] = useState<
    IClients[] | undefined
  >([]);

  const [dataSortingClient, setDataSortingClient] = useState<
    IClients[] | undefined
  >([]);
  const [filteredClient, setFilteredClient] = useState<IClients[] | undefined>(
    []
  );
  const [filters, setFilters] = useState<{ [key: string]: boolean }>(
    initialFilters
  );

  const [page, setPage] = useState<number>(1);

  const data = clients?.slice(
    page === 1 ? 0 : (page - 1) * 3,
    clients.length - page * 3 < 0 ? clients.length : page * 3
  );

  const dataSorting = dataSortingClient?.slice(
    page === 1 ? 0 : (page - 1) * 3,
    dataSortingClient.length - page * 3 < 0
      ? dataSortingClient.length
      : page * 3
  );

  const dataFilter = dataFilteredClient?.slice(
    page === 1 ? 0 : (page - 1) * 3,
    dataFilteredClient.length - page * 3 < 0
      ? dataFilteredClient.length
      : page * 3
  );

  useEffect(() => {
    if (clients) {
      setClient(clients.slice(0, 3));
    }
  }, [clients]);

  useEffect(() => {
    if (isSearch) {
      setFilteredClient(dataFilter);
    } else {
      dataSortingClient?.length! > 0 ? setClient(dataSorting) : setClient(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    switch (isSorting) {
      case 1:
        if (isSearch && dataFilteredClient) {
          const sortedClients = [...dataFilteredClient].sort((a, b) =>
            a.gender.localeCompare(b.gender)
          );
          setDataFilteredClient(sortedClients);
          setFilteredClient(sortedClients.slice(0, 3));
        } else if (!isSearch && clients) {
          const sortedClients = [...clients].sort((a, b) =>
            a.gender.localeCompare(b.gender)
          );
          setDataSortingClient(sortedClients);
          setClient(sortedClients.slice(0, 3));
        }
        break;
      case 2:
        if (isSearch && dataFilteredClient) {
          const sortedClients = [...dataFilteredClient].sort((a, b) =>
            b.gender.localeCompare(a.gender)
          );
          setDataFilteredClient(sortedClients);
          setFilteredClient(sortedClients.slice(0, 3));
        } else if (!isSearch && clients) {
          const sortedClients = [...clients].sort((a, b) =>
            b.gender.localeCompare(a.gender)
          );
          setDataSortingClient(sortedClients);
          setClient(sortedClients.slice(0, 3));
        }
        break;
      case 3:
        if (isSearch && dataFilteredClient) {
          setFilteredClient(dataFilter);
        } else if (!isSearch && clients) {
          setClient(data);
        }
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSorting]);

  useEffect(() => {
    const isSearchSpecific = Object.values(filters).some(
      (value) => value === true
    );
    setIsSearch(isSearchSpecific);

    let filteredClients = clients;

    if (filteredClients) {
      if (filters.Male || filters.Female) {
        filteredClients = filteredClients.filter((item) => {
          return (
            (filters.Male && item.gender === "Male") ||
            (filters.Female && item.gender === "Female")
          );
        });
      }

      if (filters.Single || filters.Married || filters.Divorced) {
        filteredClients = filteredClients.filter((item) => {
          return (
            (filters.Single && item.maritalStatus === "Single") ||
            (filters.Married && item.maritalStatus === "Married") ||
            (filters.Divorced && item.maritalStatus === "Divorced")
          );
        });
      }

      if (filters.Unemployed || filters.Employed) {
        filteredClients = filteredClients.filter((item) => {
          return (
            (filters.Unemployed && item.employmentStatus === "Unemployed") ||
            (filters.Employed && item.employmentStatus === "Employed")
          );
        });
      }
    }

    setDataFilteredClient(filteredClients);
    setFilteredClient(filteredClients?.slice(0, 3));
  }, [clients, filters]);

  const handleCheckedClients = (clientId: string, isChecked: boolean) => {
    setCheckedClients((prevCheckedClients) => ({
      ...prevCheckedClients,
      [clientId]: isChecked,
    }));
  };

  const handleSelectAllChange = (isChecked: boolean) => {
    setSelectAll(isChecked);

    const updatedCheckedClients: { [key: string]: boolean } = {};

    if (isChecked) {
      clients?.map((client: IClients) => {
        updatedCheckedClients[client.id] = true;
      });
    }

    setCheckedClients(updatedCheckedClients);
  };

  return (
    <Fragment>
      <section className="mb-5 flex flex-col lg:flex-row lg:items-center gap-6">
        <Search
          clients={clients}
          setDataFilteredClient={setDataFilteredClient}
        />
      </section>

      <section className="overflow-auto">
        <div className="shadow-sm border border-gray-200 rounded-xl w-[1280px] xl:w-full ">
          <div className="grid grid-cols-12 items-center px-6 py-3 text-gray-600 text-xs font-medium bg-gray-50 rounded-t-xl border-b border-gray-200">
            <div className="col-span-6 flex gap-3 items-center">
              <input
                name="allClient"
                type="checkbox"
                checked={selectAll}
                onChange={(e) => handleSelectAllChange(e.target.checked)}
                className="border border-gray-300 h-5 w-5 appearance-none rounded-md relative bg-white checked:bg-[#d1e9ff] hover:bg-[#d1e9ff] checked:border-primary2 hover:border-primary2 checked:bg-[url('/checkmark.png')] bg-center bg-cover cursor-pointer"
              />
              <div>Name</div>
            </div>
            <div className="col-span-1 flex gap-1 cursor-pointer">
              Gender{" "}
              <span>
                <Image src={ArrowUp} alt={"arrow up"} />
              </span>
            </div>
            <div className="col-span-1">DOB</div>
            <div className="col-span-2">Marital Status</div>
            <div className="col-span-2">Employment</div>
          </div>

          {dataFilteredClient?.map((client: IClients) => {
            return (
              <div
                key={client.id}
                className="grid grid-cols-12 items-center px-6 py-4 text-gray-600 text-sm font-normal border-b border-gray-200"
              >
                <div className="col-span-6 flex gap-3 items-center">
                  <input
                    name="client"
                    type="checkbox"
                    checked={checkedClients[client.id] || false}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      handleCheckedClients(client.id, isChecked);
                    }}
                    className="border border-gray-300 h-5 w-5 appearance-none rounded-md relative checked:bg-[#d1e9ff] hover:bg-[#d1e9ff] checked:border-primary2 hover:border-primary2 checked:bg-[url('/checkmark.png')] bg-center bg-cover cursor-pointer"
                  />
                  <Link
                    className="flex items-center gap-3"
                    href={`CRM/${client.name}`}
                  >
                    <Image src={Avatar} alt={"avatar"} />
                    <div className="text-gray-900 font-medium">
                      {client.name}
                    </div>
                  </Link>
                </div>
                <div className="col-span-1">{client.gender}</div>
                <div className="col-span-1">{FormattedDate(client.dob)}</div>
                <div className="col-span-2">{client.maritalStatus}</div>
                <div className="col-span-2">{client.employmentStatus}</div>
              </div>
            );
          })}
          <Pagination
            setPage={setPage}
            Page={page}
            client={isSearch ? dataFilteredClient || [] : clients || []}
            isSearch={isSearchByName}
          />
        </div>
      </section>
    </Fragment>
  );
};

export default Table;
