import React from "react";
import LoggedInNavBar from "../../src/components/LoggedInNavBar/LoggedInNavBar";
import Footer from "../../src/components/Footer/Footer";

export default function Home() {
  const picks = [
    {
      text: "Top 12 Books for 2022",
      link: "https://www.today.com/shop/best-new-books-2022-t244634",
    },
    {
      text: "Top 10 Books for 2021",
      link: "https://time.com/6125901/best-fiction-books-2021/",
    },
    {
      text: "Top 10 Fiction Books for 2020",
      link: "https://time.com/5913197/best-fiction-books-2020/",
    },
    {
      text: "Top 10 Books for 2019",
      link: "https://ew.com/books/2019/12/05/10-best-books-2019/",
    },
    {
      text: "Top Finance Books",
      link: "https://www.investopedia.com/best-finance-books-5093331",
    },
    {
      text: "Top Fiction Books",
      link: "https://www.rd.com/list/best-fiction-books/",
    },
    {
      text: "Top Non-Fiction Books",
      link: "https://www.panmacmillan.com/blogs/general/best-non-fiction-books",
    },
  ];

  return (
    <div className="flex flex-col">
      <LoggedInNavBar />

      <div
        style={{
          width: "50%",
          height: "50%",
          border: "1px solid rgba(0,0,0,0.2)",
          alignSelf: "center",
          marginTop: "5%",
          marginBottom: "5%",
        }}
      >
        <h2 className="text-lg font-medium px-16 py-5">Top Picks</h2>
        <div
          style={{
            textAlign: "left",
            marginLeft: "20%",
            marginTop: "-5%",
            paddingBottom: "5%",
          }}
        >
          {picks.map((obj, index) => {
            return (
              <a
                className="hover:text-green-500"
                onClick={() => window.open(obj.link, "_blank")}
              >
                {index + 1}. {obj.text} <br />
              </a>
            );
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "95%",
        }}
      >
        <Footer />
      </div>
    </div>
  );
}
