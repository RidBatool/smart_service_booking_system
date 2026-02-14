/** TAC SERVICE BOOKING APP UPDATE BOOKING PAGE **/

import Navbar from "../components/navbar-components/Navbar";
import UpdateBookingForm from "../components/booking-form-components/UpdateBookingForm";
import Footer from "../components/footer-components/Footer";
import HelpModal from "../components/modal-components/HelpModal";

const UpdateBookingPage = () => {
  return (
    <div className="app-page">
      <Navbar />
      <UpdateBookingForm />
      <HelpModal />
      <Footer />
    </div>
  );
};

export default UpdateBookingPage;
