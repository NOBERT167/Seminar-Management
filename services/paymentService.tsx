// services/paymentService.ts
import axios from "axios";

interface PaymentRequest {
  name: string;
  email: string;
  phone_number: string;
  amount: number;
  currency: string;
  description: string;
}

export const initializePayment = async (paymentData: PaymentRequest) => {
  try {
    // Format phone number if needed (remove leading 0 and add country code if not present)
    let phoneNumber = paymentData.phone_number;
    if (phoneNumber.startsWith("0")) {
      phoneNumber = "254" + phoneNumber.substring(1);
    } else if (!phoneNumber.startsWith("254")) {
      phoneNumber = "254" + phoneNumber;
    }

    const response = await axios.post("/api/payments/initialize", {
      ...paymentData,
      phone_number: phoneNumber,
    });

    console.log("Payment service response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Payment service error:", error.response?.data || error);
    throw new Error(
      error.response?.data?.message || "Failed to initialize payment"
    );
  }
};

export const verifyPayment = async (checkoutId: string) => {
  try {
    const response = await axios.get(`/api/payments/verify/${checkoutId}`);
    return response.data;
  } catch (error: any) {
    console.error("Verification error:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Failed to verify payment"
    );
  }
};
