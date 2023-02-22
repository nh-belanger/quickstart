import React, { useContext } from "react";

import Endpoint from "../Endpoint/index";
import Context from "../../Context";
import ProductTypesContainer from "./ProductTypesContainer";
import {
  transactionsCategories,
  authCategories,
  identityCategories,
  balanceCategories,
  investmentsCategories,
  investmentsTransactionsCategories,
  liabilitiesCategories,
  paymentCategories,
  assetsCategories,
  incomePaystubsCategories,
  transferCategories,
  transformAuthData,
  transformTransactionsData,
  transformBalanceData,
  transformInvestmentsData,
  transformInvestmentTransactionsData,
  transformLiabilitiesData,
  transformIdentityData,
  transformPaymentData,
  transformAssetsData,
  transformTransferData,
  transformIncomePaystubsData,
} from "../../dataUtilities";



const Products = () => {
  const { products } = useContext(Context);
  return (
    <ProductTypesContainer productType="Products">
      {products.includes("transactions") && (
        <Endpoint
          endpoint="transactions"
          name="Transactions"
          categories={transactionsCategories}
          schema="/transactions/get/"
          description="Retrieve transactions or incremental updates for credit and depository accounts."
          transformData={transformTransactionsData}
        />
      )}
    </ProductTypesContainer>
  );
};


// const Products = () => {
//   const { products } = useContext(Context);
//   return (
//     <ProductTypesContainer productType="Products">
//       {products.includes("transactions") && (
//         <Endpoint
//           endpoint="transactions"
//           name="Transactions"
//           categories={transactionsCategories}
//           schema="/transactions/sync/"
//           description="Retrieve transactions or incremental updates for credit and depository accounts."
//           transformData={transformTransactionsData}
//         />
//       )}
//     </ProductTypesContainer>
//   );
// };

Products.displayName = "Products";

export default Products;
