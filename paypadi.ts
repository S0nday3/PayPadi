// Mocks a payment gateway API, inspired by the "Paypadi" concept.
// This simulates network requests and potential failures for a more realistic frontend experience.

/**
 * Simulates network delay.
 * @param ms - The number of milliseconds to wait.
 */
const networkDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

export interface ApiResponse {
  success: boolean;
  transactionId: string;
  message?: string;
}

/**
 * Simulates creating a charge to add funds to the wallet.
 * @param amount - The amount to charge.
 * @returns A promise that resolves with the API response.
 */
export const createCharge = async (amount: number): Promise<ApiResponse> => {
  await networkDelay(1500); // 1.5 second delay

  // Simulate a 90% success rate
  if (Math.random() < 0.9) {
    return {
      success: true,
      transactionId: `chg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  } else {
    return {
      success: false,
      transactionId: '',
      message: 'Card declined by the bank.',
    };
  }
};

/**
 * Simulates creating a P2P transfer.
 * @param recipient - The recipient's username.
 * @param amount - The amount to transfer.
 * @returns A promise that resolves with the API response.
 */
export const createTransfer = async (recipient: string, amount: number): Promise<ApiResponse> => {
    await networkDelay(2000); // 2 second delay

    if (!recipient.startsWith('@')) {
        return {
            success: false,
            transactionId: '',
            message: 'Invalid recipient username.',
        }
    }

    // Simulate a 95% success rate
    if (Math.random() < 0.95) {
        return {
            success: true,
            transactionId: `trf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        };
    } else {
        return {
            success: false,
            transactionId: '',
            message: 'Transfer failed due to a network issue.',
        };
    }
};

/**
 * Simulates a user login request.
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns A promise that resolves with the login status.
 */
export const login = async (email: string, password: string): Promise<{ success: boolean; message?: string; }> => {
  await networkDelay(1000);
  if (email && password) {
    // In a real app, you'd validate credentials against a server.
    // Here, we just check if they are not empty.
    return { success: true };
  }
  return { success: false, message: 'Invalid credentials. Please try again.' };
};

/**
 * Simulates a user sign-up request.
 * @param fullName - The user's full name.
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns A promise that resolves with the sign-up status.
 */
export const signUp = async (fullName: string, email: string, password: string): Promise<{ success: boolean; message?: string; user?: {name: string, email: string} }> => {
  await networkDelay(1500);
  if (fullName && email && password) {
    // In a real app, you'd create a new user record.
    return { 
      success: true,
      user: {
        name: fullName,
        email: email,
      } 
    };
  }
  return { success: false, message: 'Please fill in all fields.' };
};