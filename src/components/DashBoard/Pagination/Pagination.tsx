import React, { useEffect, useState } from "react";

export default function Pagination(props) {
  const results = props.results;
  const pageNo = props.pageNo;
  const setPageNo = props.setPageNo;
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    let tempNumber = [1, 2, 3, 4, 5, -1, Math.ceil(results / 27)];
    if (Math.ceil(results / 27) <= 7) {
      tempNumber = [];
      for (let i = 1; i <= Math.ceil(results / 27); i++) tempNumber.push(i);
    } else if (pageNo < 5) {
      tempNumber = [1, 2, 3, 4, 5, -1, Math.ceil(results / 27)];
    } else if (pageNo > 4 && pageNo <= Math.ceil(results / 27) - 4)
      tempNumber = [
        1,
        -1,
        pageNo - 1,
        pageNo,
        pageNo + 1,
        -1,
        Math.ceil(results / 27),
      ];
    else if (pageNo > Math.ceil(results / 27) - 4)
      tempNumber = [
        1,
        -1,
        Math.ceil(results / 27) - 4,
        Math.ceil(results / 27) - 3,
        Math.ceil(results / 27) - 2,
        Math.ceil(results / 27) - 1,
        Math.ceil(results / 27),
      ];
    setPageNumbers(tempNumber);
    // console.log(tempNumber);
  }, [pageNo, results]);

  return (
    <div className="" style={{ paddingBottom: "1rem" }}>
      {/* <div className="col-span-1" /> */}
      {/* <div className="col-span-1" /> */}
      {/* <p style={{ textAlign: "center", marginRight: "5%", paddingTop: "3%" }}>
        Pages
      </p> */}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <a
          className="page-link"
          onClick={() => {
            window.scrollTo(0, 0);
            setPageNo((pageNo) => (pageNo > 1 ? pageNo - 1 : pageNo));
          }}
          style={{ color: "black", borderRadius: "10px" }}
        >
          &laquo;
        </a>
        {pageNumbers.map((number) => {
          if (number == -1) return <h6 style={{ paddingTop: "1%" }}>.....</h6>;
          return (
            <a
              className="page-link"
              onClick={() => {
                window.scrollTo(0, 0);
                setPageNo(number);
              }}
              style={{ color: "black", borderRadius: "10px" }}
            >
              {number == pageNo ? (
                <h6 style={{ textDecoration: "underline" }}>{number}</h6>
              ) : (
                number
              )}
            </a>
          );
        })}
        <a
          className="page-link"
          onClick={() => {
            window.scrollTo(0, 0);
            setPageNo((pageNo) =>
              pageNo < Math.ceil(results / 27) ? pageNo + 1 : pageNo
            );
          }}
          style={{ color: "black", borderRadius: "10px" }}
        >
          &raquo;
        </a>
      </div>
    </div>
  );
}
