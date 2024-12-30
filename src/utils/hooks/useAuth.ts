import { loginMutation, signupMutation } from "../../services/auth";
import { getTimeSchedule } from "../../services/doctor";
import { useUserStore } from "../../store/userStore";
import { showToast } from "../../utils/helpers";
import { navigateReset } from "../../utils/navigation";

export const useSignupHook = async (data: any) => {
  try {
    data.name = data.name
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    console.log('Data in Signup Hook:', data);
    const res = await signupMutation(data);

    if (!res.success) {
      showToast({
        type: 'error',
        message: res.error || 'Signup failed',
        position: 'bottom',
      });
    }

    showToast({
      type: 'success',
      message: 'Welcome to Your New Account!',
      position: 'bottom',
    });

    const setUser = useUserStore.getState().setUser;
    setUser({
      uid: res.uid,
      email: data.email,
      name: data.name,
      role: data.role,
      ...(data.role === 'doctor' && { specialization: data.specialization?.value }),
    });

    const navigator = data.role === 'doctor' ? 'DoctorNavigator' : 'PatientNavigator';
    navigateReset(navigator);
    
  } catch (error: any) {
    showToast({
      type: 'error',
      message: error.message || 'An unexpected error occurred',
      position: 'bottom',
    });
    throw error;
  }
};



export const useLoginHook = async (data: any) => {
  try {
    const res = await loginMutation(data);
    if (!res.success || !res.id) {
      showToast({
        type: "error",
        message: res.error || "Login failed",
        position: "bottom",
      });
      return;
    }

    console.log('res id',res.id)
    console.log('res user',res.id)



    const availabilityData =
      data.role === "doctor"
        ? await getTimeSchedule(res.id, res.user?.timingID)
        : null;

    const setUser = useUserStore.getState().setUser;
    setUser({
      uid: res.id,
      email: res.user?.email,
      name: res.user?.name,
      role: res.user?.role,
      ...(data.role === "doctor" && {
        specialization: res.user?.specialization,
        availability: availabilityData?.availability?.timings || [],
      }),
    });

    showToast({
      message: "User logged in successfully!",
      position: "bottom",
    });

    const navigator = data.role === 'doctor' ? 'DoctorNavigator' : 'PatientNavigator';
    navigateReset(navigator);

  } catch (error) {
    console.error("Error in LoginHook:", error);
    showToast({
      type: "error",
      message: "An unexpected error occurred during login.",
      position: "bottom",
    });
  }
};