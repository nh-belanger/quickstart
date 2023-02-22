import React, { useState } from "react";
import Button from "plaid-threads/Button";
import Note from "plaid-threads/Note";

import Table from "../Table";
import Error from "../Error";
import { DataItem, Categories, ErrorDataItem, Data } from "../../dataUtilities";

import styles from "./index.module.scss";
import { TransactionsGetRequest } from "plaid";

interface Props {
  endpoint: string;
  name?: string;
  categories: Array<Categories>;
  schema: string;
  description: string;
  transformData: (arg: any) => Array<DataItem>;
}

const Endpoint = (props: Props) => {
  const [showTable, setShowTable] = useState(false);
  const [transformedData, setTransformedData] = useState<Data>([]);
  const [pdf, setPdf] = useState<string | null>(null);
  const [error, setError] = useState<ErrorDataItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    // const params = {start_date: '2023-01-25', end_date: '2023-01-27'}
    console.log("sending request")
    const response = await fetch(`/api/transactions`, { method: "GET" });
    const data = await response.json();
    if (data.error != null) {
      setError(data.error);
      setIsLoading(false);
      return;
    }
    console.log("here comes the data")
    console.log(data)
    setTransformedData(props.transformData(data)); // transform data into proper format for each individual product
    if (data.pdf != null) {
      setPdf(data.pdf);
    }
    setShowTable(true);
    setIsLoading(false);
  };

  

  // const getData = async () => {
  //   setIsLoading(true);
  //   const response = await fetch(`/api/transactions`, { method: "GET" });
  //   // const response = await fetch(``, { method: "GET" });
  //   const data = await response.json();
  //   if (data.error != null) {
  //     setError(data.error);
  //     setIsLoading(false);
  //     return;
  //   }
  //   setTransformedData(props.transformData(data)); // transform data into proper format for each individual product
  //   console.log(transformedData)
  //   if (data.pdf != null) {
  //     setPdf(data.pdf);
  //   }
  //   setShowTable(true);
  //   setIsLoading(false);
  // };

  return (
    <>
      <div className={styles.endpointContainer}>
        {/* <Note info className={styles.post}>
          POST
        </Note> */}
        {/* <div className={styles.endpointContents}>
          <div className={styles.endpointHeader}>
            {props.name != null && (
              <span className={styles.endpointName}>{props.name}</span>
            )}
            <span className={styles.schema}>{props.schema}</span>
          </div>
          <div className={styles.endpointDescription}>{props.description}</div>
        </div> */}
        <div className={styles.buttonsContainer}>
          <Button
            large
            centered
            wide
            secondary
            className={styles.sendRequest}
            onClick={getData}
          >
            {isLoading ? "Loading..." : `Get Results`}
          </Button>
        </div>
      </div>
      {showTable && (
        <Table
          categories={props.categories}
          data={transformedData}
          isIdentity={props.endpoint === "identity"}
        />
      )}
      {error != null && <Error error={error} />}
    </>
  );
};

Endpoint.displayName = "Endpoint";

export default Endpoint;
