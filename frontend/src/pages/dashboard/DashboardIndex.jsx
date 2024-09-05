/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect,useContext } from "react";
import { UniversalContext } from '../../context/UniversalContext';
import PageTitle from "../../components/PageTitle";
import SummaryCard from "../../components/SummaryCard";

const DashboardIndex = () => {
  const { setValue } = useContext(UniversalContext);
  useEffect(() => {
    setValue('PageName','Welcome!');
   }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <PageTitle />
      </div>
      <div className="row">
        <SummaryCard />
      </div>
    </div>
  );
};

export default DashboardIndex;