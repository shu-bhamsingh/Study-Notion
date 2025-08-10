import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { formatDate } from '../../../services/formatDate'
import { apiConnector } from '../../../services/apiconnector'
import { studentEndpoints } from '../../../services/apis'

const PurchaseHistory = () => {
  const { token } = useSelector((state) => state.auth)
  const [purchaseHistory, setPurchaseHistory] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch real payment history from the API
  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      setLoading(true)
      try {
        const response = await apiConnector(
          "GET", 
          studentEndpoints.PAYMENT_HISTORY_API, 
          null, 
          {
            Authorization: `Bearer ${token}`
          }
        )
        
        console.log("Payment history response:", response)
        
        if (response?.data?.success) {
          // Format the payment history data for display
          const formattedHistory = response.data.data.map(payment => {
            // Each payment may contain multiple courses
            return payment.courses.map(course => ({
              _id: payment._id,
              courseName: course.courseName,
              thumbnail: course.thumbnail,
              price: course.price,
              purchaseDate: payment.createdAt,
              paymentId: payment.razorpay_payment_id
            }))
          }).flat() // Flatten the array of arrays
          
          setPurchaseHistory(formattedHistory)
        } else {
          setPurchaseHistory([])
        }
      } catch (error) {
        console.error("Error fetching purchase history:", error)
        setPurchaseHistory([])
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchPurchaseHistory()
    }
  }, [token])

  return (
    <div className="text-white">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">Purchase History</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <div className="spinner"></div>
        </div>
      ) : purchaseHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] gap-3">
          <p className="text-2xl text-richblack-5">No purchase history found</p>
          <p className="text-richblack-300">You haven't purchased any courses yet</p>
        </div>
      ) : (
        <div className="my-8 text-richblack-5">
          <Table className="rounded-xl border border-richblack-800 bg-richblack-900">
            <Thead>
              <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                  Course
                </Th>
                <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                  Date
                </Th>
                <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                  Amount
                </Th>
                <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                  Payment ID
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {purchaseHistory.map((course, i) => (
                <Tr
                  key={i}
                  className="flex gap-x-10 border-b border-richblack-800 px-6 py-8 last:border-none"
                >
                  <Td className="flex flex-1 gap-x-4">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-[148px] w-[220px] rounded-lg object-cover"
                    />
                    <div className="flex flex-col justify-between">
                      <p className="text-lg font-semibold text-richblack-5">
                        {course.courseName}
                      </p>
                    </div>
                  </Td>
                  <Td className="text-sm font-medium text-richblack-100">
                    {formatDate(course.purchaseDate)}
                  </Td>
                  <Td className="text-sm font-medium text-richblack-100">
                    ₹{course.price}
                  </Td>
                  <Td className="text-sm font-medium text-richblack-100">
                    {course.paymentId}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default PurchaseHistory