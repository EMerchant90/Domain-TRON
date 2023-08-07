import Swal from 'sweetalert2';
import styles from "./sweetAlertServiceStyles.module.css"

const sweetAlertService = {
  showSuccessAlert: (title, message) => {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      customClass:{
        confirmButton: styles["success-confirm-button"],
      }
    });
  },

  showErrorAlert: (title, message) => {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      customClass:{
        confirmButton: styles["fail-confirm-button"],
      }
    });
  },

  // ... other methods ...
};

export default sweetAlertService;
