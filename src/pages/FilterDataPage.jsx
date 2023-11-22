import React from "react";
import Navbar from "../organisms/Navbar";

export default function FilterDataPage() {
  const data = {
    status: 1,
    message: "Sukses",
    data: {
      system_message: "SUCCESS",
      response: {
        additionaldata: {},
        billdetails: [
          {
            adminfee: "0.0",
            billid: "8",
            currency: "360",
            life: "TELKOMESL 50rb - 50.149",
            totalamount: "50149.00",
            descriptions: null,
            body: ["DENOM : 50000"],
          },
          {
            adminfee: "0.0",
            billid: "9",
            currency: "360",
            life: "TELKOMESL 75rb - 74.050",
            totalamount: "74050.00",
            descriptions: null,
            body: ["DENOM : 75000"],
          },
          {
            adminfee: "0.0",
            billid: "10",
            currency: "360",
            life: "TELKOMESL 100rb - 98.264",
            totalamount: "98264.00",
            descriptions: null,
            body: ["DENOM : 100000"],
          },
          {
            adminfee: "0.0",
            billid: "10",
            currency: "360",
            life: "TELKOMESL 150rb - 146.600",
            totalamount: "146600.00",
            descriptions: null,
            body: ["DENOM : 150000"],
          },
          {
            adminfee: "0.0",
            billid: "10",
            currency: "360",
            life: "TELKOMESL 200rb - 194.900",
            totalamount: "194900.00",
            descriptions: null,
            body: ["DENOM : 200000"],
          },
        ],
        billername: "PULSA TSEL",
        inquiryid: "27190993",
        paymenttype: "CLOSE_PAYMENT",
        responsecode: "0000",
        responsemsg: "SUCCESS",
        subscriberid: "081311529594",
        subscribername: "",
      },
      trace: {
        session_id: "81215AEFADFB710C1258F79ABA1AD710.node3",
        request_date_time: "201990704185319",
        words: "17281672981689163891",
        biller_id: "9900002",
        account_number: "081311529594",
        systrace: 1564026434,
        inquiry_id: "27190993",
      },
    },
  };

  const filteredData = data.data.response.billdetails
    .filter((item) => {
      // Filter hanya elemen dengan denom >= 100000
      return parseInt(item.body[0].split("DENOM : ")[1]) >= 100000;
    })
    .map((item) => {
      // Ambil nilai denom dari elemen yang telah difilter
      return parseInt(item.body[0].split("DENOM : ")[1]);
    });

  return (
    <>
      <Navbar />
      <div className="max-w-lg m-auto">
        <h1 className="font-bold text-center text-2xl">Filter Data</h1>
        <br />
        <h3>Data sebelum di filter :</h3>
        {data.data.response.billdetails.map((data) => (
          <p>{data.body}</p>
        ))}
        <br />
        <h3>Data sesudah di filter: </h3>
        <p>[{filteredData.join(", ")}]</p>
      </div>
    </>
  );
}
