"use client"

import { useEffect, useRef, useState } from "react"

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

export default function HospitalMap({ onHospitalClick }) {
  const canvasRef = useRef(null)
  const [selectedHospital, setSelectedHospital] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    // Clear canvas with light background
    ctx.fillStyle = "#f0f9ff"
    ctx.fillRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = "#e0e7ff"
    ctx.lineWidth = 1
    for (let i = 0; i <= 10; i++) {
      const x = (i / 10) * width
      const y = (i / 10) * height
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Draw hospitals
    HOSPITALS.forEach((hospital) => {
      // Normalize coordinates to canvas
      const x = ((hospital.lon - 72) / (80.5 - 72)) * width
      const y = ((20 - hospital.lat) / (20 - 12)) * height

      // Draw hospital marker
      ctx.fillStyle = STATUS_COLORS[hospital.status]
      ctx.beginPath()
      ctx.arc(x, y, 12, 0, Math.PI * 2)
      ctx.fill()

      // Draw border
      ctx.strokeStyle = "white"
      ctx.lineWidth = 3
      ctx.stroke()

      // Draw hospital icon
      ctx.fillStyle = "white"
      ctx.font = "bold 16px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("🏥", x, y)
    })

    // Draw selected hospital info
    if (selectedHospital) {
      const hospital = HOSPITALS.find((h) => h.id === selectedHospital)
      if (hospital) {
        const x = ((hospital.lon - 72) / (80.5 - 72)) * width
        const y = ((20 - hospital.lat) / (20 - 12)) * height

        // Draw selection ring
        ctx.strokeStyle = STATUS_COLORS[hospital.status]
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(x, y, 20, 0, Math.PI * 2)
        ctx.stroke()
      }
    }
  }, [selectedHospital])

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if click is near any hospital
    HOSPITALS.forEach((hospital) => {
      const canvasX = ((hospital.lon - 72) / (80.5 - 72)) * canvas.width
      const canvasY = ((20 - hospital.lat) / (20 - 12)) * canvas.height

      const distance = Math.sqrt(Math.pow(x - canvasX, 2) + Math.pow(y - canvasY, 2))
      if (distance < 20) {
        setSelectedHospital(hospital.id)
        onHospitalClick(hospital)
      }
    })
  }

  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onClick={handleCanvasClick}
        className="w-full h-full border border-border rounded-lg cursor-pointer"
      />
      {selectedHospital && (
        <div className="mt-4 p-3 bg-card border border-border rounded-lg">
          {HOSPITALS.map((h) =>
            h.id === selectedHospital ? (
              <div key={h.id}>
                <h3 className="font-semibold">{h.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Lat: {h.lat}, Lon: {h.lon}
                </p>
              </div>
            ) : null,
          )}
        </div>
      )}
    </div>
  )
}
