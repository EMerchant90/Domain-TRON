import Swal from 'sweetalert2';
import styles from "./sweetAlertServiceStyles.module.css"

const sweetAlertService = {
  showSuccessAlert: (title, message , linkUrl?, ) => {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      showCancelButton:true,
      confirmButtonText: "Confirm",
      cancelButtonText:`<a href="${linkUrl}" target="_blank" style="color:#fff; text-decoration:none;">Explore</a>`,
      allowEscapeKey: false,
      allowOutsideClick: false,
      showCloseButton: false,
      showConfirmButton: true,
      customClass:{
        confirmButton: styles["success-confirm-button"],
        cancelButton: styles["success-cancel-button"],
        title: styles["title"],
        container: 'sweetalert-container', 
      },
    });
  },
  showSuccesMessage: (title, message , ) => {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonText: "Confirm",
      allowEscapeKey: false,
      allowOutsideClick: false,
      showCloseButton: false,
      showConfirmButton: true,
      customClass:{
        confirmButton: styles["success-confirm-button"],
        title: styles["title"],
        container: 'sweetalert-container', 
      },
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
        title: styles["title"],
        container: 'sweetalert-container', 

      }
    });
  },

  // ... other methods ...
};

export default sweetAlertService;
