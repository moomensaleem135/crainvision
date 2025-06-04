"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Loader2 } from "lucide-react"
import LoaderIcon from "@/public/assests/tsx/loaderIcon"

interface AddNoteModalProps {
    customerNumber?: string | null
    existingAccountNumber?: string
    existingControlNumber?: string
    existingNoteText?: string
    isOpen: boolean
    onClose: () => void
    isEdit?: boolean
}

export function AddNoteModal({ customerNumber, isOpen, onClose, isEdit = false, existingControlNumber, existingAccountNumber, existingNoteText }: AddNoteModalProps) {
    const [accountNumber, setAccountNumber] = useState("")
    const [controlNumber, setControlNumber] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [isSaving, setIsSaving] = useState(false)

    const [note, setNote] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCustomerData = async () => {
            if (!customerNumber) return
            if (isEdit) {
                setAccountNumber(existingAccountNumber || "")
                setControlNumber(existingControlNumber || "")
                setNote(existingNoteText || "")
                const email = localStorage.getItem("userEmail") || ""
                setUserEmail(email)
                return
            }
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
            console.log({ res });
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
                    <DialogTitle>{isEdit ? 'Edit Note' : 'Add Note'}</DialogTitle>
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
                                    <LoaderIcon />
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
