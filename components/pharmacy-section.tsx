"use client"
import medicineImage from "@/public/image.png"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ShoppingCart, Truck, Shield, Star, Plus, Minus } from "lucide-react"

export function PharmacySection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cart, setCart] = useState<{ [key: string]: number }>({})

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "prescription", label: "Prescription Drugs" },
    { value: "otc", label: "Over-the-Counter" },
    { value: "vitamins", label: "Vitamins & Supplements" },
    { value: "personal-care", label: "Personal Care" },
    { value: "medical-devices", label: "Medical Devices" },
  ]

  const medicines = [
    {
      id: "1",
      name: "Paracetamol 500mg",
      category: "otc",
      price: 12.99,
      originalPrice: 15.99,
      description: "Pain relief and fever reducer",
      image: "/paracetamol.png",
      rating: 4.5,
      reviews: 234,
      inStock: true,
      prescription: false,
      manufacturer: "HealthCorp",
    },
    {
      id: "2",
      name: "Vitamin D3 1000 IU",
      category: "vitamins",
      price: 24.99,
      originalPrice: 29.99,
      description: "Bone health and immune support",
      image: "/vitamin-d.png",
      rating: 4.7,
      reviews: 156,
      inStock: true,
      prescription: false,
      manufacturer: "VitaLife",
    },
    {
      id: "3",
      name: "Lisinopril 10mg",
      category: "prescription",
      price: 18.5,
      originalPrice: null,
      description: "Blood pressure medication",
      image: "/lisinopril.png",
      rating: 4.3,
      reviews: 89,
      inStock: true,
      prescription: true,
      manufacturer: "MediPharm",
    },
    {
      id: "4",
      name: "Digital Thermometer",
      category: "medical-devices",
      price: 35.99,
      originalPrice: 42.99,
      description: "Fast and accurate temperature reading",
      image: "/thermometer.png",
      rating: 4.6,
      reviews: 312,
      inStock: true,
      prescription: false,
      manufacturer: "MedTech",
    },
    {
      id: "5",
      name: "Omega-3 Fish Oil",
      category: "vitamins",
      price: 32.99,
      originalPrice: 39.99,
      description: "Heart and brain health support",
      image: "/omega3.png",
      rating: 4.8,
      reviews: 445,
      inStock: true,
      prescription: false,
      manufacturer: "NutriMax",
    },
    {
      id: "6",
      name: "Hand Sanitizer 500ml",
      category: "personal-care",
      price: 8.99,
      originalPrice: 11.99,
      description: "70% alcohol-based sanitizer",
      image: "/sanitizer.png",
      rating: 4.4,
      reviews: 678,
      inStock: true,
      prescription: false,
      manufacturer: "CleanCare",
    },
  ]

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || medicine.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addToCart = (medicineId: string) => {
    setCart((prev) => ({
      ...prev,
      [medicineId]: (prev[medicineId] || 0) + 1,
    }))
  }

  const removeFromCart = (medicineId: string) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[medicineId] > 1) {
        newCart[medicineId] -= 1
      } else {
        delete newCart[medicineId]
      }
      return newCart
    })
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }

  return (
    <section id="pharmacy" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Online Pharmacy</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Order medicines and healthcare products online with guaranteed authenticity and fast delivery to your
            doorstep.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search medicines, vitamins, or healthcare products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="md:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="md:w-auto">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Cart ({getTotalItems()})
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center space-x-3 p-4 bg-card rounded-lg">
            <Truck className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold text-card-foreground">Free Delivery</h3>
              <p className="text-sm text-muted-foreground">On orders above $50</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-card rounded-lg">
            <Shield className="h-8 w-8 text-accent" />
            <div>
              <h3 className="font-semibold text-card-foreground">Genuine Products</h3>
              <p className="text-sm text-muted-foreground">100% authentic medicines</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-card rounded-lg">
            <Star className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold text-card-foreground">Expert Support</h3>
              <p className="text-sm text-muted-foreground">Pharmacist consultation</p>
            </div>
          </div>
        </div>

        {/* Medicine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.map((medicine) => (
            <Card key={medicine.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="relative">
                  <img
                    src="./image.png"
                    alt={medicine.name}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  {medicine.prescription && (
                    <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
                      Prescription Required
                    </Badge>
                  )}
                  
                </div>
                <CardTitle className="text-lg text-card-foreground">{medicine.name}</CardTitle>
                <CardDescription className="text-sm">{medicine.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-muted-foreground">{medicine.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({medicine.reviews} reviews)</span>
                </div>

                

                <p className="text-xs text-muted-foreground mb-4">By {medicine.manufacturer}</p>

                <div className="flex items-center justify-between">

                  <Badge variant={medicine.inStock ? "secondary" : "destructive"} className="bg-green-700">
                    {medicine.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No medicines found matching your search criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}
