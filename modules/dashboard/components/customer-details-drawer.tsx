"use client"

import React, { useState } from "react"
import { X, Plus, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface CustomerDetailsProps {
  isOpen: boolean
  onClose: () => void
  customerDetails: any
  loading: boolean
}

export function CustomerDetailsDrawer({ isOpen, onClose, customerDetails, loading }: CustomerDetailsProps) {
  const [showAddNote, setShowAddNote] = useState(false)
  const [newNote, setNewNote] = useState("")
  const [expandedDeals, setExpandedDeals] = useState<Set<string>>(new Set())

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "-"
    return new Date(dateString).toLocaleDateString()
  }

  const handleAddNote = () => {
    // TODO: Implement add note API call
    console.log("Adding note:", newNote)
    setNewNote("")
    setShowAddNote(false)
  }

  const toggleDealExpansion = (dealNumber: string) => {
    const newExpanded = new Set(expandedDeals)
    if (newExpanded.has(dealNumber)) {
      newExpanded.delete(dealNumber)
    } else {
      newExpanded.add(dealNumber)
    }
    console.log("Expanded deals:", Array.from(newExpanded), "Current deal:", dealNumber)
    setExpandedDeals(newExpanded)
  }

  const renderDealDetails = (deal: any) => {
    const { dealInfo, vehicleInfo, customerInfo, salesTeam, bankInfo, tradeInfo, fandIProducts } =
      deal.additionalInfo || {}

    return (
      <div className="w-full bg-background border-l-4 border-blue-500 p-6 space-y-6">
        {/* Deal Info */}
        {dealInfo && Object.keys(dealInfo).length > 0 && (
          <div className=" bg-background text-white rounded-lg p-4 shadow-sm border border-border">
            <h4 className="text-lg font-semibold text-brand mb-4">Deal Info</h4>
            <div className="grid grid-cols-2 gap-4 text-sm ">
              <div>
                <span className="font-medium text-brand">Deal #:</span>
                <span className="ml-2 text-brand">{dealInfo.dealNumber || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Status:</span>
                <Badge variant="outline" className="ml-2 text-xs text-brand">
                  {dealInfo.status || "-"}
                </Badge>
              </div>
              <div>
                <span className="font-medium text-brand">Date:</span>
                <span className="ml-2 text-brand">{formatDate(dealInfo.date)}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Type:</span>
                <span className="ml-2 text-brand">{dealInfo.type || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Sale Price:</span>
                <span className="ml-2 text-brand">{formatCurrency(dealInfo.salePrice || 0)}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Cost:</span>
                <span className="ml-2 text-brand">{formatCurrency(dealInfo.cost || 0)}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Frontend:</span>
                <span className="ml-2 text-brand">{formatCurrency(dealInfo.frontend || 0)}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Backend:</span>
                <span className="ml-2 text-brand">{formatCurrency(dealInfo.backend || 0)}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Total Gross:</span>
                <span className="ml-2 text-brand">{formatCurrency(dealInfo.totalGross || 0)}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Incentive:</span>
                <span className="ml-2 text-brand">{formatCurrency(dealInfo.incentive || 0)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Vehicle Info */}
        {vehicleInfo && Object.keys(vehicleInfo).length > 0 && (
          <div className=" rounded-lg p-4 shadow-sm border border-border">
            <h4 className="text-lg font-semibold text-brand  mb-4">Sold Vehicle Info</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-brand">Stock #:</span>
                <span className="ml-2 text-brand">{vehicleInfo.stockNumber || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">New/Used:</span>
                <span className="ml-2 text-brand">{vehicleInfo.newOrUsed || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">VIN:</span>
                <span className="ml-2 text-brand">{vehicleInfo.vin || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Year:</span>
                <span className="ml-2 text-brand">{vehicleInfo.year || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Model:</span>
                <span className="ml-2 text-brand ">{vehicleInfo.model || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Sales Price:</span>
                <span className="ml-2 text-brand">{formatCurrency(vehicleInfo.salesPrice || 0)}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Days on Lot:</span>
                <span className="ml-2 text-brand">{vehicleInfo.daysOnLot || "-"}</span>
              </div>
            </div>
          </div>
        )}

        {/* Customer Info */}
        {customerInfo && Object.keys(customerInfo).length > 0 && (
          <div className=" rounded-lg p-4 shadow-sm border border-border">
            <h4 className="text-lg font-semibold text-brand mb-4">Customer Info</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-brand">Customer #:</span>
                <span className="ml-2 text-brand">{customerInfo.customerNumber || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand ">Name:</span>
                <span className="ml-2 text-brand">{customerInfo.customerName || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Address:</span>
                <span className="ml-2 text-brand">{customerInfo.address || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Address 2:</span>
                <span className="ml-2 text-brand">{customerInfo.address2 || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">City:</span>
                <span className="ml-2 text-brand">{customerInfo.city || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">State:</span>
                <span className="ml-2 text-brand">{customerInfo.state || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">ZIP:</span>
                <span className="ml-2 text-brand">{customerInfo.zip || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Personal Phone:</span>
                <span className="ml-2 text-brand">{customerInfo.personalPhone || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Cell Phone:</span>
                <span className="ml-2 text-brand">{customerInfo.cellPhone || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Business:</span>
                <span className="ml-2 text-brand">{customerInfo.business || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Email:</span>
                <span className="ml-2 text-brand">{customerInfo.email || "-"}</span>
              </div>
            </div>
          </div>
        )}

        {/* Sales Team */}
        {salesTeam && Object.keys(salesTeam).length > 0 && (
          <div className=" rounded-lg p-4 shadow-sm border border-border">
            <h4 className="text-lg font-semibold text-brand mb-4">Sales Team</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-brand">Sales Person 1:</span>
                <span className="ml-2 text-brand">{salesTeam.salesPerson1 || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Sales Person 2:</span>
                <span className="ml-2 text-brand">{salesTeam.salesPerson2 || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Desk:</span>
                <span className="ml-2 text-brand">{salesTeam.desk || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">F&I:</span>
                <span className="ml-2 text-brand">{salesTeam.fandI || "-"}</span>
              </div>
            </div>
          </div>
        )}

        {/* F&I Products */}
        {fandIProducts && Object.keys(fandIProducts).length > 0 && (
          <div className=" rounded-lg p-4 shadow-sm border border-border">
            <h4 className="text-lg font-semibold text-brand mb-4">F&I Products</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-brand">Finance:</span>
                <span className="ml-2 text-brand">{formatCurrency(fandIProducts.finance || 0)}</span>
              </div>
              <div>
                <span className="font-medium text-brand">GAP:</span>
                <span className="ml-2 text-brand">{formatCurrency(fandIProducts.gap || 0)}</span>
              </div>
              <div>
                <span className="font-medium text-brand">VSC:</span>
                <span className="ml-2 text-brand">{formatCurrency(fandIProducts.vsc || 0)}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Maintenance:</span>
                <span className="ml-2 text-brand">{formatCurrency(fandIProducts.maintenance || 0)}</span>
              </div>
              <div>
                <span className="font-medium text-brand">RIFT Warranty:</span>
                <span className="ml-2 text-brand">{formatCurrency(fandIProducts.riftWarranty || 0)}</span>
              </div>
              <div>
                <span className="font-medium text-brand">ETCH:</span>
                <span className="ml-2 text-brand">{formatCurrency(fandIProducts.etch || 0)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Bank Info */}
        {bankInfo && Object.keys(bankInfo).length > 0 && (
          <div className=" rounded-lg p-4 shadow-sm border border-border">
            <h4 className="text-lg font-semibold text-brand mb-4">Bank Info</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-brand">Bank:</span>
                <span className="ml-2 text-brand">{bankInfo.bank || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Lienholder:</span>
                <span className="ml-2 text-brand">{bankInfo.lienholder || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Amount:</span>
                <span className="ml-2 text-brand">{formatCurrency(bankInfo.amount || 0)}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Buy Rate:</span>
                <span className="ml-2 text-brand">{bankInfo.buyRate || 0}%</span>
              </div>
              <div>
                <span className="font-medium text-brand">APR:</span>
                <span className="ml-2 text-brand">{bankInfo.apr || 0}%</span>
              </div>
              <div>
                <span className="font-medium text-brand">Cash Down:</span>
                <span className="ml-2 text-brand">{formatCurrency(bankInfo.cashDown || 0)}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Term:</span>
                <span className="ml-2 text-brand">{bankInfo.term || 0} months</span>
              </div>
            </div>
          </div>
        )}

        {/* Trade Info */}
        {tradeInfo && Object.keys(tradeInfo).length > 0 && (
          <div className=" rounded-lg p-4 shadow-sm border border-border">
            <h4 className="text-lg font-semibold text-brand mb-4">Trade Info</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-brand">Trade 1 Stock #:</span>
                <span className="ml-2 text-brand ">{tradeInfo.trade1StockNumber || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Trade 1 Value:</span>
                <span className="ml-2 text-brand">{formatCurrency(tradeInfo.trade1Value || 0)}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Trade 2 Stock #:</span>
                <span className="ml-2 text-brand">{tradeInfo.trade2StockNumber || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Trade 2 Value:</span>
                <span className="ml-2 text-brand">{formatCurrency(tradeInfo.trade2Value || 0)}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Trade 3 Stock #:</span>
                <span className="ml-2 text-brand">{tradeInfo.trade3StockNumber || "-"}</span>
              </div>
              <div>
                <span className="font-medium text-brand">Trade 3 Value:</span>
                <span className="ml-2 text-brand">{formatCurrency(tradeInfo.trade3Value || 0)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (!isOpen) return null

  const customerName = customerDetails?.deals?.[0]?.additionalInfo?.customerInfo?.customerName || "Customer"
  const customerNumber = customerDetails?.deals?.[0]?.additionalInfo?.customerInfo?.customerNumber || ""

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300" onClick={onClose} />
      <div
        className={`fixed left-0 top-0 h-full w-[980px] bg-background shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b bg-background z-10">
            <div>
              <h2 className="text-2xl font-bold text-brand">Customer Details</h2>
              {customerDetails && (
                <p className="text-brand">
                  {customerName} - #{customerNumber}
                </p>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
                  <span className="ml-2">Loading customer details...</span>
                </div>
              ) : customerDetails ? (
                <>
                  {customerDetails.deals && customerDetails.deals.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-brand">Additional Info</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-medium">Account #:</span>{" "}
                              {customerDetails.deals[0]?.additionalInfo?.accountNumber || "-"}
                            </div>
                            <div>
                              <span className="font-medium">Control #:</span>{" "}
                              {customerDetails.deals[0]?.additionalInfo?.controlNumber || "-"}
                            </div>
                          </div>
                          <Separator />

                          <div className="w-full">
                            <Table>
                              <TableHeader className="bg-brand text-white hover:bg-brand">
                                <TableRow className="text-xs">
                                  <TableHead className="w-[50px]"></TableHead>
                                  <TableHead>Deal Date</TableHead>
                                  <TableHead>Deal #</TableHead>
                                  <TableHead>Deal URL</TableHead>
                                  <TableHead>Post Date</TableHead>
                                  <TableHead>Store</TableHead>
                                  <TableHead>Reference#</TableHead>
                                  <TableHead>Bank</TableHead>
                                  <TableHead>Reynolds Remarks</TableHead>
                                  {/* <TableHead>Add Note</TableHead> */}
                                  <TableHead>Amount</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {customerDetails.deals.map((deal: any, index: number) => {
                                  const dealNumber = deal.additionalInfo?.dealNumber || `deal-${index}`
                                  const isExpanded = expandedDeals.has(dealNumber)

                                  console.log("Deal data for", dealNumber, ":", deal.additionalInfo)

                                  return (
                                    <React.Fragment key={`deal-fragment-${dealNumber}-${index}`}>
                                      <TableRow
                                        className="text-xs cursor-pointer hover:bg-muted/50"
                                        onClick={() => toggleDealExpansion(dealNumber)}
                                      >
                                        <TableCell>
                                          <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                                            {isExpanded ? (
                                              <ChevronDown className="h-4 w-4" />
                                            ) : (
                                              <ChevronRight className="h-4 w-4" />
                                            )}
                                          </Button>
                                        </TableCell>
                                        <TableCell>{formatDate(deal.additionalInfo?.dealDate)}</TableCell>
                                        <TableCell>{deal.additionalInfo?.dealNumber}</TableCell>
                                        <TableCell>
                                          <span>
                                            {deal.additionalInfo?.dealUrl || "Deal Info"}
                                          </span>
                                        </TableCell>
                                        <TableCell>{formatDate(deal.additionalInfo?.postingDate)}</TableCell>
                                        <TableCell>{deal.additionalInfo?.store}</TableCell>
                                        <TableCell>{deal.additionalInfo?.referenceNumber}</TableCell>
                                        <TableCell>{deal.additionalInfo?.bank}</TableCell>
                                        <TableCell>{deal.additionalInfo?.reynoldsRemarks}</TableCell>
                                        {/* <TableCell>
                                          <span className="text-blue-600 underline cursor-pointer">Add Note</span>
                                        </TableCell> */}
                                        <TableCell>{formatCurrency(deal.additionalInfo?.amount || 0)}</TableCell>
                                      </TableRow>

                                      {/* Expanded Deal Details */}
                                      {isExpanded && (
                                        <TableRow>
                                          <TableCell colSpan={11} className="p-0 bg-gray-50">
                                            <div className="w-full">{renderDealDetails(deal)}</div>
                                          </TableCell>
                                        </TableRow>
                                      )}
                                    </React.Fragment>
                                  )
                                })}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-brand">Notes</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* {showAddNote && (
                        <div className="space-y-4 mb-4 p-4 bg-gray-50 rounded">
                          <div>
                            <Label htmlFor="new-note">Add New Note</Label>
                            <Textarea
                              id="new-note"
                              placeholder="Enter your note here..."
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={handleAddNote}>
                              Save Note
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setShowAddNote(false)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )} */}

                      <div className="space-y-2">
                        {customerDetails.notes && customerDetails.notes.length > 0 ? (
                          <div className="w-full">
                            <Table>
                              <TableHeader>
                                <TableRow className="text-xs">
                                  <TableHead>Note Author</TableHead>
                                  <TableHead>Note</TableHead>
                                  {/* <TableHead>Add Note</TableHead> */}
                                  <TableHead>Note Date</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {customerDetails.notes.map((note: any, index: number) => (
                                  <TableRow key={index} className="text-xs">
                                    <TableCell>{note.noteAuthor || "-"}</TableCell>
                                    <TableCell>{note.noteText || "-"}</TableCell>
                                    {/* <TableCell>
                                      <span className="text-blue-600 underline cursor-pointer">Add Note</span>
                                    </TableCell> */}
                                    <TableCell>{formatDate(note.noteDate)}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground">No notes available</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <div className="text-center p-8 text-muted-foreground">Failed to load customer details</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
