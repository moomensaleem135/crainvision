"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { StatCard } from "../../components/stat-card"
import { customerColumns, type Customer } from "../../components/customer-table-columns"
import { GroupedTable } from "../../components/reusable-grouped-table"
import { CustomerDetailsDrawer } from "../../components/customer-details-drawer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { AddNoteModal } from "../../components/addNoteModal"

export default function CIPDashboardContainer() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedCustomerNumber, setSelectedCustomerNumber] = useState<string | null>(null)
  const [customerDetails, setCustomerDetails] = useState<any>(null)
  const [customerDetailsLoading, setCustomerDetailsLoading] = useState(false)
  const [noteModalOpen, setNoteModalOpen] = useState(false)
const [noteCustomerNumber, setNoteCustomerNumber] = useState<string | null>(null)

  const [accountFilter, setAccountFilter] = useState("payoff")

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await axios.get("/api/cip/customers", {
          params: {
            accountType: accountFilter === "all" ? "all" : accountFilter,
          },
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 20000 
        })

        console.log("API Response:", response.data)

        if (response.data && response.data.customers && Array.isArray(response.data.customers)) {
          console.log("Found customers:", response.data.customers.length)
          setCustomers(response.data.customers)
        } else {
          console.error("Unexpected response format:", response.data)
          throw new Error(`Invalid response format. Expected {customers: []}, got: ${JSON.stringify(response.data)}`)
        }
      } catch (err: any) {
        console.error("Full error object:", err)

        if (err.response) {
          if (err.response.status === 401) {
            setError("Authentication failed. Please log in again.")
          } else if (err.response.status === 404) {
            setError("API endpoint not found.")
          } else if (err.response.status >= 500) {
            setError("Server error. Please try again later.")
          } else {
            setError(`Request failed: ${err.response?.data?.message || err.message}`)
          }
        } else if (err.request) {
          setError("No response from server. Please check your connection.")
        } else if (err.code === "ECONNABORTED") {
          setError("Request timed out. Please try again.")
        } else {
          setError(`Request failed: ${err.message}`)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCustomers()
  }, [accountFilter])

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<string>
      openNoteModal(customEvent.detail)
    }
  
    window.addEventListener("open-note-modal", handler)
    return () => window.removeEventListener("open-note-modal", handler)
  }, [])
  

  const fetchCustomerDetails = async (customerNumber: string) => {
    try {
      setCustomerDetailsLoading(true)
      const response = await axios.get(`/api/cip/customers/${customerNumber}`, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 20000 
      })
      setCustomerDetails(response.data)
    } catch (err: any) {
      console.error("Failed to fetch customer details:", err)
      setCustomerDetails(null)
    } finally {
      setCustomerDetailsLoading(false)
    }
  }

  const openNoteModal = (customerNumber: string) => {
    setNoteCustomerNumber(customerNumber)
    setNoteModalOpen(true)
  }

  const handleRowClick = (row: any) => {
    if (!row.getIsGrouped()) {
      const customerNumber = row.original.customerNumber
      console.log("Customer clicked:", row.original)
      setSelectedCustomerNumber(customerNumber)
      setDrawerOpen(true)
      fetchCustomerDetails(customerNumber)
    }
  }

  const handleRetry = () => {
    window.location.reload()
  }

  // Calculate stats from actual customers data
  // const totalAmount = customers.reduce((sum, customer) => sum + customer.amount, 0)
  // const totalDays1To7 = customers.reduce((sum, customer) => sum + customer.days1To7, 0)
  // const totalDays8To14 = customers.reduce((sum, customer) => sum + customer.days8To14, 0)
  // const totalDays15Plus = customers.reduce((sum, customer) => sum + customer.days15Plus, 0)

  return (
    <div className="flex min-h-screen flex-col">
      <AddNoteModal
  isOpen={noteModalOpen}
  customerNumber={noteCustomerNumber}
  onClose={() => setNoteModalOpen(false)}
/>

      <main className="flex-1 p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-brand">CIT Dashboard</h1>
          <p className="text-base text-muted-foreground">
            Customer Information Portal - Track and manage customer data
          </p>
        </div>

        {/* <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Customers"
            value={customers.length.toString()}
            icon={"/svgs/people.svg"}
            percentChange={5.2}
            previousPeriod="Previous month"
            valueColor="text-brand"
            height={40}
            width={40}
          />
          <StatCard
            title="Total Amount"
            value={formatCurrency(totalAmount)}
            icon={"/svgs/doller.svg"}
            percentChange={8.7}
            previousPeriod="Previous month"
            valueColor="text-brand"
            height={28}
            width={28}
          />
          <StatCard
            title="1-7 Days"
            value={formatCurrency(totalDays1To7)}
            icon={"/svgs/gross.svg"}
            percentChange={-3.2}
            previousPeriod="Previous month"
            valueColor="text-brand"
            height={30}
            width={30}
          />
          <StatCard
            title="15+ Days"
            value={formatCurrency(totalDays15Plus)}
            icon={"/svgs/home.svg"}
            percentChange={12.5}
            previousPeriod="Previous month"
            valueColor="text-brand"
            height={35}
            width={35}
          />
        </div> */}
        <div className="flex justify-between items-center">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-brand">Customer Information</h2>
            <p className="text-sm text-muted-foreground text-brand">Click on a dealer row to expand and view customers</p>
          </div>
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <div className="space-y-2">
                <Label htmlFor="account-filter">Account Type</Label>
                <Select value={accountFilter} onValueChange={setAccountFilter}>
                  <SelectTrigger id="account-filter" className="w-[200px]">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Select all</SelectItem>
                    <SelectItem value="cit">CIT</SelectItem>
                    <SelectItem value="cash-down">Cash Down</SelectItem>
                    <SelectItem value="customer-deposit">Customer Deposit</SelectItem>
                    <SelectItem value="payoff">Payoff</SelectItem>
                    <SelectItem value="sales-tax">Sales Tax</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
            <span className="ml-2">Loading customer data...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="text-red-800 font-medium">Error loading data</div>
            <div className="text-red-600 text-sm mt-1">{error}</div>
            <button
              onClick={handleRetry}
              className="mt-2 px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200"
            >
              Retry
            </button>
          </div>
        ) : customers.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">No customer data available</div>
        ) : (
          <GroupedTable data={customers} columns={customerColumns} groupBy="dealerName" onRowClick={handleRowClick} />
        )}
        <CustomerDetailsDrawer
          isOpen={drawerOpen}
          onClose={() => {
            setDrawerOpen(false)
            setSelectedCustomerNumber(null)
            setCustomerDetails(null)
          }}
          customerDetails={customerDetails}
          loading={customerDetailsLoading}
        />
      </main>
    </div>
  )
}
