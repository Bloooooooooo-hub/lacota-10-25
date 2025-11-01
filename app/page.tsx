"use client"

import { useState, useEffect } from "react"
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
export type AppScreen = "splash" | "profile-selection" | "welcome" | "signup" | "login" | "dashboard"

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
    if (data) {
      setUserData(data)
    }
  }

  const handleLogout = () => {
    setUserType(null)
    setUserData(null)
    setCurrentScreen("profile-selection")
  }

  if (currentScreen === "splash") {
    return <SplashScreen />
  }

  if (currentScreen === "profile-selection") {
    return <ProfileSelection onSelect={handleProfileSelect} />
  }

  if (userType === "driver") {
    if (currentScreen === "welcome") {
      return <WelcomeScreen onNavigate={handleNavigate} />
    }
    if (currentScreen === "signup") {
      return (
        <SignupFlow onComplete={(data) => handleNavigate("dashboard", data)} onBack={() => handleNavigate("welcome")} />
      )
    }
    if (currentScreen === "login") {
      return (
        <LoginFlow onComplete={(data) => handleNavigate("dashboard", data)} onBack={() => handleNavigate("welcome")} />
      )
    }
    return <DriverDashboard driverData={userData} onLogout={handleLogout} />
  }

  if (userType === "passenger") {
    if (currentScreen === "welcome") {
      return <PassengerWelcome onNavigate={handleNavigate} />
    }
    if (currentScreen === "signup") {
      return (
        <PassengerSignup
          onComplete={(data) => handleNavigate("dashboard", data)}
          onBack={() => handleNavigate("welcome")}
        />
      )
    }
    if (currentScreen === "login") {
      return (
        <PassengerLogin
          onComplete={(data) => handleNavigate("dashboard", data)}
          onBack={() => handleNavigate("welcome")}
        />
      )
    }
    return <PassengerDashboard passengerData={userData} onLogout={handleLogout} />
  }

  return <ProfileSelection onSelect={handleProfileSelect} />
}
