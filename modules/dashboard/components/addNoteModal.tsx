"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Loader2 } from "lucide-react"

interface AddNoteModalProps {
    customerNumber: string | null
    isOpen: boolean
    onClose: () => void
}

export function AddNoteModal({ customerNumber, isOpen, onClose }: AddNoteModalProps) {
    const [accountNumber, setAccountNumber] = useState("")
    const [controlNumber, setControlNumber] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [isSaving, setIsSaving] = useState(false)

    const [note, setNote] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCustomerData = async () => {
            if (!customerNumber) return

            setLoading(true)
            try {
                const res = await axios.get(`/api/cip/customers/${customerNumber}`)
                const deal = res.data?.deals?.[0]?.additionalInfo
                if (deal) {
                    setAccountNumber(deal.accountNumber || "")
                    setControlNumber(deal.controlNumber || "")
                }
            } catch (error) {
                console.error("Failed to fetch customer info:", error)
                setAccountNumber("")
                setControlNumber("")
            } finally {
                setLoading(false)
            }
        }

        if (isOpen) {
            setNote("")
            const email = localStorage.getItem("userEmail") || ""
            setUserEmail(email)
            fetchCustomerData()
        }
    }, [customerNumber, isOpen])

    const handleSave = async () => {
        if (!note.trim()) return

        setIsSaving(true)
        try {
            const payload = {
                controlNumber,
                noteText: note,
                accountNumber,
                noteAuthor: userEmail,
            }

            const res = await axios.post("/api/notes", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            onClose()
        } catch (err) {
            console.error("Failed to save note:", err)
            alert("Failed to save note. Please try again.")
        } finally {
            setIsSaving(false)
        }
    }


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Note</DialogTitle>
                </DialogHeader>

                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
                        <span className="ml-2 text-sm text-muted-foreground">Loading Info...</span>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">User ID</label>
                            <Input value={userEmail} disabled />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Account Number</label>
                            <Input value={accountNumber} disabled />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Control Number</label>
                            <Input value={controlNumber} disabled />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Note (max 255 characters)</label>
                            <Textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                maxLength={255}
                                rows={4}
                            />
                            <div className="text-sm text-muted-foreground mt-2">{note.length}/255</div>
                        </div>
                        <Button
                            onClick={handleSave}
                            disabled={!note.trim() || isSaving}
                        >
                            {isSaving ? (
                                <span className="flex items-center">
                                    <svg
                                        className="animate-spin h-4 w-4 mr-2 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        />
                                    </svg>
                                    Saving...
                                </span>
                            ) : (
                                "Save Note"
                            )}
                        </Button>

                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
