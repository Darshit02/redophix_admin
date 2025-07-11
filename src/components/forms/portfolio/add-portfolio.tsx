import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddPortfolio() {
  return (
    <>
   
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link to="/admin/portfolio">
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-indigo-500" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Add New Portfolio Item</h1>
        </div>
      </div>

      <div className="max-w-xl space-y-6">
        <div>
          <Label className="mb-1">Title</Label>
          <Input placeholder="Project Title" />
        </div>

        <div>
          <Label className="mb-1">Category</Label>
          <Input placeholder="Category" />
        </div>

        <div>
          <Label className="mb-1">Status</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button>Save Portfolio Item</Button>
      </div>
      </>

  )
}
