import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import config from "../../config";
import makeRequest from "../../axios";
import DetailTile from "../../src/components/DetailTile/DetailTile";
import Link from "next/link";
import LoggedInNavBar from "../../src/components/LoggedInNavBar/LoggedInNavBar";
import DashBoard from "../../src/components/DashBoard/DashBoard";
import { isNumber } from "util";
import { Spinner } from "react-bootstrap";
// const { url } = config;
// const { key } = config;

// const initialFilter = [
//   {
//     id: "binding",
//     name: "Binding",
//     options: [
//       { value: "Hardcover", label: "Hardcover", checked: false },
//       { value: "Paperback", label: "Paperback", checked: false },
//     ],
//   },
//   {
//     id: "year",
//     name: "Year",
//     options: [],
//   },
//   {
//     id: "lang",
//     name: "Language",
//     options: [],
//   },
//   {
//     id: "author",
//     name: "Author",
//     options: [],
//   },
//   {
//     id: "publisher",
//     name: "Publisher",
//     options: [],
//   },
// ];

export default function Home() {
  const router = useRouter();
  const { search } = router.query;
  const [total, setTotal] = useState();
  const [res, setRes] = useState([]);
  const [newfilter, setNewfilter] = useState([]);

  let requestURL = "https://api2.isbndb.com/" + `books/${search}?pageSize=1000`;
  let requestIsbnURL = "https://api2.isbndb.com/" + `book/${search}`;
  // let headers = {
  //   "Content-Type": "application/json",
  //   Authorization: "46306_ff3665e78e98ea2774e3394d0fd99d5a",
  // };
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "46306_ff3665e78e98ea2774e3394d0fd99d5a");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  myHeaders.append(
    "Access-Control-Allow-Methods",
    "DELETE, POST, GET, OPTIONS"
  );
  myHeaders.append(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  useEffect(() => {
    if (search) {
      setRes([]);
      let getBooks = async () => {
        // fetch(requestURL, requestOptions)
        //   .then((response) => {
        //     if (!response.ok) {
        //       throw Error("ERROR");
        //     }
        //     return response.json();
        //   })
        //   .then((data) => console.log("data", data))
        //   .catch((error) => {
        //     console.log("error", error);
        //   });
        // console.log(/^\d+$/.test(search));
        const res = await makeRequest(
          /^\d+$/.test(search) ? requestIsbnURL : requestURL,
          "GET"
        );
        // @ts-ignore
        console.log(res);
        if (/^\d+$/.test(search)) {
          if (res.data.book) {
            setRes([res.data.book]);
            setNewfilter([res.data.book]);
          } else setRes(undefined);
        } else {
          if (res.data.books) {
            setRes(res.data.books);
            setNewfilter(res.data.books);
            setTotal(res.data.total);
          } else {
            setRes(undefined);
            setTotal(0);
          }
        }
      };
      getBooks();
    }
  }, [search]);

  return (
    <div className="bg-gray-50 overflow-hidden">
      {/* <h1>DashBoard</h1> */}

      {res == undefined ? (
        <h1>No Results Found</h1>
      ) : res.length !== 0 ? (
        <div className="mt-0">
          <LoggedInNavBar />
          <DashBoard
            books={res}
            searchString={search}
            searchResults={total}
            newfilter={newfilter}
            setNewfilter={setNewfilter}
          />
        </div>
      ) : (
        <div className="grid place-items-center h-screen">
          <Spinner animation="grow" variant="success">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
}
