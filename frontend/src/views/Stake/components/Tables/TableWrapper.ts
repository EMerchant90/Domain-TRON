import styled from "styled-components";


export const TableWrapper = styled.div`
  border-radius: 10px;
  font-family: 'Roboto', sans-serif;
  border: 1px solid #ddd;
  margin-top: 20px;
  background-color: #fff;
  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 16px;
      text-align: center;
      border-bottom: 1px solid #ddd;
    }

    th {
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      color: #333;
    }

    td {
      font-size: 14px;
      line-height: 20px;
      color: #555;
    }
    .action{
      color: #c23631 !important;
      font-size: 14px;
      cursor: pointer;
    }
    .tooltip {
      position: relative;
      display: inline-block;
      margin-left: 5px;
    }
    
    .tooltip .tooltiptext {
      visibility: hidden;
      width: 250px;
      background-color: #000;
      text-align: center;
      border-radius: 6px;
      padding: 10px ;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      color: #FFF;
      /* Position the tooltip */
      position: absolute;
      z-index: 1;
      top: -30px;
      right: -80px;
    }
    
    .tooltip:hover .tooltiptext {
      visibility: visible;
    }
  }
`;