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
        
        {/* Clean canvas with black background - ready for new layout */}
      </View>
    </DashboardLayout>
  );
}
