"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, LogOut } from "lucide-react"
import HospitalMap from "./HospitalMap"
import { useState } from "react"

const HOSPITALS = [
  { id: 1, name: "CityCare Hospital", lat: 12.9716, lon: 77.5946, status: "Available" },
  { id: 2, name: "Green Valley Medical Center", lat: 13.0827, lon: 80.2707, status: "Busy" },
  { id: 3, name: "Sunrise Clinic", lat: 17.385, lon: 78.4867, status: "Full" },
  { id: 4, name: "Lifeline Hospital", lat: 19.076, lon: 72.8777, status: "Available" },
]

const STATUS_COLORS = {
  Available: "#22c55e",
  Busy: "#f97316",
  Full: "#ef4444",
}

const STATUS_DISPLAY = {
  Available: "🟢 Available",
  Busy: "🟠 Busy",
  Full: "🔴 Full",
}

export default function Dashboard({ user, onLogout }) {
  const [selectedHospital, setSelectedHospital] = useState(null)

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Hospital Emergency Tracker</h1>
            <p className="text-sm opacity-90">Welcome, {user?.name}</p>
          </div>
          <Button onClick={onLogout} variant="secondary" className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-4">
                <HospitalMap onHospitalClick={setSelectedHospital} />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="h-full overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Nearby Hospitals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {HOSPITALS.map((hospital) => (
                  <div
                    key={hospital.id}
                    className="p-3 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedHospital(hospital.id)}
                  >
                    <h3 className="font-semibold text-foreground">{hospital.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">
                        Lat: {hospital.lat.toFixed(4)}, Lon: {hospital.lon.toFixed(4)}
                      </span>
                      <span
                        className="text-xs font-medium px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${STATUS_COLORS[hospital.status]}20`,
                          color: STATUS_COLORS[hospital.status],
                        }}
                      >
                        {STATUS_DISPLAY[hospital.status]}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
