//@ts-ignore
import { transformData } from "eai-nodejs";

export const getShopifyExpression = async (data: any) => {
  //change the expression based on the myob configuration here
  const jsonataExpression = `{
      "id":id,
       "new_checkout_id": checkout_id
       }`;

  const transformedData = await transformData(data, jsonataExpression);
  const expression = {
    //other metadata
    data: {
      ...transformedData,
    },
  };
  return expression;
};
