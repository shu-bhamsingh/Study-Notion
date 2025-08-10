import {toast} from "react-hot-toast"
import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';

export const getCatalogaPageData = async(categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = {
    success: true,
    selectedCourses: { course: [] },
    differentCourses: { course: [] },
    mostSellingCourses: [],
    name: "",
    description: ""
  };
  
  try {
    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, 
      {categoryId: categoryId});
    
    if(response?.data?.success) {
      result = response?.data;
    } else {
      console.log("No data found for this category");
    }
  }
  catch(error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    // Don't show toast error to user
    // Instead, return a valid structure with empty data
  }
  
  toast.dismiss(toastId);
  return result;
}

