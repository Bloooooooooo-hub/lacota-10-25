// app/page.tsx
"use client"

import React, { useState, useEffect } from "react"
import SplashScreen from "@/components/splash-screen"
import ProfileSelection from "@/components/profile-selection"
import WelcomeScreen from "@/components/driver/welcome-screen"
import SignupFlow from "@/components/driver/signup-flow"
import LoginFlow from "@/components/driver/login-flow"
import DriverDashboard from "@/components/driver/driver-dashboard"
import PassengerDashboard from "@/components/passenger/passenger-dashboard"
import PassengerWelcome from "@/components/passenger/passenger-welcome"
import PassengerSignup from "@/components/passenger/passenger-signup"
import PassengerLogin from "@/components/passenger/passenger-login"

export type UserType = "driver" | "passenger" | null
export type AppScreen =
  | "splash"
  | "profile-selection"
  | "welcome"
  | "signup"
  | "login"
  | "dashboard"

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("splash")
  const [userType, setUserType] = useState<UserType>(null)
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen("profile-selection")
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleProfileSelect = (type: UserType) => {
    setUserType(type)
    setCurrentScreen("welcome")
  }

  const handleNavigate = (screen: AppScreen, data?: any) => {
    setCurrentScreen(screen)
    if (data) setUserData(data)
  }

  const handleLogout = () => {
    setUserType(null)
    setUserData(null)
    setCurrentScreen("profile-selection")
  }

  let content = null

  if (currentScreen === "splash") {
    content = <SplashScreen />
  } else if (currentScreen === "profile-selection") {
    content = <ProfileSelection onSelect={handleProfileSelect} />
  } else if (userType === "driver") {
    if (currentScreen === "welcome")
      content = <WelcomeScreen onNavigate={handleNavigate} />
    else if (currentScreen === "signup")
      content = (
        <SignupFlow
          onComplete={(data) => handleNavigate("dashboard", data)}
          onBack={() => handleNavigate("welcome")}
        />
      )
    else if (currentScreen === "login")
      content = (
        <LoginFlow
          onComplete={(data) => handleNavigate("dashboard", data)}
          onBack={() => handleNavigate("welcome")}
        />
      )
    else content = <DriverDashboard driverData={userData} onLogout={handleLogout} />
  } else if (userType === "passenger") {
    if (currentScreen === "welcome")
      content = <PassengerWelcome onNavigate={handleNavigate} />
    else if (currentScreen === "signup")
      content = (
        <PassengerSignup
          onComplete={(data) => handleNavigate("dashboard", data)}
          onBack={() => handleNavigate("welcome")}
        />
      )
    else if (currentScreen === "login")
      content = (
        <PassengerLogin
          onComplete={(data) => handleNavigate("dashboard", data)}
          onBack={() => handleNavigate("welcome")}
        />
      )
    else
      content = <PassengerDashboard passengerData={userData} onLogout={handleLogout} />
  }

  return <div className="min-h-screen bg-white text-gray-900">{content}</div>
}
