import React from "react";
import truncateAddress from "utils/truncateAddress";
import { TableWrapper } from "./TableWrapper";
import ReclaimModal from "../Modals/ReclaimModal";


const DelegatedToOthersTable = ({ data, contractInfo }) => {

  const headings = Object.keys(data[0]);
    const [showModal, setShowModal] = React.useState(false);
    const [modalData, setModalData] = React.useState([]);

    const redirectHandler = (address) => {
      if(Object.keys(contractInfo).includes(address)){
        window.open(`https://nile.tronscan.org/#/contract/${address}/code`)
      }else{
        window.open(`https://nile.tronscan.org/#/address/${address}`)
      }
    }

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
         <td>{truncateAddress(`${rowData["From"]}`)}</td>
         <td className="action tooltip" onClick={()=>redirectHandler(rowData["To"])}>{truncateAddress(`${rowData["To"]}`)}
         <span className="tooltiptext">{rowData["To"]}</span>
         </td>
            

         <td>{rowData["Resource Amount"]}</td>
         <td>{rowData["Unlocks At"]}</td>
         <td>{rowData["Staked Asset"]}</td>
         <td>{rowData["Last Updated At"]}</td>
         <td className="action" onClick={()=>actionHandler(rowData)}>{rowData["Action"]}</td>

       </tr>
      ))}
        </tbody>
      </table>
      {showModal && <ReclaimModal showModal={showModal} setShowModal={setShowModal} data={modalData} />}
    </TableWrapper>
  );
};

export default DelegatedToOthersTable;
