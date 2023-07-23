import axios from 'axios';

const API_BASE_URL: string = import.meta.env.VITE_BASE_URL + "/api/analytics";

export function trackPageView(pageUrl: string, timeSpent: number) {
    console.log("")
    console.log(pageUrl, timeSpent);
}
  
  // Function to track button clicks
export function trackButtonClick(buttonId: string) {
    axios.post(API_BASE_URL + "/button-click", { buttonId })
      .then((response) => {
        console.log(`Button ${buttonId} clicked and successfully sent:`, response.data);
      })
      .catch((error) => {
        console.error('Error tracking button.', error)
      })
}