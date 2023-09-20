import styled from "styled-components";
import truncateAddress from "utils/truncateAddress";
import { TableWrapper } from "./TableWrapper";

const DelegatedByOthersTable = ({ data, contractInfo }) => {

  const headings = Object.keys(data[0]);

  const redirectHandler = (address) => {
    if(Object.keys(contractInfo).includes(address)){
      window.open(`https://nile.tronscan.org/#/contract/${address}/code`)
    }else{
      window.open(`https://nile.tronscan.org/#/address/${address}`)
    }
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
          <td className="action tooltip" onClick={()=>redirectHandler(rowData["From"])} >{truncateAddress(`${rowData["From"]}`)}
         <span className="tooltiptext">{rowData["From"]}</span>
          </td>
         <td >{truncateAddress(`${rowData["To"]}`)}</td>
          <td>{rowData["Resource Amount"]}</td>
          <td>{rowData["Unlocks At"]}</td>
          <td>{rowData["Staked Asset"]}</td>
          <td>{rowData["Last Updated At"]}</td>
        </tr>
      ))}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default DelegatedByOthersTable;
