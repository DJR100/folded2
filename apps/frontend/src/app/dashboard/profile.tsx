import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

import { DashboardLayout } from "@/components/layouts/dashboard";
import { Text, View } from "@/components/ui";

export default function Index() {
  return (
    <DashboardLayout>
      <View>
        {/* Top Row - Title & Settings */}
        <View className="flex-row items-center justify-between mb-4">
          {/* Empty space for left alignment */}
          <View className="w-6" />
          
          {/* Centered Title */}
          <Text className="text-lg font-medium">Folded.</Text>
          
          {/* Settings Gear - Right aligned with margin */}
          <View className="mr-4">
            <AntDesign 
              name="setting" 
              size={24} 
              color="white"
              style={{ opacity: 0.4 }}
            />
          </View>
        </View>

        {/* Profile Picture & Username Block */}
        <View className="items-center mt-16">
          {/* Circular Profile Picture Placeholder */}
          <View 
            className="w-[120px] h-[120px] rounded-full border-2 border-gray-400 mb-4"
            style={{ 
              borderColor: '#9CA3AF', // medium grey
              backgroundColor: 'transparent' 
            }}
          />
          
          {/* Username with Edit Icon */}
          <View className="flex-row items-baseline">
            <Text className="text-lg font-semibold">Username</Text>
            <View className="ml-1" style={{ marginLeft: 4 }}>
              <AntDesign 
                name="edit" 
                size={16} 
                color="white"
                style={{ opacity: 0.4 }}
              />
            </View>
          </View>
        </View>

        {/* Primary Action Button */}
        <View className="mt-6 px-4">
          <View 
            className="w-full rounded-lg flex-row items-center justify-center"
            style={{ 
              height: 48, // 48px on phones, could be responsive
              backgroundColor: '#3DF08B', // Folded's signature green
              opacity: 0.8,
              pointerEvents: 'none'
            }}
          >
            <Text 
              className="font-medium" 
              style={{ color: 'white' }}
            >
              Start Daily Challenge
            </Text>
          </View>
        </View>

        {/* Daily Streak Widget */}
        <View className="mt-6 px-4">
          {/* Header Strip */}
          <View className="flex-row items-center justify-between">
            {/* Left side - Fire emoji and streak text */}
            <View className="flex-row items-center">
              <Text className="text-lg">🔥</Text>
              <Text className="ml-2 text-base font-medium">5-day streak!</Text>
            </View>
            
            {/* Right side - Info icon with same margin as settings gear */}
            <View className="mr-4">
              <AntDesign 
                name="infocirlceo" 
                size={16} 
                color="white"
                style={{ opacity: 0.6 }}
              />
            </View>
          </View>
        </View>
        
        {/* Clean canvas with black background - ready for new layout */}
      </View>
    </DashboardLayout>
  );
}
