"use client"

import nextDynamic from "next/dynamic"
import React, { useState, useEffect } from "react"

const SplashScreen = nextDynamic(() => import("@/components/splash-screen"), { ssr: false })
const ProfileSelection = nextDynamic(() => import("@/components/profile-selection"), { ssr: false })
const WelcomeScreen = nextDynamic(() => import("@/components/driver/welcome-screen"), { ssr: false })
const SignupFlow = nextDynamic(() => import("@/components/driver/signup-flow"), { ssr: false })
const LoginFlow = nextDynamic(() => import("@/components/driver/login-flow"), { ssr: false })
const DriverDashboard = nextDynamic(() => import("@/components/driver/driver-dashboard"), { ssr: false })
const PassengerDashboard = nextDynamic(() => import("@/components/passenger/passenger-dashboard"), { ssr: false })
const PassengerWelcome = nextDynamic(() => import("@/components/passenger/passenger-welcome"), { ssr: false })
const PassengerSignup = nextDynamic(() => import("@/components/passenger/passenger-signup"), { ssr: false })
const PassengerLogin = nextDynamic(() => import("@/components/passenger/passenger-login"), { ssr: false })


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

// ✅ Désactive le pre-render côté serveur
export const dynamic = "force-dynamic";
