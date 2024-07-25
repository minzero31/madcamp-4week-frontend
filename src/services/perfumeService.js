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

export const fetchPerfumesByMood = async (moodId, setIsLoading, setSelectedPerfume, setSelectedMoodId, setError) => {
  try {
    setIsLoading(true);

    const response = await axiosInstance.get(`/api/v1/perfume/perfumelist/${moodId}`);
    if (response.data.code === 'success') {
      setSelectedPerfume(response.data.data.recommendPerfumeInfoList[0]);
      setSelectedMoodId(moodId);

      return response.data.data;

    } else {
      throw new Error('무드별 향수 목록 가져오기 실패');
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};
