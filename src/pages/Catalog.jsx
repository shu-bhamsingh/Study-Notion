import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { getCatalogaPageData } from "../services/operations/pageAndComponentData";
import CourseCard from "../components/core/Catalog/CourseCard";
import CourseSlider from "../components/core/Catalog/CourseSlider";
// import { useSelector } from 'react-redux';

const Catalog = () => {
  const { catalogName } = useParams();

  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState(1);
  const [loading, setLoading] = useState(false);
  //Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const res = await apiConnector("GET", categories.CATEGORIES_API);

      const category_id = res?.data?.data?.filter(
        (ct) =>
          ct.name.split(" ").join("-").toLowerCase() ===
          catalogName.split(" ").join("-").toLowerCase()
      )[0]._id;

      setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      setLoading(true);
      try {
        const res = await getCatalogaPageData(categoryId);
        // console.log("PRinting res: ", res);
        if (res.success) {
          setCatalogPageData(res);
        } else {
          setCatalogPageData(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  useEffect(() => {
    //   console.log("catalogPageData?.selectedCourses.course.length", catalogPageData?.selectedCourses.course.length)
    //   console.log("catalogPageData?.differentCourses.course.length", catalogPageData?.differentCourses.course.length)
    //     console.log("catalogPageData?.mostSellingCourses.length ",catalogPageData?.mostSellingCourses.length)
  }, [catalogPageData]);

  if (loading) {
    return (
      <div className=" h-screen flex justify-center items-center text-richblack-100 mx-auto  text-3xl">
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <>
        {/* Always render content, with appropriate fallbacks */}
        {(
          <>
            <div className=" box-content bg-richblack-800 px-4">
              <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                <p className="text-sm text-richblack-300">
                  {`Home / Catalog / `}
                  <span className="text-yellow-25">
                    {catalogPageData?.name}
                  </span>
                </p>
                <p className="text-3xl text-richblack-5">
                  {" "}
                  {catalogPageData?.name}{" "}
                </p>
                <p className="max-w-[870px] text-richblack-200">
                  {" "}
                  {catalogPageData?.description}
                </p>
              </div>
            </div>

            <div>
              {/* section1 */}
              <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading">
                  Courses to get you started
                </div>
                <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                  <p
                    className={`px-4 py-2 ${
                      active === 1
                        ? "border-b border-b-yellow-25 text-yellow-25"
                        : "text-richblack-50"
                    } cursor-pointer`}
                    onClick={() => setActive(1)}
                  >
                    Most Populer
                  </p>
                  <p
                    className={`px-4 py-2 ${
                      active === 2
                        ? "border-b border-b-yellow-25 text-yellow-25"
                        : "text-richblack-50"
                    } cursor-pointer`}
                    onClick={() => setActive(2)}
                  >
                    New
                  </p>
                </div>
                <div>
                  {catalogPageData?.selectedCourses?.course?.length > 0 ? (
                    <CourseSlider
                      Courses={catalogPageData?.selectedCourses.course}
                    />
                  ) : (
                    <div className="min-h-[150px] flex flex-col items-center justify-center text-richblack-5">
                      <p className="text-lg font-semibold">No courses available in this category yet</p>
                      <p className="text-richblack-300 mt-1">Please check back later or explore other categories</p>
                    </div>
                  )}
                </div>
              </div>

              {/* section2 */}
              {catalogPageData?.differentCourses?.name && (
                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                  <div className="section_heading">
                    Checkout {catalogPageData?.differentCourses.name} Courses Also
                  </div>
                  <div className="py-8">
                    <CourseSlider
                      Courses={catalogPageData?.differentCourses?.course || []}
                    />
                  </div>
                </div>
              )}

              {/* section3 */}
              <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading">Most Popular Courses</div>
                <div className="py-8">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {!catalogPageData?.mostSellingCourses || catalogPageData?.mostSellingCourses.length === 0 ? (
                      <div className="col-span-2 min-h-[250px] flex flex-col items-center justify-center text-richblack-5 bg-richblack-800 rounded-xl p-5">
                        <p className="text-lg font-semibold">No popular courses available at the moment</p>
                        <p className="text-richblack-300 mt-1">Be the first to enroll in a course from this category!</p>
                      </div>
                    ) : (
                      catalogPageData?.mostSellingCourses
                        ?.slice(0, 4)
                        .map((course, index) => (
                          <CourseCard
                            course={course}
                            key={index}
                            Height={"h-[400px]"}
                          />
                        ))
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </>
        )}
      </>
    );
  }
};

export default Catalog;
