import UnstakeModal from "../Modals/UnstakeModal";
import { TableWrapper } from "./TableWrapper";
import { useState } from "react";

const StakingTable = ({ data, index }) => {

  const headings = Object.keys(data[0]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  const actionHandler = (rowData)=>{
    setModalData(rowData)
    setShowModal(true)
  }

  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
        {data.map((rowData, rowIndex) => (
        <tr key={rowIndex}>
          <td>{rowData["Resource Type"]}</td>
          <td>{rowData["Resource Amount"]}</td>
          <td>{rowData["Staked Asset"]}</td>
          <td>{rowData["Last Updated At"]}</td>
          <td className="action" onClick={()=>actionHandler(rowData)}>{rowData["Action"]}</td>
        </tr>
      ))}
        </tbody>
      </table>
        {showModal && <UnstakeModal showModal={showModal} setShowModal={setShowModal} data={modalData} />}
    </TableWrapper>
  );
};

export default StakingTable;
