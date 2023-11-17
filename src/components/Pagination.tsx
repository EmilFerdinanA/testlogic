import Image from "next/image";
import arrowLeft from "@/assets/arrow-left.svg";
import arrowRight from "@/assets/arrow-right.svg";
import { IClients } from "@/constant/type";

interface PaginationProps {
  Page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  client: IClients[];
  isSearch: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  Page,
  setPage,
  client,
  isSearch,
}) => {
  const pages = [];

  for (let i = 0; i <= 10; i++) {
    pages.push(i);
  }

  const leftPagination = pages.slice(
    Page <= 2 ? 1 : Page - 1,
    Page <= 2 ? 4 : Page + 2
  );
  const RightPagination = pages.slice(pages.length - 3, pages.length);

  const handlePrevPage = () => {
    if (Page === 1 || client.length === 0) {
      return;
    }
    setPage(Page - 1);
  };

  const handleNextPage = () => {
    if (
      Math.ceil(client.length / 3) === Page ||
      client.length === 0 ||
      isSearch
    ) {
      return;
    }
    setPage(Page + 1);
  };

  const handleClickPage = (page: number) => {
    if (page <= Math.ceil(client.length / 3) && !isSearch) {
      setPage(page);
    }
    return;
  };

  return (
    <section className="rounded-t-xl flex items-center justify-between px-6 py-3">
      <button
        disabled={true}
        // disabled={Page === 1 || isSearch}
        onClick={handlePrevPage}
        className="border border-gray-300 shadow rounded-lg px-3 py-2 flex items-center disabled:opacity-50"
      >
        <Image src={arrowLeft} alt={"arrowLeft"} />
        <span>Previous</span>
      </button>

      <div className="text-sm font-medium text-gray-600 flex items-center gap-1">
        {leftPagination.map((pages) => (
          <div
            key={pages}
            onClick={() => handleClickPage(pages)}
            className={`${
              pages > Math.ceil(client.length / 3) || isSearch
                ? "opacity-50 cursor-auto"
                : ""
            } h-10 w-10 rounded-lg flex items-center justify-center cursor-pointer
            ${Page === pages && "bg-gray-50"}`}
          >
            {pages}
          </div>
        ))}

        <div className="opacity-50">...</div>

        {RightPagination.map((e) => (
          <div
            key={e}
            className="h-10 w-10 rounded-lg flex items-center justify-center opacity-50"
          >
            {e}
          </div>
        ))}
      </div>

      <button
        disabled={true}
        // disabled={Math.ceil(client.length / 3) === Page || isSearch}
        onClick={handleNextPage}
        className="border border-gray-300 shadow rounded-lg px-3 py-2 flex items-center disabled:opacity-50"
      >
        <span>Next</span>
        <Image src={arrowRight} alt={"arrowRight"} />
      </button>
    </section>
  );
};

export default Pagination;
