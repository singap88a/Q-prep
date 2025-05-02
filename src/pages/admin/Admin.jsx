
import MainTrackDashboard from "../../components/admin/MainTrackDashboard";
import Sidebar from "../../components/admin/Sidebar";

function Admin() {


  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 md:ml-64">
        <MainTrackDashboard />
      </div>
    </div>
  );
}

export default Admin;