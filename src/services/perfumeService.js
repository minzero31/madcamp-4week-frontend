// src/services/perfumeService.js
import axiosInstance from './axiosInstance';

export const getAccords = async (selectedMoodList) => {
  console.log(selectedMoodList);
  try {
    const response = await axiosInstance.post('/api/v1/accord/getaccord', {
      selectedMoodList
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching accords:', error);
    throw error;
  }
};

export const getPerfumeRecommendations = async (likedAccordIds, dislikedMoodIds, gender) => {
  try {
    const response = await axiosInstance.post('/api/v1/perfume/recommend', {
      likedAccordIds,
      dislikedMoodIds,
      gender
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching perfume recommendations:', error);
    throw error;
  }
};