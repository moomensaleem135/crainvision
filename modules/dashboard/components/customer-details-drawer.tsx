"use client"

import { useState } from "react"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface CustomerDetailsProps {
  isOpen: boolean
  onClose: () => void
  customerDetails: any
  loading: boolean
}

export function CustomerDetailsDrawer({ isOpen, onClose, customerDetails, loading }: CustomerDetailsProps) {
  const [showAddNote, setShowAddNote] = useState(false)
  const [newNote, setNewNote] = useState("")

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

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300" onClick={onClose} />

      {/* Drawer */}
      <div
        className={`fixed left-0 top-0 h-full w-[800px] bg-background shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-brand">Customer Details</h2>
              {customerDetails && (
                <p className="text-muted-foreground">
                  {customerDetails.customerInfo?.customerName} - #{customerDetails.customerInfo?.customerNumber}
                </p>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
                <span className="ml-2">Loading customer details...</span>
              </div>
            ) : customerDetails ? (
              <>
                {/* Deal Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-brand">Deal Info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Deal #:</span> {customerDetails.dealInfo?.dealNumber}
                      </div>
                      <div>
                        <span className="font-medium">Status:</span>{" "}
                        <Badge variant="outline">{customerDetails.dealInfo?.status}</Badge>
                      </div>
                      <div>
                        <span className="font-medium">Date:</span> {formatDate(customerDetails.dealInfo?.date)}
                      </div>
                      <div>
                        <span className="font-medium">Type:</span> {customerDetails.dealInfo?.type}
                      </div>
                      <div>
                        <span className="font-medium">Sale Price:</span>{" "}
                        {formatCurrency(customerDetails.dealInfo?.salePrice || 0)}
                      </div>
                      <div>
                        <span className="font-medium">Cost:</span> {formatCurrency(customerDetails.dealInfo?.cost || 0)}
                      </div>
                      <div>
                        <span className="font-medium">Frontend:</span>{" "}
                        {formatCurrency(customerDetails.dealInfo?.frontend || 0)}
                      </div>
                      <div>
                        <span className="font-medium">Backend:</span>{" "}
                        {formatCurrency(customerDetails.dealInfo?.backend || 0)}
                      </div>
                      <div>
                        <span className="font-medium">Total Gross:</span>{" "}
                        {formatCurrency(customerDetails.dealInfo?.totalGross || 0)}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sold Vehicle Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-brand">Sold Vehicle Info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Stock #:</span> {customerDetails.soldVehicleInfo?.stockNumber}
                      </div>
                      <div>
                        <span className="font-medium">New/Used:</span> {customerDetails.soldVehicleInfo?.newOrUsed}
                      </div>
                      <div>
                        <span className="font-medium">VIN:</span> {customerDetails.soldVehicleInfo?.vin || "-"}
                      </div>
                      <div>
                        <span className="font-medium">Year:</span> {customerDetails.soldVehicleInfo?.year}
                      </div>
                      <div>
                        <span className="font-medium">Model:</span> {customerDetails.soldVehicleInfo?.model}
                      </div>
                      <div>
                        <span className="font-medium">Sales Price:</span>{" "}
                        {formatCurrency(customerDetails.soldVehicleInfo?.salesPrice || 0)}
                      </div>
                      <div>
                        <span className="font-medium">Days on Lot:</span> {customerDetails.soldVehicleInfo?.daysOnLot}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Customer Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-brand">Customer Info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Customer #:</span> {customerDetails.customerInfo?.customerNumber}
                      </div>
                      <div>
                        <span className="font-medium">Name:</span> {customerDetails.customerInfo?.customerName}
                      </div>
                      <div>
                        <span className="font-medium">Address:</span> {customerDetails.customerInfo?.address || "-"}
                      </div>
                      <div>
                        <span className="font-medium">Address 2:</span> {customerDetails.customerInfo?.address2 || "-"}
                      </div>
                      <div>
                        <span className="font-medium">City:</span> {customerDetails.customerInfo?.city || "-"}
                      </div>
                      <div>
                        <span className="font-medium">State:</span> {customerDetails.customerInfo?.state || "-"}
                      </div>
                      <div>
                        <span className="font-medium">ZIP:</span> {customerDetails.customerInfo?.zip || "-"}
                      </div>
                      <div>
                        <span className="font-medium">Personal Phone:</span>{" "}
                        {customerDetails.customerInfo?.personalPhone || "-"}
                      </div>
                      <div>
                        <span className="font-medium">Cell Phone:</span>{" "}
                        {customerDetails.customerInfo?.cellPhone || "-"}
                      </div>
                      <div>
                        <span className="font-medium">Business:</span> {customerDetails.customerInfo?.business || "-"}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span> {customerDetails.customerInfo?.email || "-"}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sales Team */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-brand">Sales Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Sales Person 1:</span>{" "}
                        {customerDetails.salesTeam?.salesPerson1 || "-"}
                      </div>
                      <div>
                        <span className="font-medium">Sales Person 2:</span>{" "}
                        {customerDetails.salesTeam?.salesPerson2 || "-"}
                      </div>
                      <div>
                        <span className="font-medium">Desk:</span> {customerDetails.salesTeam?.desk || "-"}
                      </div>
                      <div>
                        <span className="font-medium">F&I:</span> {customerDetails.salesTeam?.fandI || "-"}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* F&I Products */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-brand">F&I Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Finance:</span>{" "}
                        {formatCurrency(customerDetails.fandIProducts?.finance || 0)}
                      </div>
                      <div>
                        <span className="font-medium">GAP:</span>{" "}
                        {formatCurrency(customerDetails.fandIProducts?.gap || 0)}
                      </div>
                      <div>
                        <span className="font-medium">VSC:</span>{" "}
                        {formatCurrency(customerDetails.fandIProducts?.vsc || 0)}
                      </div>
                      <div>
                        <span className="font-medium">Maintenance:</span>{" "}
                        {formatCurrency(customerDetails.fandIProducts?.maintenance || 0)}
                      </div>
                      <div>
                        <span className="font-medium">RIFT Warranty:</span>{" "}
                        {formatCurrency(customerDetails.fandIProducts?.riftWarranty || 0)}
                      </div>
                      <div>
                        <span className="font-medium">ETCH:</span>{" "}
                        {formatCurrency(customerDetails.fandIProducts?.etch || 0)}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Bank Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-brand">Bank Info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Bank:</span> {customerDetails.bankInfo?.bank || "-"}
                      </div>
                      <div>
                        <span className="font-medium">Lienholder:</span> {customerDetails.bankInfo?.lienholder || "-"}
                      </div>
                      <div>
                        <span className="font-medium">Amount:</span>{" "}
                        {formatCurrency(customerDetails.bankInfo?.amount || 0)}
                      </div>
                      <div>
                        <span className="font-medium">Buy Rate:</span> {customerDetails.bankInfo?.buyRate || 0}%
                      </div>
                      <div>
                        <span className="font-medium">APR:</span> {customerDetails.bankInfo?.apr || 0}%
                      </div>
                      <div>
                        <span className="font-medium">Cash Down:</span>{" "}
                        {formatCurrency(customerDetails.bankInfo?.cashDown || 0)}
                      </div>
                      <div>
                        <span className="font-medium">Term:</span> {customerDetails.bankInfo?.term || 0} months
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Trade Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-brand">Trade Info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Trade 1 Stock #:</span>{" "}
                        {customerDetails.tradeInfo?.trade1StockNumber || "-"}
                      </div>
                      <div>
                        <span className="font-medium">Trade 1 Value:</span>{" "}
                        {formatCurrency(customerDetails.tradeInfo?.trade1Value || 0)}
                      </div>
                      <div>
                        <span className="font-medium">Trade 2 Stock #:</span>{" "}
                        {customerDetails.tradeInfo?.trade2StockNumber || "-"}
                      </div>
                      <div>
                        <span className="font-medium">Trade 2 Value:</span>{" "}
                        {formatCurrency(customerDetails.tradeInfo?.trade2Value || 0)}
                      </div>
                      <div>
                        <span className="font-medium">Trade 3 Stock #:</span>{" "}
                        {customerDetails.tradeInfo?.trade3StockNumber || "-"}
                      </div>
                      <div>
                        <span className="font-medium">Trade 3 Value:</span>{" "}
                        {formatCurrency(customerDetails.tradeInfo?.trade3Value || 0)}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Info */}
                {customerDetails.additionalInfo?.deals && customerDetails.additionalInfo.deals.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-brand">Additional Info</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Account #:</span>{" "}
                            {customerDetails.additionalInfo?.accountNumber}
                          </div>
                          <div>
                            <span className="font-medium">Control #:</span>{" "}
                            {customerDetails.additionalInfo?.controlNumber}
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          {customerDetails.additionalInfo.deals.map((deal: any, index: number) => (
                            <div key={index} className="grid grid-cols-4 gap-2 text-xs p-2 bg-gray-50 rounded">
                              <div>
                                <span className="font-medium">Deal Date:</span> {formatDate(deal.dealDate)}
                              </div>
                              <div>
                                <span className="font-medium">Store:</span> {deal.store}
                              </div>
                              <div>
                                <span className="font-medium">Bank:</span> {deal.bank}
                              </div>
                              <div>
                                <span className="font-medium">Amount:</span> {formatCurrency(deal.amount || 0)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Notes */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-brand">Notes</CardTitle>
                      <Button variant="outline" size="sm" onClick={() => setShowAddNote(!showAddNote)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Note
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {showAddNote && (
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
                    )}

                    <div className="space-y-2">
                      {customerDetails.notes?.noteText && customerDetails.notes.noteText !== "-" ? (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                          <div className="text-sm">
                            <div className="font-medium">Note:</div>
                            <div>{customerDetails.notes.noteText}</div>
                            {customerDetails.notes.noteDate && (
                              <div className="text-xs text-muted-foreground mt-1">
                                {formatDate(customerDetails.notes.noteDate)} - {customerDetails.notes.noteAuthor}
                              </div>
                            )}
                          </div>
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
    </>
  )
}
