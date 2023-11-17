// components/Search.tsx

import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { IClients } from "@/constant/type";
import search from "@/assets/search.svg";
import dayjs from "dayjs";

interface SearchProps {
  clients: IClients[] | undefined;
  setDataFilteredClient: Dispatch<SetStateAction<IClients[] | undefined>>;
}

const initialFilter = [
  {
    column: "name",
    comparisonOperator: "include",
    value: "",
    endDate: "",
  },
];

const Search: React.FC<SearchProps> = ({ clients, setDataFilteredClient }) => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [filters, setFilters] = useState(initialFilter);

  const toggleDropdown = () => setDropdownMenu(!dropdownMenu);

  const addFilter = () => {
    setFilters([
      ...filters,
      {
        column: "name",
        comparisonOperator: "include",
        value: "",
        endDate: "",
      },
    ]);
  };

  const removeFilter = (index: number) => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    const updatedFilters = [...filters];
    updatedFilters[index] = {
      ...updatedFilters[index],
      [name]: value,
    };
    setFilters(updatedFilters);
  };

  const applyFilters = (filters: any) => {
    const filteredData = clients?.filter((item: any) => {
      return filters.every((filter: any) => {
        const { column, comparisonOperator, value, endDate } = filter;

        const itemDate = dayjs(item[column]).format("YYYY-MM-DD");
        const filterDate = dayjs(value).format("YYYY-MM-DD");

        if (comparisonOperator === "include") {
          if (
            item[column].toLowerCase() === "male" ||
            item[column].toLowerCase() === "female"
          ) {
            return item[column].toLowerCase() === value.toLowerCase();
          }
          return item[column].toLowerCase().includes(value.toLowerCase());
        }

        if (comparisonOperator === "exclude") {
          if (
            item[column].toLowerCase() === "male" ||
            item[column].toLowerCase() === "female"
          ) {
            return item[column].toLowerCase() !== value.toLowerCase();
          }
          return !item[column].toLowerCase().includes(value.toLowerCase());
        }

        if (comparisonOperator === "start") {
          return item[column].toLowerCase().startsWith(value.toLowerCase());
        }

        if (comparisonOperator === "notStart") {
          return !item[column].toLowerCase().startsWith(value.toLowerCase());
        }

        if (comparisonOperator === "end") {
          return item[column].toLowerCase().endsWith(value.toLowerCase());
        }

        if (comparisonOperator === "notEnd") {
          return !item[column].toLowerCase().endsWith(value.toLowerCase());
        }

        if (comparisonOperator === "dates") {
          return itemDate === filterDate;
        }

        if (comparisonOperator === "notDate") {
          return itemDate !== filterDate;
        }

        if (comparisonOperator === "less") {
          return itemDate < filterDate;
        }

        if (comparisonOperator === "more") {
          return itemDate > filterDate;
        }

        if (comparisonOperator === "lessEqual") {
          return itemDate <= filterDate;
        }

        if (comparisonOperator === "moreEqual") {
          return itemDate >= filterDate;
        }

        if (comparisonOperator === "range") {
          const start = dayjs(value).format("YYYY-MM-DD");
          const end = dayjs(endDate).format("YYYY-MM-DD");

          return itemDate >= start && itemDate <= end;
        }

        return false;
      });
    });

    return filteredData;
  };

  const handleSubmit = () => {
    const filteredData = applyFilters(filters);
    setDataFilteredClient(filteredData);
  };

  const handleReset = () => {
    setFilters(initialFilter);
    setDataFilteredClient(clients);
  };

  return (
    <section className="relative w-full sm:w-80">
      {dropdownMenu && (
        <div
          onClick={toggleDropdown}
          className="fixed h-screen w-screen top-0 left-0 z-20"
        />
      )}

      <div className="flex gap-2 relative items-center cursor-pointer">
        <Image src={search} alt={"search"} className="absolute left-3" />
        <div
          onClick={toggleDropdown}
          className={`w-full sm:w-80 border border-gray-300 font-normal text-base outline-none rounded-lg shadow py-3 px-4 pl-10 z-20 ${
            dropdownMenu && "outline-[#84caff] ring-8 ring-[#f4ebff]"
          }`}
        >
          <div className="text-gray-500">Search</div>
        </div>
      </div>

      {dropdownMenu && (
        <div className="absolute bg-gray-50 shadow-xl z-50 mt-3 p-10 w-[60rem] rounded-2xl flex flex-col gap-4">
          {filters.map((filter, index) => (
            <div className="grid grid-cols-5 gap-4" key={index}>
              <select
                className="bg-white rounded-2xl col-span-1"
                name="column"
                value={filter.column}
                onChange={(e) => handleChange(index, e)}
              >
                <option value="name">Name</option>
                <option value="gender">Gender</option>
                <option value="dob">DOB</option>
                <option value="maritalStatus">Marital Status</option>
                <option value="employmentStatus">Employment</option>
              </select>

              {filter.column !== "dob" && (
                <select
                  className="bg-white rounded-2xl col-span-1"
                  name="comparisonOperator"
                  value={filter.comparisonOperator}
                  onChange={(e) => handleChange(index, e)}
                >
                  <option value="include">Include</option>
                  <option value="exclude">Exclude</option>
                  <option value="start">Start With</option>
                  <option value="notStart">Not Start With</option>
                  <option value="end">End With</option>
                  <option value="notEnd">Not End With</option>
                </select>
              )}

              {filter.column === "dob" && (
                <select
                  className="bg-white rounded-2xl col-span-1"
                  name="comparisonOperator"
                  value={filter.comparisonOperator}
                  onChange={(e) => handleChange(index, e)}
                >
                  <option value="dates">Date</option>
                  <option value="notDate">Not Dated</option>
                  <option value="less">Less Than</option>
                  <option value="more">More Than</option>
                  <option value="lessEqual">Less Than Equal</option>
                  <option value="moreEqual">More Than Equal</option>
                  <option value="range">Range</option>
                </select>
              )}

              {filter.column !== "dob" && (
                <input
                  className="rounded-2xl px-4 col-span-2"
                  type="text"
                  name="value"
                  value={filter.value}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Enter value"
                />
              )}

              {filter.column === "dob" && (
                <div className="flex gap-6 col-span-2">
                  <input
                    className={`rounded-2xl px-4 ${
                      filter.comparisonOperator !== "range" && "w-full"
                    }`}
                    type="date"
                    name="value"
                    value={filter.value}
                    onChange={(e) => handleChange(index, e)}
                  />

                  {filter.comparisonOperator === "range" && (
                    <input
                      className="rounded-2xl px-4"
                      type="date"
                      name="endDate"
                      value={filter.endDate}
                      onChange={(e) => handleChange(index, e)}
                    />
                  )}
                </div>
              )}

              <button
                className="rounded-2xl px-4 py-2  text-red-700 border border-red-700  font-bold col-span-1 hover:bg-red-300"
                type="button"
                onClick={() => removeFilter(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex gap-4">
            <button
              className="rounded-2xl p-2 w-1/6 border border-blue-500 text-blue-500  font-bold hover:bg-blue-200"
              type="button"
              onClick={addFilter}
            >
              Add
            </button>

            <button
              className="rounded-2xl p-2 w-1/6  border border-green-600 text-green-600 font-bold hover:bg-green-200"
              type="button"
              onClick={handleSubmit}
            >
              Apply
            </button>

            <button
              className="rounded-2xl p-2 w-1/6  text-red-700 border border-red-700 font-bold hover:bg-red-200"
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Search;
