import React, { useState } from "react";
import { Modal, TouchableOpacity, Alert } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { DashboardLayout } from "@/components/layouts/dashboard";
import { Text, View, Button } from "@/components/ui";

export default function Index() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => {
    setIsModalVisible(false);
    // Reset selected image when closing
    setSelectedImageUri(null);
  };

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permissions needed',
        'Please grant photo library permissions to select a profile picture.'
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1], // Square aspect ratio
        quality: 0.8,
      });

      if (!result.canceled) {
        console.log('🖼️ Image selected:', result.assets[0].uri);
        setSelectedImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleSave = () => {
    // For now, just log and close
    console.log('💾 Saving profile with image:', selectedImageUri);
    Alert.alert('Success', 'Profile updated successfully!', [
      { text: 'OK', onPress: closeModal }
    ]);
  };

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
          <View style={{ marginRight: 6 }}>
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
            <Text className="text-lg font-semibold">Dillon</Text>
            <TouchableOpacity onPress={openModal} style={{ marginLeft: 4 }}>
              <AntDesign 
                name="edit" 
                size={16} 
                color="white"
                style={{ opacity: 0.4 }}
              />
            </TouchableOpacity>
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
            
            {/* Right side - Info icon aligned with Sunday label center */}
            <View style={{ marginRight: 4 }}>
              <AntDesign 
                name="infocirlceo" 
                size={16} 
                color="white"
                style={{ opacity: 0.6 }}
              />
            </View>
          </View>

          {/* Day-by-Day Tracker Row */}
          <View className="mt-4">
            <View className="relative">
              {/* Day Labels Row */}
              <View className="flex-row justify-between mb-2">
                <Text className="text-xs text-center w-6" style={{ color: '#9CA3AF' }}>M</Text>
                <Text className="text-xs text-center w-6" style={{ color: '#9CA3AF' }}>TU</Text>
                <Text className="text-xs text-center w-6" style={{ color: '#9CA3AF' }}>W</Text>
                <Text className="text-xs text-center w-6" style={{ color: '#9CA3AF' }}>TH</Text>
                <Text className="text-xs text-center w-6" style={{ color: '#F97316' }}>F</Text>
                <Text className="text-xs text-center w-6" style={{ color: '#9CA3AF' }}>SA</Text>
                <Text className="text-xs text-center w-6" style={{ color: '#9CA3AF' }}>SU</Text>
              </View>

              {/* Circles Row with Progress Rail */}
              <View className="relative">
                {/* Progress Rail - symmetric line extending equally on both sides */}
                <View 
                  className="absolute"
                  style={{ 
                    height: 1, 
                    backgroundColor: '#9CA3AF',
                    top: 11, // Center of 24px circles (12px from top)
                    left: -12, // Extend left by half circle width
                    right: -12, // Extend right by half circle width
                  }}
                />

                {/* Seven Day Circles - perfectly aligned under labels */}
                <View className="flex-row justify-between">
                  {/* Monday */}
                  <View 
                    className="w-6 h-6 rounded-full items-center justify-center"
                    style={{ backgroundColor: '#3DF08B' }}
                  >
                    <AntDesign name="check" size={12} color="white" />
                  </View>

                  {/* Tuesday */}
                  <View 
                    className="w-6 h-6 rounded-full items-center justify-center"
                    style={{ backgroundColor: '#3DF08B' }}
                  >
                    <AntDesign name="check" size={12} color="white" />
                  </View>

                  {/* Wednesday */}
                  <View 
                    className="w-6 h-6 rounded-full items-center justify-center"
                    style={{ backgroundColor: '#3DF08B' }}
                  >
                    <AntDesign name="check" size={12} color="white" />
                  </View>

                  {/* Thursday */}
                  <View 
                    className="w-6 h-6 rounded-full items-center justify-center"
                    style={{ backgroundColor: '#3DF08B' }}
                  >
                    <AntDesign name="check" size={12} color="white" />
                  </View>

                  {/* Friday - Current Day */}
                  <View 
                    className="w-6 h-6 rounded-full items-center justify-center"
                    style={{ backgroundColor: '#3DF08B' }}
                  >
                    <AntDesign name="check" size={12} color="white" />
                  </View>

                  {/* Saturday */}
                  <View 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: '#4B5563' }}
                  />

                  {/* Sunday */}
                  <View 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: '#4B5563' }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Profile Edit Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        {/* Semi-transparent backdrop - tap to dismiss */}
        <TouchableOpacity 
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          activeOpacity={1}
          onPress={closeModal}
        >
          {/* Centered card */}
          <View className="flex-1 justify-center items-center px-6">
            <TouchableOpacity 
              activeOpacity={1}
              onPress={() => {}} // Prevent card tap from closing modal
              className="bg-background rounded-2xl p-6 w-full max-w-sm"
              style={{ backgroundColor: '#1a1a1a' }}
            >
              {/* Large circular avatar */}
              <View className="items-center mb-6">
                <View 
                  className="w-32 h-32 rounded-full border-2 mb-4 overflow-hidden"
                  style={{ 
                    borderColor: '#9CA3AF',
                    backgroundColor: 'transparent' 
                  }}
                >
                  {selectedImageUri ? (
                    <Image
                      source={{ uri: selectedImageUri }}
                      style={{ width: '100%', height: '100%' }}
                      contentFit="cover"
                    />
                  ) : null}
                </View>
                
                {/* Username with edit icon (inactive) */}
                <View className="flex-row items-baseline">
                  <Text className="text-xl font-semibold text-white">Dillon</Text>
                  <View style={{ marginLeft: 6 }}>
                    <AntDesign 
                      name="edit" 
                      size={16} 
                      color="white"
                      style={{ opacity: 0.4 }}
                    />
                  </View>
                </View>
              </View>

              {/* Two circular icon buttons */}
              <View className="flex-row justify-center gap-6 mb-8">
                {/* Photo Library Button */}
                <TouchableOpacity 
                  className="w-16 h-16 rounded-full bg-gray-700 items-center justify-center"
                  style={{ backgroundColor: '#374151' }}
                  onPress={pickImage}
                >
                  <MaterialIcons name="photo-library" size={24} color="white" />
                </TouchableOpacity>

                {/* Camera Button */}
                <TouchableOpacity 
                  className="w-16 h-16 rounded-full bg-gray-700 items-center justify-center"
                  style={{ backgroundColor: '#374151' }}
                  onPress={() => {}} // Inactive for now
                >
                  <MaterialIcons name="camera-alt" size={24} color="white" />
                </TouchableOpacity>
              </View>

              {/* Close/Save button */}
              <Button
                text={selectedImageUri ? "Save" : "Close"}
                variant="secondary"
                onPress={selectedImageUri ? handleSave : closeModal}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </DashboardLayout>
  );
}
