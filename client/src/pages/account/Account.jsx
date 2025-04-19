import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import verifyToken from "../../services/api/verifyToken";

import Layout from "../../layout/Layout";
import AccountNavbar from "./components/AccountNavbar";
import AccountSidebar from "./components/AccountSidebar";
import AccountMain from "./components/AccountMain";
import LoadingPage from "../../layout/LoadingPage";

function Account() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [selectedSection, setSelectedSection] = useState("account");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isLogged = await verifyToken();
        isLogged ? setLoading(false) : navigate("/authentication");
      } catch (error) {
        console.error(error);
        navigate("/authentication");
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) return <LoadingPage />;

  return (
    <Layout classes={"flex flex-col text-zinc-400 p-8"}>
      <AccountNavbar />
      <div className="w-full max-w-7xl h-full flex gap-8 mx-auto">
        <AccountSidebar
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
        />
        <AccountMain selectedSection={selectedSection} />
      </div>
    </Layout>
  );
}

export default Account;
