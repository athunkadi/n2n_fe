import Swal from "sweetalert2";

// swal helper functions
export const swal = {
  loading: (message = "Loading ...") => {
    Swal.fire({
      title: message,
      background: 'transparent',
      color: 'white',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading()
      }
    })
  },
  success: async (message = "Success") => {
    await Swal.fire({
      title: message,
      type: "success",
      icon: "success",
      confirmButtonText: "Ok",
    });
  },
  error: (message, head = "Error") => {
    Swal.fire({
      title: head,
      text: message,
      type: "error",
      icon: "error",
      confirmButtonText: "Ok",
    }).then((res) => {
      if (res.isConfirmed) {
        swal.close()
      }
    });
  },
  warning: async (message) => {
    const result = await Swal.fire({
      title: message ? message : "warning",
      type: "warning",
      icon: "warning",
      confirmButtonText: "Ok",
    });
    if (result.isConfirmed) {
      return Promise.resolve();
    }
  },
  info: async () => {
    const result = await Swal.fire({
      title: "Apakah anda yakin?",
      type: "info",
      icon: "info",
      confirmButtonText: "Ok",
      showCancelButton: true,
    });
    if (result.isConfirmed) {
      return Promise.resolve();
    } else if (result.isDismissed) {
      return Promise.reject({ message: "Data batal disimpan" });
    }
  },
  close: async () => {
    Swal.close();
  },
};
